package dev.crltoz.bookify.user;

import dev.crltoz.bookify.util.JwtUtil;
import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping
    public ResponseEntity<List<User>> allUsers(@RequestHeader("Authorization") String token) {
        if (!jwtUtil.isAdmin(token)) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/validate")
    public ResponseEntity<Boolean> validateToken(@RequestHeader("Authorization") String token) {
        return new ResponseEntity<>(jwtUtil.isValidToken(token), HttpStatus.OK);
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

    @PostMapping("/create")
    public ResponseEntity<Boolean> createUser(@RequestBody CreateUserRequest createUserRequest) {
        // try to find other user with the same username
        List<User> users = userService.getAllUsers();
        for (User u : users) {
            if (u.getUsername().equals(createUserRequest.getUsername())) {
                return new ResponseEntity<>(false, HttpStatus.CONFLICT);
            }
        }

        try {
            byte[] hashedPassword = Password.hashPassword(createUserRequest.getPassword());

            User user = new User(
                    createUserRequest.getUsername(),
                    hashedPassword,
                    false
            );

            userService.save(user);
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        } catch (NoSuchAlgorithmException e) {
            LOGGER.error("NoSuchAlgorithmException was thrown in createUser", e);
            return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody CreateUserRequest createUserRequest) {
        List<User> users = userService.getAllUsers();
        for (User u : users) {
            if (u.getUsername().equalsIgnoreCase(createUserRequest.getUsername())) {
                try {
                    if (Password.verifyPassword(createUserRequest.getPassword(), u.getPassword())) {
                        // create jwt and send
                        String token = jwtUtil.generateToken(u.getUsername(), u.isAdmin());
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
}

