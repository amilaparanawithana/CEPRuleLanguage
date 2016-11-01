package uom.msc.cse.beans.query;

import javax.xml.bind.annotation.*;
import java.util.List;

/**
 * @author Amila Paranawithana
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Select {

    @XmlAttribute(name = "all")
    private Boolean all;

    @XmlElementWrapper(name = "attributes")
    @XmlElement(name = "attribute")
    private List<Attribute> attributes;

    @XmlElementWrapper(name = "operators")
    @XmlElement(name = "operator", type = Operation.class)
    private List<Operation> operators;

    public Boolean getAll() {
        return all;
    }

    public void setAll(Boolean all) {
        this.all = all;
    }

    public List<Attribute> getAttributes() {
        return attributes;
    }

    public void setAttributes(List<Attribute> attributes) {
        this.attributes = attributes;
    }

    public List<Operation> getOperators() {
        return operators;
    }

    public void setOperators(List<Operation> operators) {
        this.operators = operators;
    }
}
