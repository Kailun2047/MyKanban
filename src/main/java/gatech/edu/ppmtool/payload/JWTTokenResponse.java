package gatech.edu.ppmtool.payload;

public class JWTTokenResponse {
    private boolean success;
    private String token;

    public JWTTokenResponse(boolean success, String token) {
        this.success = success;
        this.token = token;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getToken() {
        return token;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
