package org.adroitlogic.ips.util.certificate;

import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.Logger;

import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.security.KeyStore;

/**
 * @author dimuthu
 */
public class TrustUtil {

    public static TrustManager[] loadTrustManagers(Logger logger,
                                                   String trustStorePath, String trustStoreType, 
                                                   String trustStorePassword) throws ServiceException {

//        logger.debug("Loading trust keystore from : {}", trustStorePath);

        InputStream is = null;
        try {
            KeyStore trustStore = KeyStore.getInstance(trustStoreType);
            try {
                is = new FileInputStream(trustStorePath);
            } catch (FileNotFoundException ignore) {
                is = Thread.currentThread().getContextClassLoader().getResourceAsStream(trustStorePath);
            }

            trustStore.load(is, trustStorePassword.toCharArray());
            TrustManagerFactory trustManagerfactory = TrustManagerFactory.getInstance(
                TrustManagerFactory.getDefaultAlgorithm());
            trustManagerfactory.init(trustStore);

//            logger.info("Trust keystore loaded from : {}", trustStorePath);
            return trustManagerfactory.getTrustManagers();

        } catch (GeneralSecurityException gse) {
            logger.error("Error loading Key store : " + trustStorePath, gse);
            throw new ServiceException("Error loading Key store : " + trustStorePath, gse);
        } catch (IOException ioe) {
            logger.error("Error opening Key store : " + trustStorePath, ioe);
            throw new ServiceException("Error opening Key store : " + trustStorePath, ioe);
        } finally {
            if (is != null) {
                try {
                    is.close();
                } catch (IOException ignore) {
                }
            }
        }
    }
    
}
