package gatech.edu.ppmtool.web;

import gatech.edu.ppmtool.domain.User;
import gatech.edu.ppmtool.payload.JWTTokenResponse;
import gatech.edu.ppmtool.payload.LoginRequest;
import gatech.edu.ppmtool.security.JWTTokenProvider;
import gatech.edu.ppmtool.services.FormValidationService;
import gatech.edu.ppmtool.services.UserService;
import gatech.edu.ppmtool.validator.UserRegistrationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.naming.Binding;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.xml.ws.Response;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FormValidationService formValidationService;

    @Autowired
    private UserRegistrationValidator validator;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTTokenProvider jwtProvider;

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        validator.validate(user, bindingResult);
        ResponseEntity<?> errResp = formValidationService.validate(bindingResult);
        if (errResp != null) {
            return errResp;
        }
        return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
        ResponseEntity<?> errResp = formValidationService.validate(bindingResult);
        if (errResp != null) {
            return errResp;
        }
        Authentication auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );
        // Retrieve the current user.
        SecurityContextHolder.getContext().setAuthentication(auth);
        // Use Bearer schema.
        String token = "Bearer " + jwtProvider.generateToken(auth);
        JWTTokenResponse jwtResponse = new JWTTokenResponse(true, token);
        return new ResponseEntity<>(jwtResponse, HttpStatus.OK);
    }
}
