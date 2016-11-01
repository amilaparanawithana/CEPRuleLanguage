System.register(["angular2/core", "angular2/http", "./rest.service", "../models/ServicePackage"], function(exports_1, context_1) {
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
    var core_1, http_1, rest_service_1, ServicePackage_1;
    var ServicePackageService;
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
            function (ServicePackage_1_1) {
                ServicePackage_1 = ServicePackage_1_1;
            }],
        execute: function() {
            ServicePackageService = (function () {
                function ServicePackageService(http, restService) {
                    this.http = http;
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl('servicepackage');
                }
                ServicePackageService.prototype.create = function (servicePackage) {
                    return this.restService.post(this.baseUrl, JSON.stringify(servicePackage)).map(function (res) { return res.json(); });
                };
                ServicePackageService.prototype.edit = function (servicePackage) {
                    return this.restService.put(this.baseUrl + "/" + servicePackage.id, JSON.stringify(servicePackage)).map(function (res) { return res.json(); });
                };
                ServicePackageService.prototype.deletePackage = function (packageId) {
                    return this.restService.delete(this.baseUrl + "/" + packageId);
                };
                ServicePackageService.prototype.getAll = function () {
                    return this.restService.get(this.baseUrl)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (servicePackages) {
                        var result = [];
                        if (servicePackages) {
                            servicePackages.forEach(function (servicePackage) {
                                result.push(new ServicePackage_1.ServicePackage(servicePackage.id, servicePackage.name, servicePackage.maxReplication));
                            });
                        }
                        return result;
                    });
                };
                ServicePackageService.prototype.getServicePackage = function (packageId) {
                    return this.restService.get(this.baseUrl + '/' + packageId)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (servicePackage) {
                        return new ServicePackage_1.ServicePackage(servicePackage.id, servicePackage.name, servicePackage.maxReplication, servicePackage.packageLevel);
                    });
                };
                ServicePackageService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], ServicePackageService);
                return ServicePackageService;
            }());
            exports_1("ServicePackageService", ServicePackageService);
        }
    }
});
//# sourceMappingURL=servicepackage.service.js.map