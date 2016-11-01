package org.adroitlogic.ips.services.userManagement;

import com.google.common.collect.Lists;
import org.adroitlogic.ips.beans.db.*;
import org.adroitlogic.ips.repository.*;
import org.adroitlogic.ips.rest.resources.TenantResource;
import org.adroitlogic.ips.services.AuditLogService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.reflections.Reflections;
import org.reflections.scanners.MethodAnnotationsScanner;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import static org.adroitlogic.ips.beans.db.AuditLog.Type.GENERIC;

/**
 * @author Amila Paranawithana
 */
public class TenantService {

    private Logger logger = LogManager.getLogger(TenantService.class);

    @Autowired
    private PermissionRepository permissionRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private TenantRepository tenantRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuditLogService auditLogService;

    private String defaultTenantName;
    private String defaultTenantDomain;
    private String defaultTenantEmail;

    private String superUserGroup;

    /**
     * This method will run at the start-up , scan the method permission annotations
     * and save to the database.
     * Further this method will create a default tenant, SUPER_ROLE and a default
     * LDAP group as well
     */
    public void init() throws ServiceException {

        Reflections reflections = new Reflections(
                new ConfigurationBuilder().setUrls(
                        ClasspathHelper.forPackage("org.adroitlogic.ips")).setScanners(
                        new MethodAnnotationsScanner()));
        Set<Method> methods = reflections.getMethodsAnnotatedWith(RequiresPermissions.class);

        //TODO This bootstrap code should be moved to somewhere else. Suggestion: Create a new service named BootstrapService. Or find a better way which spring supports for bootstrapping.
        for (Method method : methods) {
            String permissionName = method.getAnnotation(RequiresPermissions.class).value()[0];
            Permission.Category category = Permission.Category.GENERIC;
            String className = method.getDeclaringClass().getName();
            if (className.contains("Audit")) {
                category = Permission.Category.AUDIT_LOG;
            } else if (className.contains("Cluster")) {
                category = Permission.Category.CLUSTER;
            } else if (className.contains("Permission")) {
                category = Permission.Category.PERMISSION;
            } else if (className.contains("Role")) {
                category = Permission.Category.ROLE;
            } else if (className.contains("Tenant")) {
                category = Permission.Category.TENANT;
            }

            try {
                if (permissionRepository.findByName(permissionName) == null) {
                    Permission permission = new Permission();
                    permission.setName(permissionName);
                    permission.setCategory(category);
                    permissionRepository.save(permission);
                    auditLogService.create("SYSTEM", GENERIC, permission.getName(), "Added permission to database");
                    logger.debug("Saved Permission : {}  of type : {} to database", permission.getName(),
                            permission.getCategory());
                }
            } catch (DataAccessException e) {
                logger.error("Error while adding permission : {} to the database", permissionName, e);
                throw new ServiceException("Failed to add permission : {} to database", permissionName);
            }
        }

        try {
            Tenant defaultTenant = tenantRepository.findByName(defaultTenantName);
            if (defaultTenant == null) {
                defaultTenant = new Tenant();
                defaultTenant.setName(defaultTenantName);
                defaultTenant.setDomain(defaultTenantDomain);
                defaultTenant.setEmail(defaultTenantEmail);
                tenantRepository.save(defaultTenant);

                logger.debug("Successfully added default tenant : {} ", defaultTenantName);
                auditLogService.create("SYSTEM", GENERIC, defaultTenantName, "Added new tenant ");
            }

            // creating the super role
            Role superRole = roleRepository.findByName("ROLE_SUPER");
            if (superRole == null) {
                superRole = new Role();
                superRole.setName("ROLE_SUPER");
                superRole.setTenant(defaultTenant);
                superRole.setPermissions(Lists.newArrayList(permissionRepository.findAll()));
                roleRepository.save(superRole);

                logger.debug("Successfully added SUPER_ROLE");
                auditLogService.create("SYSTEM", GENERIC, "SUPER_ROLE", "Added new SUPER_ROLE");
            }


        } catch (DataAccessException e) {
            logger.error("Failed to bootstrap the application", e);
            throw new ServiceException("Failed to bootstrap the application");
        }

        logger.info("Successfully bootstrapped the application");
    }

    /**
     * Create a new tenant with given details
     *
     * @param tenantResource {@link TenantResource} containing user inputs
     * @throws ServiceException if fails to create the new tenant
     */
    @Transactional
    public void create(TenantResource tenantResource) throws ServiceException {
        try {
            if (tenantRepository.findByName(tenantResource.getName()) != null) {
                logger.warn("Tenant with name {} already exists", tenantResource.getName());
                throw new ServiceException("Tenant with name " + tenantResource.getName() + " already exists");
            }

            Tenant tenant = new Tenant();
            tenant.setDomain(tenantResource.getDomain());
            tenant.setEmail(tenantResource.getEmail());
            tenant.setName(tenantResource.getName());

            // creating tenant admin
            User admin = new User();
            admin.setName(tenantResource.getAdmin().getName());
            admin.setEmail(tenantResource.getAdmin().getEmail());
            admin.setPassword(tenantResource.getAdmin().getPassword());
            admin.setTenant(tenant);

            String tenantAdminRoleName = "ROLE_ADMIN_" + tenantResource.getName();
            Role tenantAdminRole = roleRepository.findByName(tenantAdminRoleName);
            if (tenantAdminRole == null) {
                tenantAdminRole = new Role();
                tenantAdminRole.setName(tenantAdminRoleName);
                tenantAdminRole.setTenant(tenant);
                tenantAdminRole.setPermissions(Lists.newArrayList(permissionRepository.findAll()));
                roleRepository.save(tenantAdminRole);
            }

            List<Role> adminRoles = new ArrayList<>();
            adminRoles.add(tenantAdminRole);
            admin.setRoles(adminRoles);

          /*  String packageName = tenantResource.getPackageName();
            if (packageName == null) {
                if (!packageService.hasDefaultPackage()) {
                    packageService.createDefaultPackage();
                }
                tenant.setServicePackage(packageService.getDefaultPackage());

            } else {
                ServicePackage servicePackage = packageService.findPackageByName(packageName);
                if (servicePackage == null) {
                    logger.warn("Package {} does not exist", packageName);
                    throw new ServiceException("Package " + packageName + "does not exist");
                }
                tenant.setServicePackage(servicePackage);
            }*/

            userRepository.save(admin);
            tenantRepository.save(tenant);

            if (logger.isDebugEnabled()) {
                logger.debug("Successfully created tenant :{}", tenant.toString());
            }
            auditLogService.create("USER", AuditLog.Type.TENANT, tenantResource.getName(), "Created a new tenant");
        } catch (DataAccessException e) {
            logger.error("Failed to create the tenant {}", tenantResource.getName(), e);
            throw new ServiceException("Failed to create a tenant with name " + tenantResource.getName());
        }
    }

