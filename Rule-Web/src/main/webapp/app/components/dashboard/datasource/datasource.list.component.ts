import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {TroubleshootTask} from "../../../models/TroubleshootTask";
import {UIService} from "../../../services/ui.service";
import {Cluster} from "../../../models/cluster";
import {ClusterService} from "../../../services/cluster.service";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {Pod} from "../../../models/pod";
import {DatasourceService} from "../../../services/datasource.service";
import {Datasource} from "../../../models/datasource";

@Component({
    selector: 'datasource-list-component',
    directives: [ROUTER_DIRECTIVES],
    providers: [DatasourceService, ClusterService],
    templateUrl: '../../../../resources/template/dashboard/datasource/list.html'
})
export class DatasourceListComponent {

    private datasources:Array<Datasource>;
    private datasourceMap:Map<string, Datasource> = {};

    selectedClusterId:number;
    selectedClusterName:string;
    clusters:Array<Cluster> = [];

    selectedPodId:number;
    selectedPodIP:string;
    pods:Array<Pod> = [];

    paramsMap = {};

    constructor(@Inject(DatasourceService)
                private datasourceService:DatasourceService,
                @Inject(UIService)
                private uiService:UIService,
                @Inject(ClusterService)
                private clusterService:ClusterService,
                @Inject(FeedBackService)
                private feedbackService:FeedBackService) {
        this.fetchClusterList();

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
                this.feedbackService.showPreloader = false;
                this.feedbackService.error = err.json().msg;
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
                    this.selectedPodIP = this.pods[0].podIP;
                    this.onPodSelect();
                }
                this.feedbackService.showPreloader = false;
            }
        )
    }

    private onPodSelect(value:number) {
        if (value) {
            this.selectedPodIP = this.pods[value].podIP;
        }
        this.feedbackService.showPreloader = true;
        this.datasourceService.getAll(this.selectedPodIP).subscribe(
            data => {
                this.datasources = data;
                data.forEach(pool => {
                    this.datasourceMap[pool.id] = pool;

                });
                this.feedbackService.showPreloader = false;
                console.log(this.datasourceMap);
            }
        );
    }
}