package org.adroitlogic.ips.util.annotations;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.glassfish.jersey.server.internal.inject.AbstractContainerRequestValueFactory;

/**
 * @author chathura
 */
public class UserFactory extends AbstractContainerRequestValueFactory<String> {
    @Override
    public String provide() {
        //parse jwt and get tenant
        String user = "guest";
        Subject subject=SecurityUtils.getSubject();
        if (subject.isAuthenticated()) {
            user = subject.getPrincipal().toString();
        }
        //throw new WebApplicationException();//on error
        return user;
    }
}
