/**
 * @author Chathura Widanage
 */
import {Component, ViewEncapsulation} from "angular2/core";
import {RouteConfig, RouterOutlet} from "angular2/router";
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "./register.component";

@Component({
    selector: 'auth-component',
    templateUrl: '../../../resources/template/auth/auth.html',
    encapsulation: ViewEncapsulation.None,
    directives: [RouterOutlet]
})

@RouteConfig([
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterComponent
    }
])


export class AuthComponent {

}