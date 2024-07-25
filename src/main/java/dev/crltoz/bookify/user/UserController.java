package dev.crltoz.bookify.user;

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

    @GetMapping
    public ResponseEntity<List<User>> allUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<Optional<User>> getUserById(@PathVariable ObjectId id) {
        // return 404 if user not found
        Optional<User> user = userService.getUserById(id);
        if (user.isEmpty()) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody CreateUserRequest createUserRequest) {
        // try to find other user with the same username
        List<User> users = userService.getAllUsers();
        for (User u : users) {
            if (u.getUsername().equals(createUserRequest.getUsername())) {
                return new ResponseEntity<>(u, HttpStatus.CONFLICT);
            }
        }

        try {
            byte[] hashedPassword = Password.hashPassword(createUserRequest.getPassword());

            User user = new User(
                    createUserRequest.getUsername(),
                    hashedPassword,
                    createUserRequest.isAdmin()
            );

            userService.addUser(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        } catch (NoSuchAlgorithmException e) {
            LOGGER.error("NoSuchAlgorithmException was thrown in createUser", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

