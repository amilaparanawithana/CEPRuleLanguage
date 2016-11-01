/**
 * @author Amila Paranawithana
 */
System.register(["angular2/core", "angular2/router", "../../models/tenant", "../../services/rest.service", "../../services/auth.service", "../../models/user"], function(exports_1, context_1) {
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
    var core_1, router_1, tenant_1, rest_service_1, auth_service_1, user_1;
    var RegisterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tenant_1_1) {
                tenant_1 = tenant_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            RegisterComponent = (function () {
                function RegisterComponent(authService) {
                    this.authService = authService;
                    this.tenant = new tenant_1.Tenant();
                    this.tenantAdmin = new user_1.User();
                    this.errorMsg = null;
                }
                RegisterComponent.prototype.doRegister = function () {
                    console.log("came to register........");
                    this.tenant.admin = this.tenantAdmin;
                    console.log(this.tenant);
                    var response = this.authService.register(this.tenant);
                    response.subscribe(function (data) { return console.log(data); }, function (err) { return console.log(err); }, function () { return console.log('Tenant Created'); });
                    window.location.assign("#/auth/login");
                    window.location.reload();
                };
                RegisterComponent.prototype.dismissError = function () {
                    this.errorMsg = null;
                };
                RegisterComponent = __decorate([
                    core_1.Component({
                        selector: 'register-component',
                        templateUrl: '../../../resources/template/auth/register.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [rest_service_1.RestService, auth_service_1.AuthService]
                    }), 
                    __metadata('design:paramtypes', [auth_service_1.AuthService])
                ], RegisterComponent);
                return RegisterComponent;
            }());
            exports_1("RegisterComponent", RegisterComponent);
        }
    }
});
//# sourceMappingURL=register.component.js.map