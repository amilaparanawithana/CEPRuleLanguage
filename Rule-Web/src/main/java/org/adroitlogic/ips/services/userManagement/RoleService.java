package org.adroitlogic.ips.services.userManagement;

import org.adroitlogic.ips.beans.db.AuditLog;
import org.adroitlogic.ips.beans.db.Permission;
import org.adroitlogic.ips.beans.db.Role;
import org.adroitlogic.ips.repository.PermissionRepository;
import org.adroitlogic.ips.repository.RoleRepository;
import org.adroitlogic.ips.repository.TenantRepository;
import org.adroitlogic.ips.rest.resources.RoleResource;
import org.adroitlogic.ips.services.AuditLogService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Amila Paranawithana
 *         User role related functions
 */
public class RoleService {

    private Logger logger = LogManager.getLogger(RoleService.class);

    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private AuditLogService auditLogService;
    @Autowired
    private CachingService cachingService;


    /**
     * Create a new user role
     *
     * @param roleResource jax-rs representation bean for role
     * @param tenant       tenant that belongs this role
     * @param user         action performing user
     * @throws ServiceException
     */
    @Transactional
    public void create(RoleResource roleResource, String tenant, String user) throws ServiceException {
        logger.debug("Creating new role :{}", roleResource.getName());

        try {
            if (roleRepository.findOneByTenant_nameAndName(tenant, roleResource.getName()) != null) {
                logger.warn("Role with name {} already exists", roleResource.getName());
                throw new ServiceException("Role with name " + roleResource.getName() + " already exists");
            }
            Role role = new Role();
            role.setName(roleResource.getName());
            role.setTenant(tenantRepository.findByName(tenant));
            role.setPermissions(
                    roleResource.getPermissions().stream()
                            .map(permissionId -> permissionRepository.findOne(permissionId))
                            .collect(Collectors.toList()));
            roleRepository.save(role);

            if (logger.isDebugEnabled()) {
                logger.debug("Successfully created a new role : {}", role.toString());
            }
            auditLogService.create(user, AuditLog.Type.USER, roleResource.getName(), "Created a new role");
        } catch (DataAccessException e) {
            logger.error("Failed to create a new role : {}", roleResource.getName(), e);
            throw new ServiceException("Failed to create a new role : " + roleResource.getName());
        }
    }

    /**
     * Update user information
     *
     * @param roleResource jax-rs representation bean for role
     * @param id           db role_id
     * @param user         action performing user
     * @throws ServiceException
     */
    @Transactional
    public void update(RoleResource roleResource, int id, String user) throws ServiceException {
        logger.debug("Updating new role :{}", roleResource.getName());

        cachingService.deleteAllKeyValues();
        try {
            Role role = roleRepository.findOne(id);
            if (role != null) {
                role.setName(roleResource.getName());
                role.setPermissions(roleResource.getPermissions().stream()
                        .map(permissionResource -> permissionRepository.findOne(permissionResource))
                        .collect(Collectors.toList()));

                roleRepository.save(role);

                if (logger.isDebugEnabled()) {
                    logger.debug("Successfully updated role : {}", role.toString());
                    auditLogService.create(user, AuditLog.Type.USER, roleResource.getName(), "Updated the role");
                }
            }
        } catch (DataAccessException e) {
            logger.error("Failed to the role : {}", roleResource.getName(), e);
            throw new ServiceException("Failed to update the role : " + roleResource.getName());
        }
    }

    /**
     * Delete an existing role
     *
     * @param roleId db role_id
     * @param user   action performing user
     * @throws ServiceException
     */
    @Transactional
    public void delete(int roleId, String user) throws ServiceException {
        logger.debug("Deleting role with ID :{}", roleId);

        cachingService.deleteAllKeyValues();
        try {
            Role role = roleRepository.findOne(roleId);
            if (role != null && role.getUsers() == null) {
                roleRepository.delete(roleId);

                if (logger.isDebugEnabled()) {
                    logger.debug("Successfully deleted role : {}", role.toString());
                }
                auditLogService.create(user, AuditLog.Type.USER, role.getName(), "Deleted the role");
            } else if (role != null && role.getUsers() != null) {
                throw new ServiceException("There are Users associated to this role. " +
                        "Please remove the role from LDAP group and try again");
            }
        } catch (DataAccessException e) {
            logger.error("Failed to delete the role with ID : {}", roleId, e);
            throw new ServiceException("Failed to delete the role");
        }
    }

    /**
     * Get information of a role from database
     *
     * @param roleId db role_id
     * @throws ServiceException
     */
    public RoleResource get(int roleId) throws ServiceException {
        try {
            Role role = roleRepository.findOne(roleId);
            return createResource(role);
        } catch (DataAccessException e) {
            logger.error("Failed to obtain role for ID : {}", roleId, e);
            throw new ServiceException("Failed to obtain LDAP group for ID : " + roleId);
        }
    }

    public List<RoleResource> list(String tenant) throws ServiceException {
        logger.debug("Fetching role list for tenant :{}", tenant);

        try {
            List<RoleResource> roleResources = new ArrayList<>();
            roleRepository.findAllByTenant_name(tenant).forEach(role ->
                    roleResources.add(createResource(role))
            );
            return roleResources;
        } catch (DataAccessException e) {
            logger.error("Failed to fetch roles for tenant {}", tenant, e);
            throw new ServiceException("Failed to fetch roles for tenant " + tenant);
        }
    }

    /**
     * Create a jax-rs representation bean for a role from a db-representation
     *
     * @param role dn role
     */
    private RoleResource createResource(Role role) {
        RoleResource roleResource = new RoleResource();
        roleResource.setId(role.getId());
        roleResource.setName(role.getName());
        roleResource.setPermissions(
                role.getPermissions().stream()
                        .map(Permission::getId)
                        .collect(Collectors.toList())
        );

        return roleResource;
    }

    /**
     * Returns a list of permissions, which are mapped to a given role name.
     *
     * @param name name of role
     * @return list of permissions belong to the given role
     */
    @Transactional
    public Iterable<Permission> getPermissions(String name) {
        final Role role = roleRepository.findByName(name);
        if (role != null) {
            return role.getPermissions();
        } else {
            return Collections.emptyList();
        }
    }

}
