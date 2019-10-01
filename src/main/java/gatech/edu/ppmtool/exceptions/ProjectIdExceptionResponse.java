package gatech.edu.ppmtool.exceptions;

public class ProjectIdExceptionResponse {
    private String ProjectId;

    public ProjectIdExceptionResponse(String projectId) {
        ProjectId = projectId;
    }

    public String getProjectId() {
        return ProjectId;
    }

    public void setProjectId(String projectId) {
        ProjectId = projectId;
    }
}
