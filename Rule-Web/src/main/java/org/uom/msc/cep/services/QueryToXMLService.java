package org.uom.msc.cep.services;

import org.springframework.stereotype.Component;
import org.uom.msc.cep.exceptions.EServiceException;
import org.uom.msc.cep.resources.CepqueryResource;
//import uom.msc.cse.impl.Parser;

/**
 * @author Amila Paranawithana
 */
@Component
public class QueryToXMLService {


    /**
     * Convert the given XML string to Siddhi-SiddhiQL/Esper-EPL/Stream-CQL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     */
    public CepqueryResource convertQueryToXML(CepqueryResource cepqueryResource) throws EServiceException {

        String xml = cepqueryResource.getQuery();
        String queryType = cepqueryResource.getQueryType();

        try {
            if ("siddhi".equalsIgnoreCase(queryType)) {
//                xml = Parser.getSiddiConverter().SiddhiQLToXML(cepqueryResource.getQuery());
            } else if ("epl".equalsIgnoreCase(queryType)) {
//                xml = Parser.getEsperConverter().EPLToXML(cepqueryResource.getQuery());
            } else if ("stream".equalsIgnoreCase(queryType)) {

            }
            cepqueryResource.setXml(xml);
        } catch (Exception e) {
            throw new EServiceException("Could not convert the XML to :" + queryType + " query");
        }
        return cepqueryResource;
    }

}
