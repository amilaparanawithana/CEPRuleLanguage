/**
 * @author amila karunathilaka
 */
import {Component} from "angular2/core";
import {FeedBackService} from "../../services/ui/feedback.service";
import {NodeHealthService} from "../../services/node.health.service";
import {AbstractComponent} from "../../components/dashboard/abstract.component";
@Component({
    selector: 'node-health-component',
    templateUrl: '../../../resources/template/modules/health/node.health.html',
    providers: [NodeHealthService, FeedBackService]
})
export class NodeHealthComponent extends AbstractComponent {

    healthData = {};
    allData = [];
    capacityType = [" B", " KB", " MB", " GB", " TB"];

    interval:any;

    warnLevel:number = 60;
    criticalLevel:number = 90;
    requestProcessed:boolean = true;

    constructor(private feedbackService:FeedBackService, private nodeHealthService:NodeHealthService) {
        this.initializeInterval();
    }

    initializeInterval() {
        this.fetchHealthData();
        this.interval = setInterval(()=> {
            this.fetchHealthData();
        }, 15000);
    }

    destroyInterval() {
        clearInterval(this.interval);
    }

    fetchHealthData() {
        if (this.requestProcessed) {
            this.requestProcessed = false;
            this.nodeHealthService.getHealthOfNode().subscribe(
                data => {
                    this.requestProcessed = true;
                    this.allData = [];
                    for (var i in data) {
                        let node = data[i];
                        let cpuUsage = parseInt(node.cpuUsage);
                        let memoryUsage = parseInt(node.memoryUsage) / parseInt(node.memoryCapacity) * 100;
                        let totalUsage = cpuUsage + memoryUsage;
                        let numofStats = 2;
                        node.memoryUsage = this.getCapacityType(node.memoryUsage);
                        node.memoryCapacity = this.getCapacityType(node.memoryCapacity);
                        for (var p in node.fileSystem) {
                            let fileSystem = node.fileSystem[p];
                            let fileSystemUsage =
                                (parseInt(fileSystem.fileSystemUsage) / parseInt(fileSystem.fileSystemCapacity)) * 100;
                            totalUsage += fileSystemUsage;
                            numofStats++;
                            fileSystem.fileSystemUsage = this.getCapacityType(fileSystem.fileSystemUsage);
                            fileSystem.fileSystemCapacity = this.getCapacityType(fileSystem.fileSystemCapacity);

                            node['barColour'] = 'green';
                            if (fileSystemUsage > this.warnLevel) {
                                node['barColour'] = 'orange';
                            }
                            if (fileSystemUsage > this.criticalLevel) {
                                node['barColour'] = 'red';
                            }
                        }
                        if (memoryUsage > this.warnLevel || cpuUsage > this.warnLevel) {
                            node['barColour'] = 'orange';
                        }
                        if (memoryUsage > this.criticalLevel || cpuUsage > this.criticalLevel) {
                            node['barColour'] = 'red';
                        }
                        node['totalVal'] = (totalUsage / numofStats).toFixed(3);
                    }
                    this.allData = data;
                }, err => {
                    this.requestProcessed = true;
                    super.handleServiceError(this.feedbackService, err);
                }, () => {
                    this.requestProcessed = true;
                }
            );
        }
    }

    getCapacityType(value:number) {
        let index:number = 0;
        while (value >= 1e3) {
            index++;
            value = parseFloat((value / 1e3).toFixed(2));
        }
        return value + this.capacityType[index];
    }

}