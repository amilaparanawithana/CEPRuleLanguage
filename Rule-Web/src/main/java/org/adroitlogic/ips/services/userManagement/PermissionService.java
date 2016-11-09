package org.adroitlogic.ips.services.userManagement;

import org.adroitlogic.ips.beans.db.Permission;
import org.adroitlogic.ips.beans.db.Role;
import org.adroitlogic.ips.repository.PermissionRepository;
import org.adroitlogic.ips.repository.RoleRepository;
import org.adroitlogic.ips.rest.resources.PermissionResource;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author Amila Paranawithana
 *         Web application controller permission services
 */
public class PermissionService {

    private Logger logger = LogManager.getLogger(PermissionService.class);

    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private CachingService cachingService;
    @Autowired
    private UserService userService;

    /**
     * List all permissions
     *
     * @throws ServiceException
     */
    public List<PermissionResource> getAll() throws ServiceException {
        logger.debug("Fetching all Permissions");

        List<PermissionResource> permissionResources = new ArrayList<>();
        try {
            permissionRepository.findAll().forEach(permission ->
                    permissionResources.add(createResource(permission))
            );
        } catch (DataAccessException e) {
            logger.error("Failed to fetch permission list", e);
            throw new ServiceException("Failed to fetch permission list");
        }

        return permissionResources;
    }

    /**
     * Get permissions info for a given role ID
     *
     * @param roleId ID of the role
     * @return list of {@link PermissionResource} for the given role ID
     * @throws ServiceException if fails to obtain permissions
     */
    public List<PermissionResource> getAllByRole(int roleId) throws ServiceException {
        logger.debug("Fetching all roles for ID : {}", roleId);

        try {
            return roleRepository.findOne(roleId).getPermissions().stream()
                    .map(this::createResource)
                    .collect(Collectors.toList());
        } catch (DataAccessException e) {
            logger.error("Failed to fetch role for ID {}", roleId, e);
            throw new ServiceException("Failed to fetch role for ID " + roleId);
        }
    }

    /**
     * Get the current permission list of the user
     *
     * @param username username of the user
     * @return List of permissions for teh user
     */
    public Set<String> getPermissions(String username) {

        try {
            return this.fetchPermissionsForUser(username);
        } catch (Exception e) {
            logger.error("Error while accessing the permissions of the user");
            return null;
        }
    }

    /**
     * Deletes the ldap group list mapped to the @param{username}
     *
     * @param username name of the user
     */
    public void deleteCacheForUser(String username) {
        try {
            logger.debug("Deleting old cache for the user {}", username);
            this.cachingService.deleteKey(username);
        } catch (Exception ex) {
            //hiding exceptions for the application, since cache is just a performance booster
            logger.error("Error in deleting cache for user {}", username, ex);
        }
    }

    /**
     * This method will fetch permissions for the user, from the DB & LDAP
     *
     * @param username logged in user's username
     * @return the set of permissions for the given user
     */
    private Set<String> fetchPermissionsForUser(String username) throws ServiceException {
        logger.debug("Fetching permission list for {} from LDAP & DB", username);

        List<Role> userRoles = userService.getUserRoles(username);

        Set<String> permissionsList = new HashSet<>();

        userRoles.forEach(role -> {
            role.getPermissions().forEach(permission -> {
                if (!permissionsList.contains(permission.getName())) {
                    permissionsList.add(permission.getName());
                }
            });
        });
        return permissionsList;
    }

    private void cachePermissionsForUser(String username, Set<String> permissionsSet) {
        this.deleteCacheForUser(username);
        try {
            logger.debug("Caching new permissions set for the user {}, permission set has {} permissions.",
                    username, permissionsSet.size());
            this.cachingService.addToSet(username, permissionsSet.toArray(new String[permissionsSet.size()]));
        } catch (Exception ex) {
            //hiding exceptions for the application, since cache is just a performance booster
            logger.error("Error in deleting cache for user {}", username, ex);
        }
    }

    private PermissionResource createResource(Permission permission) {
        PermissionResource permissionResource = new PermissionResource();
        permissionResource.setId(permission.getId());
        permissionResource.setName(permission.getName());
        permissionResource.setCategory(permission.getCategory());
        return permissionResource;
    }
}
