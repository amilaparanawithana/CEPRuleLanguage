/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 * @author Amila Paranawithana
 */
import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {Cluster} from "../../../models/cluster";
import {ClusterService} from "../../../services/cluster.service";
import {RestService} from "../../../services/rest.service";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AbstractComponent} from "../abstract.component";
import {NodeGroup} from "../../../models/nodeGroup";
import {NodeGroupService} from "../../../services/nodegroup.service";
import {ServicePackage} from "../../../models/ServicePackage";
import {ServicePackageService} from "../../../services/servicepackage.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";

@Component({
    selector: 'cluster-create-component',
    templateUrl: '../../../../resources/template/dashboard/cluster/create.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ClusterService, RestService, NodeGroupService, ServicePackageService],
})

export class ClusterCreateComponent extends AbstractComponent{
    cluster:Cluster = new Cluster();
    nodeGroups:Array<NodeGroup>;
    servicePackages: Array<ServicePackage>;
    selectedNodeGroups:Array<number> = [];
    errorMsg = null;
    successMsg = null;
    clusterServicePackage = null;
    tempSp:ServicePackage;

    constructor(private clusterService:ClusterService, private nodeGroupService:NodeGroupService,
                private servicePackageService:ServicePackageService,
                @Inject(FeedBackService) private feedBackService:FeedBackService, private _router:Router,
                @Inject(AlertService) private alertService:AlertService) {
        super();
        this.loadNodeGroups();
        this.loadServicePackages();
    }

    private loadNodeGroups() {
        this.feedBackService.showPreloader = true;
        this.nodeGroupService.getAll().subscribe(
            data=> {
                this.nodeGroups = data;
                if (this.nodeGroups != null) {
                    let allNodeGroup:NodeGroup = this.nodeGroups.find(nodeGroup => "all" == nodeGroup.name);
                    if (allNodeGroup) {
                        allNodeGroup.check();
                    }
                }
                this.feedBackService.showPreloader = false;
            }, err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    private loadServicePackages(){
        this.feedBackService.showPreloader = true;
        this.servicePackageService.getAll().subscribe(
            data=> {
                this.servicePackages = data;
                this.feedBackService.showPreloader = false;
            }, err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    private onPackageChange(value:string){

        this.cluster.clusterServicePackage = parseInt(value);

        this.servicePackageService.getServicePackage(parseInt(value)).subscribe(
            data=> {
                this.tempSp = data;
                if(this.tempSp.packageLevel == "DEPLOY_ON_PUBLIC_NODES"){
                    this.nodeGroupService.fetchPublicNodeGroups().subscribe(
                        data=> {
                            this.nodeGroups = data;
                            this.feedBackService.showPreloader = false;
                        }, err=> {
                            super.handleServiceError(this.feedBackService, err);
                        }
                    );
                } else if (this.tempSp.packageLevel == "DEPLOY_ON_DEDICATED_NODES"){
                    this.nodeGroups = [];
                    //TODO pop up dedicated node set up selection details to fill
                }

                this.feedBackService.showPreloader = false;
            }, err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    onSubmit() {
        if (this.selectedNodeGroups.length == 0) {
            this.alertService.showAlert(new AlertConfiguration("Cluster has no Node Groups",
                "Please select at least one node group for this cluster.", null, "OK", false));
            return;
        }
        this.feedBackService.showPreloader = true;
        this.cluster.nodeGroups = this.selectedNodeGroups;
        var response = this.clusterService.createCluster(this.cluster);
        response.subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['ClusterList']);
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    isAddedNodeGroup(nodeGroupId:number) {
        var index = this.selectedNodeGroups.indexOf(nodeGroupId, 0);
        return index != -1;
    }

    addNodeGroup(nodeGroupId:number) {
        if (!this.isAddedNodeGroup(nodeGroupId)) {
            this.selectedNodeGroups.push(nodeGroupId);
        }
    }

    removeNodeGroup(nodeGroupId:number) {
        if (this.isAddedNodeGroup(nodeGroupId)) {
            var index = this.selectedNodeGroups.indexOf(nodeGroupId, 0);
            if (index != -1) {
                this.selectedNodeGroups.splice(index, 1);
            }
        }
    }
}