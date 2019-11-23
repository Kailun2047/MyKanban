package gatech.edu.ppmtool.web;

import gatech.edu.ppmtool.domain.User;
import gatech.edu.ppmtool.services.FormValidationService;
import gatech.edu.ppmtool.services.UserService;
import gatech.edu.ppmtool.validator.UserRegistrationValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.naming.Binding;
import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private FormValidationService formValidationService;

    @Autowired
    private UserRegistrationValidator validator;

    @PostMapping(value = "/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {
        validator.validate(user, bindingResult);
        ResponseEntity<?> errResp = formValidationService.validate(bindingResult);
        if (errResp != null) {
            return errResp;
        }
        return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
    }
}
