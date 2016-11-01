package org.adroitlogic.ips.rest.resources;

import java.util.ArrayList;
import java.util.List;

/**
 * @author amila paranawithana
 *         Represent the JAXRS bean for the user
 */
public class UserResource {

    private int id;
    private String name;
    private String email;
    private String password;
    private List<Integer> roles = new ArrayList<>();
    private boolean selected;

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

    public List<Integer> getRoles() {
        return roles;
    }

    public void setRoles(List<Integer> roles) {
        this.roles = roles;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
}
