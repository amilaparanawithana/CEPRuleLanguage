package uom.msc.cse.api;

import java.io.File;

/**
 * @author Amila Paranawithana
 */
public interface SiddhiQLConverter {

    String XMLToSiddhiQL(String xml);

    String XMLToSiddhiQL(File xmlFile);

    String SiddhiQLToXML(String sql);
}
