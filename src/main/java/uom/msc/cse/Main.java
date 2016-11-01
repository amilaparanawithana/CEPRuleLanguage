package uom.msc.cse;

import uom.msc.cse.impl.Parser;

import java.io.File;

/**
 * @author Amila Paranawithana
 */
public class Main {

    public static void main(String[] args) {
        System.out.println("--------- converter running ------------");
        File xmlFile = new File("sample.xml");
//        Parser.getSiddiConverter().XMLToSiddhiQL(Constants.SAMPLE_XML_QUERY);
        Parser.getSiddiConverter().XMLToSiddhiQL(xmlFile);

    }
}
