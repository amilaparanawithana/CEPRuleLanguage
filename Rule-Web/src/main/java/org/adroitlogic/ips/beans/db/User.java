package org.adroitlogic.ips.beans.db;

import javax.persistence.*;
import java.util.List;

/**
 * @author amila paranawithana
 *         Database representation of user
 */
@Entity
@Table(name = "USER")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "EMAIL")
    private String email;

    @Column(name = "PASSWORD")
    private String password;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TENANT_ID", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_TENANT_IN_USER"))
    private Tenant tenant;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "USER_ROLE", joinColumns = @JoinColumn(name = "USER_ID", foreignKey = @ForeignKey(name = "FK_USER_IN_USER_ROLE")),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID", foreignKey = @ForeignKey(name = "FK_ROLE_IN_USER_ROLE")))
    private List<Role> roles;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("{").
                append("id=").append(id)
                .append(", name='").append(name).append('\'')
                .append(", email='").append(email).append('\'')
                .append('}').toString();
    }
}
