/**
 * @author amila Paranawithana
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {XmltoqueryComponent} from "./xmltoquery.component";
import {QuerytoxmlComponent} from "./querytoxml.component";
@Component({
    selector: 'cepquery-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/Xmltoquery',
        name: 'Xmltoquery',
        component: XmltoqueryComponent
    },
    {
        path: '/Querytoxml',
        name: 'Querytoxml',
        component: QuerytoxmlComponent
    }
])

export class CepqueryComponent {
}