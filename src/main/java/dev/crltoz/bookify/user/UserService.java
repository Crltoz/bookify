package dev.crltoz.bookify.user;

import dev.crltoz.bookify.util.JwtUtil;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<UserProjection> getAllUsersProjected() {
        return userRepository.findAllProjectedBy();
    }

    public Optional<User> getUserById(ObjectId id) {
        return userRepository.findById(id);
    }

    public boolean isAdmin(String token) {
        String userId = jwtUtil.getId(token);
        if (userId == null || !ObjectId.isValid(userId)) return false;
        User user = userRepository.findById(new ObjectId(userId)).orElse(null);
        if (user == null) return false;
        return user.isAdmin();
    }

    public void save(User user) {
        userRepository.save(user);
    }
}
