package org.adroitlogic.ips.util.auth.constant;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

/**
 * @author Chathura Widanage
 */
public class KeyRepositoryConst {

    public final byte[] SHARED_KEY;

    public KeyRepositoryConst(String secretKey) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(secretKey.getBytes(StandardCharsets.UTF_8));
        SHARED_KEY = Arrays.copyOf(hash, 32);
    }

}
