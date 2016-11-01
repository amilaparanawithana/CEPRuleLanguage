package org.adroitlogic.ips.util.annotations;

import org.glassfish.hk2.api.Factory;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.internal.inject.AbstractValueFactoryProvider;
import org.glassfish.jersey.server.internal.inject.MultivaluedParameterExtractorProvider;
import org.glassfish.jersey.server.model.Parameter;

import javax.inject.Inject;

/**
 * @author amila paranawithana
 */
public class UserFactoryProvider extends AbstractValueFactoryProvider {

    private final UserFactory userFactory;

    @Inject
    public UserFactoryProvider(
        final MultivaluedParameterExtractorProvider extractorProvider,
        ServiceLocator locator,
        UserFactory userFactory) {

        super(extractorProvider, locator, Parameter.Source.UNKNOWN);
        this.userFactory = userFactory;
    }

    @Override
    protected Factory<?> createValueFactory(Parameter parameter) {
        Class<?> paramType = parameter.getRawType();
        User annotation = parameter.getAnnotation(User.class);
        if (annotation != null && paramType.isAssignableFrom(String.class)) {
            return userFactory;
        }
        return null;
    }

}
