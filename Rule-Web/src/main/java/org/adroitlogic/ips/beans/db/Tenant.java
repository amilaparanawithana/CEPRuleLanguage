package org.adroitlogic.ips.beans.db;

import javax.persistence.*;

/**
 * @author Amila Paranawithana
 *         Database representation of tenant
 */
@Entity
@Table(name = "TENANT", indexes = {
    @Index(name = "TENANT_NAME_INDX", columnList = "NAME", unique = true),
    @Index(name = "PERM_DOMAIN_INDX", columnList = "DOMAIN", unique = true),
    @Index(name = "PERM_EMAIL_INDX", columnList = "EMAIL", unique = true)})
public class Tenant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ID")
    private int id;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DOMAIN")
    private String domain;

    @Column(name = "EMAIL")
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return new StringBuilder().append("{").
            append("id=").append(id)
            .append(", name='").append(name).append('\'')
            .append(", domain='").append(domain).append('\'')
            .append(", email='").append(email).append('\'')
            .append('}').toString();
    }
}
