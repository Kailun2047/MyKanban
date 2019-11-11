package gatech.edu.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

public class BacklogIdException extends RuntimeException {
    public BacklogIdException(String s) {
        super(s);
    }
}
