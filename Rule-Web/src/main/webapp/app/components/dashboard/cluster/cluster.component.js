System.register(["angular2/core", "angular2/router", "./cluster.list.component", "./cluster.create.component", "./cluster.config.component"], function(exports_1, context_1) {
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
    var core_1, router_1, cluster_list_component_1, cluster_create_component_1, cluster_config_component_1;
    var ClusterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cluster_list_component_1_1) {
                cluster_list_component_1 = cluster_list_component_1_1;
            },
            function (cluster_create_component_1_1) {
                cluster_create_component_1 = cluster_create_component_1_1;
            },
            function (cluster_config_component_1_1) {
                cluster_config_component_1 = cluster_config_component_1_1;
            }],
        execute: function() {
            ClusterComponent = (function () {
                function ClusterComponent() {
                }
                ClusterComponent = __decorate([
                    core_1.Component({
                        selector: 'cluster-component',
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        encapsulation: core_1.ViewEncapsulation.None
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/:id',
                            name: 'Cluster',
                            component: cluster_config_component_1.ClusterConfigComponent
                        },
                        {
                            path: '/',
                            component: cluster_list_component_1.ClusterListComponent,
                            name: 'ClusterList'
                        },
                        {
                            path: '/new',
                            component: cluster_create_component_1.ClusterCreateComponent,
                            name: 'ClusterCreate'
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], ClusterComponent);
                return ClusterComponent;
            }());
            exports_1("ClusterComponent", ClusterComponent);
        }
    }
});
//# sourceMappingURL=cluster.component.js.map