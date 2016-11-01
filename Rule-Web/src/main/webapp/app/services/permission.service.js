System.register(["angular2/core", "angular2/http", "../models/permission", "./rest.service"], function(exports_1, context_1) {
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
    var core_1, http_1, permission_1, rest_service_1;
    var PermissionService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (permission_1_1) {
                permission_1 = permission_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            }],
        execute: function() {
            PermissionService = (function () {
                function PermissionService(http, restService) {
                    this.http = http;
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl("permission");
                }
                PermissionService.prototype.getAll = function () {
                    return this.restService.get(this.baseUrl)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (permissions) {
                        var result = [];
                        if (permissions) {
                            permissions.forEach(function (permission) {
                                result.push(new permission_1.Permission(permission.id, permission.name, permission.category));
                            });
                        }
                        return result;
                    });
                };
                PermissionService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], PermissionService);
                return PermissionService;
            }());
            exports_1("PermissionService", PermissionService);
        }
    }
});
//# sourceMappingURL=permission.service.js.map