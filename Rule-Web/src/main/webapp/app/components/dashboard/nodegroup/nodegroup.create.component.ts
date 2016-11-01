/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {NodeGroupService} from "../../../services/nodegroup.service";
import {Node} from "../../../models/node";
import {NodeGroup} from "../../../models/nodeGroup";
import {RestService} from "../../../services/rest.service";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";

@Component({
    selector: 'nodegroup-create-component',
    templateUrl: '../../../../resources/template/dashboard/nodegroup/create.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [NodeGroupService, RestService],

})

export class NodeGroupCreateComponent extends AbstractComponent{
    nodeGroup:NodeGroup = new NodeGroup();
    nodes:Array<Node> = [];
    selectedNodes:Array<string> = [];
    errorMsg = null;
    successMsg = null;
    types:Array<string> = ["public","dedicated"];

    constructor(private nodeGroupService:NodeGroupService,
                @Inject(FeedBackService) private feedBackService:FeedBackService,
                @Inject(AlertService) private alertService:AlertService,
                private _router:Router) {
        super();
        this.fetchNodes();
    }

    isAddedNode(nodeName:string) {
        var index = this.selectedNodes.indexOf(nodeName, 0);
        if (index != -1) {
            return true;
        } else {
            return false;
        }
    }

    addAllNodes() {
        this.selectedNodes = [];
        this.nodes.forEach((node)=> {
            this.selectedNodes.push(node.nodeName)
        });
    }

    addNode(nodeName:string) {
        if (!this.isAddedNode(nodeName)) {
            this.selectedNodes.push(nodeName);
        }
    }

    removeNode(nodeName:string) {
        if (this.isAddedNode(nodeName)) {
            var index = this.selectedNodes.indexOf(nodeName, 0);
            if (index != -1) {
                this.selectedNodes.splice(index, 1);
            }
        }
    }

    fetchNodes() {
        this.feedBackService.showPreloader = true;
        this.nodeGroupService.getAllNodes().subscribe(
            data=> {
                this.nodes = [];
                if (data.length > 0) {
                    this.nodes = data;
                } else {
                    this.feedBackService.warning = "No Nodes are present at the moment"
                }
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    onLevelChange(type:string) {
        this.nodeGroup.type = type;
    }

    onSubmit() {
        if (this.selectedNodes.length == 0) {
            this.alertService.showAlert(new AlertConfiguration("Node Group cannot be empty",
                "Please select at least one node for this node group.", null, "OK", false));
            return;
        }
        this.feedBackService.showPreloader = true;
        this.nodeGroup.hostnames = this.selectedNodes;
        var response = this.nodeGroupService.createNodeGroup(this.nodeGroup);
        response.subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['NodeGroupList']);
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }
}