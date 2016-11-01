package uom.msc.cse.impl;

import uom.msc.cse.api.EsperConverter;

/**
 * @author Amila Paranawithana
 */
public class EsperConverterImpl implements EsperConverter {

    private static EsperConverterImpl ourInstance = new EsperConverterImpl();

    public static EsperConverterImpl getInstance() {
        return ourInstance;
    }

    private EsperConverterImpl() {
    }

    public String XMLToEsper(String xml) {
        return null;
    }

    public String EsperToXML(String esperQuery) {
        return null;
    }
}
