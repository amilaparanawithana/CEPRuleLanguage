import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {TroubleshootService} from "../../../services/troubleshoot.service";
import {TroubleshootTask} from "../../../models/TroubleshootTask";
import {UIService} from "../../../services/ui.service";
import {Cluster} from "../../../models/cluster";
import {ClusterService} from "../../../services/cluster.service";
import {FeedBackService, FeedbackType} from "../../../services/ui/feedback.service";
import {Pod} from "../../../models/pod";
import {TroubleshootLaunch} from "../../../models/TroubleshootLaunch";
import {TroubleshootStatus} from "../../../models/TroubleshootStatus";
import {AbstractComponent} from "../abstract.component";
declare let dragula:any, customTaskListContainer:any, allTaskListContainer:any, $:any

@Component({
    selector: 'TroubleshootComponent',
    directives: [ROUTER_DIRECTIVES],
    providers: [TroubleshootService, ClusterService],
    templateUrl: '../../../../resources/template/dashboard/troubleshoot/troubleshoot.html'
})
export class TroubleshootComponent extends AbstractComponent{

    private drake:any;

    private availableTasks:Array<TroubleshootTask>;
    private availableTasksMap:Map<string, TroubleshootTask> = {};
    private selectedTasks:Map<string, TroubleshootTask> = {};
    private hoveredTask:TroubleshootTask;
    private hoveredOnTask:boolean = false;

    private credentialMask:string;
    private password:string;
    private keyFactoryName:string;
    private cipherName:string;
    private outputFilePath:string;

    selectedClusterId:number;
    selectedClusterName:string;
    clusters:Array<Cluster> = [];

    selectedPodId:number;
    selectedPodIP:string;
    pods:Array<Pod> = [];

    paramsMap = {};

    interval:any;
    executionInProgress:boolean = false;

    currentTaskStatus:TroubleshootStatus = new TroubleshootStatus();
    overallStatus:Array<TroubleshootStatus>;


    constructor(@Inject(TroubleshootService)
                private troubleshootService:TroubleshootService,
                @Inject(UIService)
                private uiService:UIService,
                @Inject(ClusterService)
                private clusterService:ClusterService,
                @Inject(FeedBackService)
                private feedbackService:FeedBackService) {
        super();
        this.fetchClusterList();
        this.hoveredTask = new TroubleshootTask();
    }

    showModal(taskId:string) {
        $('#' + taskId).modal('show')
    }

    validateThreadDumpModelInput() {
        if (this.paramsMap.count && this.paramsMap.dumpPeriod) {
            $('#thread-dump').modal('hide');
        } else {
            return false;
        }
    }

    validateLoggerModelInput() {
        if (this.paramsMap.level && this.paramsMap.logger && this.paramsMap.period) {
            $('#detailed-logs').modal('hide');
        } else {
            return false;
        }
    }

    ngAfterViewInit() {
        this.drake = dragula([customTaskListContainer, allTaskListContainer], {
            isContainer: function (el) {
                return el.classList.contains('dragula-container'); // only elements in drake.containers will be taken into account
            },
            moves: function (el, source, handle, sibling) {
                return true;
            },
            accepts: function (el, target, source, sibling) {
                return true;
            },
            invalid: function (el, handle) {
                return false; // don't prevent any drags from initiating by default
            },
            copy: false,                       // elements are moved by default, not copied
            revertOnSpill: true,              // spilling will put the element back where it was dragged from, if this is true
        }).on('drag', function (el) {
        }).on('drop', (el, target, source, sibling) => {
            let taskId = el.id.trim().split(":")[1];
            if (source.id === 'allTaskListContainer' && target.id === 'customTaskListContainer') {
                this.selectedTasks[taskId] = this.availableTasksMap[taskId];
                this.showModal(taskId);
            }
            if (source.id === 'customTaskListContainer' && target.id === 'allTaskListContainer') {
                delete this.selectedTasks[taskId];
            }
        }).on('over', function (el, container) {
        }).on('out', function (el, container) {
        });
    }

    onMouseEnter(id:string) {
        this.hoveredOnTask = true;
        this.hoveredTask = this.availableTasksMap[id];
    }

    onMouseLeave(id:string) {
        this.hoveredOnTask = false;
        this.hoveredTask = new TroubleshootTask();
    }

