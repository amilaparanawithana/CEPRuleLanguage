package org.adroitlogic.ips.rest.controllers;

import org.adroitlogic.ips.services.AuditLogService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author amila paranawithana
 *         AuditLog resource
 */
@Component
@Path("/auditlog")
public class AuditLogController extends AbstractRestController {

    @Autowired
    private AuditLogService auditLogService;

    @GET
    @Path("/")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("list_audit_logs")
    public Response list(@QueryParam("limit") int limit, @QueryParam("page") int page, @QueryParam("key") String key,
                         @QueryParam("sorter") int column, @QueryParam(("asc")) Boolean asc) {
        try {
            return sendSuccessResponse(auditLogService.list(limit, page, key, column, asc));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

    @GET
    @Path("/{type}/")
    @Produces(MediaType.APPLICATION_JSON)
    @RequiresPermissions("filter_audit_logs")
    public Response listByType(@PathParam("type") String type) {
        try {
            return sendSuccessResponse(auditLogService.listByType(type));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }

}
