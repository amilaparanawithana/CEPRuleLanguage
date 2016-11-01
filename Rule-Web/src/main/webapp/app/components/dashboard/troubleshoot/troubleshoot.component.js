System.register(["angular2/core", "angular2/router", "../../../services/troubleshoot.service", "../../../models/TroubleshootTask", "../../../services/ui.service", "../../../services/cluster.service", "../../../services/ui/feedback.service", "../../../models/TroubleshootLaunch", "../../../models/TroubleshootStatus", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, router_1, troubleshoot_service_1, TroubleshootTask_1, ui_service_1, cluster_service_1, feedback_service_1, TroubleshootLaunch_1, TroubleshootStatus_1, abstract_component_1;
    var TroubleshootComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (troubleshoot_service_1_1) {
                troubleshoot_service_1 = troubleshoot_service_1_1;
            },
            function (TroubleshootTask_1_1) {
                TroubleshootTask_1 = TroubleshootTask_1_1;
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
            function (TroubleshootLaunch_1_1) {
                TroubleshootLaunch_1 = TroubleshootLaunch_1_1;
            },
            function (TroubleshootStatus_1_1) {
                TroubleshootStatus_1 = TroubleshootStatus_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            TroubleshootComponent = (function (_super) {
                __extends(TroubleshootComponent, _super);
                function TroubleshootComponent(troubleshootService, uiService, clusterService, feedbackService) {
                    _super.call(this);
                    this.troubleshootService = troubleshootService;
                    this.uiService = uiService;
                    this.clusterService = clusterService;
                    this.feedbackService = feedbackService;
                    this.availableTasksMap = {};
                    this.selectedTasks = {};
                    this.hoveredOnTask = false;
                    this.clusters = [];
                    this.pods = [];
                    this.paramsMap = {};
                    this.executionInProgress = false;
                    this.currentTaskStatus = new TroubleshootStatus_1.TroubleshootStatus();
                    this.fetchClusterList();
                    this.hoveredTask = new TroubleshootTask_1.TroubleshootTask();
                }
                TroubleshootComponent.prototype.showModal = function (taskId) {
                    $('#' + taskId).modal('show');
                };
                TroubleshootComponent.prototype.validateThreadDumpModelInput = function () {
                    if (this.paramsMap.count && this.paramsMap.dumpPeriod) {
                        $('#thread-dump').modal('hide');
                    }
                    else {
                        return false;
                    }
                };
                TroubleshootComponent.prototype.validateLoggerModelInput = function () {
                    if (this.paramsMap.level && this.paramsMap.logger && this.paramsMap.period) {
                        $('#detailed-logs').modal('hide');
                    }
                    else {
                        return false;
                    }
                };
                TroubleshootComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.drake = dragula([customTaskListContainer, allTaskListContainer], {
                        isContainer: function (el) {
                            return el.classList.contains('dragula-container'); // only elements in drake.containers will be taken into account
                        },
                        moves: function (el, source, handle, sibling) {
                            return true;
                        },
                        accepts: function (el, target, source, sibling) {
                            return true;
                        },
                        invalid: function (el, handle) {
                            return false; // don't prevent any drags from initiating by default
                        },
                        copy: false,
                        revertOnSpill: true,
                    }).on('drag', function (el) {
                    }).on('drop', function (el, target, source, sibling) {
                        var taskId = el.id.trim().split(":")[1];
                        if (source.id === 'allTaskListContainer' && target.id === 'customTaskListContainer') {
                            _this.selectedTasks[taskId] = _this.availableTasksMap[taskId];
                            _this.showModal(taskId);
                        }
                        if (source.id === 'customTaskListContainer' && target.id === 'allTaskListContainer') {
                            delete _this.selectedTasks[taskId];
                        }
                    }).on('over', function (el, container) {
                    }).on('out', function (el, container) {
                    });
                };
                TroubleshootComponent.prototype.onMouseEnter = function (id) {
                    this.hoveredOnTask = true;
                    this.hoveredTask = this.availableTasksMap[id];
                };
                TroubleshootComponent.prototype.onMouseLeave = function (id) {
                    this.hoveredOnTask = false;
                    this.hoveredTask = new TroubleshootTask_1.TroubleshootTask();
                };
                TroubleshootComponent.prototype.startTroubleshooting = function () {
                    var _this = this;
                    var troubleshootLaunch = new TroubleshootLaunch_1.TroubleshootLaunch(this.outputFilePath, this.credentialMask, this.password, this.keyFactoryName, this.cipherName);
                    var task = {};
                    for (var taskId in this.selectedTasks) {
                        // task.id = taskId;
                        var param = {};
                        task[taskId] = param;
                        if (taskId === 'detailed-logs') {
                            if (this.paramsMap.level && this.paramsMap.logger && this.paramsMap.period) {
                                param.level = this.paramsMap.level;
                                param.logger = this.paramsMap.logger;
                                param.period = this.paramsMap.period;
                            }
                            else {
                                this.feedbackService.error = "Failed to execute troubleshoot task. One or more parameter value is missing for \'Detailed Log Sampling\' task.";
                                return;
                            }
                        }
                        else if (taskId === 'thread-dump') {
                            if (this.paramsMap.count && this.paramsMap.dumpPeriod) {
                                param.count = this.paramsMap.count;
                                param.period = this.paramsMap.dumpPeriod;
                            }
                            else {
                                this.feedbackService.error = "Failed to execute troubleshoot task. One or more parameter value is missing for \'JVM Thread Dump\' task.";
                                return;
                            }
                        }
                    }
                    troubleshootLaunch.taskParamMap = task;
                    this.troubleshootService.launchTask(troubleshootLaunch, this.selectedPodIP).subscribe(function (data) {
                        _this.feedbackService.showPreloader = true;
                        _this.overallStatus = null;
                        _this.currentTaskStatus = null;
                        _this.executionInProgress = true;
                        _this.interval = setInterval(function () {
                            _this.getCurrentTaskStatus();
                            _this.getTaskExecutionSummary();
                        }, 2000);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                    });
                };
                TroubleshootComponent.prototype.getCurrentTaskStatus = function () {
                    var _this = this;
                    this.troubleshootService.getCurrentTaskSummary(this.selectedPodIP).subscribe(function (data) {
                        if (data.overallStatus === "SUCCESS") {
                            clearInterval(_this.interval);
                            _this.executionInProgress = false;
                            _this.feedbackService.showPreloader = false;
                        }
                        _this.currentTaskStatus = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                    });
                };
                TroubleshootComponent.prototype.getTaskExecutionSummary = function () {
                    var _this = this;
                    this.troubleshootService.getOverallSummary(this.selectedPodIP).subscribe(function (data) {
                        _this.overallStatus = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                    });
                };
                TroubleshootComponent.prototype.fetchClusterList = function () {
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
                        _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                    });
                };
                TroubleshootComponent.prototype.onClusterSelect = function (value) {
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
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                    });
                };
                TroubleshootComponent.prototype.onPodSelect = function (value) {
                    var _this = this;
                    if (value) {
                        this.selectedPodIP = this.pods[value].podIP;
                    }
                    this.feedbackService.showPreloader = true;
                    this.troubleshootService.getAvailableTasks(this.selectedPodIP).subscribe(function (data) {
                        _this.availableTasks = data;
                        data.forEach(function (task) {
                            _this.availableTasksMap[task.id] = task;
                        });
                        _this.feedbackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                    });
                };
                TroubleshootComponent = __decorate([
                    core_1.Component({
                        selector: 'TroubleshootComponent',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [troubleshoot_service_1.TroubleshootService, cluster_service_1.ClusterService],
                        templateUrl: '../../../../resources/template/dashboard/troubleshoot/troubleshoot.html'
                    }),
                    __param(0, core_1.Inject(troubleshoot_service_1.TroubleshootService)),
                    __param(1, core_1.Inject(ui_service_1.UIService)),
                    __param(2, core_1.Inject(cluster_service_1.ClusterService)),
                    __param(3, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [troubleshoot_service_1.TroubleshootService, ui_service_1.UIService, cluster_service_1.ClusterService, feedback_service_1.FeedBackService])
                ], TroubleshootComponent);
                return TroubleshootComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("TroubleshootComponent", TroubleshootComponent);
        }
    }
});
//# sourceMappingURL=troubleshoot.component.js.map