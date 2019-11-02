package gatech.edu.ppmtool.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cascade;

import javax.persistence.*;
import java.util.List;

@Entity
public class Backlog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private long id;
    private long projectId;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "projectDBId", nullable = false)
    private Project project;
    private long sequenceNum;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "backlog")
    @JsonIgnore
    private List<ProjectTask> tasks;

    public Backlog() {
    }

    public long getId() {
        return id;
    }

    public long getProjectId() {
        return projectId;
    }

    public Project getProject() {
        return project;
    }

    public void setProjectId(long projectId) {
        this.projectId = projectId;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}
