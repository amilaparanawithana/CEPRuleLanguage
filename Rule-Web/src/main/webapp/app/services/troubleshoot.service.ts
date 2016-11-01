import {Injectable, Inject} from "angular2/core";
import {RestService} from "./rest.service";
import {Http} from "angular2/http";
import {TroubleshootTask} from "../models/TroubleshootTask";
import {TroubleshootLaunch} from "../models/TroubleshootLaunch";
import {TroubleshootStatus} from "../models/TroubleshootStatus";
@Injectable()
export class TroubleshootService {

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
    }

    getAvailableTasks(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/tasks/") + podIP)
            .map(res=> {
                return res.json();
            })
            .map((tasks:Array<any>)=> {
                let result:Array<TroubleshootTask> = [];
                if (tasks) {
                    tasks.forEach((task)=> {
                        let troubleshootTask = new TroubleshootTask(task.id, task.name, task.description,
                            task.intensive, task.maskable, task.parameters);
                        result.push(troubleshootTask);
                    })
                }
                return result;
            });
    }

    launchTask(troubleshootLaunch:TroubleshootLaunch, podIP:string) {
        return this.restService.post(this.restService.getBaseUrl("jmx/tasks/") + podIP, JSON.stringify(troubleshootLaunch))
            .map(res => {
                return res.json();
            });
    }

    getCurrentTaskSummary(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/tasks/") + podIP + "/status")
            .map(res => {
                return res.json();
            })
            .map((task) => {
                return new TroubleshootStatus(task.taskId, task.status, task.duration, new Date(task.lastUpdated),
                    task.extraInfo, task.overallStatus)
            });
    }

    getOverallSummary(podIP:string) {
        return this.restService.get(this.restService.getBaseUrl("jmx/tasks/") + podIP + "/summary")
            .map(res => {
                return res.json();
            })
            .map((tasks:Array<any>)=> {
                let result:Array<TroubleshootStatus> = [];
                if (tasks) {
                    tasks.forEach((task)=> {
                        let troubleshootStatus = new TroubleshootStatus(task.taskId, task.status, task.duration, new Date(task.lastUpdated).toLocaleTimeString(),
                            task.extraInfo, task.overallStatus);
                        result.push(troubleshootStatus);
                    })
                }
                return result;
            });
    }
}