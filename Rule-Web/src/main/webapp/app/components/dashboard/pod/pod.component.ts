/**
 * @author: Dimuthu Upeksha
 * @author: Chathura Widanage
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {PodDetailComponent} from "./pod.detail.component";
import {PodLogComponent} from "./pod.log.component";

@Component({
    selector: 'pod-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/',
        name: 'PodDetail',
        component: PodDetailComponent,
        useAsDefault: true
    },
    {
        path: '/logs',
        name: 'PodLog',
        component: PodLogComponent
    }
])

export class PodComponent {
}