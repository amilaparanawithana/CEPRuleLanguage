System.register(["angular2/core", "angular2/router", "../../../services/nodegroup.service", "../../../models/nodeGroup", "../../../services/rest.service", "../../../services/ui/feedback.service", "../../../modules/alert/alert.service", "../../../modules/alert/alert.component", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, router_1, router_2, nodegroup_service_1, nodeGroup_1, rest_service_1, feedback_service_1, alert_service_1, alert_component_1, abstract_component_1;
    var NodeGroupConfigComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (nodegroup_service_1_1) {
                nodegroup_service_1 = nodegroup_service_1_1;
            },
            function (nodeGroup_1_1) {
                nodeGroup_1 = nodeGroup_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            NodeGroupConfigComponent = (function (_super) {
                __extends(NodeGroupConfigComponent, _super);
                function NodeGroupConfigComponent(routeParam, nodeGroupService, feedBackService, alertService, _router) {
                    _super.call(this);
                    this.routeParam = routeParam;
                    this.nodeGroupService = nodeGroupService;
                    this.feedBackService = feedBackService;
                    this.alertService = alertService;
                    this._router = _router;
                    this.nodeGroup = new nodeGroup_1.NodeGroup();
                    this.nodes = [];
                    this.selectedNodes = [];
                    this.errorMsg = null;
                    this.successMsg = null;
                    this.nodeGroupId = routeParam.get('id');
                    this.loadNodeGroup();
                    this.fetchNodes();
                }
                NodeGroupConfigComponent.prototype.loadNodeGroup = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.nodeGroupService.get(this.nodeGroupId).subscribe(function (data) {
                        if (data) {
                            _this.nodeGroup = data;
                            _this.selectedNodes = data.hostnames;
                        }
                        else {
                            _this.feedBackService.warning = "No Node Group specified";
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                NodeGroupConfigComponent.prototype.isAddedNode = function (nodeName) {
                    var index = this.selectedNodes.indexOf(nodeName, 0);
                    return index != -1;
                };
                NodeGroupConfigComponent.prototype.addAllNodes = function () {
                    var _this = this;
                    this.selectedNodes = [];
                    this.nodes.forEach(function (node) {
                        _this.selectedNodes.push(node.nodeName);
                    });
                };
                NodeGroupConfigComponent.prototype.addNode = function (nodeName) {
                    if (!this.isAddedNode(nodeName)) {
                        this.selectedNodes.push(nodeName);
                    }
                };
                NodeGroupConfigComponent.prototype.removeNode = function (nodeName) {
                    if (this.isAddedNode(nodeName)) {
                        var index = this.selectedNodes.indexOf(nodeName, 0);
                        if (index != -1) {
                            this.selectedNodes.splice(index, 1);
                        }
                    }
                };
                NodeGroupConfigComponent.prototype.fetchNodes = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.nodeGroupService.getAllNodes().subscribe(function (data) {
                        _this.nodes = [];
                        if (data.length > 0) {
                            _this.nodes = data;
                        }
                        else {
                            _this.feedBackService.warning = "No Nodes are present at the moment";
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                NodeGroupConfigComponent.prototype.onSubmit = function () {
                    var _this = this;
                    if (this.selectedNodes.length == 0) {
                        this.alertService.showAlert(new alert_component_1.AlertConfiguration("Node Group cannot be empty", "Please select at least one node for this node group.", null, "OK", false));
                        return;
                    }
                    this.feedBackService.showPreloader = true;
                    this.nodeGroup.hostnames = this.selectedNodes;
                    var response = this.nodeGroupService.updateNodeGroup(this.nodeGroupId, this.nodeGroup);
                    response.subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['NodeGroupList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                NodeGroupConfigComponent = __decorate([
                    core_1.Component({
                        selector: 'nodegroup-config-component',
                        templateUrl: '../../../../resources/template/dashboard/nodegroup/config.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [nodegroup_service_1.NodeGroupService, rest_service_1.RestService]
                    }),
                    __param(2, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(3, core_1.Inject(alert_service_1.AlertService)), 
                    __metadata('design:paramtypes', [router_1.RouteParams, nodegroup_service_1.NodeGroupService, feedback_service_1.FeedBackService, alert_service_1.AlertService, router_2.Router])
                ], NodeGroupConfigComponent);
                return NodeGroupConfigComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("NodeGroupConfigComponent", NodeGroupConfigComponent);
        }
    }
});
//# sourceMappingURL=nodegroup.config.component.js.map