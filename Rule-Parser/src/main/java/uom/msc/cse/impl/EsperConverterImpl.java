package uom.msc.cse.impl;

import uom.msc.cse.api.EsperConverter;
import uom.msc.cse.beans.query.Query;
import uom.msc.cse.exceptions.ParserException;
import uom.msc.cse.util.QueryKeyWords;
import uom.msc.cse.util.QueryUtil;

import java.io.File;

/**
 * ESPER-EPS language parser.
 * This contains the XML to EPL and EPL to XML language parser logic implementation
 *
 * @author Amila Paranawithana
 */
public class EsperConverterImpl implements EsperConverter {

    private static EsperConverterImpl ourInstance = new EsperConverterImpl();

    public static EsperConverterImpl getInstance() {
        return ourInstance;
    }

    private EsperConverterImpl() {
    }

    /**
     * Maps a XML string to a Query object with jaxb and convert to a EPL
     *
     * @param xml incoing xml string
     * @return EPL query
     * @throws ParserException
     */
    @Override
    public String XMLToEsper(String xml) throws ParserException {
        Query query = QueryUtil.convertXMLStringToBean(xml);
        return createSQLWithQuery(query);
    }

    /**
     * Maps a XML file to a Query object with jaxb and convert to a EPL
     *
     * @param xml incoming xml file
     * @return EPL query
     * @throws ParserException
     */
    @Override
    public String XMLToEsper(File xml) throws ParserException {
        Query query = QueryUtil.convertXMLFileToBean(xml);
        return createSQLWithQuery(query);
    }

    public String EsperToXML(String esperQuery) {
        return null;
    }

    /**
     * Converts a query object to a EPL query
     *
     * @param query xml mapped to query object with jaxb
     * @return converted EPL query
     */
    private String createSQLWithQuery(Query query) {

        StringBuilder queryString = new StringBuilder();

        // set insert into
        QueryUtil.setInsertInto(query.getInsertInto(), queryString).append(QueryKeyWords.SPACE);
        // set select
        QueryUtil.setSelect(query.getSelect(), queryString);
        // set from
        QueryUtil.setFrom(query.getFromStream(), queryString).append(QueryKeyWords.SPACE);
        //filter
        if (query.getFilter() != null) {
            queryString.setLength(queryString.length() - 1);
            queryString.append("(").append(query.getFilter()).append(")").append(QueryKeyWords.SPACE);
        }
        // group by
        if (query.getGroupBy() != null) {
            QueryUtil.setGroupBy(query.getGroupBy(), queryString).append(QueryKeyWords.SPACE);
        }
        // having
        if (query.getHaving() != null) {
            QueryUtil.setHaving(query.getHaving(), queryString).append(QueryKeyWords.SPACE);
        }
        return queryString.toString();

    }
}
