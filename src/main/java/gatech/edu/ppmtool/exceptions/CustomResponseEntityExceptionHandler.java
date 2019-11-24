package gatech.edu.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectIdException(ProjectIdException exception, WebRequest request) {
        ProjectIdExceptionResponse resp = new ProjectIdExceptionResponse(exception.getMessage());
        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleProjectNotFoundException (BacklogIdException e, WebRequest r) {
        BacklogIdExceptionResponse resp = new BacklogIdExceptionResponse(e.getMessage());
        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleNoSuchTaskException (TaskIdException e, WebRequest r) {
        TaskIdExceptionResponse resp = new TaskIdExceptionResponse(e.getMessage());
        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUsernameException (UsernameException e, WebRequest r) {
        UsernameExceptionResponse resp = new UsernameExceptionResponse(e.getMessage());
        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler
    public final ResponseEntity<Object> handleUserNotFoundException (UserNotFoundException e, WebRequest r) {
        UserNotFoundExceptionResponse resp = new UserNotFoundExceptionResponse(e.getMessage());
        return new ResponseEntity<>(resp, HttpStatus.BAD_REQUEST);
    }
}
