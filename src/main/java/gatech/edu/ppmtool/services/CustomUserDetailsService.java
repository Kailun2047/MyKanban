package gatech.edu.ppmtool.services;

import gatech.edu.ppmtool.exceptions.UserNotFoundException;
import gatech.edu.ppmtool.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.security.core.userdetails.UserDetailsService;
import javax.transaction.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UserNotFoundException {
        UserDetails userDetails = userRepository.findByUsername(username);
        if (userDetails == null) {
            throw new UserNotFoundException("User '" + username + "' not found");
        }
        return userDetails;
    }

    @Transactional
    public UserDetails loadUserById(Long id) throws UserNotFoundException {
        UserDetails userDetails = userRepository.getById(id);
        if (userDetails == null) {
            throw new UserNotFoundException("User id '" + id + "' not found");
        }
        return userDetails;
    }
}
