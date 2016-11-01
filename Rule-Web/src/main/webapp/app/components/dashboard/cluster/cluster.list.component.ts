/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {ClusterService} from "../../../services/cluster.service";
import {NodeGroupService} from "../../../services/nodegroup.service";
import {RestService} from "../../../services/rest.service";
import {Cluster} from "../../../models/cluster";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";
import {NodeGroup} from "../../../models/nodeGroup";
@Component({
    selector: 'cluster-list-component',
    templateUrl: '../../../../resources/template/dashboard/cluster/list.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RestService, ClusterService, NodeGroupService]
})

export class ClusterListComponent extends AbstractComponent{
    clusters:Array<Cluster> = [];
    nodeGroups:Array<NodeGroup> = [];

    constructor(private clusterService:ClusterService,
                @Inject(NodeGroupService)
                private nodeGroupService:NodeGroupService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService) {
        super();
        this.loadNodeGroups();  // rendering of clusters requires node group data
    }

    loadNodeGroups() {
        this.nodeGroupService.getAll().subscribe(
            data => {
                data.forEach((nodeGroup:NodeGroup) => {
                    this.nodeGroups[nodeGroup.id] = nodeGroup;
                });
                this.loadClusters();
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    loadClusters() {
        this.feedBackService.showPreloader = true;
        this.clusterService.getAllClusters().subscribe(
            data => {
                if (data.length > 0) {
                    this.clusters = data;
                } else {
                    this.feedBackService.warning = "No Clusters are present at the moment"
                }
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    deleteCluster(clusterId:number) {
        this.alertService.showAlert(new AlertConfiguration("Are you sure?", "Do you really want to delete this cluster?", ()=> {
            this.feedBackService.showPreloader = true;
            this.clusterService.deleteCluster(clusterId).subscribe(
                data=> {
                    this.loadClusters();
                    this.feedBackService.showPreloader = false;
                    this.feedBackService.success = data.json().msg;
                },
                err=> {
                    this.loadClusters();
                    super.handleServiceError(this.feedBackService, err);
                }
            )
        }))
    }
}