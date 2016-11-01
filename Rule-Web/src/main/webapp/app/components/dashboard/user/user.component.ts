/**
 * @author Chathura Widanage
 */
import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES} from "angular2/router";
import {UserListComponent} from "./user.list.component";
import {UserCreateComponent} from "./user.create.component";
@Component({
    selector: 'user-component',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    {
        path: '/',
        component: UserListComponent,
        name: 'UserList'
    },
    {
        path: '/UserCreate',
        component: UserCreateComponent,
        name: 'UserCreate'
    },
    {
        path: '/:id',
        name: 'UserEdit',
        component: UserCreateComponent
    },
])

export class UserComponent {
}