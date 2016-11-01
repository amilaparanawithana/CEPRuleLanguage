/**
 * @author Amila Paranawithana
 * @author Chathura Widanage
 */
import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES, Router} from "angular2/router";
import {UIService} from "../../services/ui.service";
import {AuthService} from "../../services/auth.service";
import {RestService} from "../../services/rest.service";
import {JwtProvider} from "../../providers/jwt.provider";
import {Auth} from "../../models/auth";

@Component({
    selector: 'login-component',
    templateUrl: '../../../resources/template/auth/login.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [AuthService, RestService, UIService]
})

export class LoginComponent {

    auth:Auth = new Auth();
    loginError:string = null;
    submitted:boolean = false;

    constructor(private authService:AuthService, private _router:Router, private jwtProvider:JwtProvider) {
        if (AuthService.isAuthorized()) {
            this.navigateToDashboard();
        }
    }

    doLogin() {
        this.submitted = true;
        JwtProvider.saveUserName(LoginComponent.firstToUpperCase(this.auth.username));
        this.authService.login(this.auth).subscribe(
            data => {
                var token = data.msg;
                JwtProvider.saveToken(token);
                this.navigateToDashboard();
            },
            err => {
                this.submitted = false;
                this.loginError = err.json().msg;
            },
            () => {}
        );
    }

    private navigateToDashboard() {
        this._router.navigate(['/Dashboard/DashHome']);
    }

    dismissError() {
        this.loginError = null;
    }

    private static firstToUpperCase(str) {
        return str.substr(0, 1).toUpperCase() + str.substr(1);
    }
}