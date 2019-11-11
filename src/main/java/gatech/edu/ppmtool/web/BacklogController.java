package gatech.edu.ppmtool.web;

import gatech.edu.ppmtool.domain.ProjectTask;
import gatech.edu.ppmtool.services.FormValidationService;
import gatech.edu.ppmtool.services.ProjectTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping(value = "/api/backlog")
@CrossOrigin
public class BacklogController {
    @Autowired
    private ProjectTaskService projectTaskService;

    @Autowired
    private FormValidationService validationService;

    @PostMapping(value = "/{projectId}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask task, BindingResult bindingResult, @PathVariable String projectId) {
        ResponseEntity<?> errResp = validationService.validate(bindingResult);
        if (errResp != null) {
            return errResp;
        }
        return new ResponseEntity<>(projectTaskService.addProjectTask(projectId, task), HttpStatus.CREATED);
    }

    @GetMapping(value = "/{projectId}")
    public ResponseEntity<?> getProjectTasksByProjectId(@PathVariable String projectId) {
        Iterable<ProjectTask> tasks = projectTaskService.getProjectTasksByProjectId(projectId);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping(value="/{projectId}/{taskSequence}")
    public ResponseEntity<?> getProjectTaskBySequence(@PathVariable String projectId, @PathVariable String taskSequence) {
        return new ResponseEntity<>(projectTaskService.getProjectTaskBySequence(projectId, taskSequence), HttpStatus.OK );
    }

    @PatchMapping(value = "/{projectId}/{taskSequence}")
    public ResponseEntity<?> updateProjectTaskBySequence(@Valid @RequestBody ProjectTask task, BindingResult bindingResult, @PathVariable String projectId, @PathVariable String taskSequence) {
        ResponseEntity<?> errResp = validationService.validate(bindingResult);
        if (errResp != null) {
            return errResp;
        }
        return new ResponseEntity<>(projectTaskService.updateProjectTaskBySequence(task, projectId, taskSequence), HttpStatus.OK);
    }

    @DeleteMapping(value = "/{projectId}/{taskSequence}")
    public ResponseEntity<?> deleteProjectTaskBySequence(@PathVariable String projectId, @PathVariable String taskSequence) {
        projectTaskService.deleteProjectTaskBySequence(projectId, taskSequence);
        return new ResponseEntity<String>("Project task " + taskSequence + "successfully deleted", HttpStatus.OK);
    }
}
