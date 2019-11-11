package gatech.edu.ppmtool.exceptions;

public class ProjectIdExceptionResponse {
    private String projectId;

    // Will return JSON: {"projectId": message}.
    public ProjectIdExceptionResponse(String message) {
        this.projectId = message;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String message) {
        this.projectId = message;
    }
}
