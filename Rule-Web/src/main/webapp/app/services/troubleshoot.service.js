System.register(["angular2/core", "./rest.service", "angular2/http", "../models/TroubleshootTask", "../models/TroubleshootStatus"], function(exports_1, context_1) {
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
    var core_1, rest_service_1, http_1, TroubleshootTask_1, TroubleshootStatus_1;
    var TroubleshootService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (TroubleshootTask_1_1) {
                TroubleshootTask_1 = TroubleshootTask_1_1;
            },
            function (TroubleshootStatus_1_1) {
                TroubleshootStatus_1 = TroubleshootStatus_1_1;
            }],
        execute: function() {
            TroubleshootService = (function () {
                function TroubleshootService(http, restService) {
                    this.http = http;
                    this.restService = restService;
                }
                TroubleshootService.prototype.getAvailableTasks = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/tasks/") + podIP)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (tasks) {
                        var result = [];
                        if (tasks) {
                            tasks.forEach(function (task) {
                                var troubleshootTask = new TroubleshootTask_1.TroubleshootTask(task.id, task.name, task.description, task.intensive, task.maskable, task.parameters);
                                result.push(troubleshootTask);
                            });
                        }
                        return result;
                    });
                };
                TroubleshootService.prototype.launchTask = function (troubleshootLaunch, podIP) {
                    return this.restService.post(this.restService.getBaseUrl("jmx/tasks/") + podIP, JSON.stringify(troubleshootLaunch))
                        .map(function (res) {
                        return res.json();
                    });
                };
                TroubleshootService.prototype.getCurrentTaskSummary = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/tasks/") + podIP + "/status")
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (task) {
                        return new TroubleshootStatus_1.TroubleshootStatus(task.taskId, task.status, task.duration, new Date(task.lastUpdated), task.extraInfo, task.overallStatus);
                    });
                };
                TroubleshootService.prototype.getOverallSummary = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/tasks/") + podIP + "/summary")
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (tasks) {
                        var result = [];
                        if (tasks) {
                            tasks.forEach(function (task) {
                                var troubleshootStatus = new TroubleshootStatus_1.TroubleshootStatus(task.taskId, task.status, task.duration, new Date(task.lastUpdated).toLocaleTimeString(), task.extraInfo, task.overallStatus);
                                result.push(troubleshootStatus);
                            });
                        }
                        return result;
                    });
                };
                TroubleshootService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], TroubleshootService);
                return TroubleshootService;
            }());
            exports_1("TroubleshootService", TroubleshootService);
        }
    }
});
//# sourceMappingURL=troubleshoot.service.js.map