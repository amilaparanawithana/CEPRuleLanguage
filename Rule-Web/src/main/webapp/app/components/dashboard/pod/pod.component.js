System.register(["angular2/core", "angular2/router", "./pod.detail.component", "./pod.log.component"], function(exports_1, context_1) {
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
    var core_1, router_1, pod_detail_component_1, pod_log_component_1;
    var PodComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (pod_detail_component_1_1) {
                pod_detail_component_1 = pod_detail_component_1_1;
            },
            function (pod_log_component_1_1) {
                pod_log_component_1 = pod_log_component_1_1;
            }],
        execute: function() {
            PodComponent = (function () {
                function PodComponent() {
                }
                PodComponent = __decorate([
                    core_1.Component({
                        selector: 'pod-component',
                        template: "<router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/',
                            name: 'PodDetail',
                            component: pod_detail_component_1.PodDetailComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/logs',
                            name: 'PodLog',
                            component: pod_log_component_1.PodLogComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], PodComponent);
                return PodComponent;
            }());
            exports_1("PodComponent", PodComponent);
        }
    }
});
//# sourceMappingURL=pod.component.js.map