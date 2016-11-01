System.register(["angular2/core", "angular2/router", "./dashhome.component", "./cluster/cluster.component", "./nodegroup/nodegroup.component", "./user/user.component", "./role/role.component", "./project/project.component", "./pod/pod.component", "./feedback.component", "./audit/audit.component", "../../services/auth.service", "../../providers/jwt.provider", "../../services/ui.service", "../../modules/alert/alert.component", "./builder/builder.component", "./pod/pod.log.component", "../../modules/tour/tour.component", "./cluster/cluster.logger.list.component", "./troubleshoot/troubleshoot.component", "./datasource/datasource.component", "./servicepackage/servicepackage.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, dashhome_component_1, cluster_component_1, nodegroup_component_1, user_component_1, role_component_1, project_component_1, pod_component_1, feedback_component_1, audit_component_1, auth_service_1, jwt_provider_1, ui_service_1, alert_component_1, builder_component_1, pod_log_component_1, tour_component_1, cluster_logger_list_component_1, troubleshoot_component_1, datasource_component_1, servicepackage_component_1;
    var DashboardComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashhome_component_1_1) {
                dashhome_component_1 = dashhome_component_1_1;
            },
            function (cluster_component_1_1) {
                cluster_component_1 = cluster_component_1_1;
            },
            function (nodegroup_component_1_1) {
                nodegroup_component_1 = nodegroup_component_1_1;
            },
            function (user_component_1_1) {
                user_component_1 = user_component_1_1;
            },
            function (role_component_1_1) {
                role_component_1 = role_component_1_1;
            },
            function (project_component_1_1) {
                project_component_1 = project_component_1_1;
            },
            function (pod_component_1_1) {
                pod_component_1 = pod_component_1_1;
            },
            function (feedback_component_1_1) {
                feedback_component_1 = feedback_component_1_1;
            },
            function (audit_component_1_1) {
                audit_component_1 = audit_component_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (jwt_provider_1_1) {
                jwt_provider_1 = jwt_provider_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            },
            function (builder_component_1_1) {
                builder_component_1 = builder_component_1_1;
            },
            function (pod_log_component_1_1) {
                pod_log_component_1 = pod_log_component_1_1;
            },
            function (tour_component_1_1) {
                tour_component_1 = tour_component_1_1;
            },
            function (cluster_logger_list_component_1_1) {
                cluster_logger_list_component_1 = cluster_logger_list_component_1_1;
            },
            function (troubleshoot_component_1_1) {
                troubleshoot_component_1 = troubleshoot_component_1_1;
            },
            function (datasource_component_1_1) {
                datasource_component_1 = datasource_component_1_1;
            },
            function (servicepackage_component_1_1) {
                servicepackage_component_1 = servicepackage_component_1_1;
            }],
        execute: function() {
            DashboardComponent = (function () {
                function DashboardComponent(authService, router, jwtProvider, uiService) {
                    this.authService = authService;
                    this.router = router;
                    this.jwtProvider = jwtProvider;
                    this.uiService = uiService;
                    this.username = jwt_provider_1.JwtProvider.getUserName();
                }
                DashboardComponent.prototype.ngAfterViewInit = function () {
                    //this.tourService.startTour();
                };
                //handling drop down menu actions
                DashboardComponent.prototype.logout = function () {
                    auth_service_1.AuthService.logout();
                };
                DashboardComponent.prototype.toggleSidebar = function () {
                    this.uiService.toggleSidebar();
                };
                DashboardComponent.prototype.ngOnInit = function () {
                    this.uiService.initApp();
                };
                DashboardComponent.prototype.showTour = function () {
                    this.tourComponent.showTourWindows();
                };
                __decorate([
                    core_1.ViewChild(tour_component_1.TourComponent), 
                    __metadata('design:type', tour_component_1.TourComponent)
                ], DashboardComponent.prototype, "tourComponent", void 0);
                DashboardComponent = __decorate([
                    core_1.Component({
                        templateUrl: './resources/template/dashboard.html',
                        directives: [router_1.ROUTER_DIRECTIVES, feedback_component_1.FeedbackComponent, alert_component_1.AlertComponent, tour_component_1.TourComponent],
                        providers: [auth_service_1.AuthService],
                        encapsulation: core_1.ViewEncapsulation.None
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'DashHome',
                            component: dashhome_component_1.DashHomeComponent
                        },
                        {
                            path: '/user/...',
                            name: 'User',
                            component: user_component_1.UserComponent
                        },
                        {
                            path: '/cluster/...',
                            name: 'Cluster',
                            component: cluster_component_1.ClusterComponent
                        },
                        {
                            path: '/role/...',
                            name: 'Role',
                            component: role_component_1.RoleComponent
                        },
                        {
                            path: '/project/...',
                            name: 'Project',
                            component: project_component_1.ProjectComponent
                        },
                        {
                            path: '/pod/:id/:name/...',
                            name: 'Pod',
                            component: pod_component_1.PodComponent
                        },
                        {
                            path: '/podlog',
                            name: 'AllPodLogs',
                            component: pod_log_component_1.PodLogComponent
                        },
                        {
                            path: '/loggers',
                            name: 'ClusterLoggers',
                            component: cluster_logger_list_component_1.ClusterLoggerListComponent
                        },
                        {
                            path: '/troubleshoot',
                            name: 'Troubleshoot',
                            component: troubleshoot_component_1.TroubleshootComponent
                        },
                        {
                            path: '/audit/...',
                            name: 'Audit',
                            component: audit_component_1.AuditComponent
                        },
                        {
                            path: '/builder',
                            name: 'Builder',
                            component: builder_component_1.BuilderComponent
                        },
                        {
                            path: '/datasource/...',
                            name: 'Datasource',
                            component: datasource_component_1.DatasourceComponent
                        },
                        {
                            path: '/nodegroup/...',
                            name: 'NodeGroup',
                            component: nodegroup_component_1.NodeGroupComponent
                        },
                        {
                            path: '/servicepackage/...',
                            name: 'ServicePackage',
                            component: servicepackage_component_1.ServicePackageComponent
                        }
                    ]),
                    __param(2, core_1.Inject(jwt_provider_1.JwtProvider)), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService, router_1.Router, jwt_provider_1.JwtProvider, ui_service_1.UIService])
                ], DashboardComponent);
                return DashboardComponent;
            }());
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map