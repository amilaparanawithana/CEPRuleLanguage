/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {NodeGroupService} from "../../../services/nodegroup.service";
import {RestService} from "../../../services/rest.service";
import {NodeGroup} from "../../../models/nodeGroup";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";

@Component({
    selector: 'nodegroup-list-component',
    templateUrl: '../../../../resources/template/dashboard/nodegroup/list.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RestService, NodeGroupService]
})

export class NodeGroupListComponent extends AbstractComponent{
    nodeGroups:Array<NodeGroup>;

    constructor(private nodeGroupService:NodeGroupService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService,
                private _router:Router) {
        super();
        this.fetchNodeGroups();
    }

    fetchNodeGroups() {
        this.feedBackService.showPreloader = true;
        this.nodeGroupService.getAll().subscribe(
            data=> {
                this.nodeGroups = [];
                if (data.length > 0) {
                    this.nodeGroups = data;
                } else {
                    this.feedBackService.warning = "No Node Groups are present at the moment"
                }
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    deleteNodeGroup(nodeGroupId:number) {
        this.alertService.showAlert(new AlertConfiguration("Do you really want to delete this Node Group?", "This action will refresh all clusters attached to this node group.", ()=> {
            this.feedBackService.showPreloader = true;
            this.nodeGroupService.deleteNodeGroup(nodeGroupId).subscribe(
                data=> {
                    this.fetchNodeGroups();
                    this.feedBackService.showPreloader = false;
                    this.feedBackService.success = data.json().msg;
                },
                err=> {
                    this.fetchNodeGroups();
                    super.handleServiceError(this.feedBackService, err);
                }
        )
        }));
    }

    modifyNodeGroup(nodeGroupId:number) {
        this.alertService.showAlert(new AlertConfiguration("Do you really want to modify this Node Group?", "Modification will refresh all clusters attached to this node group.", ()=> {
            this._router.navigate(['../NodeGroup',{id:nodeGroupId}]);
        }));
    }

    isEditableNodeGroup(nodeGroup:NodeGroup) {
        return nodeGroup.name != "all";
    }
}