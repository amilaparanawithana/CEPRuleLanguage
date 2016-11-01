import {Injectable} from "angular2/core";
import {TableResource} from "./table.resource";
import {Observable} from "rxjs/Observable";
/**
 * This class should be extended to support the custom sorting, filtering and pagination
 * required by data-table
 * @author chathura widanage
 */
@Injectable()
export abstract class GenericTableService {
    /**
     *
     * @param keyword keyword to search for
     * @param limit number of rows visible per page
     * @param page currently visible page
     * @param sorter column id of the sorting column
     * @param asc true if Sort in ascending or false if sort in descending order
     * @param params additional parameters
     */
    abstract get(keyword:string, limit:number, page:number, sorter:number, asc:boolean, params:Map<string,string>):Observable<TableResource>;
}