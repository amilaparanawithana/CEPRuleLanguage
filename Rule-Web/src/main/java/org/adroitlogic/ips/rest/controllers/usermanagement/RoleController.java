package org.adroitlogic.ips.rest.controllers.usermanagement;

import org.adroitlogic.ips.rest.controllers.AbstractRestController;
import org.adroitlogic.ips.rest.resources.RoleResource;
import org.adroitlogic.ips.services.userManagement.RoleService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.adroitlogic.ips.util.annotations.Tenant;
import org.adroitlogic.ips.util.annotations.User;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Amila Paranawithana
 *         Role resource
 */
@Component
@Path("/role")
public class RoleController extends AbstractRestController {

    @Autowired
    private RoleService roleService;

    @GET
    @Path("/{id}/")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("view_role")
    public Response get(@PathParam("id") int id) {
        try {
            return sendSuccessResponse(roleService.get(id));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("list_roles")
    public Response list(@Tenant String tenant) {
        try {
            return sendSuccessResponse(roleService.list(tenant));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("create_role")
    public Response create(RoleResource roleResource, @Tenant String tenant, @User String user) {
        try {
            roleService.create(roleResource, tenant, user);
            return sendCustomSuccessResponse("");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @PUT
    @Path("/{id}/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("update_role")
    public Response update(RoleResource roleResource, @PathParam("id") int id, @User String user) {
        try {
            roleService.update(roleResource, id, user);
            return sendCustomSuccessResponse("");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @DELETE
    @Path("/{id}/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("delete_role")
    public Response delete(@PathParam("id") int id, @User String user) {
        try {
            roleService.delete(id, user);
            return sendCustomSuccessResponse("Role deleted successfully");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }
}
