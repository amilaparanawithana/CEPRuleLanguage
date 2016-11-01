/**
 * @author Amila Paranawithana
 */
import {Component} from "angular2/core";
import {UserService} from "../../../services/user.service";
import {RestService} from "../../../services/rest.service";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AbstractComponent} from "../abstract.component";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {Inject} from "angular2/core";
import {AlertService} from "../../../modules/alert/alert.service";
import {User} from "../../../models/user";
import {AlertConfiguration} from "../../../modules/alert/alert.component";

@Component({
    selector: 'list-user-component',
    templateUrl: '../../../../resources/template/dashboard/user/list.html',
    providers: [UserService, RestService],
    directives: [ROUTER_DIRECTIVES]
})

export class UserListComponent extends AbstractComponent {

    users:Array<User>;

    constructor(private userService:UserService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService) {
        super();
        this.fetchUsers();
    }

    fetchUsers() {
        this.feedBackService.showPreloader = true;
        this.userService.getAll().subscribe(
            data=> {
                if (data.length > 0) {
                    this.users = data;
                } else {
                    this.feedBackService.warning = "No Users are present at the moment"
                }
                this.feedBackService.showPreloader = false;
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    deleteUser(userId:number) {
        this.alertService.showAlert(new AlertConfiguration("Do you really want to delete this user?", "", ()=> {
            this.feedBackService.showPreloader = true;
            this.userService.deleteUser(userId).subscribe(
                data=> {
                    this.fetchUsers();
                    this.feedBackService.showPreloader = false;
                    this.feedBackService.success = data.json().msg;
                },
                err=> {
                    this.fetchUsers();
                    super.handleServiceError(this.feedBackService, err);
                }
            )
        }));
    }



}