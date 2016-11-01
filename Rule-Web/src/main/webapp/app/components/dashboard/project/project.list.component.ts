/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Component, Inject} from "angular2/core";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../models/project";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RestService} from "../../../services/rest.service";
import {ClusterService} from "../../../services/cluster.service";
import {UserService} from "../../../services/user.service";
import {FeedBackService, FeedbackType} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";
@Component({
    selector: 'project-list-component',
    templateUrl: '../../../../resources/template/dashboard/project/list.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProjectService, RestService, ClusterService, UserService]
})

export class ProjectListComponent extends AbstractComponent {
    projects:Array<Project>;

    constructor(private projectService:ProjectService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService) {
        super();
        this.fetchProjects();
    }

    fetchProjects() {
        this.feedBackService.showPreloader = true;
        this.projectService.getAll().subscribe(
            data=> {
                this.projects = [];
                if (data.length > 0) {
                    this.projects = data;
                } else {
                    this.feedBackService.warning = "No Projects are present at the moment"
                }
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    deleteProject(projectId:number) {
        this.alertService.showAlert(new AlertConfiguration("Do you really want to delete this project?", "This action will delete all your configuration files uploaded under this project and this will also shutdown all the ultraesb instances relevant for this project.", ()=> {
            this.feedBackService.showPreloader = true;
            this.projectService.deleteProject(projectId).subscribe(
                data=> {
                    this.fetchProjects();
                    this.feedBackService.showPreloader = false;
                    this.feedBackService.success = data.json().msg;
                },
                err=> {
                    this.fetchProjects();
                    super.handleServiceError(this.feedBackService, err);
                }
            )
        }));

    }

}