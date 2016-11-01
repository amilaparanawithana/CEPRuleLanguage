/**
 * @author Chathura Widanage
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {PermissionService} from "../../../services/permission.service";
@Component({
    selector: 'permission-component',
    directives: [ROUTER_DIRECTIVES],
    providers: [PermissionService]
})

@RouteConfig([
    {
        path: "/"
    }
])

export class PermissionComponent {
}