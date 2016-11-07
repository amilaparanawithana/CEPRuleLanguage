/**
 * @author Amila Paranawithana
 */

export class Cepquery {
    xml:string;
    queryType:string;
    query:string;


    constructor(xml:string = null, queryType:string = null, query:string = null) {
        this.xml = xml;
        this.queryType = queryType;
        this.query = query;
    }
}