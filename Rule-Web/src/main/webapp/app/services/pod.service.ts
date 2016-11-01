/**
 * @author: dimuthu
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {RestService} from "./rest.service";
import {Pod} from "../models/pod";
import {GenericTableService} from "../modules/tables/generic.table.service";
import {DataRow} from "../modules/tables/data.row";
import {TableResource} from "../modules/tables/table.resource";
import {Observable} from "rxjs/Observable";

@Injectable()
export class PodService extends GenericTableService {

    baseUrl:string;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
        super();
        this.baseUrl = restService.getBaseUrl('project');
    }

    getListOfPodsNames() {
        return this.restService.get(this.restService.getBaseUrl("logs/pods"))
            .map(res => {
                    console.log(res.json());
                    return res.json();
                }
            )
    }

    getByName(clusterId:number, name:string) {
        return this.restService.get(this.restService.getBaseUrl("cluster/" + clusterId + "/pod/" + name))
            .map(res=> {
                return res.json()
            }).map((item:any)=> {
                var status:string;
                var debugEnabled:boolean = false;
                var debugSvcId:string = "";
                if (item.metadata.deletionGracePeriodSeconds != 0) {
                    status = "Terminating in " + item.metadata.deletionGracePeriodSeconds + "seconds";
                } else {
                    status = item.status.phase;
                }

                if (item.metadata.labels['pod-debug-enable'] == 'true') {
                    debugEnabled = true;
                    debugSvcId = item.metadata.labels['pod-debug']
                }

                return new Pod(item.metadata.name, status,
                    item.spec.nodeName, item.status.containerStatuses[0].restartCount, clusterId,
                    debugEnabled, {}, debugSvcId, item.status.podIP);
            });
    }

    getProxyList(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/proxy/" + podIP))
            .map(res=> {
                return res.json()
            }).map((item:any)=> {
                return item;
            });
    }


    getListeners(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/listener/" + podIP))
            .map(res=> {
                return res.json()
            }).map((item:any)=> {
                return item;
            });
    }

    getSenders(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/sender/" + podIP))
            .map(res=> {
                return res.json()
            }).map((item:any)=> {
                return item;
            });
    }

    getSequences(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/sequence/" + podIP))
            .map(res=> {
                return res.json()
            }).map((item:any)=> {
                return item;
            });
    }

    getDUs(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/dus/" + podIP))
            .map(res=> {
                return res.json()
            }).map((item:any)=> {
                return item;
            });
    }

    toggleDebug(clusterId:number, name:string) {
        return this.http.post(this.restService.getBaseUrl("cluster/" + clusterId + "/pod/debug/" + name),
            JSON.stringify("{}")).map(res=>res.json());
    }

    get(keyword:string, limit:number, page:number, sorter:number, asc:boolean, params:Map<string,string>) {
        let podName = params.get('pod-name');
        let clusterId = params.get('cluster-id');

        var url;
        if (params.has('show-all-logs')) {
            url = this.restService.getBaseUrl("logs/pod/") + podName + "?" + "key=" + keyword + "&limit=" + limit + "&page=" + page + "&sorter=" + sorter + "&asc=" + asc;
        } else {
            if (clusterId) {
                url = this.restService.getBaseUrl("cluster/" + clusterId + "/pod/" + podName + "/log/") + "?" + "key=" + keyword + "&limit=" + limit + "&page=" + page + "&sorter=" + sorter + "&asc=" + asc;
            } else {
                return Observable.create(observer=> {
                    observer.next(new TableResource());
                });
            }
        }
        //set log level
        if (params.has('log-level')) {
            url += "&logLevel=" + params.get('log-level');
        }

        if (params.has('start-date') && params.has('end-date')) {
            url += "&fromDate=" + params.get('start-date');
            url += "&toDate=" + params.get('end-date');
        }

        return this.restService.get(url)
            .map(res=> {
                return res.json();
            })
            .map((resource:any)=> {
                let tableResource = new TableResource();
                tableResource.currentPage = resource.currentPage;
                tableResource.totalEntries = resource.totalEntries;
                tableResource.totalPages = resource.totalPages;
                if (resource) {
                    resource.dataRows.forEach((log)=> {
                        let dataRow = new DataRow();
                        dataRow.data.push(
                            log.id,
                            new Date(log.occurrenceTime),
                            log.node,
                            log.node_Group,
                            log.space,
                            log.loggerName,
                            log.remoteHost,
                            log.remoteIp,
                            log.threadId,
                            log.message,
                            log.severity,
                            log.type,
                            log.errorCode,
                            log.messageId,
                            log.logLevel
                        );
                        tableResource.dataRows.push(dataRow);
                    })
                }
                return tableResource;
            });
    }
}