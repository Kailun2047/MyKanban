package gatech.edu.ppmtool.exceptions;

public class BacklogIdExceptionResponse {
    private String backlogId;

    // Will return JSON: {"backlogId": message}.
    public BacklogIdExceptionResponse(String message) {
        this.backlogId = message;
    }

    public String getBacklogId() {
        return backlogId;
    }

    public void setBacklogId(String backlogId) {
        this.backlogId = backlogId;
    }
}
