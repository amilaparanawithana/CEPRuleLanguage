package org.adroitlogic.ips.util.annotations;

import org.glassfish.jersey.server.internal.inject.ParamInjectionResolver;

/**
 * @author chathura
 */
public class TenantInjectionResolver extends ParamInjectionResolver {
    /**
     * Initialize the base parameter injection resolver.
     *
     */
    public TenantInjectionResolver() {
        super(TenantFactoryProvider.class);
    }
}
