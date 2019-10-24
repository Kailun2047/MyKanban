package gatech.edu.ppmtool.services;

import gatech.edu.ppmtool.domain.Project;
import gatech.edu.ppmtool.exceptions.ProjectIdException;
import gatech.edu.ppmtool.repository.ProjectRepository;
import jdk.nashorn.internal.runtime.arrays.IteratorAction;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    public Project saveOrUpdateProject(Project project) {
        try {
            project.setProjectId(project.getProjectId().toUpperCase());
            Project p = projectRepository.findByProjectId(project.getProjectId());
            if (p == null) {
                return projectRepository.save(project);
            }
            p.setProjectName(project.getProjectName());
            p.setDescription(project.getDescription());
            p.setStartDate(project.getStartDate());
            p.setEndDate(project.getEndDate());
            return projectRepository.save(p);
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
