package org.adroitlogic.ips.rest.controllers.usermanagement;

import org.adroitlogic.ips.rest.controllers.AbstractRestController;
import org.adroitlogic.ips.rest.resources.UserResource;
import org.adroitlogic.ips.services.userManagement.UserService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.adroitlogic.ips.util.annotations.Tenant;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author amila paranawithana
 *         Rest API for User
 */

@Component
@Path("/user")
public class UserController extends AbstractRestController {

    @Autowired
    private UserService userService;

    @GET
    @Path("/{id}/")
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("view_user")
    public Response get(@PathParam("id") int id) {
        try {
            return sendSuccessResponse(userService.get(id));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("create_user")
    public Response create(UserResource userResource,@Tenant String tenant) {
        try {

            userService.create(userResource,tenant);
            return sendCustomSuccessResponse("Successfully created the user");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @PUT
    @Path("/{id}/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("update_user")
    public Response update(UserResource userResource, @PathParam("id") int id) {
        try {
            userService.update(id, userResource);
            return sendCustomSuccessResponse("Successfully updated the user");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @DELETE
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("delete_user")
    public Response delete(UserResource userResource) {
        try {
            userService.delete(userResource);
            return sendCustomSuccessResponse("Successfully deleted the user");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("list_users")
    public Response list(@Tenant String tenant) {
        try {
            return sendSuccessResponse(userService.list(tenant));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

}
