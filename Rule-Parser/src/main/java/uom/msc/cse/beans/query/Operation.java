package uom.msc.cse.beans.query;

import javax.xml.bind.annotation.*;

/**
 * @author Amila Paranawithana
 */

@XmlAccessorType(XmlAccessType.FIELD)
public class Operation {

    @XmlValue
    private String operation;
    @XmlAttribute
    private String connectWith;

    public String getConnectWith() {
        return connectWith;
    }

    public void setConnectWith(String connectWith) {
        this.connectWith = connectWith;
    }

    public String getOperation() {
        return operation;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }
}
