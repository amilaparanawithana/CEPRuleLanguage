/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {UIService} from "../../../services/ui.service";
import {Project} from "../../../models/project";
import {ClusterService} from "../../../services/cluster.service";
import {Cluster} from "../../../models/cluster";
import {RestService} from "../../../services/rest.service";
import {ProjectService} from "../../../services/project.service";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AbstractComponent} from "../abstract.component";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";

@Component({
    selector: 'project-create-component',
    directives: [ROUTER_DIRECTIVES],
    templateUrl: '../../../../resources/template/dashboard/project/create.html',
    providers: [UIService, ClusterService, RestService, ProjectService, UserService],
    styleUrls: [
        "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css"
    ]
})

export class ProjectCreateComponent extends AbstractComponent {

    project = new Project();
    clusters:Array<Cluster>;
    users:Array<User>;
    errorMsg = null;
    successMsg = null;
    clusterId:number;

    constructor(private uiService:UIService, private clusterService:ClusterService,
                private userService:UserService, private projectService:ProjectService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService, private _router:Router) {
        super();
        this.loadClusters();
        this.loadUsers();
    }

    private loadClusters() {
        console.log("loading clusters..");
        this.feedBackService.showPreloader = true;
        this.clusterService.getAllClusters().subscribe(
            data=> {
                this.clusters = data;
                //Initial selected value
                if (this.clusters != null && this.clusters.length > 0) {
                    this.project.clusterId = this.clusters[0].id;
                }
                this.feedBackService.showPreloader = false;
            }, err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    onSubmit() {
        this.feedBackService.showPreloader = true;
        this.users.forEach((user:User)=> {
            if (user.selected) {
                this.project.users.push(user.id);
            }
        });
        this.projectService.createProject(this.project).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['ProjectList']);
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    private loadUsers() {
        this.feedBackService.showPreloader = true;
        this.userService.getAll().subscribe(
            data=> {
                this.users = data;
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        console.log(this.users);
    }

    /**
     * A temp fix till angular2 fix the bug of <select>
     * @param cId
     */
    setClusterId(cId) {
        this.project.clusterId = parseInt(cId);
    }
}