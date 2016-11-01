/**
 * @author Amila Paranawithana
 */

export class ServicePackage {
    id:number;
    name:string;
    maxReplication:number;
    packageLevel:string;

    constructor(id:number = null, name:string = null, maxReplication:number = null, packageLevel:string = null) {
        this.id = id;
        this.name = name;
        this.maxReplication = maxReplication;
        this.packageLevel = packageLevel;
    }

}