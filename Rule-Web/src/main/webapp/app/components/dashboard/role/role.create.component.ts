/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Component, Inject} from "angular2/core";
import {Role} from "../../../models/role";
import {Permission} from "../../../models/permission";
import {PermissionService} from "../../../services/permission.service";
import {UIService} from "../../../services/ui.service";
import {RestService} from "../../../services/rest.service";
import {RoleService} from "../../../services/role.service";
import {Directory} from "../../../models/treeview/directory";
import {TreeView} from "../treeview/treeview.component";
import {RouteParams, Router} from "angular2/router";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AbstractComponent} from "../abstract.component";

@Component({
    selector: 'role-create-component',
    directives: [TreeView],
    templateUrl: '../../../../resources/template/dashboard/role/create.html',
    providers: [UIService, PermissionService, RestService, RoleService]
})

export class RoleCreateComponent extends AbstractComponent{
    permissions:Array<Permission> = [];
    role = new Role();
    directories:Directory[];
    private createNew:boolean = true;

    constructor(private permissionService:PermissionService, private roleService:RoleService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService, private _router:Router,
                private routeParam:RouteParams) {
        super();
        let roleId = routeParam.get('id');
        if (roleId) {
            this.createNew = false;
            this.fetchPermissions(roleId);
        } else {
            this.fetchPermissions("");
        }
    }

    fetchPermissions(roleId:string) {
        this.feedBackService.showPreloader = true;
        this.permissionService.getAll().subscribe(
            res=> {
                let permissionCategoryMap = {};
                for (var i = 0; i < res.length; i++) {
                    let permission:Permission = res[i];
                    if (permissionCategoryMap[permission.category] == null) {
                        permissionCategoryMap[permission.category] = new Directory(permission.category, [], [permission]);
                    } else {
                        permissionCategoryMap[permission.category].addPermission(permission);
                    }
                    this.permissions.push(permission);
                }


                let dirs:Array<Directory> = [];
                for (let key in permissionCategoryMap) {
                    dirs.push(permissionCategoryMap[key]);
                }
                this.directories = dirs;
                if (!this.createNew) {
                    this.fetchRole(roleId);
                } else {
                    this.feedBackService.showPreloader = false;
                }
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    onSubmitCreate() {
        this.feedBackService.showPreloader = true;
        this.repopulatePermissions();

        this.roleService.createRoll(this.role).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['RoleList']);
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    onSubmitEdit() {
        this.feedBackService.showPreloader = true;
        this.repopulatePermissions();

        this.roleService.editRoll(this.role).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['RoleList']);
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    private repopulatePermissions() {
        this.role.permissions = [];
        this.permissions.forEach((permission:Permission)=> {
            if (permission.checked) {
                this.role.permissions.push(permission.id);
            }
        });
    }

    private fetchRole(roleId:string) {
        this.roleService.getRole(parseInt(roleId)).subscribe(
            res => {
                this.role = res;
                if (this.permissions) {
                    for (var i = 0; i < this.permissions.length; i++) {
                        if (this.role.permissions.indexOf(this.permissions[i].id) > -1) {
                            this.permissions[i].check();
                        }
                    }
                }
                if (this.directories) {
                    for (var i = 0; i < this.directories.length; i++) {
                        this.directories[i].checkIfAllPermissionsSelected();
                    }
                }
                this.feedBackService.showPreloader = false;
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

}