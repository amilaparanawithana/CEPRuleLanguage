package org.adroitlogic.ips.services.userManagement;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.ldap.core.LdapTemplate;

import javax.naming.AuthenticationException;
import javax.naming.directory.Attribute;
import javax.naming.directory.Attributes;
import java.util.HashSet;
import java.util.Set;

import static org.springframework.ldap.query.LdapQueryBuilder.query;

/**
 * This class will be used to query the ldap server.
 *
 * @author Amila Paranawithana
 */
public class LdapAuthService {

    private static final Logger logger = LogManager.getLogger(LdapAuthService.class);

    private LdapTemplate ldapTemplate;

    /**
     * Attempt to authenticate the user.
     *
     * @param username name of the user
     * @param password password of the user
     * @throws AuthenticationException if authentication fails.
     */
    public void authenticate(String username, String password) throws AuthenticationException {
        logger.debug("Attempting LDAP logging for user : {}", username);
        ldapTemplate.authenticate(query().where("sAMAccountName").is(username), password);
        logger.trace("Ldap login successful for user {}", username);
    }

    /**
     * Queries for the ldap groups list of the user.
     *
     * @param username name o user
     * @return the set of ldap groups.
     */
    public Set<String> getGroupsForUser(String username) {
        logger.debug("Querying for ldap groups of {}", username);

        Set<String> ldapGroups = new HashSet<>();
        ldapTemplate.search(query().where("objectclass").is("user").and("sAMAccountName").is(username),
                (Attributes attributes) -> {
                    Attribute groupAttributes = attributes.get("memberof");
                    logger.debug("ldap group request query for {}, resulted in : ", groupAttributes);
                    for (int i = 0; i < groupAttributes.size(); i++) {
                        ldapGroups.add(groupAttributes.get(i).toString());
                    }
                    return null;
                });
        return ldapGroups;
    }

    @SuppressWarnings("unused")
    public LdapTemplate getLdapTemplate() {
        return ldapTemplate;
    }

    public void setLdapTemplate(LdapTemplate ldapTemplate) {
        this.ldapTemplate = ldapTemplate;
    }
}
