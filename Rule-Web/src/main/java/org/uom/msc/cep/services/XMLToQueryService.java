package org.uom.msc.cep.services;

import org.uom.msc.cep.exceptions.EServiceException;
import org.uom.msc.cep.resources.CepqueryResource;
//import uom.msc.cse.impl.Parser;

/**
 * @author Amila Paranawithana
 */
public class XMLToQueryService {

    /**
     * Convert the given XML string to Siddhi-SiddhiQL/Esper-EPL/Stream-CQL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     */
    public CepqueryResource convertXmlToQuery(CepqueryResource cepqueryResource) throws EServiceException {

        String xml = cepqueryResource.getXml();
        String queryType = cepqueryResource.getQueryType();
        String query = null;

        try {
            if ("siddhi".equalsIgnoreCase(queryType)) {
//                query = Parser.getSiddiConverter().XMLToSiddhiQL(xml);
            } else if ("esper".equalsIgnoreCase(queryType)) {
//                query = Parser.getEsperConverter().XMLToEPL(xml);
            } else if ("stream".equalsIgnoreCase(queryType)) {

            }
            cepqueryResource.setQuery(query);
        } catch (Exception e) {
            throw new EServiceException("Could not convert the XML to :" + queryType + " query");
        }
        return cepqueryResource;
    }


}
