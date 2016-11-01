package org.adroitlogic.ips.rest.controllers;

import org.adroitlogic.ips.rest.resources.CustomMessageResource;
import org.adroitlogic.ips.services.exception.ServiceException;

import javax.ws.rs.core.Response;

/**
 * @author amila paranawithana
 *         Common methods of rest controller classes
 */
public abstract class AbstractRestController {

    public Response sendCustomSuccessResponse(String message) {
        return Response.status(200).entity(new CustomMessageResource(message)).build();
    }

    public Response sendSuccessResponse(Object obj) {
        return Response.status(200).entity(obj).build();
    }

    public Response sendCustomResponse(int responseCode, String message) {
        return Response.status(responseCode).entity(new CustomMessageResource(message)).build();
    }

    public Response handleServiceException(ServiceException se) {
        return Response.status(500).entity(new CustomMessageResource(se.getMessage())).build();
    }

    public Response handleServiceException(int responseCode, ServiceException se) {
        return Response.status(responseCode).entity(new CustomMessageResource(se.getMessage())).build();
    }
}
