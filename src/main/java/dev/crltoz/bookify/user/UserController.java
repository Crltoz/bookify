package dev.crltoz.bookify.user;

import dev.crltoz.bookify.util.JwtUtil;
import dev.crltoz.bookify.websocket.WebSocketService;
import jakarta.servlet.http.HttpServletRequest;
import org.bson.types.ObjectId;
import org.junit.Test;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Pair;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import java.util.regex.Pattern;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private WebSocketService webSocketService;

    // Security for login and register
    private final ConcurrentHashMap<String, Pair<Integer, Long>> requestCounts = new ConcurrentHashMap<>();
    private final long RATE_LIMIT_TIME_WINDOW = TimeUnit.MINUTES.toMillis(1);

    @GetMapping
    public ResponseEntity<List<UserProjection>> allUsers(@RequestHeader("Authorization") String token) {
        if (!userService.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        List<UserProjection> users = userService.getAllUsersProjected();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/validate")
    public ResponseEntity<String> validateToken(@RequestHeader("Authorization") String token) {
        boolean isValid = jwtUtil.isValidToken(token);
        if (!isValid) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        // check if admin is the same as in the token
        boolean isAdmin = userService.isAdmin(token);
        boolean isAdminInToken = jwtUtil.isAdmin(token);

        if (isAdminInToken != isAdmin) {
            // tells the client to renovate the token
            return new ResponseEntity<>("null", HttpStatus.ACCEPTED);
        }

        return new ResponseEntity<>("null", HttpStatus.OK);
    }

    @GetMapping("/renovate")
    public ResponseEntity<String> renovateToken(@RequestHeader("Authorization") String token) {
        if (!jwtUtil.isValidToken(token)) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        String userId = jwtUtil.getId(token);
        if (userId == null || !ObjectId.isValid(userId)) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        User user = userService.getUserById(new ObjectId(userId)).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        String newToken = jwtUtil.generateToken(user);
        return new ResponseEntity<>(newToken, HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable ObjectId id) {
        // return 404 if user not found
        Optional<User> user = userService.getUserById(id);
        if (user.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        user.get().setPassword(null); // don't return password for security reasons
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> createUser(@RequestBody CreateUserRequest createUserRequest, HttpServletRequest request) {
        String clientIp = getClientIp(request);
        if (isRateLimited(clientIp)) {
            return new ResponseEntity<>("null", HttpStatus.TOO_MANY_REQUESTS);
        }

        // check valid email, password, first name and last name
        if (!isValidEmail(createUserRequest.getEmail()) || !isValidPassword(createUserRequest.getPassword()) ||
                !isValidName(createUserRequest.getFirstName()) || !isValidName(createUserRequest.getLastName())) {
            return new ResponseEntity<>("null", HttpStatus.BAD_REQUEST);
        }

        // try to find other user with the same username
        List<User> users = userService.getAllUsers();
        for (User u : users) {
            if (u.getEmail().equalsIgnoreCase(createUserRequest.getEmail())) {
                return new ResponseEntity<>("null", HttpStatus.CONFLICT);
            }
        }

        try {
            byte[] hashedPassword = Password.hashPassword(createUserRequest.getPassword());

            User user = new User(
                    createUserRequest.getEmail(),
                    hashedPassword,
                    false,
                    createUserRequest.getFirstName(),
                    createUserRequest.getLastName()
            );

            userService.save(user);
            // send token after registration
            String token = jwtUtil.generateToken(user);
            return new ResponseEntity<>(token, HttpStatus.CREATED);
        } catch (NoSuchAlgorithmException e) {
            LOGGER.error("NoSuchAlgorithmException was thrown in createUser", e);
            return new ResponseEntity<>("null", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginUserRequest loginUserRequest, HttpServletRequest request) {
        String clientIp = getClientIp(request);
        if (isRateLimited(clientIp)) {
            return new ResponseEntity<>("null", HttpStatus.TOO_MANY_REQUESTS);
        }

        // check valid email
        if (!isValidEmail(loginUserRequest.getEmail()) || !isValidPassword(loginUserRequest.getPassword())) {
            return new ResponseEntity<>("null", HttpStatus.BAD_REQUEST);
        }

        List<User> users = userService.getAllUsers();
        for (User u : users) {
            if (u.getEmail().equalsIgnoreCase(loginUserRequest.getEmail())) {
                try {
                    if (Password.verifyPassword(loginUserRequest.getPassword(), u.getPassword())) {
                        // create jwt and send
                        String token = jwtUtil.generateToken(u);
                        return new ResponseEntity<>(token, HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
                    }
                } catch (NoSuchAlgorithmException e) {
                    LOGGER.error("NoSuchAlgorithmException was thrown in login", e);
                    return new ResponseEntity<>("null", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }
        return new ResponseEntity<>("null", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/update/name")
    public ResponseEntity<String> updateUser(@RequestBody UpdateUserNameRequest updateUserRequest, @RequestHeader("Authorization") String token) {
        if (!jwtUtil.isValidToken(token)) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        // get user from jwt
        String email = jwtUtil.getEmail(token);
        if (email == null) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        // check if names are valid
        if (!isValidName(updateUserRequest.getFirstName()) || !isValidName(updateUserRequest.getLastName())) {
            return new ResponseEntity<>("null", HttpStatus.BAD_REQUEST);
        }

        List<User> users = userService.getAllUsers();
        for (User u : users) {
            if (u.getEmail().equalsIgnoreCase(email)) {
                // update user names
                u.setFirstName(updateUserRequest.getFirstName());
                u.setLastName(updateUserRequest.getLastName());
                userService.save(u);

                // generate new jwt and set it
                String newToken = jwtUtil.generateToken(u);
                return new ResponseEntity<>(newToken, HttpStatus.OK);
            }
        }
        return new ResponseEntity<>("null", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/update/password")
    public ResponseEntity<String> updatePassword(@RequestBody UpdateUserPasswordRequest updatePasswordRequest, @RequestHeader("Authorization") String token) {
        if (!jwtUtil.isValidToken(token)) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        // get user from jwt
        String email = jwtUtil.getEmail(token);
        if (email == null) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        // check if password is valid
        if (!isValidPassword(updatePasswordRequest.getNewPassword())) {
            return new ResponseEntity<>("null", HttpStatus.BAD_REQUEST);
        }

        List<User> users = userService.getAllUsers();
        for (User u : users) {
            if (u.getEmail().equalsIgnoreCase(email)) {
                try {
                    // check if old password is correct
                    if (Password.verifyPassword(updatePasswordRequest.getOldPassword(), u.getPassword())) {
                        // update password
                        u.setPassword(Password.hashPassword(updatePasswordRequest.getNewPassword()));
                        userService.save(u);
                        return new ResponseEntity<>("null", HttpStatus.OK);
                    } else {
                        return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
                    }
                } catch (NoSuchAlgorithmException e) {
                    LOGGER.error("NoSuchAlgorithmException was thrown in updatePassword", e);
                    return new ResponseEntity<>("null", HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }
        return new ResponseEntity<>("null", HttpStatus.NOT_FOUND);
    }

    @PostMapping("/update/setAdmin")
    public ResponseEntity<String> setAdmin(@RequestBody SetAdminRequest setAdminRequest, @RequestHeader("Authorization") String token) {
        if (!userService.isAdmin(token)) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        String userId = jwtUtil.getId(token);
        if (userId == null || !ObjectId.isValid(userId)) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        User user = userService.getUserById(new ObjectId(userId)).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("null", HttpStatus.UNAUTHORIZED);
        }

        if (!ObjectId.isValid(setAdminRequest.getId())) {
            return new ResponseEntity<>("null", HttpStatus.BAD_REQUEST);
        }

        User userToUpdate = userService.getUserById(new ObjectId(setAdminRequest.getId())).orElse(null);
        if (userToUpdate == null) {
            return new ResponseEntity<>("null", HttpStatus.NOT_FOUND);
        }

        // cannot update own admin status
        if (Objects.equals(userToUpdate, user)) {
            return new ResponseEntity<>("null", HttpStatus.BAD_REQUEST);
        }

        LOGGER.info("Update admin status for user: " + userToUpdate.getEmail() + " to: " + setAdminRequest.getIsAdmin());
        userToUpdate.setAdmin(setAdminRequest.getIsAdmin());
        userService.save(userToUpdate);

        // send event to all clients to update jwt from this user
        webSocketService.sendMessage("updateUser", List.of(userToUpdate.getId()));
        return new ResponseEntity<>("null", HttpStatus.OK);
    }

    private String getClientIp(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }

    private boolean isRateLimited(String clientIp) {
        long currentTimeMillis = System.currentTimeMillis();
        // get request count
        Pair<Integer, Long> requestCountPair = requestCounts.getOrDefault(clientIp, Pair.of(0, 0L));
        long lastRequestTime = requestCountPair.getSecond();

        // 10 requests per minute (login and register)
        int MAX_REQUESTS_PER_WINDOW = 10;

        if (currentTimeMillis - lastRequestTime < RATE_LIMIT_TIME_WINDOW && requestCountPair.getFirst() < MAX_REQUESTS_PER_WINDOW) {
            requestCounts.put(clientIp, Pair.of(requestCountPair.getFirst() + 1, currentTimeMillis));
            return false;
        } else if (currentTimeMillis - lastRequestTime > RATE_LIMIT_TIME_WINDOW) {
            requestCounts.put(clientIp, Pair.of(1, currentTimeMillis));
            return false;
        }

        LOGGER.info("Rate limit exceeded for IP: " + clientIp);
        return true;
    }

    public static boolean isValidEmail(String email) {
        String emailRegex = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    public static boolean isValidPassword(String password) {
        String passwordRegex = "^.{8,}$";
        Pattern pattern = Pattern.compile(passwordRegex);
        return pattern.matcher(password).matches();
    }

    public static boolean isValidName(String name) {
        String nameRegex = "^[a-zA-ZÀ-ÿ\\s]+$";
        Pattern pattern = Pattern.compile(nameRegex);
        return pattern.matcher(name).matches();
    }

    @Test
    public void testValidEmail() {
        assertFalse(isValidEmail("test"));
        assertFalse(isValidEmail("test@"));
        assertTrue(isValidEmail("test@test.com"));

        assertFalse(isValidName(""));
        assertTrue(isValidName("test test"));

        assertFalse(isValidPassword("12345"));
        assertTrue(isValidPassword("12345678"));
    }

}

