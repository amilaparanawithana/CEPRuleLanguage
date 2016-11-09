package uom.msc.cse.api;

import java.io.File;

/**
 * @author Amila Paranawithana
 */
public interface EsperConverter {

    String XMLToEsper(String xml);

    String XMLToEsper(File xml);

    String EsperToXML(String esperQuery);
}
