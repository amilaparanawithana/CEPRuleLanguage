package org.adroitlogic.ips.services.exception;

import java.util.HashMap;
import java.util.Map;

/**
 * @author dimuthu
 */
public class ServiceException extends Exception {

    //String message;
    String subject;
    Map<String,String> metaInfoMap = new HashMap<>();
    String title;
    ExType exceptionType;

    public ServiceException(){
        
    }
    public ServiceException(String msg, Exception e) {
        super(msg, e);
    }

    public ServiceException(String msg) {
        super(msg);
    }
    
    public ServiceException(String msg, Object... args) {
        super(processMsg(msg, args));
    }


    public ServiceException(String msg, Exception e, Object... args) {
        super(processMsg(msg, args), e);
    }
    
    public ServiceException(String message, String subject, Map<String,String> metaInfoMap) {
        super(message);
        this.subject = subject;
        this.metaInfoMap = metaInfoMap;
    }

    public ServiceException(String message, String subject) {
        super(message);
        this.subject = subject;
    }

    public ServiceException(String message, ExType exceptionType) {
        super(message);
        this.exceptionType = exceptionType;
    }

    public enum ExType {
        WARN,ERROR
    }

    private static String processMsg(String message, Object... args) {
        
        int index = 0;
        while (message.contains("{}") && args.length < index) {
            message = message.replaceFirst("\\{\\}", String.valueOf(args[index++]));
        }
        return message;
    }

    public ExType getExceptionType() {
        return exceptionType;
    }

    public void setExceptionType(ExType exceptionType) {
        this.exceptionType = exceptionType;
    }

    public Map<String, String> getMetaInfoMap() {
        return metaInfoMap;
    }

    public void setMetaInfoMap(Map<String, String> metaInfoMap) {
        this.metaInfoMap = metaInfoMap;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
