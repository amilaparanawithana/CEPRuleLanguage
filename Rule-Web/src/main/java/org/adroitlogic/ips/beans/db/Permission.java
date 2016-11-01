package org.adroitlogic.ips.beans.db;

import javax.persistence.*;
import java.util.List;

/**
 * @author amila
 * @author dimuthu
 *         Database representation of permission
 */
@Entity
@Table(name = "PERMISSION", indexes = {@Index(name = "PERM_NAME_INDX", columnList = "NAME", unique = true)})
public class Permission {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "NAME")
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(name = "CATEGORY")
    private Category category;
    @ManyToMany(mappedBy="permissions")
    private List<Role> roles;

    public enum Category {
        AUDIT_LOG,
        CLUSTER,
        DEPLOYMENT_CONFIGURATION,
        NODE_GROUP,
        LDAP_GROUP,
        PERMISSION,
        PROJECT,
        ROLE,
        TENANT,
        LOG,
        LOGGER,
        SERVICE_PACKAGE,
        GENERIC
    }

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}
