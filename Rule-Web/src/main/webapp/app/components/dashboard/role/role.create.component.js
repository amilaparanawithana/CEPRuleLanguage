System.register(["angular2/core", "../../../models/role", "../../../services/permission.service", "../../../services/ui.service", "../../../services/rest.service", "../../../services/role.service", "../../../models/treeview/directory", "../treeview/treeview.component", "angular2/router", "../../../services/ui/feedback.service", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, role_1, permission_service_1, ui_service_1, rest_service_1, role_service_1, directory_1, treeview_component_1, router_1, feedback_service_1, abstract_component_1;
    var RoleCreateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (role_1_1) {
                role_1 = role_1_1;
            },
            function (permission_service_1_1) {
                permission_service_1 = permission_service_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (role_service_1_1) {
                role_service_1 = role_service_1_1;
            },
            function (directory_1_1) {
                directory_1 = directory_1_1;
            },
            function (treeview_component_1_1) {
                treeview_component_1 = treeview_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            RoleCreateComponent = (function (_super) {
                __extends(RoleCreateComponent, _super);
                function RoleCreateComponent(permissionService, roleService, feedBackService, _router, routeParam) {
                    _super.call(this);
                    this.permissionService = permissionService;
                    this.roleService = roleService;
                    this.feedBackService = feedBackService;
                    this._router = _router;
                    this.routeParam = routeParam;
                    this.permissions = [];
                    this.role = new role_1.Role();
                    this.createNew = true;
                    var roleId = routeParam.get('id');
                    if (roleId) {
                        this.createNew = false;
                        this.fetchPermissions(roleId);
                    }
                    else {
                        this.fetchPermissions("");
                    }
                }
                RoleCreateComponent.prototype.fetchPermissions = function (roleId) {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.permissionService.getAll().subscribe(function (res) {
                        var permissionCategoryMap = {};
                        for (var i = 0; i < res.length; i++) {
                            var permission = res[i];
                            if (permissionCategoryMap[permission.category] == null) {
                                permissionCategoryMap[permission.category] = new directory_1.Directory(permission.category, [], [permission]);
                            }
                            else {
                                permissionCategoryMap[permission.category].addPermission(permission);
                            }
                            _this.permissions.push(permission);
                        }
                        var dirs = [];
                        for (var key in permissionCategoryMap) {
                            dirs.push(permissionCategoryMap[key]);
                        }
                        _this.directories = dirs;
                        if (!_this.createNew) {
                            _this.fetchRole(roleId);
                        }
                        else {
                            _this.feedBackService.showPreloader = false;
                        }
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                RoleCreateComponent.prototype.onSubmitCreate = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.repopulatePermissions();
                    this.roleService.createRoll(this.role).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['RoleList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                RoleCreateComponent.prototype.onSubmitEdit = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.repopulatePermissions();
                    this.roleService.editRoll(this.role).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['RoleList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                RoleCreateComponent.prototype.repopulatePermissions = function () {
                    var _this = this;
                    this.role.permissions = [];
                    this.permissions.forEach(function (permission) {
                        if (permission.checked) {
                            _this.role.permissions.push(permission.id);
                        }
                    });
                };
                RoleCreateComponent.prototype.fetchRole = function (roleId) {
                    var _this = this;
                    this.roleService.getRole(parseInt(roleId)).subscribe(function (res) {
                        _this.role = res;
                        if (_this.permissions) {
                            for (var i = 0; i < _this.permissions.length; i++) {
                                if (_this.role.permissions.indexOf(_this.permissions[i].id) > -1) {
                                    _this.permissions[i].check();
                                }
                            }
                        }
                        if (_this.directories) {
                            for (var i = 0; i < _this.directories.length; i++) {
                                _this.directories[i].checkIfAllPermissionsSelected();
                            }
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                RoleCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'role-create-component',
                        directives: [treeview_component_1.TreeView],
                        templateUrl: '../../../../resources/template/dashboard/role/create.html',
                        providers: [ui_service_1.UIService, permission_service_1.PermissionService, rest_service_1.RestService, role_service_1.RoleService]
                    }),
                    __param(2, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [permission_service_1.PermissionService, role_service_1.RoleService, feedback_service_1.FeedBackService, router_1.Router, router_1.RouteParams])
                ], RoleCreateComponent);
                return RoleCreateComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("RoleCreateComponent", RoleCreateComponent);
        }
    }
});
//# sourceMappingURL=role.create.component.js.map