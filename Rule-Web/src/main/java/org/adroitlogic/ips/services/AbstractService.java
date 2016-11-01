package org.adroitlogic.ips.services;

import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import javax.ws.rs.core.Response;

/**
 * @author Amila Paranawithana
 */
public abstract class AbstractService {

    private Logger logger = LogManager.getLogger(AbstractService.class);

    protected <T> T parseResponse(Response response, Class<T> entityType) throws ServiceException {
        if (response == null) {
            throw new ServiceException("Response object is null");
        }

        if (response.getStatus() >= 200 && response.getStatus() < 300) {
            if (logger.isTraceEnabled()) {
                logger.trace("Received entity : {}", response.getEntity().toString());
            }
            return response.readEntity(entityType);
        }

        return null;
    }

}
