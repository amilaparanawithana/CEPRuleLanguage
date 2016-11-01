package org.adroitlogic.ips.beans.db;

import javax.persistence.*;
import java.util.List;

/**
 * @author amila
 * @author dimuthu
 *         Database representation of role
 */
@Entity
@Table(name = "ROLE", indexes = {@Index(name = "ROLE_NAME_INDX", columnList = "NAME", unique = true)})
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "NAME")
    private String name;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "TENANT_ID", referencedColumnName = "id", foreignKey = @ForeignKey(name = "FK_TENANT_IN_ROLE"))
    private Tenant tenant;

    @ManyToMany(fetch = FetchType.EAGER,cascade = CascadeType.REFRESH)
    @JoinTable(name = "ROLE_PERMISSION", joinColumns = @JoinColumn(name = "ROLE_ID", foreignKey = @ForeignKey(name = "FK_ROLE_IN_ROLE_PERM")),
        inverseJoinColumns = @JoinColumn(name = "PERMISSION_ID", foreignKey = @ForeignKey(name = "FK_PERMISSION_IN_ROLE_PERM")))
    private List<Permission> permissions;

    @ManyToMany(mappedBy="roles")
    private List<User> users;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Tenant getTenant() {
        return tenant;
    }

    public void setTenant(Tenant tenant) {
        this.tenant = tenant;
    }

    public List<Permission> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Permission> permissions) {
        this.permissions = permissions;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("Role{").append("id=").
            append(id).append(", name='")
            .append(name).append('\'').append(", tenant=")
            .append(tenant.getName()).append('}').toString();
    }
}
