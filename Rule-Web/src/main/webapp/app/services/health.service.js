System.register(["angular2/core", "./rest.service", "../modules/health/health.resource"], function(exports_1, context_1) {
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
    var core_1, rest_service_1, health_resource_1;
    var HealthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (health_resource_1_1) {
                health_resource_1 = health_resource_1_1;
            }],
        execute: function() {
            HealthService = (function () {
                function HealthService(restService) {
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl("health");
                }
                HealthService.prototype.getHealth = function () {
                    return this.restService.get(this.baseUrl)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (healths) {
                        var result = [];
                        if (healths) {
                            healths.forEach(function (health) {
                                result.push(new health_resource_1.HealthResource(health.working, health.message, health.component));
                            });
                        }
                        return result;
                    });
                };
                HealthService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [rest_service_1.RestService])
                ], HealthService);
                return HealthService;
            }());
            exports_1("HealthService", HealthService);
        }
    }
});
//# sourceMappingURL=health.service.js.map