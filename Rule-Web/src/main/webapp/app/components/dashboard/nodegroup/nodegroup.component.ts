/**
 * @author Chathura Widanage
 */
import {Component, ViewEncapsulation} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {NodeGroupListComponent} from "./nodegroup.list.component";
import {NodeGroupCreateComponent} from "./nodegroup.create.component";
import {NodeGroupConfigComponent} from "./nodegroup.config.component";

@Component({
    selector: 'nodegroup-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    encapsulation: ViewEncapsulation.None
})

@RouteConfig([
    {
        path: '/:id',
        name: 'NodeGroup',
        component: NodeGroupConfigComponent
    },
    {
        path: '/',
        component: NodeGroupListComponent,
        name: 'NodeGroupList'
    },
    {
        path: '/new',
        component: NodeGroupCreateComponent,
        name: 'NodeGroupCreate'
    }
])

export class NodeGroupComponent {
}