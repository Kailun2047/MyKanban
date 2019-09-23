package gatech.edu.ppmtool.services;

import java.util.Map;
import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@Service
public class FormValidationService {
    public ResponseEntity<?> validate(BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errMsg = new HashMap<>();
            for (FieldError e: bindingResult.getFieldErrors()) {
                errMsg.put(e.getField(), e.getDefaultMessage());
            }
            return new ResponseEntity<>(errMsg, HttpStatus.BAD_REQUEST);
        }
        return null;
    }
}
