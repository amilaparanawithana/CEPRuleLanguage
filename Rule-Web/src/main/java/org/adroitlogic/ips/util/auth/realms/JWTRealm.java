package org.adroitlogic.ips.util.auth.realms;

import org.adroitlogic.ips.services.userManagement.DBAuthService;
import org.adroitlogic.ips.services.userManagement.PermissionService;
import org.adroitlogic.ips.util.auth.tokens.JWTAuthenticationToken;
import org.adroitlogic.ips.util.auth.tokens.JsonUsernamePasswordObject;
import org.adroitlogic.ips.util.auth.util.AuthDataContainer;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.authc.*;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Set;

/**
 * @author Chathura Widanage
 */
public class JWTRealm extends AuthorizingRealm {

    private static final Logger logger = LogManager.getLogger(JWTRealm.class);

    @Autowired
    private PermissionService permissionService;
    @Autowired
    private DBAuthService dbAuthService;

    @Override
    public boolean supports(AuthenticationToken token) {
        return token != null && (token instanceof JWTAuthenticationToken || token instanceof JsonUsernamePasswordObject || token instanceof UsernamePasswordToken);
    }

    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {
        String username = principals.getPrimaryPrincipal().toString();//get the current user
        Set<String> permissions = AuthDataContainer.getPermissions();//Query for the permission set of user
        logger.debug("Permissions list size for user {} is  {}", username, permissions.size());
        SimpleAuthorizationInfo simpleAuthorizationInfo = new SimpleAuthorizationInfo();
        simpleAuthorizationInfo.addStringPermissions(permissions);
        return simpleAuthorizationInfo;
    }

    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {
        //ldapAuthService.getGroups();
        if (token instanceof UsernamePasswordToken) {//if true, this is the first request (Authentication request)
            logger.trace("Received an UsernamePassword Authentication request");
            UsernamePasswordToken usernamePasswordToken = (UsernamePasswordToken) token;

            try {
                String username = usernamePasswordToken.getUsername();
                String password = new String(usernamePasswordToken.getPassword());

                logger.debug("Just before auth attempt {}", username);
                dbAuthService.authenticate(username, password);
                logger.debug("Successfully logged in user : {}", username);

                return new SimpleAuthenticationInfo(username, password, getName());

            } catch (Exception e) {
                logger.error("Failed to authenticate the request", e);
                return null;
            }
        } else if (token instanceof JWTAuthenticationToken) {//User has a JWT installed in the browser
            logger.trace("JWT token authentication request received {}", token.getPrincipal());
            return new SimpleAuthenticationInfo(token.getPrincipal(), token.getCredentials(), getName());//do a forced login
        }
        return null;
    }

}
