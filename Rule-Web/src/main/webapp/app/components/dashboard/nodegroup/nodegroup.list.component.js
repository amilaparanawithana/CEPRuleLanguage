System.register(["angular2/core", "angular2/router", "../../../services/nodegroup.service", "../../../services/rest.service", "../../../services/ui/feedback.service", "../../../modules/alert/alert.service", "../../../modules/alert/alert.component", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, router_1, nodegroup_service_1, rest_service_1, feedback_service_1, alert_service_1, alert_component_1, abstract_component_1;
    var NodeGroupListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (nodegroup_service_1_1) {
                nodegroup_service_1 = nodegroup_service_1_1;
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
            NodeGroupListComponent = (function (_super) {
                __extends(NodeGroupListComponent, _super);
                function NodeGroupListComponent(nodeGroupService, feedBackService, alertService, _router) {
                    _super.call(this);
                    this.nodeGroupService = nodeGroupService;
                    this.feedBackService = feedBackService;
                    this.alertService = alertService;
                    this._router = _router;
                    this.fetchNodeGroups();
                }
                NodeGroupListComponent.prototype.fetchNodeGroups = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.nodeGroupService.getAll().subscribe(function (data) {
                        _this.nodeGroups = [];
                        if (data.length > 0) {
                            _this.nodeGroups = data;
                        }
                        else {
                            _this.feedBackService.warning = "No Node Groups are present at the moment";
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                NodeGroupListComponent.prototype.deleteNodeGroup = function (nodeGroupId) {
                    var _this = this;
                    this.alertService.showAlert(new alert_component_1.AlertConfiguration("Do you really want to delete this Node Group?", "This action will refresh all clusters attached to this node group.", function () {
                        _this.feedBackService.showPreloader = true;
                        _this.nodeGroupService.deleteNodeGroup(nodeGroupId).subscribe(function (data) {
                            _this.fetchNodeGroups();
                            _this.feedBackService.showPreloader = false;
                            _this.feedBackService.success = data.json().msg;
                        }, function (err) {
                            _this.fetchNodeGroups();
                            _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                        });
                    }));
                };
                NodeGroupListComponent.prototype.modifyNodeGroup = function (nodeGroupId) {
                    var _this = this;
                    this.alertService.showAlert(new alert_component_1.AlertConfiguration("Do you really want to modify this Node Group?", "Modification will refresh all clusters attached to this node group.", function () {
                        _this._router.navigate(['../NodeGroup', { id: nodeGroupId }]);
                    }));
                };
                NodeGroupListComponent.prototype.isEditableNodeGroup = function (nodeGroup) {
                    return nodeGroup.name != "all";
                };
                NodeGroupListComponent = __decorate([
                    core_1.Component({
                        selector: 'nodegroup-list-component',
                        templateUrl: '../../../../resources/template/dashboard/nodegroup/list.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [rest_service_1.RestService, nodegroup_service_1.NodeGroupService]
                    }),
                    __param(1, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(2, core_1.Inject(alert_service_1.AlertService)), 
                    __metadata('design:paramtypes', [nodegroup_service_1.NodeGroupService, feedback_service_1.FeedBackService, alert_service_1.AlertService, router_1.Router])
                ], NodeGroupListComponent);
                return NodeGroupListComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("NodeGroupListComponent", NodeGroupListComponent);
        }
    }
});
//# sourceMappingURL=nodegroup.list.component.js.map