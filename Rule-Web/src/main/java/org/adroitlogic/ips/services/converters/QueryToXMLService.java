package org.adroitlogic.ips.services.converters;

import org.adroitlogic.ips.rest.resources.CepqueryResource;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import uom.msc.cse.impl.Parser;

/**
 * @author Amila Paranawithana
 */
public class QueryToXMLService {

    private Logger logger = LogManager.getLogger(QueryToXMLService.class);

    /**
     * Convert the given XML string to Siddhi-SiddhiQL/Esper-EPL/Stream-CQL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     * @throws ServiceException
     */
    public CepqueryResource convertQueryToXML(CepqueryResource cepqueryResource) throws ServiceException {

        String xml = cepqueryResource.getQuery();
        String queryType = cepqueryResource.getQueryType();

        try {
            if ("siddhi".equalsIgnoreCase(queryType)) {
                xml = Parser.getSiddiConverter().SiddhiQLToXML(cepqueryResource.getQuery());
                logger.info("Converted the SiddhiQL query to XML");
            } else if ("esper".equalsIgnoreCase(queryType)) {
                logger.info("Converted the EPL query to XML");
            } else if ("stream".equalsIgnoreCase(queryType)) {

            }
            cepqueryResource.setXml(xml);
        } catch (Exception e) {
            throw new ServiceException("Could not convert the XML to :" + queryType + " query");
        }
        return cepqueryResource;
    }


}
