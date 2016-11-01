/**
 * @author Chathura Widanage
 */
import {Component, Inject} from "angular2/core";
import {RoleService} from "../../../services/role.service";
import {RestService} from "../../../services/rest.service";
import {Role} from "../../../models/role";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";

@Component({
    selector: 'role-list-component',
    templateUrl: '../../../../resources/template/dashboard/role/list.html',
    providers: [RoleService, RestService],
    directives: [ROUTER_DIRECTIVES]
})

export class RoleListComponent extends AbstractComponent {
    roles:Array<Role>;

    constructor(private roleService:RoleService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService) {
        super();
        this.fetchRolls();
    }

    fetchRolls() {
        this.feedBackService.showPreloader = true;
        this.roleService.getAll().subscribe(
            data=> {
                if (data.length > 0) {
                    this.roles = data;
                } else {
                    this.feedBackService.warning = "No Roles are present at the moment"
                }
                this.feedBackService.showPreloader = false;
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    deleteRoll(roleId:number) {
        this.alertService.showAlert(new AlertConfiguration("Do you really want to delete this roll?", "", ()=> {
            this.feedBackService.showPreloader = true;
            this.roleService.deleteRoll(roleId).subscribe(
                data=> {
                    this.fetchRolls();
                    this.feedBackService.showPreloader = false;
                    this.feedBackService.success = data.json().msg;
                },
                err=> {
                    this.fetchRolls();
                    super.handleServiceError(this.feedBackService, err);
                }
            )
        }));
    }


}