/**
 * @author Chathura Widanage
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {ProjectCreateComponent} from "./project.create.component";
import {ProjectListComponent} from "./project.list.component";
import {ProjectConfigComponent} from "./project.config.component";
@Component({
    selector: 'project-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/:id',
        name: 'Project',
        component: ProjectConfigComponent
    },
    {
        path: '/',
        name: 'ProjectList',
        component: ProjectListComponent
    },
    {
        path: '/new',
        name: 'ProjectCreate',
        component: ProjectCreateComponent
    }
])

export class ProjectComponent {
}