/**
 * @author Sajith Dilshan
 */
export class TroubleshootStatus {

    taskId:string;
    status:string;
    duration:number;
    lastUpdated:any;
    extraInfo:string;
    overallStatus:string;

    constructor(taskId:string, status:string, duration:number, lastUpdated:any, extraInfo:string, overallStatus:string = null) {
        this.taskId = taskId;
        this.status = status;
        this.duration = duration;
        this.lastUpdated = lastUpdated;
        this.extraInfo = extraInfo;
        this.overallStatus = overallStatus;
    }
}