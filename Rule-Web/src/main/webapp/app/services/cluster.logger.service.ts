import {Injectable, Inject} from "angular2/core";
import {GenericTableService} from "../modules/tables/generic.table.service";
import {TableResource} from "../modules/tables/table.resource";
import {RestService} from "./rest.service";
import {Observable} from "rxjs/Observable";
import {DataRow} from "../modules/tables/data.row";
@Injectable()
export class ClusterLoggerService extends GenericTableService {


    constructor(@Inject(RestService)
                private restService:RestService) {
        super();
    }

    changeLogLevel(clusterId:number, loggerName:string, newLevel:string) {
        return this.restService.get(this.restService.getBaseUrl("logger/") + clusterId + "/" + loggerName + "/" + newLevel)
            .map(res => {
                console.log(res);
                return res.json();
            })
    }


    get(keyword:string, limit:number, page:number, sorter:number, asc:boolean, params:Map<string,string>) {
        let selectedClusterId = params.get('selected-cluster-id');
        if (selectedClusterId) {
            return this.restService.get(this.restService.getBaseUrl("logger/") + selectedClusterId + "?key=" + keyword + "&limit=" + limit + "&page=" + page + "&sorter=" + sorter + "&asc=" + asc)
                .map(res => {
                    return res.json();
                }).map((resource:any) => {
                    console.log(resource);
                    let tableResource = new TableResource();
                    tableResource.currentPage = resource.currentPage;
                    tableResource.totalEntries = resource.totalEntries;
                    tableResource.totalPages = resource.totalPages;
                    if (resource) {
                        console.log(resource.dataRows);
                        resource.dataRows.forEach((log) => {
                            let dataRow = new DataRow();
                            dataRow.data.push(
                                log.loggerName,
                                log.parentLogger,
                                log.currLevel,
                                log.additivity
                            );
                            tableResource.dataRows.push(dataRow);
                        })
                    }
                    return tableResource;
                });
        } else {
            return Observable.create(observer=> {
                observer.next(new TableResource());
            });
        }
    }
}