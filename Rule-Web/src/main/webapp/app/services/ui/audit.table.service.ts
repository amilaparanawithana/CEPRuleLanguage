/**
 * @author chathura widanage
 */
import {GenericTableService} from "../../modules/tables/generic.table.service";
import {DataRow} from "../../modules/tables/data.row";
import {RestService} from "../rest.service";
import {Inject} from "angular2/core";
import {Injectable} from "angular2/core";
import {TableResource} from "../../modules/tables/table.resource";



export class AuditTableService extends GenericTableService {
    baseUrl:string;

    constructor(@Inject(RestService)
                private restService:RestService) {
        super();
        this.baseUrl = restService.getBaseUrl('auditlog');
    }

    get(keyword:string, limit:number, page:number, sorter:number, asc:boolean) {
        console.log([keyword, limit, page, sorter, asc]);
        var url = this.baseUrl + "?" + "key=" + keyword + "&limit=" + limit + "&page=" + page + "&sorter=" + sorter + "&asc=" + asc;
        return this.restService.get(url)
            .map(res=> {
                return res.json();
            })
            .map((resource:any)=> {
                console.log(resource);
                let tableResource:TableResource = new TableResource();
                if (resource) {
                    tableResource.currentPage = resource.currentPage;
                    tableResource.totalEntries = resource.totalEntries;
                    tableResource.totalPages = resource.totalPages;
                    resource.dataRows.forEach((audit)=> {
                        let dataRow = new DataRow();
                        dataRow.data.push(audit.id, new Date(audit.timestamp), audit.subject, audit.type, audit.username, audit.auditMessage);
                        tableResource.dataRows.push(dataRow);
                    })
                }
                return tableResource;
            });
    }
}