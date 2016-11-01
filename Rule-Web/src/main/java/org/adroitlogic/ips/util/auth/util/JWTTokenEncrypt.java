package org.adroitlogic.ips.util.auth.util;

import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.commons.codec.binary.Base64;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.jasypt.encryption.pbe.StandardPBEStringEncryptor;

import java.nio.charset.Charset;

/**
 * @author Sajith Dilshan
 */
public class JWTTokenEncrypt {

    private static final Logger logger = LogManager.getLogger(JWTTokenEncrypt.class);

    private static final String ENCRYPTION_CIPHER = "PBEWITHSHA256AND128BITAES-CBC-BC";
    private static final Charset UTF8 = Charset.forName("UTF-8");
    private final StandardPBEStringEncryptor AES_ENCRYPTOR = new StandardPBEStringEncryptor();

    JWTTokenEncrypt(String secretKey) {
        AES_ENCRYPTOR.setPassword(secretKey);
        AES_ENCRYPTOR.setAlgorithm(ENCRYPTION_CIPHER);
        AES_ENCRYPTOR.setProvider(new BouncyCastleProvider());
    }

    public String encrypt(String plainText) throws ServiceException {
        try {
            return new String(Base64.encodeBase64(AES_ENCRYPTOR.encrypt(plainText).getBytes(UTF8)), UTF8);
        } catch (Exception e) {
            logger.error("Failed to encrypt the generated JWT token", e);
            throw new ServiceException("Token encryption failed");
        }
    }

    public String decrypt(String cipherText) throws ServiceException {
        try {
            return AES_ENCRYPTOR.decrypt(new String(Base64.decodeBase64(cipherText.getBytes(UTF8)), UTF8));
        } catch (Exception e) {
            logger.error("Failed to decrypt the JWT token", e);
            throw new ServiceException("Token decryption failed");
        }
    }
}
