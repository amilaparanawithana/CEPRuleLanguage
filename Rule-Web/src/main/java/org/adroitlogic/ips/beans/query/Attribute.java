package org.adroitlogic.ips.beans.query;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;

/**
 * @author Amila Paranawithana
 */
@XmlAccessorType(XmlAccessType.FIELD)
public class Attribute {

    @XmlAttribute(name = "as")
    private String as;

    public String getAs() {
        return as;
    }

    public void setAs(String as) {
        this.as = as;
    }
}
