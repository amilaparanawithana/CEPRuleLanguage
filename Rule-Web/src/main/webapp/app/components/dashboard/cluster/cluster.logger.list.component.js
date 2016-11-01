System.register(["angular2/core", "../../../modules/tables/table.column", "../../../modules/tables/table.component", "angular2/router", "../../../services/cluster.logger.service", "../../../services/ui/feedback.service", "../../../services/cluster.service", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, table_column_1, table_component_1, router_1, cluster_logger_service_1, feedback_service_1, cluster_service_1, abstract_component_1;
    var ClusterLoggerListComponent, LoggerLevel;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (table_column_1_1) {
                table_column_1 = table_column_1_1;
            },
            function (table_component_1_1) {
                table_component_1 = table_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cluster_logger_service_1_1) {
                cluster_logger_service_1 = cluster_logger_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (cluster_service_1_1) {
                cluster_service_1 = cluster_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            ClusterLoggerListComponent = (function (_super) {
                __extends(ClusterLoggerListComponent, _super);
                function ClusterLoggerListComponent(tableService, feedbackService, clusterService) {
                    var _this = this;
                    _super.call(this);
                    this.tableService = tableService;
                    this.feedbackService = feedbackService;
                    this.clusterService = clusterService;
                    this.clusters = [];
                    this.headers = [];
                    this.fetchClusterList();
                    //clickable example
                    /*var actionableCol = new Clickable();
                     actionableCol.doAction = function (index:number, value:any) {
                     console.log("index :" + index + ", value:" + value);
                     }*/
                    //checkable example
                    var checkCol = new table_column_1.Checkable();
                    checkCol.doAction = function (index, value) {
                    };
                    checkCol.cssClasses.push("");
                    //selectable example
                    var actionableCol = new table_column_1.Selectable();
                    actionableCol.add(0, "ALL");
                    actionableCol.add(1, "TRACE");
                    actionableCol.add(2, "DEBUG");
                    actionableCol.add(3, "INFO");
                    actionableCol.add(4, "WARN");
                    actionableCol.add(5, "ERROR");
                    actionableCol.add(6, "FATAL");
                    actionableCol.add(7, "OFF");
                    actionableCol.cssClasses.push("form-control");
                    actionableCol.doAction = function (index, value) {
                        _this.feedbackService.showPreloader = true;
                        _this.tableService.changeLogLevel(_this.selectedClusterId, _this.dataTableView.dataRows[index].data[0], actionableCol.optionData[value]).subscribe(function (data) {
                            _this.feedbackService.showPreloader = false;
                            _this.feedbackService.success = data.msg;
                        }, function (err) {
                            _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                        });
                    };
                    this.headers.push(new table_column_1.TableColumn("Logger", true, 40), new table_column_1.TableColumn("Parent Logger", true, 20), new table_column_1.TableColumn("Level", false, 20, actionableCol), new table_column_1.TableColumn("Additivity", false, 20, checkCol));
                }
                ClusterLoggerListComponent.prototype.changeLogLevel = function (index, value) {
                };
                ClusterLoggerListComponent.prototype.ngAfterViewInit = function () {
                    this.updateSelectedCluster();
                };
                ClusterLoggerListComponent.prototype.fetchClusterList = function () {
                    var _this = this;
                    this.feedbackService.showPreloader = true;
                    this.clusterService.getAllClusters().subscribe(function (data) {
                        _this.clusters = [];
                        if (data.length > 0) {
                            _this.clusters = data;
                            _this.selectedClusterId = _this.clusters[0].id;
                            _this.selectedClusterName = _this.clusters[0].name;
                            _this.updateSelectedCluster();
                        }
                        else {
                            _this.feedbackService.warning = "No Clusters are present at the moment";
                        }
                        _this.feedbackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                    });
                };
                ClusterLoggerListComponent.prototype.updateSelectedCluster = function () {
                    var map = new Map();
                    map.set('selected-cluster-id', this.selectedClusterId + "");
                    this.dataTableView.setAdditionalParams(map);
                };
                ClusterLoggerListComponent.prototype.onClusterSelect = function (value) {
                    this.selectedClusterId = this.clusters[value].id;
                    this.selectedClusterName = this.clusters[value].name;
                    this.updateSelectedCluster();
                };
                __decorate([
                    core_1.ViewChild(table_component_1.DataTableComponent), 
                    __metadata('design:type', table_component_1.DataTableComponent)
                ], ClusterLoggerListComponent.prototype, "dataTableView", void 0);
                ClusterLoggerListComponent = __decorate([
                    core_1.Component({
                        selector: 'ClusterLoggerListComponent',
                        templateUrl: '../../../../resources/template/dashboard/cluster/loggers.html',
                        directives: [router_1.ROUTER_DIRECTIVES, table_component_1.DataTableComponent],
                        providers: [cluster_logger_service_1.ClusterLoggerService, cluster_service_1.ClusterService]
                    }),
                    __param(1, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(2, core_1.Inject(cluster_service_1.ClusterService)), 
                    __metadata('design:paramtypes', [cluster_logger_service_1.ClusterLoggerService, feedback_service_1.FeedBackService, cluster_service_1.ClusterService])
                ], ClusterLoggerListComponent);
                return ClusterLoggerListComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ClusterLoggerListComponent", ClusterLoggerListComponent);
            (function (LoggerLevel) {
                LoggerLevel[LoggerLevel["OFF"] = 0] = "OFF";
                LoggerLevel[LoggerLevel["TRACE"] = 1] = "TRACE";
                LoggerLevel[LoggerLevel["DEBUG"] = 2] = "DEBUG";
                LoggerLevel[LoggerLevel["INFO"] = 3] = "INFO";
                LoggerLevel[LoggerLevel["WARN"] = 4] = "WARN";
                LoggerLevel[LoggerLevel["ERROR"] = 5] = "ERROR";
                LoggerLevel[LoggerLevel["FATAL"] = 6] = "FATAL";
                LoggerLevel[LoggerLevel["ALL"] = 7] = "ALL";
            })(LoggerLevel || (LoggerLevel = {}));
            exports_1("LoggerLevel", LoggerLevel);
        }
    }
});
//# sourceMappingURL=cluster.logger.list.component.js.map