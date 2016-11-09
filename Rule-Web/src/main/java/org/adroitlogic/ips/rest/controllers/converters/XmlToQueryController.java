package org.adroitlogic.ips.rest.controllers.converters;

import org.adroitlogic.ips.rest.controllers.AbstractRestController;
import org.adroitlogic.ips.rest.resources.CepqueryResource;
import org.adroitlogic.ips.services.converters.XMLToQueryService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author Amila Paranawithana
 */
@Component
@Path("/xmltoquery")
public class XmlToQueryController extends AbstractRestController {

    @Autowired
    private XMLToQueryService xmlToQueryService;

    @POST
    @Path("/")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response convertXmlToQuery(CepqueryResource cepqueryResource) {
        try {
            return sendSuccessResponse(xmlToQueryService.convertXmlToQuery(cepqueryResource));
        } catch (ServiceException e) {
            return handleServiceException(e);
        }
    }
}
