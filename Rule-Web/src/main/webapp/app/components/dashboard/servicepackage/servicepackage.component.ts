/**
 * @author Amila Paranawithana
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, RouteConfig} from "angular2/router";
import {ServicePackageCreateComponent} from "./servicepackage.create.component";
import {ServicePackageListComponent} from "./servicepackage.list.component";
import {ServicePackageService} from "../../../services/servicepackage.service";
@Component({
    selector: 'service-package-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [ServicePackageService]
})

@RouteConfig([
    {
        path: '/:id',
        name: 'ServicePackageEdit',
        component: ServicePackageCreateComponent
    },
    {
        path: "/",
        name: "ServicePackageList",
        component: ServicePackageListComponent
    },
    {
        path: "/new",
        name: 'ServicePackageCreate',
        component: ServicePackageCreateComponent
    }
])

export class ServicePackageComponent {
}