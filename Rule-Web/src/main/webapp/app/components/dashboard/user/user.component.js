System.register(["angular2/core", "angular2/router", "./user.list.component", "./user.create.component"], function(exports_1, context_1) {
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
    var core_1, router_1, user_list_component_1, user_create_component_1;
    var UserComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_list_component_1_1) {
                user_list_component_1 = user_list_component_1_1;
            },
            function (user_create_component_1_1) {
                user_create_component_1 = user_create_component_1_1;
            }],
        execute: function() {
            UserComponent = (function () {
                function UserComponent() {
                }
                UserComponent = __decorate([
                    core_1.Component({
                        selector: 'user-component',
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            component: user_list_component_1.UserListComponent,
                            name: 'UserList'
                        },
                        {
                            path: '/UserCreate',
                            component: user_create_component_1.UserCreateComponent,
                            name: 'UserCreate'
                        },
                        {
                            path: '/:id',
                            name: 'UserEdit',
                            component: user_create_component_1.UserCreateComponent
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], UserComponent);
                return UserComponent;
            }());
            exports_1("UserComponent", UserComponent);
        }
    }
});
//# sourceMappingURL=user.component.js.map