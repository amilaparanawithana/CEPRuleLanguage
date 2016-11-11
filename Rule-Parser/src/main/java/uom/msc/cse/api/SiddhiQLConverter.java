package uom.msc.cse.api;

import uom.msc.cse.exceptions.ParserException;

import java.io.File;

/**
 * @author Amila Paranawithana
 */
public interface SiddhiQLConverter {

    String XMLToSiddhiQL(String xml) throws ParserException;

    String XMLToSiddhiQL(File xmlFile) throws ParserException;

    String SiddhiQLToXML(String sql) throws ParserException;
}
