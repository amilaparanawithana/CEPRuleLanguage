/**
 * @author Amila Paranawithana
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {DatasourceViewComponent} from "./datasurce.view";
import {DatasourceListComponent} from "./datasource.list.component";
@Component({
    selector: 'datasource-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/:id/:podIP',
        name: 'DatasourceView',
        component: DatasourceViewComponent
    },
    {
        path: '/',
        name: 'DatasourceList',
        component: DatasourceListComponent
    },

])

export class DatasourceComponent {
}