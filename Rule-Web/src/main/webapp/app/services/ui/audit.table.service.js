System.register(["../../modules/tables/generic.table.service", "../../modules/tables/data.row", "../rest.service", "angular2/core", "../../modules/tables/table.resource"], function(exports_1, context_1) {
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
    var generic_table_service_1, data_row_1, rest_service_1, core_1, table_resource_1;
    var AuditTableService;
    return {
        setters:[
            function (generic_table_service_1_1) {
                generic_table_service_1 = generic_table_service_1_1;
            },
            function (data_row_1_1) {
                data_row_1 = data_row_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (table_resource_1_1) {
                table_resource_1 = table_resource_1_1;
            }],
        execute: function() {
            AuditTableService = (function (_super) {
                __extends(AuditTableService, _super);
                function AuditTableService(restService) {
                    _super.call(this);
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl('auditlog');
                }
                AuditTableService.prototype.get = function (keyword, limit, page, sorter, asc) {
                    console.log([keyword, limit, page, sorter, asc]);
                    var url = this.baseUrl + "?" + "key=" + keyword + "&limit=" + limit + "&page=" + page + "&sorter=" + sorter + "&asc=" + asc;
                    return this.restService.get(url)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (resource) {
                        console.log(resource);
                        var tableResource = new table_resource_1.TableResource();
                        if (resource) {
                            tableResource.currentPage = resource.currentPage;
                            tableResource.totalEntries = resource.totalEntries;
                            tableResource.totalPages = resource.totalPages;
                            resource.dataRows.forEach(function (audit) {
                                var dataRow = new data_row_1.DataRow();
                                dataRow.data.push(audit.id, new Date(audit.timestamp), audit.subject, audit.type, audit.username, audit.auditMessage);
                                tableResource.dataRows.push(dataRow);
                            });
                        }
                        return tableResource;
                    });
                };
                AuditTableService = __decorate([
                    __param(0, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [rest_service_1.RestService])
                ], AuditTableService);
                return AuditTableService;
            }(generic_table_service_1.GenericTableService));
            exports_1("AuditTableService", AuditTableService);
        }
    }
});
//# sourceMappingURL=audit.table.service.js.map