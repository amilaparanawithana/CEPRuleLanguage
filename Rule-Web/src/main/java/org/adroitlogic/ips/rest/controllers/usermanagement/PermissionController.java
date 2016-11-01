package org.adroitlogic.ips.rest.controllers.usermanagement;

import org.adroitlogic.ips.rest.controllers.AbstractRestController;
import org.adroitlogic.ips.services.userManagement.PermissionService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Amila Paranawithana
 *         Rest api for permission
 */
@Component
@Path("/permission")
public class PermissionController extends AbstractRestController {

    @Autowired
    private PermissionService permissionService;

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("list_permissions")
    public Response list() {
        try {
            return sendSuccessResponse(permissionService.getAll());
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @GET
    @Path("/{role}")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("list_permissions_by_role")
    public Response listByRole(@PathParam("role") int roleId) {
        try {
            return sendSuccessResponse(permissionService.getAllByRole(roleId));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

}
