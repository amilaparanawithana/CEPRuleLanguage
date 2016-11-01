/**
 * @author Chathura Widanage
 */
export class Cluster {
    id:number;
    name:string;
    portFrom:number;
    portTo:number;
    replicationCounter:number;
    nodeGroups:Array<number>;
    clusterServicePackage:number;

    constructor(id:number = null, name:string = null, portFrom:number = null, portTo:number = null,
                replicationCounter:number = null, nodeGroups:Array<number> = [],clusterServicePackage:number = null) {
        this.id = id;
        this.name = name;
        this.portFrom = portFrom;
        this.portTo = portTo;
        this.replicationCounter = replicationCounter;
        this.nodeGroups = nodeGroups;
        this.clusterServicePackage = clusterServicePackage
    }
}