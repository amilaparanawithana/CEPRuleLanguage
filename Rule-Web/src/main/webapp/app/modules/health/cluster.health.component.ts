/**
 * @author Sajth Dilshan
 */
import {Component} from "angular2/core";
import {ClusterHealthService} from "../../services/cluster.health.service";
import {ClusterService} from "../../services/cluster.service";
import {PodService} from "../../services/pod.service";
import {ClusterHealthResource} from "./cluster.health.resource";
import {FeedBackService} from "../../services/ui/feedback.service";
import {AbstractComponent} from "../../components/dashboard/abstract.component";
@Component({
    selector: 'cluster-health-component',
    templateUrl: '../../../resources/template/modules/health/cluster.health.html',
    providers: [ClusterHealthService, FeedBackService, ClusterService, PodService]
})
export class ClusterHealthComponent extends AbstractComponent{

    healthData = {};
    allData:any = null;

    interval:any;

    warnLevel:number = 60;
    criticalLevel:number = 90;
    requestProcessed:boolean = true;

    constructor(private feedbackService:FeedBackService, private clusterHealthService:ClusterHealthService) {
        this.initializeInterval();
    }

    initializeInterval() {
        console.log("init cluster health");
        this.fetchHealthData();
        this.interval = setInterval(()=> {
            this.fetchHealthData();
        }, 15000);
    }

    destroyInterval() {
        console.log("cleared cluster interval");
        clearInterval(this.interval);
    }

    fetchHealthData() {
        if (this.requestProcessed) {
            this.requestProcessed = false;
            this.clusterHealthService.getHealthOfSystem().subscribe(
                data => {
                    this.requestProcessed = true;
                    this.allData = [];
                    for (var i in data) {
                        let podList = data[i];
                        var clusterName = podList[0].clusterName;
                        for (var p in podList) {
                            let pod = podList[p];
                            let heap = parseFloat(pod.heapMemoryUsage);
                            let cpu = parseFloat(pod.processCpuLoad);
                            let fd = parseFloat(pod.openFileDescriptors);
                            let thread = parseFloat(pod.threadCount);

                            pod['barColour'] = 'green';
                            if (heap > this.warnLevel || fd > this.warnLevel ||
                                cpu > this.warnLevel || thread > this.warnLevel) {
                                pod['barColour'] = 'orange';
                            }
                            if (heap > this.criticalLevel || fd > this.criticalLevel ||
                                cpu > this.criticalLevel || thread > this.criticalLevel) {
                                pod['barColour'] = 'red';
                            }

                            pod['totalVal'] = ((heap + fd + cpu + thread) / 4).toFixed(3);
                        }

                        this.allData.push(new ClusterHealthResource(clusterName, podList));
                    }
                }, err => {
                    this.requestProcessed = true;
                    super.handleServiceError(this.feedbackService, err);
                }, () => {
                    this.requestProcessed = true;
                }
            );
        }

    }

}