package gatech.edu.ppmtool.validator;

import gatech.edu.ppmtool.domain.User;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.Validator;

@Component
public class UserRegistrationValidator implements Validator {
    // This validator only validates User class.
    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    @Override
    public void validate(Object o, Errors errors) {
        User u = (User) o;
        if (u.getPassword().length() < 6) {
            errors.rejectValue("password", "Length", "Password must be at least 6 characters long");
        }
        if (!u.getPassword().equals(u.getConfirmPassword())) {
            errors.rejectValue("confirmPassword", "Match", "Passwords must match");
        }
    }
}
