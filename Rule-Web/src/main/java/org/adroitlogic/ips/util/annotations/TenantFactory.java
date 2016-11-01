package org.adroitlogic.ips.util.annotations;

import org.adroitlogic.ips.repository.UserRepository;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.glassfish.jersey.server.internal.inject.AbstractContainerRequestValueFactory;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * @author chathura
 * @author amila paranawithana
 */
public class TenantFactory extends AbstractContainerRequestValueFactory<String> {

    @Autowired
    private UserRepository userRepository;

    @Override
    public String provide() {
        String tenant = "adroitlogic";//todo implementation

        Subject subject= SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            String user = subject.getPrincipal().toString();
            tenant = userRepository.findByName(user).getTenant().getName();
        }
        return tenant;
    }
}
