package org.adroitlogic.ips.rest.resources;

import java.util.ArrayList;
import java.util.List;

/**
 * @author amila paranawithana
 *         Represent the JAXRS bean for the user role
 */
public class RoleResource {

    private int id;
    private String name;
    private List<Integer> permissions = new ArrayList<>();
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

    public List<Integer> getPermissions() {
        return permissions;
    }

    public void setPermissions(List<Integer> permissions) {
        this.permissions = permissions;
    }

    public boolean isSelected() {
        return selected;
    }

    public void setSelected(boolean selected) {
        this.selected = selected;
    }
}
