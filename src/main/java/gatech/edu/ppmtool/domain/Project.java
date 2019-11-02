package gatech.edu.ppmtool.domain;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.annotation.Generated;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank(message = "Project name is a required field.")
    private String projectName;
    @NotBlank(message = "Project description is required.")
    private String description;
    @NotBlank(message = "Project id is a required field.")
    @Size(min = 4, max = 5, message = "Project id (abbrev.) should be of length 4 to 5.")
    @Column(updatable = false, unique = true)
    private String projectId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date startDate;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date endDate;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm a z")
    private Date createdAt;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm a z")
    private Date updatedAt;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "project")
    @JsonIgnore
    private Backlog backlog;

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    public long getId() {
        return id;
    }

    public String getProjectName() {
        return projectName;
    }

    public String getDescription() {
        return description;
    }

    public String getProjectId() {
        return projectId;
    }

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public Date getUpdatedAt() {
        return updatedAt;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setProjectName(String projectName) {
        this.projectName = projectName;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}
