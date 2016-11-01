/**
 * @author Chathura Widanage
 */
import {Component} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, Router} from "angular2/router";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {AuthComponent} from "./components/auth/auth.component";
import {HTTP_PROVIDERS} from "angular2/http";
import {UIService} from "./services/ui.service";
import {FeedBackService} from "./services/ui/feedback.service";
import {AuthService} from "./services/auth.service";
import {RestService} from "./services/rest.service";
import {JwtProvider} from "./providers/jwt.provider";
import {UtilService} from "./services/util.service";
import {AlertService} from "./modules/alert/alert.service";

@Component({
    selector: 'ips-app',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [HTTP_PROVIDERS, UIService, FeedBackService, AlertService, AuthService, RestService, JwtProvider, UtilService]
})

@RouteConfig([
    {
        path: '/',
        redirectTo: ['/Auth', 'Login']
    },
    {
        path: '/auth/...',
        name: 'Auth',
        component: AuthComponent
    },
    {
        path: '/dashboard/...',
        name: 'Dashboard',
        component: DashboardComponent
    }

])

export class AppComponent {
    constructor(private uiService:UIService, private router:Router, private authService:AuthService) {
        this.router.subscribe((url)=> {
            if (url.indexOf('auth/') !== 0 && !AuthService.isAuthorized()) {
                router.navigate(['/Auth/Login']);
            }
        });
    }

    ngOnInit() {
        this.uiService.initApp();
    }
}