    /**
     * This method update the existing tenant
     *
     * @param tenantId       ID of the tenant
     * @param tenantResource {@link TenantResource} containing new details
     * @param user           name of the user
     * @throws ServiceException if fails to update the tenant
     */
    @Transactional
    public void update(int tenantId, TenantResource tenantResource, String user) throws ServiceException {
        try {
            Tenant tenant = tenantRepository.findById(tenantId);
            if (tenant == null) {
                throw new ServiceException("Failed to find a tenant with ID : " + tenantId);
            }

            tenant.setEmail(tenantResource.getEmail());
            tenant.setDomain(tenantResource.getDomain());

           /* String packageName = tenantResource.getPackageName();
            ServicePackage servicePackage = packageService.findPackageByName(packageName);
            if (servicePackage != null) {
                tenant.setServicePackage(servicePackage);
            }*/

            tenantRepository.save(tenant);

            if (logger.isDebugEnabled()) {
                logger.debug("Successfully updated tenant : {}", tenant.toString());
            }
            auditLogService.create(user, AuditLog.Type.TENANT, tenantResource.getName(), "Updated tenant details");
        } catch (DataAccessException e) {
            logger.error("Failed to update the tenant : {}", tenantResource.getName(), e);
            throw new ServiceException("Failed to update the tenant : {} " + tenantResource.getName());
        }
    }

    /**
     * Delete the given tenant
     *
     * @param tenantName name of the tenant
     * @param user       name of the user
     * @throws ServiceException if fails to delete the tenant
     */
    @Transactional
    public void deleteTenant(String tenantName, String user) throws ServiceException {
        try {
            Tenant tenant = tenantRepository.findByName(tenantName);
            if (tenant == null) {
                logger.warn("Failed to find a tenant {} in the database", tenantName);
                throw new ServiceException("Failed to find a tenant with name " + tenantName);

            }

            tenantRepository.deleteByName(tenantName);

            if (logger.isDebugEnabled()) {
                logger.debug("Successfully Deleted tenant : {}", tenant.toString());
            }
            auditLogService.create(user, AuditLog.Type.TENANT, tenantName, "Deleted tenant details");
        } catch (DataAccessException e) {
            logger.error("Failed to delete tenant : {}", tenantName, e);
            throw new ServiceException("Failed to delete the tenant : {}", tenantName);
        }
    }

    /**
     * Returns the tenant with the given ID
     *
     * @param tenantId ID of the tenant
     * @return instance of {@link TenantResource}
     * @throws ServiceException if fails to get the tenant
     */
    public TenantResource get(int tenantId) throws ServiceException {
        try {
            Tenant tenant = tenantRepository.findOne(tenantId);
            return createResource(tenant);
        } catch (DataAccessException e) {
            logger.error("Failed to fetch the tenant with id : {}", tenantId, e);
            throw new ServiceException("Failed to fetch the tenant with id : " + tenantId);
        }
    }

    public Tenant getTenantByName(String name) {
        return tenantRepository.findByName(name);
    }

    @SuppressWarnings("unused")
    public String getDefaultTenantName() {
        return defaultTenantName;
    }

    public void setDefaultTenantName(String defaultTenantName) {
        this.defaultTenantName = defaultTenantName;
    }

    @SuppressWarnings("unused")
    public String getDefaultTenantDomain() {
        return defaultTenantDomain;
    }

    public void setDefaultTenantDomain(String defaultTenantDomain) {
        this.defaultTenantDomain = defaultTenantDomain;
    }

    @SuppressWarnings("unused")
    public String getDefaultTenantEmail() {
        return defaultTenantEmail;
    }

    public void setDefaultTenantEmail(String defaultTenantEmail) {
        this.defaultTenantEmail = defaultTenantEmail;
    }

    @SuppressWarnings("unused")
    public String getSuperUserGroup() {
        return superUserGroup;
    }

    public void setSuperUserGroup(String superUserGroup) {
        this.superUserGroup = superUserGroup;
    }

    private TenantResource createResource(Tenant tenant) {
        TenantResource tenantResource = new TenantResource();
        tenantResource.setId(tenant.getId());
        tenantResource.setName(tenant.getName());
        tenantResource.setDomain(tenant.getDomain());
        tenantResource.setEmail(tenant.getEmail());
//        tenantResource.setPackageName(tenant.getServicePackage().getName());

        return tenantResource;
    }
}
