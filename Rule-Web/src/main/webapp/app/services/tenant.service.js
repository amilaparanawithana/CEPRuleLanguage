System.register(["angular2/core", "angular2/http", "./rest.service", "rxjs/add/operator/map"], function(exports_1, context_1) {
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
    var core_1, http_1, rest_service_1;
    var TenantService;
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
            function (_1) {}],
        execute: function() {
            TenantService = (function () {
                function TenantService(http, restService) {
                    this.http = http;
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl("tenant");
                }
                TenantService.prototype.createTenant = function (tenant) {
                    return this.restService.post(this.baseUrl, JSON.stringify(tenant)).map(function (res) { return res.json(); });
                };
                TenantService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], TenantService);
                return TenantService;
            }());
            exports_1("TenantService", TenantService);
        }
    }
});
//# sourceMappingURL=tenant.service.js.map