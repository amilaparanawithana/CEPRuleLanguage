package org.adroitlogic.ips.rest.controllers.usermanagement;

import org.adroitlogic.ips.rest.controllers.AbstractRestController;
import org.adroitlogic.ips.rest.resources.TenantResource;
import org.adroitlogic.ips.services.userManagement.AuthService;
import org.adroitlogic.ips.services.userManagement.TenantService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.adroitlogic.ips.util.auth.tokens.JsonUsernamePasswordObject;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


/**
 * This will be the end point for a user to log in to the system. Additionally this will create and
 * issue a new JWT token
 *
 * @author chathura
 * @author amila paranawithana
 */
@Component
@Path("/auth")
public class AuthController extends AbstractRestController {

    private final Logger logger = LogManager.getLogger(AuthController.class);

    @Autowired
    private AuthService authService;
    @Autowired
    private TenantService tenantService;


    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response auth(JsonUsernamePasswordObject authJsonToken) {
        try {
            return sendCustomSuccessResponse(authService.login(authJsonToken));
        } catch (ServiceException e) {
            return handleServiceException(400, e);
        }
    }

    /**
     * This will be the end point for unauthorized requests. This end point is configurable from the properties.
     *
     * @return
     */
    @GET
    @Path("/unauthorized")
    @Produces("application/json")
    public Response unauthorized() {
        //todo write descriptive audit
        logger.warn("Unauthorized Entry recorded");
        return sendCustomResponse(401, "Unauthorized");
    }


    @POST
    @Path("/register/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response register(TenantResource tenantResource) {
        try {
            tenantService.create(tenantResource);
            return sendCustomResponse(200, "Tenant created");
        } catch (ServiceException e) {
            return handleServiceException(400, e);
        }
    }
}
