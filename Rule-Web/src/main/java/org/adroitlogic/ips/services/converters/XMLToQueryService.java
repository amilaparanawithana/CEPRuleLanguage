package org.adroitlogic.ips.services.converters;

import org.adroitlogic.ips.rest.resources.CepqueryResource;
import org.adroitlogic.ips.services.exception.ServiceException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import uom.msc.cse.impl.Parser;

/**
 * @author Amila Paranawithana
 */
public class XMLToQueryService {

    private Logger logger = LogManager.getLogger(XMLToQueryService.class);

    /**
     * Convert the given XML string to Siddhi-SiddhiQL/Esper-EPL/Stream-CQL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     * @throws ServiceException
     */
    public CepqueryResource convertXmlToQuery(CepqueryResource cepqueryResource) throws ServiceException {

        String xml = cepqueryResource.getXml();
        String queryType = cepqueryResource.getQueryType();
        String query = null;

        try {
            if ("siddhi".equalsIgnoreCase(queryType)) {
                query = Parser.getSiddiConverter().XMLToSiddhiQL(xml);
                logger.info("Converted the XML to SiddhiQL");
            } else if ("esper".equalsIgnoreCase(queryType)) {
                query = Parser.getEsperConverter().XMLToEsper(xml);
                logger.info("Converted the XML to EPL");
            } else if ("stream".equalsIgnoreCase(queryType)) {

            }
            cepqueryResource.setQuery(query);
        } catch (Exception e) {
            throw new ServiceException("Could not convert the XML to :" + queryType + " query");
        }
        return cepqueryResource;
    }


}
