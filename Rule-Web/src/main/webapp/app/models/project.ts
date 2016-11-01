/**
 * @author Chathura Widanage
 */
import {Cluster} from "./cluster";

export class Project {
    id:number;
    name:string;
    clusterId:number;//cluster id
    users:Array<number>;

    //object type variables

    constructor(id:number = null, name:string = null, clusterId:number = null, users:Array<number> = []) {
        this.id = id;
        this.name = name;
        this.clusterId = clusterId;
        this.users = users;
    }

}