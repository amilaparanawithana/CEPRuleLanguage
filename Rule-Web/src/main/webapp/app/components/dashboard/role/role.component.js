System.register(["angular2/core", "angular2/router", "./role.create.component", "../../../services/permission.service", "./role.list.component"], function(exports_1, context_1) {
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
    var core_1, router_1, role_create_component_1, permission_service_1, role_list_component_1;
    var RoleComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (role_create_component_1_1) {
                role_create_component_1 = role_create_component_1_1;
            },
            function (permission_service_1_1) {
                permission_service_1 = permission_service_1_1;
            },
            function (role_list_component_1_1) {
                role_list_component_1 = role_list_component_1_1;
            }],
        execute: function() {
            RoleComponent = (function () {
                function RoleComponent() {
                }
                RoleComponent = __decorate([
                    core_1.Component({
                        selector: 'role-component',
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [permission_service_1.PermissionService]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/:id',
                            name: 'RoleEdit',
                            component: role_create_component_1.RoleCreateComponent
                        },
                        {
                            path: "/",
                            name: "RoleList",
                            component: role_list_component_1.RoleListComponent
                        },
                        {
                            path: "/new",
                            name: 'RoleCreate',
                            component: role_create_component_1.RoleCreateComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], RoleComponent);
                return RoleComponent;
            }());
            exports_1("RoleComponent", RoleComponent);
        }
    }
});
//# sourceMappingURL=role.component.js.map