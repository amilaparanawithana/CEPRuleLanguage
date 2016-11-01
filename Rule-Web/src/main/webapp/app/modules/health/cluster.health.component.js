System.register(["angular2/core", "../../services/cluster.health.service", "../../services/cluster.service", "../../services/pod.service", "./cluster.health.resource", "../../services/ui/feedback.service", "../../components/dashboard/abstract.component"], function(exports_1, context_1) {
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
    var core_1, cluster_health_service_1, cluster_service_1, pod_service_1, cluster_health_resource_1, feedback_service_1, abstract_component_1;
    var ClusterHealthComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (cluster_health_service_1_1) {
                cluster_health_service_1 = cluster_health_service_1_1;
            },
            function (cluster_service_1_1) {
                cluster_service_1 = cluster_service_1_1;
            },
            function (pod_service_1_1) {
                pod_service_1 = pod_service_1_1;
            },
            function (cluster_health_resource_1_1) {
                cluster_health_resource_1 = cluster_health_resource_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            ClusterHealthComponent = (function (_super) {
                __extends(ClusterHealthComponent, _super);
                function ClusterHealthComponent(feedbackService, clusterHealthService) {
                    this.feedbackService = feedbackService;
                    this.clusterHealthService = clusterHealthService;
                    this.healthData = {};
                    this.allData = null;
                    this.warnLevel = 60;
                    this.criticalLevel = 90;
                    this.requestProcessed = true;
                    this.initializeInterval();
                }
                ClusterHealthComponent.prototype.initializeInterval = function () {
                    var _this = this;
                    console.log("init cluster health");
                    this.fetchHealthData();
                    this.interval = setInterval(function () {
                        _this.fetchHealthData();
                    }, 15000);
                };
                ClusterHealthComponent.prototype.destroyInterval = function () {
                    console.log("cleared cluster interval");
                    clearInterval(this.interval);
                };
                ClusterHealthComponent.prototype.fetchHealthData = function () {
                    var _this = this;
                    if (this.requestProcessed) {
                        this.requestProcessed = false;
                        this.clusterHealthService.getHealthOfSystem().subscribe(function (data) {
                            _this.requestProcessed = true;
                            _this.allData = [];
                            for (var i in data) {
                                var podList = data[i];
                                var clusterName = podList[0].clusterName;
                                for (var p in podList) {
                                    var pod = podList[p];
                                    var heap = parseFloat(pod.heapMemoryUsage);
                                    var cpu = parseFloat(pod.processCpuLoad);
                                    var fd = parseFloat(pod.openFileDescriptors);
                                    var thread = parseFloat(pod.threadCount);
                                    pod['barColour'] = 'green';
                                    if (heap > _this.warnLevel || fd > _this.warnLevel ||
                                        cpu > _this.warnLevel || thread > _this.warnLevel) {
                                        pod['barColour'] = 'orange';
                                    }
                                    if (heap > _this.criticalLevel || fd > _this.criticalLevel ||
                                        cpu > _this.criticalLevel || thread > _this.criticalLevel) {
                                        pod['barColour'] = 'red';
                                    }
                                    pod['totalVal'] = ((heap + fd + cpu + thread) / 4).toFixed(3);
                                }
                                _this.allData.push(new cluster_health_resource_1.ClusterHealthResource(clusterName, podList));
                            }
                        }, function (err) {
                            _this.requestProcessed = true;
                            _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                        }, function () {
                            _this.requestProcessed = true;
                        });
                    }
                };
                ClusterHealthComponent = __decorate([
                    core_1.Component({
                        selector: 'cluster-health-component',
                        templateUrl: '../../../resources/template/modules/health/cluster.health.html',
                        providers: [cluster_health_service_1.ClusterHealthService, feedback_service_1.FeedBackService, cluster_service_1.ClusterService, pod_service_1.PodService]
                    }), 
                    __metadata('design:paramtypes', [feedback_service_1.FeedBackService, cluster_health_service_1.ClusterHealthService])
                ], ClusterHealthComponent);
                return ClusterHealthComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ClusterHealthComponent", ClusterHealthComponent);
        }
    }
});
//# sourceMappingURL=cluster.health.component.js.map