package org.uom.msc.cep.controllers;

import org.springframework.beans.factory.annotation.Autowired;


import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.uom.msc.cep.exceptions.EServiceException;
import org.uom.msc.cep.resources.CepqueryResource;
import org.uom.msc.cep.services.QueryToXMLService;


/**
 * @author Amila Paranawithana
 */
@RestController
@RequestMapping("/queryToXml")
public class QueryToXMLController
        extends AbstractRestController
{

    @Autowired
    private QueryToXMLService queryToXMLService;

    @RequestMapping(value = "/epl", method = RequestMethod.POST)
    public String eplToXml(CepqueryResource cepqueryResource)
            throws Exception
    {
        try {
            System.out.println("hi cofsf" + cepqueryResource.getXml());
            return sendSuccessResponse(queryToXMLService.convertQueryToXML(cepqueryResource));
        } catch (EServiceException e) {
            return handleServiceException(e);
        }
    }

    @RequestMapping("/test")
    public String test()
    {
            return "dedede";
    }
}
