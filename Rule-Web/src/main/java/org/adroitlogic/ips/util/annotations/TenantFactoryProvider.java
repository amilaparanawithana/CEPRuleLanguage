package org.adroitlogic.ips.util.annotations;

import org.glassfish.hk2.api.Factory;
import org.glassfish.hk2.api.ServiceLocator;
import org.glassfish.jersey.server.internal.inject.AbstractValueFactoryProvider;
import org.glassfish.jersey.server.internal.inject.MultivaluedParameterExtractorProvider;
import org.glassfish.jersey.server.model.Parameter;

import javax.inject.Inject;

/**
 * @author chathura
 */
public class TenantFactoryProvider extends AbstractValueFactoryProvider {

    private final TenantFactory tenantFactory;

    @Inject
    public TenantFactoryProvider(
            final MultivaluedParameterExtractorProvider extractorProvider,
            ServiceLocator locator,
            TenantFactory tenantFactory) {

        super(extractorProvider, locator, Parameter.Source.UNKNOWN);
        this.tenantFactory = tenantFactory;
    }
    @Override
    protected Factory<?> createValueFactory(Parameter parameter) {
        Class<?> paramType = parameter.getRawType();
        Tenant annotation = parameter.getAnnotation(Tenant.class);
        if (annotation != null && paramType.isAssignableFrom(String.class)) {
            return tenantFactory;
        }
        return null;
    }
}
