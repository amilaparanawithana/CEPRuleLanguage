System.register(["angular2/core", "angular2/http", "./rest.service", "../models/role"], function(exports_1, context_1) {
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
    var core_1, http_1, rest_service_1, role_1;
    var RoleService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (role_1_1) {
                role_1 = role_1_1;
            }],
        execute: function() {
            RoleService = (function () {
                function RoleService(http, restService) {
                    this.http = http;
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl('role');
                }
                RoleService.prototype.createRoll = function (role) {
                    return this.restService.post(this.baseUrl, JSON.stringify(role)).map(function (res) { return res.json(); });
                };
                RoleService.prototype.editRoll = function (role) {
                    return this.restService.put(this.baseUrl + "/" + role.id, JSON.stringify(role)).map(function (res) { return res.json(); });
                };
                RoleService.prototype.deleteRoll = function (roleId) {
                    return this.restService.delete(this.baseUrl + "/" + roleId);
                };
                RoleService.prototype.getAll = function () {
                    return this.restService.get(this.baseUrl)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (roles) {
                        var result = [];
                        if (roles) {
                            roles.forEach(function (role) {
                                result.push(new role_1.Role(role.id, role.name));
                            });
                        }
                        return result;
                    });
                };
                RoleService.prototype.getRole = function (roleId) {
                    return this.restService.get(this.baseUrl + '/' + roleId)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (role) {
                        return new role_1.Role(role.id, role.name, role.permissions);
                    });
                };
                RoleService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], RoleService);
                return RoleService;
            }());
            exports_1("RoleService", RoleService);
        }
    }
});
//# sourceMappingURL=role.service.js.map