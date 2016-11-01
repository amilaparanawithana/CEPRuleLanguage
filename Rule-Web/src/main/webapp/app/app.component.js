System.register(["angular2/core", "angular2/router", "./components/dashboard/dashboard.component", "./components/auth/auth.component", "angular2/http", "./services/ui.service", "./services/ui/feedback.service", "./services/auth.service", "./services/rest.service", "./providers/jwt.provider", "./services/util.service", "./modules/alert/alert.service"], function(exports_1, context_1) {
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
    var core_1, router_1, dashboard_component_1, auth_component_1, http_1, ui_service_1, feedback_service_1, auth_service_1, rest_service_1, jwt_provider_1, util_service_1, alert_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (auth_component_1_1) {
                auth_component_1 = auth_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (jwt_provider_1_1) {
                jwt_provider_1 = jwt_provider_1_1;
            },
            function (util_service_1_1) {
                util_service_1 = util_service_1_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(uiService, router, authService) {
                    this.uiService = uiService;
                    this.router = router;
                    this.authService = authService;
                    this.router.subscribe(function (url) {
                        if (url.indexOf('auth/') !== 0 && !auth_service_1.AuthService.isAuthorized()) {
                            router.navigate(['/Auth/Login']);
                        }
                    });
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.uiService.initApp();
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'ips-app',
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [http_1.HTTP_PROVIDERS, ui_service_1.UIService, feedback_service_1.FeedBackService, alert_service_1.AlertService, auth_service_1.AuthService, rest_service_1.RestService, jwt_provider_1.JwtProvider, util_service_1.UtilService]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            redirectTo: ['/Auth', 'Login']
                        },
                        {
                            path: '/auth/...',
                            name: 'Auth',
                            component: auth_component_1.AuthComponent
                        },
                        {
                            path: '/dashboard/...',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [ui_service_1.UIService, router_1.Router, auth_service_1.AuthService])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map