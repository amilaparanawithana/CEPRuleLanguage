package org.adroitlogic.ips.rest.exceptions;

import org.adroitlogic.ips.beans.db.AuditLog;
import org.adroitlogic.ips.rest.resources.CustomMessageResource;
import org.adroitlogic.ips.services.AuditLogService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authz.AuthorizationException;
import org.glassfish.jersey.spi.ExtendedExceptionMapper;
import org.springframework.beans.factory.annotation.Autowired;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.Provider;
import java.math.BigInteger;
import java.security.SecureRandom;

/**
 * This class will handel application wide un handled exceptions.
 *
 * @author chathura widanage
 */
@Provider
public class ExceptionMapper implements ExtendedExceptionMapper<Exception> {

    private static final Logger logger = LogManager.getLogger(ExceptionMapper.class);
    private static final SecureRandom random = new SecureRandom();

    @Autowired
    private AuditLogService auditLogService;

    @Override
    public boolean isMappable(Exception exception) {
        return true;
    }

    @Override
    public Response toResponse(Exception ex) {
        if (ex instanceof AuthorizationException) {
            String username;
            try {
                username = SecurityUtils.getSubject().getPrincipal().toString();
            } catch (Exception nex) {//catching possible null pointer ex
                username = "guest";
            }

            auditLogService.create(username, AuditLog.Type.USER, ex.getMessage(), "Unauthorized access request");
            logger.debug("Unauthorized access attempt by {}", username, ex);

            return Response.status(401)
                    .entity(new CustomMessageResource("You do not have permission to view this page. This action will be reported."))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        } else {
            final String errorId = new BigInteger(32, random).toString(32).toUpperCase();
            logger.error("ER ID: {} - Internal server error occurred", errorId, ex);
            return Response.status(500)
                    .entity(new CustomMessageResource("ER ID: " + errorId + " - Internal server error occurred. Please contact your system administrator"))
                    .type(MediaType.APPLICATION_JSON_TYPE)
                    .build();
        }
    }
}
