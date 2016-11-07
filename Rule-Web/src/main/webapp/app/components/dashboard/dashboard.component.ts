/**
 * @author Amila Paranawithana
 */
import {Component, ViewEncapsulation, Inject, ViewChild} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, Router} from "angular2/router";
import {DashHomeComponent} from "./dashhome.component";
import {UserComponent} from "./user/user.component";
import {RoleComponent} from "./role/role.component";
import {FeedbackComponent} from "./feedback.component";
import {AuditComponent} from "./audit/audit.component";
import {AuthService} from "../../services/auth.service";
import {JwtProvider} from "../../providers/jwt.provider";
import {UIService} from "../../services/ui.service";
import {AlertComponent} from "../../modules/alert/alert.component";
import {BuilderComponent} from "./builder/builder.component";
import {TourComponent} from "../../modules/tour/tour.component";
import {CepqueryComponent} from "./cepquery/cepquery.component";

declare let Tour:any;

@Component({
    templateUrl: './resources/template/dashboard.html',
    directives: [ROUTER_DIRECTIVES, FeedbackComponent, AlertComponent, TourComponent],
    providers: [AuthService],
    encapsulation: ViewEncapsulation.None

})

@RouteConfig([
    {
        path: '/',
        name: 'DashHome',
        component: DashHomeComponent
    },
    {
        path: '/user/...',
        name: 'User',
        component: UserComponent
    },
    {
        path: '/role/...',
        name: 'Role',
        component: RoleComponent
    },
    {
        path: '/cepquery/...',
        name: 'Cepquery',
        component: CepqueryComponent
    },
    {
        path: '/audit/...',
        name: 'Audit',
        component: AuditComponent
    },
    {
        path: '/builder',
        name: 'Builder',
        component: BuilderComponent
    }
])

export class DashboardComponent {
    username:string;

    @ViewChild(TourComponent)
    tourComponent:TourComponent;

    constructor(private authService:AuthService, private router:Router, @Inject(JwtProvider)
    private jwtProvider:JwtProvider,
                private uiService:UIService) {
        this.username = JwtProvider.getUserName();
    }

    ngAfterViewInit() {
        //this.tourService.startTour();
    }

    //handling drop down menu actions
    logout() {
        AuthService.logout();
    }

    toggleSidebar() {
        this.uiService.toggleSidebar();
    }

    ngOnInit() {
        this.uiService.initApp();
    }

    showTour() {
        this.tourComponent.showTourWindows();
    }
}


