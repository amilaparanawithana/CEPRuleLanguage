package org.adroitlogic.ips.services.converters;

import org.adroitlogic.ips.rest.resources.CepqueryResource;
import org.adroitlogic.ips.services.exception.ServiceException;
import uom.msc.cse.impl.Parser;

/**
 * @author Amila Paranawithana
 */
public class XMLToQueryService {


    public CepqueryResource convertXmlToQuery(CepqueryResource cepqueryResource) throws ServiceException {

        String xml = cepqueryResource.getXml();
        String queryType = cepqueryResource.getQueryType();
        String query = null;

        try {
            if ("siddhi".equalsIgnoreCase(queryType)) {
                query = Parser.getSiddiConverter().XMLToSiddhiQL(xml);
                System.out.println("this is the query");
                System.out.println(query);
            } else if ("esper".equalsIgnoreCase(queryType)) {

            } else if ("stream".equalsIgnoreCase(queryType)) {

            }
            cepqueryResource.setQuery(query);
        } catch (Exception e){
            throw new ServiceException("Could not convert the XML to :" + queryType + " query");
        }
        return cepqueryResource;
    }


}
