package org.adroitlogic.ips.rest.controllers.usermanagement;

import org.adroitlogic.ips.rest.controllers.AbstractRestController;
import org.adroitlogic.ips.rest.resources.TenantResource;
import org.adroitlogic.ips.services.userManagement.TenantService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.adroitlogic.ips.util.annotations.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author amila paranawithana
 * @author dimuthu
 *         Rest API for Tenant
 */
@Component
@Path("/tenant")
public class TenantController extends AbstractRestController {

    @Autowired
    private TenantService tenantService;

    @GET
    @Path("/{id}/")
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("view_tenant")
    public Response get(@PathParam("id") int id) {
        try {
            return sendSuccessResponse(tenantService.get(id));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("create_tenant")
    public Response create(TenantResource tenant) {
        try {
            tenantService.create(tenant);
            return sendCustomSuccessResponse("");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @PUT
    @Path("/{id}/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("update_tenant")
    public Response update(TenantResource tenant, @PathParam("id") int id, @User String user) {
        try {
            tenantService.update(id, tenant, user);
            return sendCustomSuccessResponse("");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }


    @DELETE
    @Path("/{name}/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
//    @RequiresPermissions("delete_tenant")
    public Response delete(@PathParam("name") String tenantName, @User String user) {
        try {
            tenantService.deleteTenant(tenantName, user);
            return sendCustomSuccessResponse("Successfully deleted the tenant");
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }
}
