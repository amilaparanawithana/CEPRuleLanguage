package uom.msc.cse.impl;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import uom.msc.cse.api.SiddhiQLConverter;
import uom.msc.cse.beans.query.Query;
import uom.msc.cse.util.QueryKeyWords;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Unmarshaller;
import java.io.File;
import java.io.StringReader;

/**
 * @author Amila Paranawithana
 */
public class SiddhiQLConverterImpl extends AbstractConverter implements SiddhiQLConverter {

    private static final Logger logger = LogManager.getLogger(SiddhiQLConverterImpl.class);
    private static SiddhiQLConverterImpl ourInstance = new SiddhiQLConverterImpl();

    public static SiddhiQLConverterImpl getInstance() {
        return ourInstance;
    }

    private SiddhiQLConverterImpl() {
    }

    public String XMLToSiddhiQL(String xml) {
        String query = "";

        try {
            StringReader reader = new StringReader(xml);
            JAXBContext jaxbContext = JAXBContext.newInstance(Query.class);

            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            Query queryObj = (Query) jaxbUnmarshaller.unmarshal(reader);
            System.out.println(queryObj.getFromStream());
        } catch (JAXBException ex) {
            logger.error("Error while converting XML to JAXB object");
            if (logger.isDebugEnabled()) {
                logger.debug("Error in converting XML string : {} to JAXB object", xml);
            }
        }
        return query;
    }

    public String XMLToSiddhiQL(File xmlFile) {
        String query = "";

        System.out.println("sssssssssssss");
        //TODO validate the incoming xml request over a XSD
        //validateXML();
        try {
            JAXBContext jaxbContext = JAXBContext.newInstance(Query.class);

            Unmarshaller jaxbUnmarshaller = jaxbContext.createUnmarshaller();
            Query queryObj = (Query) jaxbUnmarshaller.unmarshal(xmlFile);
            /*System.out.println(queryObj.getFromStream());
            System.out.println(queryObj.getSelect().getOperators().get(0).getConnectWith());
            System.out.println(queryObj.getSelect().getOperators().get(0).getOperation());
            System.out.println(queryObj.getSelect().getAttributes().get(0).getAttribute());
            System.out.println(queryObj.getSelect().getAttributes().get(0).getAs());
            System.out.println(queryObj.getFilter().getConditions().get(0).getCondition());*/

            query = createSQLWithQuery(queryObj);


        } catch (JAXBException ex) {
            logger.error("Error while converting XML to JAXB object");
            if (logger.isDebugEnabled()) {
                logger.debug("Error in converting XML string : {} to JAXB object", xmlFile.getName());
            }
        }
        return query;
    }

    /**
     * Create the Siddhi query from the Query object created from the XML
     *
     * @param query query object created from the XML
     * @return Siddhi query
     */
    private String createSQLWithQuery(Query query) {

        StringBuilder queryString = new StringBuilder(QueryKeyWords.FROM);
        queryString.append(QueryKeyWords.SPACE).append(query.getFromStream()).append(QueryKeyWords.SPACE)
                .append(QueryKeyWords.SELECT).append(QueryKeyWords.SPACE);

        // setting select
        if (query.getSelect().getAll()) {
            queryString.append("*");
        } else {
            final int[] numberOfAttributes = {query.getSelect().getAttributes().size()};
            query.getSelect().getAttributes().forEach(attr -> {

                queryString.append(attr.getAttribute()).append(QueryKeyWords.SPACE);
                if (attr.getAs() != null) {
                    queryString.append(QueryKeyWords.AS).append(QueryKeyWords.SPACE).append(attr.getAs()).append(QueryKeyWords.SPACE);
                }
                numberOfAttributes[0] = numberOfAttributes[0] - 1;

                if (numberOfAttributes[0] > 0) {
                    queryString.append(QueryKeyWords.COMMA).append(QueryKeyWords.SPACE);
                }
            });
        }

        // group by
        if (query.getGroupBy() != null) {
            queryString.append(QueryKeyWords.GROUP_BY).append(QueryKeyWords.SPACE).append(query.getGroupBy()).append(QueryKeyWords.SPACE);
        }

        //INSERT-INTO
        queryString.append(QueryKeyWords.INSERT_INTO).append(QueryKeyWords.SPACE)
                .append(query.getInsertInto());

        return queryString.toString();
    }

    public String SiddhiQLToXML(String sql) {
        return null;
    }
}
