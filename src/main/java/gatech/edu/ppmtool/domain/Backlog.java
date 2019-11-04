package gatech.edu.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Backlog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;
    private String projectId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "project", nullable = false)
    @JsonIgnore
    private Project project;
    private long sequenceNum;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "backlog")
    private List<ProjectTask> tasks = new ArrayList<>();

    public Backlog() {
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public String getProjectId() {
        return projectId;
    }

    public Project getProject() {
        return project;
    }

    public long getSequenceNum() {
        return sequenceNum;
    }

    public List<ProjectTask> getTasks() {
        return tasks;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public void setSequenceNum(long sequenceNum) {
        this.sequenceNum = sequenceNum;
    }

    public void setTasks(List<ProjectTask> tasks) {
        this.tasks = tasks;
    }
}
