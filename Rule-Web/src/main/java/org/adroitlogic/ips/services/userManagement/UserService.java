package org.adroitlogic.ips.services.userManagement;

import org.adroitlogic.ips.beans.db.AuditLog;
import org.adroitlogic.ips.beans.db.Role;
import org.adroitlogic.ips.beans.db.User;
import org.adroitlogic.ips.repository.RoleRepository;
import org.adroitlogic.ips.repository.TenantRepository;
import org.adroitlogic.ips.repository.UserRepository;
import org.adroitlogic.ips.rest.resources.UserResource;
import org.adroitlogic.ips.services.AuditLogService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author amila paranawithana
 *         User related functionalities impementation
 */
public class UserService {

    private Logger logger = LogManager.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private AuditLogService auditLogService;

    public UserResource get(int userId) throws ServiceException {
        try {
            User user = userRepository.findOne(userId);
            return createResource(user);
        } catch (DataAccessException e) {
            logger.error("Failed to fetch the user with id : {}", userId, e);
            throw new ServiceException("Failed to fetch the user with id : " + userId);
        }
    }

    /**
     * Create a new user in the database
     *
     * @param userResource JSON mapped user object
     * @throws ServiceException
     */
    @Transactional
    public void create(UserResource userResource, String tenant) throws ServiceException {

        try {
            User user = new User();
            user.setName(userResource.getName());
            user.setEmail(userResource.getEmail());
            user.setPassword(userResource.getPassword());
            List<Role> userRoles = new ArrayList<>();
            user.setTenant(tenantRepository.findByName(tenant));

            userResource.getRoles().forEach(roleId -> {
                userRoles.add(roleRepository.findById(roleId));

            });

            user.setRoles(userRoles);

            userRepository.save(user);

            if (logger.isDebugEnabled()) {
                logger.debug("Successfully created user :{}", user.toString());
            }
            auditLogService.create(userResource.getName(), AuditLog.Type.USER, userResource.getName(), "Created a new user");
        } catch (DataAccessException e) {
            logger.error("Failed to create the tenant {}", userResource.getName(), e);
            throw new ServiceException("Failed to create a user with name " + userResource.getName());
        }
    }

    /**
     * Update user details
     *
     * @param userResource
     * @throws ServiceException
     */
    @Transactional
    public void update(int userId, UserResource userResource) throws ServiceException {
        try {
            User user = userRepository.findById(userId);
            if (user == null) {
                throw new ServiceException("Failed to find a user with ID : " + userId);
            }

            user.setEmail(userResource.getEmail());
            user.setName(userResource.getName());

            user.setRoles(
                    userResource.getRoles().stream()
                            .map(roleId -> roleRepository.findById(roleId))
                            .collect(Collectors.toList()));

            userRepository.save(user);

            if (logger.isDebugEnabled()) {
                logger.debug("Successfully updated user : {}", user.toString());
            }
            auditLogService.create(userResource.getName(), AuditLog.Type.USER, userResource.getName(), "Updated user details");
        } catch (DataAccessException e) {
            logger.error("Failed to update the user : {}", userResource.getName(), e);
            throw new ServiceException("Failed to update the user : {} " + userResource.getName());
        }
    }

    /**
     * Delete user from the database
     *
     * @param userResource
     * @throws ServiceException
     */
    @Transactional
    public void delete(UserResource userResource) throws ServiceException {
        try {
            User user = userRepository.findById(userResource.getId());
            if (user == null) {
                logger.warn("Failed to find a user {} in the database", userResource.getName());
                throw new ServiceException("Failed to find a user with name " + userResource.getName());

            }

            userRepository.delete(user);

            if (logger.isDebugEnabled()) {
                logger.debug("Successfully Deleted user : {}", user.toString());
            }
            auditLogService.create(userResource.getName(), AuditLog.Type.USER, userResource.getName(), "Deleted user details");
        } catch (DataAccessException e) {
            logger.error("Failed to delete user : {}", userResource.getName(), e);
            throw new ServiceException("Failed to delete the user : {}", userResource.getName());
        }
    }

    /**
     * List all the users in the database that belongs to the tenant
     *
     * @return list of all the users belongs to the tenant
     * @throws ServiceException
     */
    public List<UserResource> list(String tenant) throws ServiceException {
        logger.debug("Fetching user list for tenant :{}", tenant);

        try {
            List<UserResource> userResources = new ArrayList<>();
            userRepository.findAllByTenant_name(tenant).forEach(user ->
                    userResources.add(createResource(user))
            );
            return userResources;
        } catch (DataAccessException e) {
//            logger.error("Failed to fetch roles for tenant {}", tenant, e);
            throw new ServiceException("Failed to fetch roles for tenant ");
        }
    }

    public List<Role> getUserRoles(String username) throws ServiceException {
        try {
            return userRepository.findByName(username).getRoles();
        } catch (DataAccessException e) {
            throw new ServiceException("Error while accessing the roles of the user from the database ");
        }
    }

    /**
     * Create the user resource object from the database object to be sent over rest call
     *
     * @param user
     * @return
     */
    private UserResource createResource(User user) {

        UserResource userResource = new UserResource();
        userResource.setId(user.getId());
        userResource.setName(user.getName());
        userResource.setEmail(user.getEmail());

        userResource.setRoles(
                user.getRoles().stream()
                        .map(Role::getId)
                        .collect(Collectors.toList())
        );

        return userResource;
    }
}
