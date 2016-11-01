package org.adroitlogic.ips.rest.resources;

/**
 * @author amila paranawithana
 *         Represent the JAXRS bean for the tenant
 */
public class TenantResource {

    private int id;
    private String name;
    private String domain;
    private String email;
    private UserResource admin;

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

    public UserResource getAdmin() {
        return admin;
    }

    public void setAdmin(UserResource admin) {
        this.admin = admin;
    }
}
