package org.adroitlogic.ips.util.annotations;

import org.glassfish.jersey.server.internal.inject.ParamInjectionResolver;

/**
 * @author amila paranawithana
 */
public class UserInjectionResolver extends ParamInjectionResolver {
    /**
     * Initialize the base parameter injection resolver.
     */
    public UserInjectionResolver() {
        super(UserFactoryProvider.class);
    }
}
