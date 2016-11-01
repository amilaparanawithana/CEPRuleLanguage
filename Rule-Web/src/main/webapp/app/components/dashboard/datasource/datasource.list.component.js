System.register(["angular2/core", "angular2/router", "../../../services/ui.service", "../../../services/cluster.service", "../../../services/ui/feedback.service", "../../../services/datasource.service"], function(exports_1, context_1) {
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
    var core_1, router_1, ui_service_1, cluster_service_1, feedback_service_1, datasource_service_1;
    var DatasourceListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (cluster_service_1_1) {
                cluster_service_1 = cluster_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (datasource_service_1_1) {
                datasource_service_1 = datasource_service_1_1;
            }],
        execute: function() {
            DatasourceListComponent = (function () {
                function DatasourceListComponent(datasourceService, uiService, clusterService, feedbackService) {
                    this.datasourceService = datasourceService;
                    this.uiService = uiService;
                    this.clusterService = clusterService;
                    this.feedbackService = feedbackService;
                    this.datasourceMap = {};
                    this.clusters = [];
                    this.pods = [];
                    this.paramsMap = {};
                    this.fetchClusterList();
                }
                DatasourceListComponent.prototype.fetchClusterList = function () {
                    var _this = this;
                    this.feedbackService.showPreloader = true;
                    this.clusterService.getAllClusters().subscribe(function (data) {
                        _this.clusters = [];
                        if (data.length > 0) {
                            _this.clusters = data;
                            _this.selectedClusterId = _this.clusters[0].id;
                            _this.selectedClusterName = _this.clusters[0].name;
                            _this.onClusterSelect();
                        }
                        else {
                            _this.feedbackService.warning = "No Clusters are present at the moment";
                        }
                        _this.feedbackService.showPreloader = false;
                    }, function (err) {
                        _this.feedbackService.showPreloader = false;
                        _this.feedbackService.error = err.json().msg;
                    });
                };
                DatasourceListComponent.prototype.onClusterSelect = function (value) {
                    var _this = this;
                    if (value) {
                        this.selectedClusterId = this.clusters[value].id;
                        this.selectedClusterName = this.clusters[value].name;
                    }
                    this.feedbackService.showPreloader = true;
                    this.clusterService.getPodsOfCluster(this.selectedClusterId).subscribe(function (data) {
                        _this.pods = [];
                        if (data.length > 0) {
                            _this.pods = data;
                            _this.selectedPodIP = _this.pods[0].podIP;
                            _this.onPodSelect();
                        }
                        _this.feedbackService.showPreloader = false;
                    });
                };
                DatasourceListComponent.prototype.onPodSelect = function (value) {
                    var _this = this;
                    if (value) {
                        this.selectedPodIP = this.pods[value].podIP;
                    }
                    this.feedbackService.showPreloader = true;
                    this.datasourceService.getAll(this.selectedPodIP).subscribe(function (data) {
                        _this.datasources = data;
                        data.forEach(function (pool) {
                            _this.datasourceMap[pool.id] = pool;
                        });
                        _this.feedbackService.showPreloader = false;
                        console.log(_this.datasourceMap);
                    });
                };
                DatasourceListComponent = __decorate([
                    core_1.Component({
                        selector: 'datasource-list-component',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [datasource_service_1.DatasourceService, cluster_service_1.ClusterService],
                        templateUrl: '../../../../resources/template/dashboard/datasource/list.html'
                    }),
                    __param(0, core_1.Inject(datasource_service_1.DatasourceService)),
                    __param(1, core_1.Inject(ui_service_1.UIService)),
                    __param(2, core_1.Inject(cluster_service_1.ClusterService)),
                    __param(3, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [datasource_service_1.DatasourceService, ui_service_1.UIService, cluster_service_1.ClusterService, feedback_service_1.FeedBackService])
                ], DatasourceListComponent);
                return DatasourceListComponent;
            }());
            exports_1("DatasourceListComponent", DatasourceListComponent);
        }
    }
});
//# sourceMappingURL=datasource.list.component.js.map