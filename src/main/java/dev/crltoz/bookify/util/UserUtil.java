package dev.crltoz.bookify.util;

import dev.crltoz.bookify.user.User;
import dev.crltoz.bookify.user.UserService;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserUtil {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    public User getValidUser(String token) {
        if (!jwtUtil.isValidToken(token)) {
            return null;
        }

        String userId = jwtUtil.getId(token);
        if (userId == null || !ObjectId.isValid(userId)) {
            return null;
        }

        return userService.getUserById(new ObjectId(userId)).orElse(null);
    }
}
