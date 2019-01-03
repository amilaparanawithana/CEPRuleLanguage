package org.uom.msc.cep.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.uom.msc.cep.exceptions.EServiceException;
import org.uom.msc.cep.resources.CepqueryResource;
import org.uom.msc.cep.services.ConverterService;

@RestController
@RequestMapping("/cepmlparser")
public class QueryConvertController extends AbstractRestController{

    @Autowired
    private ConverterService converterService;

    @RequestMapping(value = "/mlepl", method = RequestMethod.POST)
    public String mlToEpl(CepqueryResource cepqueryResource)
            throws Exception
    {
        try {
            return sendSuccessResponse(converterService.convertMLToEPL(cepqueryResource));
        } catch (EServiceException e) {
            return handleServiceException(e);
        }
    }

    @RequestMapping(value = "/mlsiddhi", method = RequestMethod.POST)
    public String mlToSiddhi(CepqueryResource cepqueryResource)
            throws Exception
    {
        try {
            return sendSuccessResponse(converterService.convertMLToSiddhi(cepqueryResource));
        } catch (EServiceException e) {
            return handleServiceException(e);
        }
    }

    @RequestMapping(value = "/mlcql", method = RequestMethod.POST)
    public String mlToCql(CepqueryResource cepqueryResource)
            throws Exception
    {
        try {
            return sendSuccessResponse(converterService.convertMLToCQL(cepqueryResource));
        } catch (EServiceException e) {
            return handleServiceException(e);
        }
    }

    @RequestMapping(value = "/eplml", method = RequestMethod.POST)
    public String eplToMl(CepqueryResource cepqueryResource)
            throws Exception
    {
        try {
            return sendSuccessResponse(converterService.converEPLToML(cepqueryResource));
        } catch (EServiceException e) {
            return handleServiceException(e);
        }
    }

    @RequestMapping(value = "/siddhiml", method = RequestMethod.POST)
    public String siddhiToMl(CepqueryResource cepqueryResource)
            throws Exception
    {
        try {
            return sendSuccessResponse(converterService.converSiddhiToML(cepqueryResource));
        } catch (EServiceException e) {
            return handleServiceException(e);
        }
    }

    @RequestMapping(value = "/cqlml", method = RequestMethod.POST)
    public String cqlToMl(CepqueryResource cepqueryResource)
            throws Exception
    {
        try {
            return sendSuccessResponse(converterService.converCQLToML(cepqueryResource));
        } catch (EServiceException e) {
            return handleServiceException(e);
        }
    }
}
