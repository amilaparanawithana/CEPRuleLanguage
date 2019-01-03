package org.uom.msc.cep.controllers;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.uom.msc.cep.exceptions.EControllerException;
import org.uom.msc.cep.exceptions.EServiceException;
import org.uom.msc.cep.resources.CepqueryResource;
import org.uom.msc.cep.util.Status;

import javax.annotation.PostConstruct;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.uom.msc.cep.util.Status.ERROR;
import static org.uom.msc.cep.util.Status.SUCCESS;

/**
 * @author amila paranawithana
 *         Common methods of rest controller classes
 */
public abstract class AbstractRestController {



    static final SimpleDateFormat dateFormat = new SimpleDateFormat(" dd MMM yyyy HH:mm:ss");
    static final ObjectMapper mapper = new ObjectMapper();

    @PostConstruct
    public void init() {
        mapper.setDateFormat(dateFormat);
    }

    public String sendSuccessResponse(List data)
            throws JsonProcessingException {
        Map<String, Object> map = new HashMap<>();
        map.put("data", data);
        map.put(SUCCESS.getStatus(), true);
        return mapper.writeValueAsString(map);
    }

    public String sendSuccessResponse(CepqueryResource data)
            throws JsonProcessingException {
        Map<String, Object> map = new HashMap<>();
        map.put("data", data);
        map.put(SUCCESS.getStatus(), true);
        return mapper.writeValueAsString(map);
    }

    public String handleServiceException(EServiceException ex)
            throws EControllerException {
        throw new EControllerException(ERROR.getStatus() + " : " + ex.getMessage(), ex);
    }

    public static String handleServiceException(EServiceException ex, String message)
            throws EControllerException {
        throw new EControllerException(ERROR.getStatus() + " : " + message, ex);
    }

    public static String handleServiceException(EServiceException ex, Status status)
            throws EControllerException {
        throw new EControllerException(status.getStatus() + " : " + ex.getMessage(), ex);
    }

    public static String handleServiceException(EServiceException ex, String message, Status status)
            throws EControllerException {
        throw new EControllerException(status.getStatus() + " : " + message, ex);
    }


}
