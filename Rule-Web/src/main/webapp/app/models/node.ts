/**
 * @author: dimuthu
 */
export class Node {
    nodeName:string
    labels:{};
    machineId:string
    cpus:number
    memory:string
    maxPods:number
    ready:boolean
    unschedulable:boolean
    
    constructor(nodeName:string, labels:{}, machineId:string, cpus:number, memory:string, maxPods:number, 
                ready:boolean, unschedulable:boolean) {
        this.nodeName = nodeName;
        this.labels = labels;
        this.machineId = machineId;
        this.cpus = cpus;
        this.memory = memory;
        this.maxPods = maxPods;
        this.ready = ready;
        this.unschedulable = unschedulable;
    }
}