System.register(["angular2/core", "../../services/ui.service", "../../services/rest.service", "./charts/chart.component", "../../modules/health/health.component", "../../modules/health/cluster.health.component", "angular2/router", "../../modules/health/node.health.component"], function(exports_1, context_1) {
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
    var core_1, ui_service_1, rest_service_1, chart_component_1, health_component_1, cluster_health_component_1, router_1, node_health_component_1;
    var DashHomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (chart_component_1_1) {
                chart_component_1 = chart_component_1_1;
            },
            function (health_component_1_1) {
                health_component_1 = health_component_1_1;
            },
            function (cluster_health_component_1_1) {
                cluster_health_component_1 = cluster_health_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (node_health_component_1_1) {
                node_health_component_1 = node_health_component_1_1;
            }],
        execute: function() {
            DashHomeComponent = (function () {
                function DashHomeComponent(uiService, restService, router) {
                    var _this = this;
                    this.uiService = uiService;
                    this.restService = restService;
                    this.router = router;
                    this.activeTab = "clusterHealth";
                    router.subscribe(function (val) {
                        _this.uiService.isFluidContainer = false;
                        _this.clusterHealthComponent.destroyInterval();
                        _this.nodeHealthComponent.destroyInterval();
                        _this.healthComponent.destroyInterval();
                    });
                    this.onTabChange();
                }
                DashHomeComponent.prototype.ngOnDestroy = function () {
                    this.clusterHealthComponent.destroyInterval();
                    this.nodeHealthComponent.destroyInterval();
                    this.healthComponent.destroyInterval();
                };
                DashHomeComponent.prototype.onTabChange = function (activeTab) {
                    this.activeTab = activeTab;
                    if (activeTab == "clusterHealth") {
                        this.healthComponent.destroyInterval();
                        this.nodeHealthComponent.destroyInterval();
                        this.clusterHealthComponent.initializeInterval();
                    }
                    else if (activeTab == "systemHealth") {
                        this.clusterHealthComponent.destroyInterval();
                        this.nodeHealthComponent.destroyInterval();
                        this.healthComponent.initializeInterval();
                    }
                    else if (activeTab == "nodesHealth") {
                        this.clusterHealthComponent.destroyInterval();
                        this.healthComponent.destroyInterval();
                        this.nodeHealthComponent.initializeInterval();
                    }
                };
                DashHomeComponent.prototype.ngOnInit = function () {
                    this.uiService.initApp();
                };
                __decorate([
                    core_1.ViewChild(health_component_1.HealthComponent), 
                    __metadata('design:type', health_component_1.HealthComponent)
                ], DashHomeComponent.prototype, "healthComponent", void 0);
                __decorate([
                    core_1.ViewChild(cluster_health_component_1.ClusterHealthComponent), 
                    __metadata('design:type', cluster_health_component_1.ClusterHealthComponent)
                ], DashHomeComponent.prototype, "clusterHealthComponent", void 0);
                __decorate([
                    core_1.ViewChild(node_health_component_1.NodeHealthComponent), 
                    __metadata('design:type', node_health_component_1.NodeHealthComponent)
                ], DashHomeComponent.prototype, "nodeHealthComponent", void 0);
                DashHomeComponent = __decorate([
                    core_1.Component({
                        selector: 'dashhome-compoenent',
                        templateUrl: '../../../resources/template/dashboard/home.html',
                        encapsulation: core_1.ViewEncapsulation.None,
                        providers: [rest_service_1.RestService],
                        directives: [chart_component_1.ChartComponent, health_component_1.HealthComponent, cluster_health_component_1.ClusterHealthComponent, node_health_component_1.NodeHealthComponent]
                    }),
                    __param(0, core_1.Inject(ui_service_1.UIService)), 
                    __metadata('design:paramtypes', [ui_service_1.UIService, rest_service_1.RestService, router_1.Router])
                ], DashHomeComponent);
                return DashHomeComponent;
            }());
            exports_1("DashHomeComponent", DashHomeComponent);
        }
    }
});
//# sourceMappingURL=dashhome.component.js.map