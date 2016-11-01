import {DataRow} from "./data.row";
export class TableResource {
    totalEntries:number;
    totalPages:number;
    currentPage:number;
    dataRows:Array<DataRow>;
    constructor(){
        this.dataRows=new Array<DataRow>();
    }
}