/**
 * @author Sajith Dilshan
 */
export class ClusterHealthResource {
    clusterName:string;
    podData = [];

    constructor(clusterName:string, podData:Array<any>) {
        this.clusterName = clusterName;
        this.podData = podData;
    }
}