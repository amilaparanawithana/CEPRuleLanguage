/**
 * @author Dimuthu Upeksha
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {Node} from "../models/node";
import {NodeGroup} from "../models/nodeGroup";
import {RestService} from "./rest.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class NodeGroupService {
    private baseUrl;

    constructor(@Inject(RestService) private restService:RestService) {
        this.baseUrl = restService.getBaseUrl('nodegroup');
    }

    /**
     * Obtains all the node groups
     * @returns {Observable<R>}
     */
    getAll() {
        return this.restService.get(this.baseUrl)
            .map(res=> {
                return res.json();
            })
            .map((nodeGroups:Array<any>)=> {
                let result:Array<NodeGroup> = [];
                if (nodeGroups) {
                    nodeGroups.forEach((nodeGroup)=> {
                        result.push(new NodeGroup(nodeGroup.id, nodeGroup.name, nodeGroup.description, nodeGroup.hostnames));
                    });
                }
                return result;
            });
    }

    get(nodeGroupId:string) {
        return this.restService.get(this.baseUrl + "/" + nodeGroupId)
            .map(res=> {
                return res.json();
            })
            .map((nodeGroup:any)=> {
                let result:NodeGroup
                if (nodeGroup) {
                    result = new NodeGroup(nodeGroup.id, nodeGroup.name, nodeGroup.description, nodeGroup.hostnames);
                }
                return result;
            });
    }

    getAllNodes() {
        return this.restService.get(this.baseUrl+ "/nodes")
            .map(res=> {
                return res.json();
            })
            .map((nodes:Array<any>)=> {
                let result:Array<Node> = [];
                if (nodes) {
                    nodes.forEach((node)=> {
                        result.push(new Node(node.nodeName, node.labels, node.machineId, node.cpus, node.memory,
                            node.maxPods, node.ready, node.unschedulable));
                    });
                }
                return result;
            });
    }


    deleteNodeGroup(nodeGroupId:number) {
        return this.restService.delete(this.baseUrl + "/" + nodeGroupId);
    }

    createNodeGroup(nodeGroup:NodeGroup) {
        return this.restService.post(this.baseUrl, JSON.stringify(nodeGroup)).map(res=>res.json());
    }

    updateNodeGroup(nodeGroupId:string, nodeGroup:NodeGroup) {
        return this.restService.put(this.baseUrl +"/" + nodeGroupId, JSON.stringify(nodeGroup)).map(res=>res.json());
    }

    fetchPublicNodeGroups() {
        return this.restService.get(this.baseUrl + "/publicnodes")
            .map(res=> {
                return res.json();
            })
            .map((nodeGroups:Array<any>)=> {
                let result:Array<NodeGroup> = [];
                if (nodeGroups) {
                    nodeGroups.forEach((nodeGroup)=> {
                        result.push(new NodeGroup(nodeGroup.id, nodeGroup.name, nodeGroup.description, nodeGroup.hostnames));
                    });
                }
                return result;
            });
    }
    
}

