package org.adroitlogic.ips.rest.resources;

import org.adroitlogic.ips.beans.db.Permission.Category;

/**
 * @author amila paranawithana
 *         Represent the JAXRS bean for the user permissions
 */
public class PermissionResource {

    private int id;
    private String name;
    private Category category;
    private boolean checked;

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

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }
}
