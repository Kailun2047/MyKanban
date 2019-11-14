package gatech.edu.ppmtool.services;

import gatech.edu.ppmtool.domain.Backlog;
import gatech.edu.ppmtool.domain.ProjectTask;
import gatech.edu.ppmtool.exceptions.TaskIdException;
import gatech.edu.ppmtool.exceptions.ProjectIdException;
import gatech.edu.ppmtool.exceptions.BacklogIdException;
import gatech.edu.ppmtool.repository.BacklogRepository;
import gatech.edu.ppmtool.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {
    private static String INITIAL_STATUS = "To Do";
    private static final int INITIAL_PRIORITY = 3;
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectId, ProjectTask projectTask) {
        try {
            Backlog backlog = backlogRepository.findByProjectId(projectId);
            Long seqNum = backlog.getSequenceNum();
            seqNum++;
            backlog.setSequenceNum(seqNum);
            projectTask.setTaskSequence(String.join("-", new String[] {projectId, seqNum.toString()}));
            if (projectTask.getStatus() == null || projectTask.getStatus() == "") {
                projectTask.setStatus(INITIAL_STATUS);
            }
            if (projectTask.getPriority() == null) {
                projectTask.setPriority(INITIAL_PRIORITY);
            }
            projectTask.setBacklog(backlog);
            projectTask.setProjectId(projectId);
            List<ProjectTask> tasks = backlog.getTasks();
            tasks.add(projectTask);
            backlog.setTasks(tasks);
            return projectTaskRepository.save(projectTask);
        } catch (Exception e) {
            throw new BacklogIdException("Project '" + projectId + "' not found");
        }
    }

    public Iterable<ProjectTask> getProjectTasksByProjectId(String projectId) {
        try {
            Backlog backlog = backlogRepository.findByProjectId(projectId);
            return backlog.getTasks();
        } catch (Exception e) {
            throw new ProjectIdException("Project '" + projectId + "' not found");
        }
    }

    public ProjectTask getProjectTaskBySequence(String projectId, String taskSequence) {
        Backlog backlog = backlogRepository.findByProjectId(projectId);
        if (backlog == null) {
            throw new BacklogIdException("Project '" + projectId + "' not found");
        }
        ProjectTask task = projectTaskRepository.findByTaskSequence(taskSequence);
        if (task == null) {
            throw new BacklogIdException("Project task '" + taskSequence + "' not found");
        }
        if (!task.getProjectId().equals(backlog.getProjectId())) {
            throw new TaskIdException("No project task named '" + taskSequence + "' in backlog of '" + projectId + "'");
        }
        return projectTaskRepository.findByTaskSequence(taskSequence);
    }

    public ProjectTask updateProjectTaskBySequence(ProjectTask newTask, String projectId, String taskSequence) {
        // Make sure exceptions are caught by calling getProjectTaskBySequence() first.
        ProjectTask task = getProjectTaskBySequence(projectId, taskSequence);
        newTask.setBacklog(task.getBacklog());
        return projectTaskRepository.save(newTask);
    }

    public void deleteProjectTaskBySequence(String projectId, String taskSequence) {
        ProjectTask task = getProjectTaskBySequence(projectId, taskSequence);
        projectTaskRepository.delete(task);
    }
}
