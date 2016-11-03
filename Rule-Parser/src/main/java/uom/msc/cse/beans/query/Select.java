package uom.msc.cse.beans.query;

import javax.xml.bind.annotation.*;
import java.util.List;

/**
 *
 * @author Amila Paranawithana
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Select {

    @XmlAttribute(name = "all")
    private Boolean all = false;

    //select roomNo as roomNumber
    @XmlElementWrapper(name = "attributes")
    @XmlElement(name = "attribute")
    private List<Attribute> attributes;

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

}
