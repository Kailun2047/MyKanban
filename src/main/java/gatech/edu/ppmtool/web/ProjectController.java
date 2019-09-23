package gatech.edu.ppmtool.web;

import gatech.edu.ppmtool.domain.Project;
import gatech.edu.ppmtool.services.FormValidationService;
import gatech.edu.ppmtool.services.ProjectService;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;

@RestController
@RequestMapping(value = "/api/project")
public class ProjectController {
    @Autowired
    private ProjectService projectService;

    @Autowired
    private FormValidationService formValidationService;

    @PostMapping(value = "")
    public ResponseEntity<?> createProject(@Valid @RequestBody Project project, BindingResult bindingResult) {
        ResponseEntity<?> resp = formValidationService.validate(bindingResult);
        if (resp != null) {
            return resp;
        }
        projectService.saveOrUpdateProject(project);
        return new ResponseEntity<>(project, HttpStatus.CREATED);
    }
}
