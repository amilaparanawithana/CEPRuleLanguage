System.register(["angular2/core", "../modules/tables/generic.table.service", "../modules/tables/table.resource", "./rest.service", "rxjs/Observable", "../modules/tables/data.row"], function(exports_1, context_1) {
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
    var core_1, generic_table_service_1, table_resource_1, rest_service_1, Observable_1, data_row_1;
    var ClusterLoggerService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (generic_table_service_1_1) {
                generic_table_service_1 = generic_table_service_1_1;
            },
            function (table_resource_1_1) {
                table_resource_1 = table_resource_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (data_row_1_1) {
                data_row_1 = data_row_1_1;
            }],
        execute: function() {
            ClusterLoggerService = (function (_super) {
                __extends(ClusterLoggerService, _super);
                function ClusterLoggerService(restService) {
                    _super.call(this);
                    this.restService = restService;
                }
                ClusterLoggerService.prototype.changeLogLevel = function (clusterId, loggerName, newLevel) {
                    return this.restService.get(this.restService.getBaseUrl("logger/") + clusterId + "/" + loggerName + "/" + newLevel)
                        .map(function (res) {
                        console.log(res);
                        return res.json();
                    });
                };
                ClusterLoggerService.prototype.get = function (keyword, limit, page, sorter, asc, params) {
                    var selectedClusterId = params.get('selected-cluster-id');
                    if (selectedClusterId) {
                        return this.restService.get(this.restService.getBaseUrl("logger/") + selectedClusterId + "?key=" + keyword + "&limit=" + limit + "&page=" + page + "&sorter=" + sorter + "&asc=" + asc)
                            .map(function (res) {
                            return res.json();
                        }).map(function (resource) {
                            console.log(resource);
                            var tableResource = new table_resource_1.TableResource();
                            tableResource.currentPage = resource.currentPage;
                            tableResource.totalEntries = resource.totalEntries;
                            tableResource.totalPages = resource.totalPages;
                            if (resource) {
                                console.log(resource.dataRows);
                                resource.dataRows.forEach(function (log) {
                                    var dataRow = new data_row_1.DataRow();
                                    dataRow.data.push(log.loggerName, log.parentLogger, log.currLevel, log.additivity);
                                    tableResource.dataRows.push(dataRow);
                                });
                            }
                            return tableResource;
                        });
                    }
                    else {
                        return Observable_1.Observable.create(function (observer) {
                            observer.next(new table_resource_1.TableResource());
                        });
                    }
                };
                ClusterLoggerService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [rest_service_1.RestService])
                ], ClusterLoggerService);
                return ClusterLoggerService;
            }(generic_table_service_1.GenericTableService));
            exports_1("ClusterLoggerService", ClusterLoggerService);
        }
    }
});
//# sourceMappingURL=cluster.logger.service.js.map