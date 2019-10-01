package gatech.edu.ppmtool.repository;

import gatech.edu.ppmtool.domain.Project;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.RepositoryDefinition;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, Long> {
    public Project findByProjectId(String projectId);

    @Override
    Iterable<Project> findAll();
}
