package org.adroitlogic.ips.util.auth.tokens;

import com.nimbusds.jwt.SignedJWT;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.shiro.authc.AuthenticationToken;

import java.text.ParseException;

/**
 * This class will be used as a wrapper for the @link{SignedJWT}, in order to use it as a
 * {@link AuthenticationToken} inside Shiro.
 *
 * @author Chathura Widanage
 */
public class JWTAuthenticationToken implements AuthenticationToken {
    private static final Logger logger = LogManager.getLogger(JWTAuthenticationToken.class);

    //the attribute key which points to the username of the user inside JWT token
    private static final String PARAM_UUID = "sub";
    private SignedJWT signedJWT;

    public JWTAuthenticationToken(SignedJWT jwtObject) {
        this.signedJWT = jwtObject;
    }

    public Object getPrincipal() {
        try {
            return signedJWT.getJWTClaimsSet().toJSONObject().get(PARAM_UUID);
        } catch (ParseException e) {
            logger.error("Error in parsing JWT token to obtain the username. {}", e);
            return null;
        }
    }

    public Object getCredentials() {
        return signedJWT;
    }
}
