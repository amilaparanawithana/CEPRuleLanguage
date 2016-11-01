/**
 * @author Chathura Widanage
 */
import {Component, ViewEncapsulation} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {ClusterListComponent} from "./cluster.list.component";
import {ClusterCreateComponent} from "./cluster.create.component";
import {ClusterConfigComponent} from "./cluster.config.component";

@Component({
    selector: 'cluster-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    encapsulation: ViewEncapsulation.None
})

@RouteConfig([
    {
        path: '/:id',
        name: 'Cluster',
        component: ClusterConfigComponent
    },
    {
        path: '/',
        component: ClusterListComponent,
        name: 'ClusterList'
    },
    {
        path: '/new',
        component: ClusterCreateComponent,
        name: 'ClusterCreate'
    }
])

export class ClusterComponent {
}