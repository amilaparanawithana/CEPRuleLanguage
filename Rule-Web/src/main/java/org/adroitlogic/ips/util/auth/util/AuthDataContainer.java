package org.adroitlogic.ips.util.auth.util;

import org.apache.shiro.SecurityUtils;

import java.util.Set;

/**
 * This class acts as a proxy between the shiro's sessions and the ips classes.
 *
 * @author Sajith Dilshan
 * @author Chathura Widanage
 */
public class AuthDataContainer {
    private static final String PERMISSIONS_KEY = "permissions";
    private static final String LDAP_GROUPS_KEY = "groups";

    /**
     * Returns the set of permissions for the current user.
     * @return
     */
    public static Set<String> getPermissions() {
        return (Set<String>) SecurityUtils.getSubject().getSession().getAttribute(PERMISSIONS_KEY);
    }

    /**
     * Returns the set of LDAP groups of the current user.
     * @return
     */
    public static Set<String> getLdapGroups() {
        return (Set<String>) SecurityUtils.getSubject().getSession().getAttribute(LDAP_GROUPS_KEY);
    }

    public static void setPermissions(Set<String> permissionsSet) {
        SecurityUtils.getSubject().getSession().setAttribute(PERMISSIONS_KEY, permissionsSet);
    }

    public static void setLdapGroups(Set<String> ldapGroupsSet) {
        SecurityUtils.getSubject().getSession().setAttribute(LDAP_GROUPS_KEY, ldapGroupsSet);
    }
}
