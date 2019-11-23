package gatech.edu.ppmtool.domain;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.Collection;
import java.util.Date;

@Entity
public class User implements UserDetails {
    public User() {
    }
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Email(message = "Please enter a valid email address")
    @NotBlank(message = "Username should not be blank")
    @Column(unique = true)
    private String username;
    @NotBlank(message = "Password should not be blank")
    private String password;
    @Transient
    private String confirmPassword;
    @NotBlank(message = "Full user name should not be blank")
    private String fullUserName;
    private Date createdAt;
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public String getFullUserName() {
        return fullUserName;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public void setFullUserName(String fullUserName) {
        this.fullUserName = fullUserName;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
