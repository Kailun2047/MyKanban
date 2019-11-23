package gatech.edu.ppmtool.exceptions;

public class LoginExceptionResponse {
    private String username;
    private String password;
    public LoginExceptionResponse() {
        this.username = "Invalid username";
        this.password = "Invalid password";
    }
}
