package gatech.edu.ppmtool.services;

import gatech.edu.ppmtool.domain.Backlog;
import gatech.edu.ppmtool.domain.Project;
import gatech.edu.ppmtool.domain.User;
import gatech.edu.ppmtool.exceptions.ProjectIdException;
import gatech.edu.ppmtool.repository.BacklogRepository;
import gatech.edu.ppmtool.repository.ProjectRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import java.security.Principal;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project, String username) {
        try {
            project.setProjectId(project.getProjectId().toUpperCase());
            if (project.getId() == null) {
                Backlog backlog = new Backlog();
                backlog.setProject(project);
                backlog.setProjectId(project.getProjectId());
                project.setBacklog(backlog);
                project.setManagerUsername(username);
            } else {
                project.setBacklog(backlogRepository.findByProjectId(project.getProjectId()));
            }
            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIdException("Project id '" + project.getProjectId().toUpperCase() + "' already exists");
        }
    }

    public Project readProjectByProjectId(String projectId, Principal principal) {
        Project res = projectRepository.findByProjectId(projectId);
        if (res == null) {
            throw new ProjectIdException("Project id '" + projectId + "' doesn't exist");
        }
        if (!res.getManagerUsername().equals(principal.getName())) {
            throw new ProjectIdException("User '" + principal.getName() + "' doesn't manage project '" + res.getProjectId() + "'");
        }
        return res;
    }

    public Iterable<Project> readAllProjects() {
        return projectRepository.findAll();
    }

    public void deleteProjectByProjectId(String projectId, Principal principal) {
        Project proj = projectRepository.findByProjectId(projectId.toUpperCase());
        if (proj == null) {
            throw new ProjectIdException("Cannot delete project '" + projectId + "' (doesn't exist)");
        }
        if (!proj.getManagerUsername().equals(principal.getName())) {
            throw new ProjectIdException("User '" + principal.getName() + "' doesn't manage project '" + proj.getProjectId() + "'");
        }
        projectRepository.delete(proj);
    }
}
