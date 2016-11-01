package org.adroitlogic.ips.util.auth.tokens;

import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import org.adroitlogic.ips.services.userManagement.PermissionService;
import org.adroitlogic.ips.util.auth.constant.KeyRepositoryConst;
import org.springframework.beans.factory.annotation.Autowired;

import java.text.ParseException;
import java.util.Date;
import java.util.Set;

/**
 * This class will be used to generate and validate tokens.
 *
 * @author Chathura Widanage
 */
public class JWTTokenManager {
    public static final String JWT_CLAIM_PERMISSIONS = "permissions";

    private String issuer;
    private long lifeTime;
    @Autowired
    private KeyRepositoryConst keyRepository;
    @Autowired
    private PermissionService permissionService;

    /**
     * @param sub Subject to whom the token should be issued.
     * @return generated JWT Token
     */
    public String generateToken(String sub) throws JOSEException {
        JWSSigner jwsSigner = new MACSigner(keyRepository.SHARED_KEY);
        final Set<String> permissions = permissionService.getPermissions(sub);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(sub)
                .claim(JWT_CLAIM_PERMISSIONS, permissions)
                .issuer(issuer)
                .expirationTime(new Date(new Date().getTime() + lifeTime))
                .build();

        SignedJWT signedJWT = new SignedJWT(new JWSHeader(JWSAlgorithm.HS256), claimsSet);
        signedJWT.sign(jwsSigner);
        return signedJWT.serialize();
    }

    /**
     * This will verify the token sent with the request.
     *
     * @return true if verification is successful, false otherwise
     */
    public boolean verify(SignedJWT signedJWT) throws ParseException, JOSEException {
        JWSVerifier verifier = new MACVerifier(keyRepository.SHARED_KEY);
        return signedJWT.verify(verifier);
    }

    /**
     * Parse a string to generate a SignedJWT
     *
     * @param authHeader decrypted authentication header
     * @return signed JWT token
     * @throws ParseException if fails to parse the token
     */
    public SignedJWT parse(String authHeader) throws ParseException {
        return SignedJWT.parse(authHeader);
    }

    @SuppressWarnings("unused")
    public String getIssuer() {
        return issuer;
    }

    public void setIssuer(String issuer) {
        this.issuer = issuer;
    }

    @SuppressWarnings("unused")
    public long getLifeTime() {
        return lifeTime;
    }

    public void setLifeTime(long lifeTime) {
        this.lifeTime = lifeTime;
    }

}
