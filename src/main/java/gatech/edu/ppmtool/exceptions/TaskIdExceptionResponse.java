package gatech.edu.ppmtool.exceptions;

public class TaskIdExceptionResponse {
    private String taskId;
    public TaskIdExceptionResponse(String message) {
        this.taskId = message;
    }

    public String getTaskId() {
        return taskId;
    }

    public void setTaskId(String taskId) {
        this.taskId = taskId;
    }
}
