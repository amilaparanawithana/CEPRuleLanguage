/**
 * @author Amila Paranawithana
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {AbstractComponent} from "../abstract.component";
import {User} from "../../../models/user";
import {UserService} from "../../../services/user.service";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {Inject} from "angular2/core";
import {Router} from "angular2/router";
import {RouteParams} from "angular2/router";
import {UIService} from "../../../services/ui.service";
import {RestService} from "../../../services/rest.service";
import {Role} from "../../../models/role";
import {RoleService} from "../../../services/role.service";
@Component({
    selector: 'new-user-component',
    templateUrl: '../../../../resources/template/dashboard/user/create.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [UIService, RestService, UserService, RoleService]
})

export class UserCreateComponent extends AbstractComponent {

    user = new User();
    updateMode:boolean;
    roles:Array<Role> = [];

    constructor(private userService:UserService,
                private roleService:RoleService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService, private _router:Router,
                private routeParam:RouteParams) {

        super();
        let userId = routeParam.get('id');

        if (userId) {
            this.updateMode = true;

            this.user.id = parseInt(userId);
        }
        this.fetchRoles();

    }

    fetchRoles() {
        this.feedBackService.showPreloader = true;
        this.roleService.getAll().subscribe(
            data=> {
                this.roles = data;
                this.feedBackService.showPreloader = false;
                if (this.updateMode) {
                    this.fetchUser(this.user.id);
                }
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchUser(userId:number) {
        this.userService.getUser(userId).subscribe(
            data=> {
                this.user = data;
                this.roles.forEach(role=> {
                    if (this.user.roles.indexOf(role.id) > -1) {
                        role.selected = true;
                    }
                });
                //clear current roles list in the user object
                this.user.roles = [];
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    onSubmit() {
        this.feedBackService.showPreloader = true;

        this.roles.forEach((role:Role)=> {
            if (role.selected) {
                this.user.roles.push(role.id);
            }
        });

        if (this.updateMode) {
            this.onSubmitEdit();
        } else {
            this.onSubmitCreate();
        }
    }

    onSubmitCreate() {
        this.feedBackService.showPreloader = true;

        this.userService.createUser(this.user).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['UserList']);
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    onSubmitEdit() {
        this.feedBackService.showPreloader = true;

        this.userService.editUser(this.user).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['UserList']);
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }
}