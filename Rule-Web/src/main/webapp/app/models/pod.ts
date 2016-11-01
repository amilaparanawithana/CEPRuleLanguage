/**
 * @author: dimuthu
 */
export class Pod {
    name:string;
    state:string;
    runningNode:string;
    restarts:number;
    clusterId:number;
    debugEnabled:boolean;
    debugSvcId:string;
    debugPortMapping:{};
    podIP:string;

    constructor(name:string, state:string, runningNode:string, restarts:number, clusterId:number,
                debugEnabled:boolean, debugPortMapping:{}, debugSvcId:string, podIP:string) {
        this.name = name;
        this.state = state;
        this.runningNode = runningNode;
        this.restarts = restarts;
        this.clusterId = clusterId;
        this.debugEnabled = debugEnabled;
        this.debugPortMapping = debugPortMapping;
        this.debugSvcId = debugSvcId;
        this.podIP = podIP;
    }
}