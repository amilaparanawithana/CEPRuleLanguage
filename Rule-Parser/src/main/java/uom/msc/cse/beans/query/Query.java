
package uom.msc.cse.beans.query;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

/**
 * @author Amila Paranawithana
 */

@XmlRootElement(name = "query")
@XmlAccessorType(XmlAccessType.FIELD)
public class Query {

    @XmlElement(name = "select")
    private Select select;
    @XmlElement(name = "filter")
    private Filter filter;
    @XmlElement(name = "fromStream")
    private String fromStream;
    @XmlElement(name = "insertInto")
    private String insertInto;


    public Select getSelect() {
        return select;
    }

    public void setSelect(Select select) {
        this.select = select;
    }

    public String getFromStream() {
        return fromStream;
    }

    public void setFromStream(String fromStream) {
        this.fromStream = fromStream;
    }

    public Filter getFilter() {
        return filter;
    }

    public void setFilter(Filter filter) {
        this.filter = filter;
    }

    public String getInsertInto() {
        return insertInto;
    }

    public void setInsertInto(String insertInto) {
        this.insertInto = insertInto;
    }
}
