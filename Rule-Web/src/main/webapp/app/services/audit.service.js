System.register(["angular2/core", "./rest.service", "../models/audit"], function(exports_1, context_1) {
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
    var core_1, rest_service_1, audit_1;
    var AuditService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (audit_1_1) {
                audit_1 = audit_1_1;
            }],
        execute: function() {
            AuditService = (function () {
                function AuditService(restService) {
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl('auditlog');
                }
                AuditService.prototype.getAll = function () {
                    return this.restService.get(this.baseUrl)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (audits) {
                        var result = [];
                        if (audits) {
                            audits.forEach(function (audit) {
                                result.push(new audit_1.Audit(audit.id, audit.auditMessage, audit.subject, audit.timestamp, audit.type, audit.username));
                            });
                        }
                        return result;
                    });
                };
                AuditService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [rest_service_1.RestService])
                ], AuditService);
                return AuditService;
            }());
            exports_1("AuditService", AuditService);
        }
    }
});
//# sourceMappingURL=audit.service.js.map