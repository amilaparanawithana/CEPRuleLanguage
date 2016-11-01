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
 * @author amila paranawithana
 */
@Provider
public class UserFeature implements Feature {
    @Override
    public boolean configure(FeatureContext context) {
        context.register(new AbstractBinder() {
            @Override
            public void configure() {
                bind(UserFactory.class).to(UserFactory.class)
                    .in(Singleton.class);
                bind(UserFactoryProvider.class)
                    .to(ValueFactoryProvider.class)
                    .in(Singleton.class);
                bind(UserInjectionResolver.class)
                    .to(new TypeLiteral<InjectionResolver<User>>() {
                    })
                    .in(Singleton.class);
            }
        });
        return true;
    }
}
