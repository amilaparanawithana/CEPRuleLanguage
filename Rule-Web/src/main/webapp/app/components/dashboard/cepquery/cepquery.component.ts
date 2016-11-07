/**
 * @author amila Paranawithana
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {XmltoqueryComponent} from "./xmltoquery.component";
@Component({
    selector: 'cepquery-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/',
        name: 'Xmltoquery',
        component: XmltoqueryComponent
    }
])

export class CepqueryComponent {
}