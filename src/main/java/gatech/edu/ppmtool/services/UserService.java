package gatech.edu.ppmtool.services;

import gatech.edu.ppmtool.domain.User;
import gatech.edu.ppmtool.exceptions.UsernameException;
import gatech.edu.ppmtool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public User saveUser(User user) {
        try {
            user.setUsername(user.getUsername());
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setConfirmPassword("");
            return userRepository.save(user);
        } catch (Exception e) {
            throw new UsernameException("Username '" + user.getUsername() + "' already exists");
        }
    }
}
