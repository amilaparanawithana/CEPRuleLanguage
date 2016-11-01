/**
 * @author amila paranawithana
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {AuditListComponent} from "./audit.list.component";
@Component({
    selector: 'audit-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/',
        name: 'AuditList',
        component: AuditListComponent
    }
])

export class AuditComponent {
}