package gatech.edu.ppmtool.services;

import gatech.edu.ppmtool.domain.Backlog;
import gatech.edu.ppmtool.domain.Project;
import gatech.edu.ppmtool.exceptions.ProjectIdException;
import gatech.edu.ppmtool.repository.BacklogRepository;
import gatech.edu.ppmtool.repository.ProjectRepository;
import jdk.nashorn.internal.runtime.arrays.IteratorAction;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectId(project.getProjectId().toUpperCase());
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                backlog.setProject(project);
                backlog.setProjectId(project.getProjectId());
                project.setBacklog(backlog);
            } else {
                project.setBacklog(backlogRepository.findByProjectId(project.getProjectId()));
            }
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project id '" + project.getProjectId().toUpperCase() + "' already exists");
        }
    }

    public Project readProjectByProjectId(String projectId) {
        Project res = projectRepository.findByProjectId(projectId);
        if (res == null) {
            throw new ProjectIdException("Project id '" + projectId + "' doesn't exist");
        }
        return res;
    }

    public Iterable<Project> readAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByProjectId(String projectId) {
        Project proj = projectRepository.findByProjectId(projectId.toUpperCase());
        if (proj == null) {
            throw new ProjectIdException("Cannot delete project '" + projectId + "' (doesn't exist)");
        }
        projectRepository.delete(proj);
    }
}
