package gatech.edu.ppmtool.exceptions;

public class ProjectNotFoundExceptionResponse {
    private String projectId;

    public ProjectNotFoundExceptionResponse(String projectId) {
        this.projectId = projectId;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }
}
