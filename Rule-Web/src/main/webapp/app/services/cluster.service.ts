/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Injectable, Inject} from "angular2/core";
import {RestService} from "./rest.service";
import {Cluster} from "../models/cluster";
import {Pod} from "../models/pod";
import {Endpoint} from "../models/endpoint";
import {Project} from "../models/project";
import "rxjs/add/operator/map";

@Injectable()
export class ClusterService {
    private baseUrl;

    constructor(@Inject(RestService)
                private restService:RestService) {
        this.baseUrl = restService.getBaseUrl('cluster');
    }

    /**
     * Obtains the information of the cluster for the given ID
     * @param id ID of the cluster
     * @returns JSON response
     */
    getById(id:number) {
        return this.restService.get(this.restService.getResourceUrl('cluster', id))
            .map(res=> {
                return res.json()
            })
            .map(cluster => {
                let result:Cluster;
                if (cluster) {
                    result = new Cluster(cluster.id, cluster.name, cluster.portFrom,
                        cluster.portTo, cluster.replicationCounter, cluster.nodeGroups,cluster.clusterServicePackage);
                }
                return result;
            });
    }

    /**
     * Obtains the details of all the clusters
     * @returns JSON response
     */
    getAllClusters() {
        return this.restService.get(this.baseUrl).map(res=> {
            return res.json()
        }).map((clusters:Array<any>)=> {
                let result:Array<Cluster> = [];
                if (clusters) {
                    clusters.forEach((cluster) => {
                        result.push(new Cluster(cluster.id, cluster.name,
                            cluster.portFrom, cluster.portTo, cluster.replicationCounter, cluster.nodeGroups,cluster.clusterServicePackage));
                    });
                }
                return result;
            }
        );
    }

    createCluster(cluster:Cluster) {
        return this.restService.post(this.baseUrl, JSON.stringify(cluster)).map(res=>res.json());
    }

    updateCluster(cluster:Cluster) {
        return this.restService.put(this.restService.getResourceUrl("cluster", cluster.id),
            JSON.stringify(cluster)).map(res=>res.json()
        );
    }

    refreshCluster(cluster:Cluster) {
        return this.restService.get(this.restService.getResourceUrl("cluster", cluster.id) + "/refresh").map(res=>res.json());
    }

    getPodsOfCluster(id:number) {
        return this.restService.get(this.restService.getBaseUrl("cluster/" + id + "/pods"))
            .map(res=> {
                return res.json()
            }).map((jsonObj:any) => {
                return jsonObj.items;
            }).map((items:Array<any>)=> {
                let pods:Array<Pod> = [];
                if (items) {
                    items.forEach((item) => {
                        var debugEnabled:boolean = false;
                        var debugSvcId:string = "";
                        var status:string;
                        if (item.metadata.deletionGracePeriodSeconds != 0) {
                            status = "Terminating in " + item.metadata.deletionGracePeriodSeconds + "seconds";
                        } else {
                            status = item.status.phase;
                        }

                        if (item.metadata.labels['pod-debug-enable'] == 'true') {
                            debugEnabled = true;
                            debugSvcId = item.metadata.labels['pod-debug']
                        }
                        pods.push(new Pod(item.metadata.name, status,
                            item.spec.nodeName, item.status.containerStatuses[0].restartCount, id,
                            debugEnabled, {}, debugSvcId, item.status.podIP));
                    });
                }
                return pods;
            });
    }

    deleteCluster(clusterId:number) {
        return this.restService.delete(this.baseUrl + "/" + clusterId);
    }

    getEndpoints(id:number) {
        return this.restService.get(this.restService.getResourceUrl('cluster', id + '/endpoints'))
            .map(res=> {
                return res.json()
            })
            .map((endpoints:Array<any>)=> {
                let result:Array<Endpoint> = [];
                endpoints.forEach(endpoint=> {
                    if (endpoint) {
                        let ep = new Endpoint(endpoint.port, endpoint.type, endpoint.endpoints);
                        result.push(ep);
                    }
                });
                return result;

            });
    }

    getProjects(clusterId:number) {
        return this.restService.get(this.restService.getResourceUrl('cluster', clusterId + '/projects'))
            .map(res=> {
                return res.json()
            })
            .map((projects:Array<any>)=> {
                let result:Array<Project> = [];
                projects.forEach(project=> {
                    if (project) {
                        let proj = new Project(project.id, project.name, clusterId, project.users);
                        result.push(proj);
                    }
                });
                return result;

            });
    }

}