package org.uom.msc.cep.resources;

/**
 * @author amila paranawithana
 *         Represent the JAXRS bean for the query
 */
public class CepqueryResource {

    private String xml;
    private String queryType;
    private String query;

    public String getXml() {
        return xml;
    }

    public void setXml(String xml) {
        this.xml = xml;
    }

    public String getQueryType() {
        return queryType;
    }

    public void setQueryType(String queryType) {
        this.queryType = queryType;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}
