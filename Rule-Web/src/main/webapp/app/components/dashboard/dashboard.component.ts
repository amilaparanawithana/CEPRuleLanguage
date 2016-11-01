/**
 * @author Chathura Widanage
 */
import {Component, ViewEncapsulation, Inject, ViewChild} from "angular2/core";
import {RouteConfig, ROUTER_DIRECTIVES, Router} from "angular2/router";
import {DashHomeComponent} from "./dashhome.component";
import {ClusterComponent} from "./cluster/cluster.component";
import {NodeGroupComponent} from "./nodegroup/nodegroup.component";
import {UserComponent} from "./user/user.component";
import {RoleComponent} from "./role/role.component";
import {ProjectComponent} from "./project/project.component";
import {PodComponent} from "./pod/pod.component";
import {FeedbackComponent} from "./feedback.component";
import {AuditComponent} from "./audit/audit.component";
import {AuthService} from "../../services/auth.service";
import {JwtProvider} from "../../providers/jwt.provider";
import {UIService} from "../../services/ui.service";
import {AlertComponent} from "../../modules/alert/alert.component";
import {BuilderComponent} from "./builder/builder.component";
import {PodLogComponent} from "./pod/pod.log.component";
import {TourComponent} from "../../modules/tour/tour.component";
import {ClusterLoggerListComponent} from "./cluster/cluster.logger.list.component";
import {TroubleshootComponent} from "./troubleshoot/troubleshoot.component";
import {DatasourceComponent} from "./datasource/datasource.component";
import {ServicePackageComponent} from "./servicepackage/servicepackage.component";

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
        path: '/cluster/...',
        name: 'Cluster',
        component: ClusterComponent
    },
    {
        path: '/role/...',
        name: 'Role',
        component: RoleComponent
    },
    {
        path: '/project/...',
        name: 'Project',
        component: ProjectComponent
    },
    {
        path: '/pod/:id/:name/...',
        name: 'Pod',
        component: PodComponent
    },
    {
        path: '/podlog',
        name: 'AllPodLogs',
        component: PodLogComponent
    },
    {
        path: '/loggers',
        name: 'ClusterLoggers',
        component: ClusterLoggerListComponent
    },
    {
        path: '/troubleshoot',
        name: 'Troubleshoot',
        component: TroubleshootComponent
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
    },
    {
        path: '/datasource/...',
        name: 'Datasource',
        component: DatasourceComponent
    },
    {
        path: '/nodegroup/...',
        name: 'NodeGroup',
        component: NodeGroupComponent
    },
    {
        path: '/servicepackage/...',
        name: 'ServicePackage',
        component: ServicePackageComponent
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


