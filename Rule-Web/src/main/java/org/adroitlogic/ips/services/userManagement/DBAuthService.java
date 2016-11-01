package org.adroitlogic.ips.services.userManagement;

import org.adroitlogic.ips.beans.db.User;
import org.adroitlogic.ips.repository.UserRepository;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import javax.naming.AuthenticationException;

/**
 * This class will be used to authenticate users based on DB.
 *
 * @author Amila Paranawithana
 */
public class DBAuthService {

    private static final Logger logger = LogManager.getLogger(DBAuthService.class);
    @Autowired
    private UserRepository userRepository;


    /**
     * Attempt to authenticate the user.
     *
     * @param username name of the user
     * @param password password of the user
     * @throws AuthenticationException if authentication fails.
     */
    public void authenticate(String username, String password) throws AuthenticationException {

        logger.debug("Attempting DB logging for user : {}", username);
        boolean authenticated;

        User user = userRepository.findByName(username);
        if (user != null) {
            authenticated = password.equals(user.getPassword());
        } else {
            throw new AuthenticationException("User not found");
        }

        if (!authenticated) {
            throw new AuthenticationException("User not found");
        }

        logger.trace("DB login successful for user {}", username);
    }

}
