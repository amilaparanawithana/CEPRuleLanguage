/**
 * @author Chathura Widanage
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {RoleCreateComponent} from "./role.create.component";
import {PermissionService} from "../../../services/permission.service";
import {RoleListComponent} from "./role.list.component";
@Component({
    selector: 'role-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [PermissionService]
})

@RouteConfig([
    {
        path: '/:id',
        name: 'RoleEdit',
        component: RoleCreateComponent
    },
    {
        path: "/",
        name: "RoleList",
        component: RoleListComponent
    },
    {
        path: "/new",
        name: 'RoleCreate',
        component: RoleCreateComponent
    }
])

export class RoleComponent {
}