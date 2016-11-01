System.register(["angular2/core", "angular2/http", "./rest.service", "../models/datasource"], function(exports_1, context_1) {
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
    var core_1, http_1, rest_service_1, datasource_1;
    var DatasourceService;
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
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            }],
        execute: function() {
            DatasourceService = (function () {
                function DatasourceService(http, restService) {
                    this.http = http;
                    this.restService = restService;
                }
                DatasourceService.prototype.getAll = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/datasource/") + podIP)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (datasource) {
                        var result = [];
                        if (datasource) {
                            datasource.forEach(function (datasource) {
                                var datasourceR = new datasource_1.Datasource(datasource.id, datasource.configView.poolName, datasource.configView.url, datasource.configView.driverClass, datasource.configView.maximumConnections, datasource.configView.minimumConnections, datasource.configView.initialConnections, datasource.configView.maxWaitMillis, datasource.configView.refreshIntervalMillis, datasource.configView.maxConnectionIdleMillis, datasource.configView.maxReuseAllowed, datasource.configView.validationQuery, datasource.configView.validationTimeoutSeconds, datasource.statisticsView.poolStatus, datasource.statisticsView.numTotal, datasource.statisticsView.numActive, datasource.statisticsView.numAvailable, datasource.statisticsView.waitQueueLength, datasource.statisticsView.numCreated, datasource.statisticsView.numDestroyed, datasource.statisticsView.numValidated, datasource.statisticsView.numValidationFailed, datasource.statisticsView.numFailedRequests, datasource.statisticsView.createdTime, datasource.statisticsView.averageUsage, datasource.statisticsView.highestUsageMillis, datasource.statisticsView.longestOpenMillis, datasource.statisticsView.lastConnectionCreatedTime, datasource.statisticsView.averageConnectionLife);
                                result.push(datasourceR);
                            });
                        }
                        return result;
                    });
                };
                DatasourceService.prototype.getById = function (id, podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/datasource/") + id + "/" + podIP)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (datasource) {
                        var result;
                        if (datasource) {
                            result = new datasource_1.Datasource(datasource.id, datasource.configView.poolName, datasource.configView.url, datasource.configView.driverClass, datasource.configView.maximumConnections, datasource.configView.minimumConnections, datasource.configView.initialConnections, datasource.configView.maxWaitMillis, datasource.configView.refreshIntervalMillis, datasource.configView.maxConnectionIdleMillis, datasource.configView.maxReuseAllowed, datasource.configView.validationQuery, datasource.configView.validationTimeoutSeconds, datasource.statisticsView.poolStatus, datasource.statisticsView.numTotal, datasource.statisticsView.numActive, datasource.statisticsView.numAvailable, datasource.statisticsView.waitQueueLength, datasource.statisticsView.numCreated, datasource.statisticsView.numDestroyed, datasource.statisticsView.numValidated, datasource.statisticsView.numValidationFailed, datasource.statisticsView.numFailedRequests, datasource.statisticsView.createdTime, datasource.statisticsView.averageUsage, datasource.statisticsView.highestUsageMillis, datasource.statisticsView.longestOpenMillis, datasource.statisticsView.lastConnectionCreatedTime, datasource.statisticsView.averageConnectionLife);
                        }
                        return result;
                    });
                };
                DatasourceService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], DatasourceService);
                return DatasourceService;
            }());
            exports_1("DatasourceService", DatasourceService);
        }
    }
});
//# sourceMappingURL=datasource.service.js.map