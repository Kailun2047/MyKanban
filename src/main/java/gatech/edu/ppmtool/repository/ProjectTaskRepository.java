package gatech.edu.ppmtool.repository;

import gatech.edu.ppmtool.domain.Project;
import gatech.edu.ppmtool.domain.ProjectTask;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectTaskRepository extends CrudRepository<ProjectTask, Long> {
    public ProjectTask findByTaskSequence(String taskSequence);
}
