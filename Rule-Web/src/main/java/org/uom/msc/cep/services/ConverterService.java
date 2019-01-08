package org.uom.msc.cep.services;

import org.springframework.stereotype.Component;
import org.uom.msc.cep.exceptions.EServiceException;
import org.uom.msc.cep.resources.CepqueryResource;
import uom.msc.cse.impl.Parser;
//import uom.msc.cse.impl.Parser;

/**
 * @author Amila Paranawithana
 */
@Component
public class ConverterService {


    /**
     * Convert CEP ML to EPL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     */
    public CepqueryResource convertMLToEPL(CepqueryResource cepqueryResource)
            throws EServiceException
    {

        try {
        cepqueryResource.setQuery(Parser.getEsperConverter().XMLToEPL(cepqueryResource.getXml().trim()));

        } catch (Exception e) {
            throw new EServiceException("Could not convert the XML to EPL",e);
        }
        return cepqueryResource;
    }

    /**
     * Convert CEP ML to EPL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     */
    public CepqueryResource convertMLToSiddhi(CepqueryResource cepqueryResource)
            throws EServiceException
    {

        try {
            cepqueryResource.setQuery(Parser.getSiddiConverter().XMLToSiddhiQL(cepqueryResource.getXml().trim()));

        } catch (Exception e) {
            throw new EServiceException("Could not convert the XML to EPL",e);
        }
        return cepqueryResource;
    }

    /**
     * Convert CEP ML to EPL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     */
    public CepqueryResource convertMLToCQL(CepqueryResource cepqueryResource)
            throws EServiceException
    {

        try {
            cepqueryResource.setQuery(Parser.getStreamConverter().XMLToCQL(cepqueryResource.getXml().trim()));

        } catch (Exception e) {
            throw new EServiceException("Could not convert the XML to EPL",e);
        }
        return cepqueryResource;
    }

    /**
     * Convert CEP ML to EPL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     */
    public CepqueryResource converEPLToML(CepqueryResource cepqueryResource)
            throws EServiceException
    {

        try {
            String query = cepqueryResource.getQuery().trim();
            if(!query.endsWith(";")){
                query = query + ";";
            }

            cepqueryResource.setXml(Parser.getEsperConverter().EPLToXML(query));

        } catch (Exception e) {
            throw new EServiceException("Could not convert the XML to EPL", e);
        }
        return cepqueryResource;
    }

    /**
     * Convert CEP ML to EPL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     */
    public CepqueryResource converSiddhiToML(CepqueryResource cepqueryResource)
            throws EServiceException
    {

        try {
            String query = cepqueryResource.getQuery().trim();
            if(!query.endsWith(";")){
                query = query + ";";
            }
            cepqueryResource.setXml(Parser.getSiddiConverter().SiddhiQLToXML(query));

        } catch (Exception e) {
            throw new EServiceException("Could not convert the XML to EPL",e);
        }
        return cepqueryResource;
    }

    /**
     * Convert CEP ML to EPL
     *
     * @param cepqueryResource query containing JAXRS bean
     * @return query resource with converted query
     */
    public CepqueryResource converCQLToML(CepqueryResource cepqueryResource)
            throws EServiceException
    {

        try {
            String query = cepqueryResource.getQuery().trim();
            if(!query.endsWith(";")){
                query = query + ";";
            }
            cepqueryResource.setXml(Parser.getStreamConverter().CQLToXML(query));

        } catch (Exception e) {
            throw new EServiceException("Could not convert the XML to EPL",e);
        }
        return cepqueryResource;
    }

}
