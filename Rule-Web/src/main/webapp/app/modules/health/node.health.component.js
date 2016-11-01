System.register(["angular2/core", "../../services/ui/feedback.service", "../../services/node.health.service", "../../components/dashboard/abstract.component"], function(exports_1, context_1) {
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
    var core_1, feedback_service_1, node_health_service_1, abstract_component_1;
    var NodeHealthComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (node_health_service_1_1) {
                node_health_service_1 = node_health_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            NodeHealthComponent = (function (_super) {
                __extends(NodeHealthComponent, _super);
                function NodeHealthComponent(feedbackService, nodeHealthService) {
                    this.feedbackService = feedbackService;
                    this.nodeHealthService = nodeHealthService;
                    this.healthData = {};
                    this.allData = [];
                    this.capacityType = [" B", " KB", " MB", " GB", " TB"];
                    this.warnLevel = 60;
                    this.criticalLevel = 90;
                    this.requestProcessed = true;
                    this.initializeInterval();
                }
                NodeHealthComponent.prototype.initializeInterval = function () {
                    var _this = this;
                    this.fetchHealthData();
                    this.interval = setInterval(function () {
                        _this.fetchHealthData();
                    }, 15000);
                };
                NodeHealthComponent.prototype.destroyInterval = function () {
                    clearInterval(this.interval);
                };
                NodeHealthComponent.prototype.fetchHealthData = function () {
                    var _this = this;
                    if (this.requestProcessed) {
                        this.requestProcessed = false;
                        this.nodeHealthService.getHealthOfNode().subscribe(function (data) {
                            _this.requestProcessed = true;
                            _this.allData = [];
                            for (var i in data) {
                                var node = data[i];
                                var cpuUsage = parseInt(node.cpuUsage);
                                var memoryUsage = parseInt(node.memoryUsage) / parseInt(node.memoryCapacity) * 100;
                                var totalUsage = cpuUsage + memoryUsage;
                                var numofStats = 2;
                                node.memoryUsage = _this.getCapacityType(node.memoryUsage);
                                node.memoryCapacity = _this.getCapacityType(node.memoryCapacity);
                                for (var p in node.fileSystem) {
                                    var fileSystem = node.fileSystem[p];
                                    var fileSystemUsage = (parseInt(fileSystem.fileSystemUsage) / parseInt(fileSystem.fileSystemCapacity)) * 100;
                                    totalUsage += fileSystemUsage;
                                    numofStats++;
                                    fileSystem.fileSystemUsage = _this.getCapacityType(fileSystem.fileSystemUsage);
                                    fileSystem.fileSystemCapacity = _this.getCapacityType(fileSystem.fileSystemCapacity);
                                    node['barColour'] = 'green';
                                    if (fileSystemUsage > _this.warnLevel) {
                                        node['barColour'] = 'orange';
                                    }
                                    if (fileSystemUsage > _this.criticalLevel) {
                                        node['barColour'] = 'red';
                                    }
                                }
                                if (memoryUsage > _this.warnLevel || cpuUsage > _this.warnLevel) {
                                    node['barColour'] = 'orange';
                                }
                                if (memoryUsage > _this.criticalLevel || cpuUsage > _this.criticalLevel) {
                                    node['barColour'] = 'red';
                                }
                                node['totalVal'] = (totalUsage / numofStats).toFixed(3);
                            }
                            _this.allData = data;
                        }, function (err) {
                            _this.requestProcessed = true;
                            _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                        }, function () {
                            _this.requestProcessed = true;
                        });
                    }
                };
                NodeHealthComponent.prototype.getCapacityType = function (value) {
                    var index = 0;
                    while (value >= 1e3) {
                        index++;
                        value = parseFloat((value / 1e3).toFixed(2));
                    }
                    return value + this.capacityType[index];
                };
                NodeHealthComponent = __decorate([
                    core_1.Component({
                        selector: 'node-health-component',
                        templateUrl: '../../../resources/template/modules/health/node.health.html',
                        providers: [node_health_service_1.NodeHealthService, feedback_service_1.FeedBackService]
                    }), 
                    __metadata('design:paramtypes', [feedback_service_1.FeedBackService, node_health_service_1.NodeHealthService])
                ], NodeHealthComponent);
                return NodeHealthComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("NodeHealthComponent", NodeHealthComponent);
        }
    }
});
//# sourceMappingURL=node.health.component.js.map