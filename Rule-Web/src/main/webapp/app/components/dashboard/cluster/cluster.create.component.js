System.register(["angular2/core", "angular2/router", "../../../models/cluster", "../../../services/cluster.service", "../../../services/rest.service", "../../../services/ui/feedback.service", "../abstract.component", "../../../services/nodegroup.service", "../../../services/servicepackage.service", "../../../modules/alert/alert.service", "../../../modules/alert/alert.component"], function(exports_1, context_1) {
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
    var core_1, router_1, cluster_1, cluster_service_1, rest_service_1, feedback_service_1, abstract_component_1, nodegroup_service_1, servicepackage_service_1, alert_service_1, alert_component_1;
    var ClusterCreateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cluster_1_1) {
                cluster_1 = cluster_1_1;
            },
            function (cluster_service_1_1) {
                cluster_service_1 = cluster_service_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            },
            function (nodegroup_service_1_1) {
                nodegroup_service_1 = nodegroup_service_1_1;
            },
            function (servicepackage_service_1_1) {
                servicepackage_service_1 = servicepackage_service_1_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            }],
        execute: function() {
            ClusterCreateComponent = (function (_super) {
                __extends(ClusterCreateComponent, _super);
                function ClusterCreateComponent(clusterService, nodeGroupService, servicePackageService, feedBackService, _router, alertService) {
                    _super.call(this);
                    this.clusterService = clusterService;
                    this.nodeGroupService = nodeGroupService;
                    this.servicePackageService = servicePackageService;
                    this.feedBackService = feedBackService;
                    this._router = _router;
                    this.alertService = alertService;
                    this.cluster = new cluster_1.Cluster();
                    this.selectedNodeGroups = [];
                    this.errorMsg = null;
                    this.successMsg = null;
                    this.clusterServicePackage = null;
                    this.loadNodeGroups();
                    this.loadServicePackages();
                }
                ClusterCreateComponent.prototype.loadNodeGroups = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.nodeGroupService.getAll().subscribe(function (data) {
                        _this.nodeGroups = data;
                        if (_this.nodeGroups != null) {
                            var allNodeGroup = _this.nodeGroups.find(function (nodeGroup) { return "all" == nodeGroup.name; });
                            if (allNodeGroup) {
                                allNodeGroup.check();
                            }
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterCreateComponent.prototype.loadServicePackages = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.servicePackageService.getAll().subscribe(function (data) {
                        _this.servicePackages = data;
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterCreateComponent.prototype.onPackageChange = function (value) {
                    var _this = this;
                    this.cluster.clusterServicePackage = parseInt(value);
                    this.servicePackageService.getServicePackage(parseInt(value)).subscribe(function (data) {
                        _this.tempSp = data;
                        if (_this.tempSp.packageLevel == "DEPLOY_ON_PUBLIC_NODES") {
                            _this.nodeGroupService.fetchPublicNodeGroups().subscribe(function (data) {
                                _this.nodeGroups = data;
                                _this.feedBackService.showPreloader = false;
                            }, function (err) {
                                _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                            });
                        }
                        else if (_this.tempSp.packageLevel == "DEPLOY_ON_DEDICATED_NODES") {
                            _this.nodeGroups = [];
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterCreateComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.selectedNodeGroups.length == 0) {
                        this.alertService.showAlert(new alert_component_1.AlertConfiguration("Cluster has no Node Groups", "Please select at least one node group for this cluster.", null, "OK", false));
                        return;
                    }
                    this.feedBackService.showPreloader = true;
                    this.cluster.nodeGroups = this.selectedNodeGroups;
                    var response = this.clusterService.createCluster(this.cluster);
                    response.subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['ClusterList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterCreateComponent.prototype.isAddedNodeGroup = function (nodeGroupId) {
                    var index = this.selectedNodeGroups.indexOf(nodeGroupId, 0);
                    return index != -1;
                };
                ClusterCreateComponent.prototype.addNodeGroup = function (nodeGroupId) {
                    if (!this.isAddedNodeGroup(nodeGroupId)) {
                        this.selectedNodeGroups.push(nodeGroupId);
                    }
                };
                ClusterCreateComponent.prototype.removeNodeGroup = function (nodeGroupId) {
                    if (this.isAddedNodeGroup(nodeGroupId)) {
                        var index = this.selectedNodeGroups.indexOf(nodeGroupId, 0);
                        if (index != -1) {
                            this.selectedNodeGroups.splice(index, 1);
                        }
                    }
                };
                ClusterCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'cluster-create-component',
                        templateUrl: '../../../../resources/template/dashboard/cluster/create.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [cluster_service_1.ClusterService, rest_service_1.RestService, nodegroup_service_1.NodeGroupService, servicepackage_service_1.ServicePackageService],
                    }),
                    __param(3, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(5, core_1.Inject(alert_service_1.AlertService)), 
                    __metadata('design:paramtypes', [cluster_service_1.ClusterService, nodegroup_service_1.NodeGroupService, servicepackage_service_1.ServicePackageService, feedback_service_1.FeedBackService, router_1.Router, alert_service_1.AlertService])
                ], ClusterCreateComponent);
                return ClusterCreateComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ClusterCreateComponent", ClusterCreateComponent);
        }
    }
});
//# sourceMappingURL=cluster.create.component.js.map