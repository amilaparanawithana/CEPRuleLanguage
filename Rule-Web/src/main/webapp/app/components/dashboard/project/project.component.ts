/**
 * @author amila Paranawithana
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {ProjectListComponent} from "./project.list.component";
@Component({
    selector: 'project-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/',
        name: 'ProjectList',
        component: ProjectListComponent
    }
])

export class ProjectComponent {
}