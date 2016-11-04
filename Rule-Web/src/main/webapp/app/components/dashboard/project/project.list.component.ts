/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Component, Inject} from "angular2/core";
import {ProjectService} from "../../../services/project.service";
import {Project} from "../../../models/project";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RestService} from "../../../services/rest.service";
import {UserService} from "../../../services/user.service";
import {FeedBackService, FeedbackType} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";
@Component({
    selector: 'project-list-component',
    templateUrl: '../../../../resources/template/dashboard/project/list.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [ProjectService, RestService, UserService]
})

export class ProjectListComponent extends AbstractComponent {
    projects:Array<Project>;

    constructor(private projectService:ProjectService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService) {
        super();
    }

}