    startTroubleshooting() {
        let troubleshootLaunch:TroubleshootLaunch = new TroubleshootLaunch(this.outputFilePath, this.credentialMask,
            this.password, this.keyFactoryName, this.cipherName);

        let task = {};
        for (var taskId in this.selectedTasks) {
            // task.id = taskId;
            let param = {};
            task[taskId] = param;
            if (taskId === 'detailed-logs') {
                if (this.paramsMap.level && this.paramsMap.logger && this.paramsMap.period) {
                    param.level = this.paramsMap.level;
                    param.logger = this.paramsMap.logger;
                    param.period = this.paramsMap.period;
                } else {
                    this.feedbackService.error = "Failed to execute troubleshoot task. One or more parameter value is missing for \'Detailed Log Sampling\' task.";
                    return;
                }

            } else if (taskId === 'thread-dump') {
                if (this.paramsMap.count && this.paramsMap.dumpPeriod) {
                    param.count = this.paramsMap.count;
                    param.period = this.paramsMap.dumpPeriod
                } else {
                    this.feedbackService.error = "Failed to execute troubleshoot task. One or more parameter value is missing for \'JVM Thread Dump\' task.";
                    return;
                }
            }
        }

        troubleshootLaunch.taskParamMap = task;
        this.troubleshootService.launchTask(troubleshootLaunch, this.selectedPodIP).subscribe(
            data => {
                this.feedbackService.showPreloader = true;
                this.overallStatus = null;
                this.currentTaskStatus = null;
                this.executionInProgress = true;
                this.interval = setInterval(()=> {
                    this.getCurrentTaskStatus();
                    this.getTaskExecutionSummary();
                }, 2000);
            },
            err => {
                super.handleServiceError(this.feedbackService, err);
            }
        )
    }


    private getCurrentTaskStatus() {
        this.troubleshootService.getCurrentTaskSummary(this.selectedPodIP).subscribe(
            (data:TroubleshootStatus) => {
                if (data.overallStatus === "SUCCESS") {
                    clearInterval(this.interval);
                    this.executionInProgress = false;
                    this.feedbackService.showPreloader = false;
                }
                this.currentTaskStatus = data;
            }, err => {
                super.handleServiceError(this.feedbackService, err);
            }
        );
    }

    private getTaskExecutionSummary() {
        this.troubleshootService.getOverallSummary(this.selectedPodIP).subscribe(
            data => {
                this.overallStatus = data;
            }, err => {
                super.handleServiceError(this.feedbackService, err);
            }
        );
    }

    private fetchClusterList() {
        this.feedbackService.showPreloader = true;
        this.clusterService.getAllClusters().subscribe(
            data => {
                this.clusters = [];
                if (data.length > 0) {
                    this.clusters = data;
                    this.selectedClusterId = this.clusters[0].id;
                    this.selectedClusterName = this.clusters[0].name;
                    this.onClusterSelect();
                } else {
                    this.feedbackService.warning = "No Clusters are present at the moment";
                }
                this.feedbackService.showPreloader = false;
            }, err => {
                super.handleServiceError(this.feedbackService, err);
            }
        )
    }

    private onClusterSelect(value:number) {
        if (value) {
            this.selectedClusterId = this.clusters[value].id;
            this.selectedClusterName = this.clusters[value].name;
        }
        this.feedbackService.showPreloader = true;
        this.clusterService.getPodsOfCluster(this.selectedClusterId).subscribe(
            data => {
                this.pods = [];
                if (data.length > 0) {
                    this.pods = data;
                    this.selectedPodIP = this.pods[0].podIP
                    this.onPodSelect();
                }
                this.feedbackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedbackService, err);
            }
        )
    }

    private onPodSelect(value:number) {
        if (value) {
            this.selectedPodIP = this.pods[value].podIP;
        }
        this.feedbackService.showPreloader = true;
        this.troubleshootService.getAvailableTasks(this.selectedPodIP).subscribe(
            data => {
                this.availableTasks = data;
                data.forEach(task => {
                    this.availableTasksMap[task.id] = task;
                });
                this.feedbackService.showPreloader = false;
            }, 
            err => {
                super.handleServiceError(this.feedbackService, err);
            }
        );
    }
}