System.register(["angular2/core", "angular2/router", "../abstract.component", "../../../models/user", "../../../services/user.service", "../../../services/ui/feedback.service", "../../../services/ui.service", "../../../services/rest.service", "../../../services/role.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var core_1, router_1, abstract_component_1, user_1, user_service_1, feedback_service_1, core_2, router_2, router_3, ui_service_1, rest_service_1, role_service_1;
    var UserCreateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
                router_3 = router_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (role_service_1_1) {
                role_service_1 = role_service_1_1;
            }],
        execute: function() {
            UserCreateComponent = (function (_super) {
                __extends(UserCreateComponent, _super);
                function UserCreateComponent(userService, roleService, feedBackService, _router, routeParam) {
                    _super.call(this);
                    this.userService = userService;
                    this.roleService = roleService;
                    this.feedBackService = feedBackService;
                    this._router = _router;
                    this.routeParam = routeParam;
                    this.user = new user_1.User();
                    this.roles = [];
                    var userId = routeParam.get('id');
                    if (userId) {
                        this.updateMode = true;
                        this.user.id = parseInt(userId);
                    }
                    this.fetchRoles();
                }
                UserCreateComponent.prototype.fetchRoles = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.roleService.getAll().subscribe(function (data) {
                        _this.roles = data;
                        _this.feedBackService.showPreloader = false;
                        if (_this.updateMode) {
                            _this.fetchUser(_this.user.id);
                        }
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                UserCreateComponent.prototype.fetchUser = function (userId) {
                    var _this = this;
                    this.userService.getUser(userId).subscribe(function (data) {
                        _this.user = data;
                        _this.roles.forEach(function (role) {
                            if (_this.user.roles.indexOf(role.id) > -1) {
                                role.selected = true;
                            }
                        });
                        //clear current roles list in the user object
                        _this.user.roles = [];
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                UserCreateComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.roles.forEach(function (role) {
                        if (role.selected) {
                            _this.user.roles.push(role.id);
                        }
                    });
                    if (this.updateMode) {
                        this.onSubmitEdit();
                    }
                    else {
                        this.onSubmitCreate();
                    }
                };
                UserCreateComponent.prototype.onSubmitCreate = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.userService.createUser(this.user).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['UserList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                UserCreateComponent.prototype.onSubmitEdit = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.userService.editUser(this.user).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['UserList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                UserCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'new-user-component',
                        templateUrl: '../../../../resources/template/dashboard/user/create.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [ui_service_1.UIService, rest_service_1.RestService, user_service_1.UserService, role_service_1.RoleService]
                    }),
                    __param(2, core_2.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [user_service_1.UserService, role_service_1.RoleService, feedback_service_1.FeedBackService, router_2.Router, router_3.RouteParams])
                ], UserCreateComponent);
                return UserCreateComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("UserCreateComponent", UserCreateComponent);
        }
    }
});
//# sourceMappingURL=user.create.component.js.map