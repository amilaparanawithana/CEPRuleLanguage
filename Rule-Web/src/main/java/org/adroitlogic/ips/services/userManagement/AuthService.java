package org.adroitlogic.ips.services.userManagement;

import com.nimbusds.jose.JOSEException;
import org.adroitlogic.ips.beans.db.AuditLog;
import org.adroitlogic.ips.services.AuditLogService;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.adroitlogic.ips.util.auth.tokens.JWTTokenManager;
import org.adroitlogic.ips.util.auth.tokens.JsonUsernamePasswordObject;
import org.adroitlogic.ips.util.auth.util.JWTTokenEncrypt;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * Utility methods implementation for authentication and authorization
 *
 * @author Amila Paranawithana
 */
public class AuthService {

    private final Logger logger = LogManager.getLogger(AuthService.class);

    @Autowired
    private JWTTokenManager jwtTokenManager;
    @Autowired
    private AuditLogService auditLogService;
    @Autowired
    private JWTTokenEncrypt jwtTokenEncrypt;
    @Autowired
    private AbstractCachingService abstractCachingService;

    /**
     * Will attempt to authenticate a user
     *
     * @param authJsonToken Object that wraps the username and password provided by the user
     * @return Generated JWT Token String
     * @throws ServiceException if fails to authenticate the user
     */
    public String login(JsonUsernamePasswordObject authJsonToken) throws ServiceException {
        UsernamePasswordToken usernamePasswordToken = new UsernamePasswordToken(authJsonToken.getUsername(),
                authJsonToken.getPassword());
        Subject subject = SecurityUtils.getSubject();

        try {
            subject.login(usernamePasswordToken); // Attempt to login. This will call the JWTRealm
            //login successful -> generate and send the token
            logger.debug("{} authenticated successfully.", authJsonToken.getUsername());
            auditLogService.create(authJsonToken.getUsername(),
                    AuditLog.Type.USER, authJsonToken.getUsername(), "Successfully authenticated.");

            final String generatedToken = jwtTokenManager.generateToken(usernamePasswordToken.getUsername());
            final String encryptedToken = jwtTokenEncrypt.encrypt(generatedToken);
            abstractCachingService.addToCache(authJsonToken.getUsername(), encryptedToken);
            return encryptedToken;
        } catch (AuthenticationException authEx) {
            logger.warn("Failed to authenticate user {} due to invalid credentials.", authJsonToken.getUsername(), authEx);
            auditLogService.create(authJsonToken.getUsername(),
                    AuditLog.Type.USER, authJsonToken.getUsername(), "Invalid login credentials");

            throw new ServiceException("Invalid login credentials");
        } catch (JOSEException joseEx) {
            logger.error("Failed to user {} due to failure in creating JWT token.", authJsonToken.getUsername(), joseEx);
            auditLogService.create(authJsonToken.getUsername(),
                    AuditLog.Type.USER, authJsonToken.getUsername(), "Failed to authenticate due to an internal server error.");

            throw new ServiceException("Failed to create user token");
        }
    }
}
