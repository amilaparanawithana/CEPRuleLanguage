/**
 * @author Amila Paranawithana
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {RestService} from "./rest.service";
import {Datasource} from "../models/datasource";

@Injectable()
export class DatasourceService {

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
    }

    getAll(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/datasource/") + podIP)
            .map(res=> {
                return res.json();
            })
            .map((datasource:Array<any>)=> {
                let result:Array<Datasource> = [];
                if (datasource) {
                    datasource.forEach((datasource)=> {

                        let datasourceR =
                            new Datasource(datasource.id,datasource.configView.poolName,datasource.configView.url,
                                datasource.configView.driverClass, datasource.configView.maximumConnections,
                                datasource.configView.minimumConnections,datasource.configView.initialConnections,
                                datasource.configView.maxWaitMillis,datasource.configView.refreshIntervalMillis,
                                datasource.configView.maxConnectionIdleMillis,datasource.configView.maxReuseAllowed,
                                datasource.configView.validationQuery,datasource.configView.validationTimeoutSeconds,
                                datasource.statisticsView.poolStatus,datasource.statisticsView.numTotal,
                                datasource.statisticsView.numActive,datasource.statisticsView.numAvailable,
                                datasource.statisticsView.waitQueueLength,datasource.statisticsView.numCreated,
                                datasource.statisticsView.numDestroyed,datasource.statisticsView.numValidated,
                                datasource.statisticsView.numValidationFailed,datasource.statisticsView.numFailedRequests,
                                datasource.statisticsView.createdTime,datasource.statisticsView.averageUsage,
                                datasource.statisticsView.highestUsageMillis,datasource.statisticsView.longestOpenMillis,
                                datasource.statisticsView.lastConnectionCreatedTime,datasource.statisticsView.averageConnectionLife);

                        result.push(datasourceR);
                    })
                }
                return result;
            });
    }

    getById(id:string,podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/datasource/") + id +"/" + podIP)
            .map(res=> {
                return res.json()
            })
            .map(datasource=> {
                let result:Datasource;
                if (datasource) {
                    result = new Datasource(datasource.id,datasource.configView.poolName,datasource.configView.url,
                        datasource.configView.driverClass, datasource.configView.maximumConnections,
                        datasource.configView.minimumConnections,datasource.configView.initialConnections,
                        datasource.configView.maxWaitMillis,datasource.configView.refreshIntervalMillis,
                        datasource.configView.maxConnectionIdleMillis,datasource.configView.maxReuseAllowed,
                        datasource.configView.validationQuery,datasource.configView.validationTimeoutSeconds,
                        datasource.statisticsView.poolStatus,datasource.statisticsView.numTotal,
                        datasource.statisticsView.numActive,datasource.statisticsView.numAvailable,
                        datasource.statisticsView.waitQueueLength,datasource.statisticsView.numCreated,
                        datasource.statisticsView.numDestroyed,datasource.statisticsView.numValidated,
                        datasource.statisticsView.numValidationFailed,datasource.statisticsView.numFailedRequests,
                        datasource.statisticsView.createdTime,datasource.statisticsView.averageUsage,
                        datasource.statisticsView.highestUsageMillis,datasource.statisticsView.longestOpenMillis,
                        datasource.statisticsView.lastConnectionCreatedTime,datasource.statisticsView.averageConnectionLife);
                }
                return result;
            });
    }

}