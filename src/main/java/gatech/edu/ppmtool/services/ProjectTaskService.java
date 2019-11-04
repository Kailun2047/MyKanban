package gatech.edu.ppmtool.services;

import gatech.edu.ppmtool.domain.Backlog;
import gatech.edu.ppmtool.domain.ProjectTask;
import gatech.edu.ppmtool.repository.BacklogRepository;
import gatech.edu.ppmtool.repository.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectTaskService {
    private static String INITIAL_STATUS = "TODO";
    private static final int INITIAL_PRIORITY = 3;
    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectId, ProjectTask projectTask) {
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
        List<ProjectTask> tasks = backlog.getTasks();
        tasks.add(projectTask);
        return projectTaskRepository.save(projectTask);
    }
}
