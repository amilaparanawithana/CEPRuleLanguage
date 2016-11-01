package org.adroitlogic.ips.util.annotations;

import org.glassfish.hk2.api.InjectionResolver;
import org.glassfish.hk2.api.TypeLiteral;
import org.glassfish.hk2.utilities.binding.AbstractBinder;
import org.glassfish.jersey.server.spi.internal.ValueFactoryProvider;

import javax.inject.Singleton;
import javax.ws.rs.core.Feature;
import javax.ws.rs.core.FeatureContext;
import javax.ws.rs.ext.Provider;

/**
 * Created by chathura on 1/29/16.
 */
@Provider
public class TenantFeature implements Feature {
    @Override
    public boolean configure(FeatureContext context) {
        context.register(new AbstractBinder(){
            @Override
            public void configure() {
                bind(TenantFactory.class).to(TenantFactory.class)
                        .in(Singleton.class);
                bind(TenantFactoryProvider.class)
                        .to(ValueFactoryProvider.class)
                        .in(Singleton.class);
                bind(TenantInjectionResolver.class)
                        .to(new TypeLiteral<InjectionResolver<Tenant>>(){})
                        .in(Singleton.class);
            }
        });
        return true;
    }
}
