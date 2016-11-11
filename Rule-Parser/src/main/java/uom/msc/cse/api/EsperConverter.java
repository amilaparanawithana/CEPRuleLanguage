package uom.msc.cse.api;

import uom.msc.cse.exceptions.ParserException;

import java.io.File;

/**
 * @author Amila Paranawithana
 */
public interface EsperConverter {

    String XMLToEsper(String xml) throws ParserException;

    String XMLToEsper(File xml) throws ParserException;

    String EsperToXML(String esperQuery);
}
