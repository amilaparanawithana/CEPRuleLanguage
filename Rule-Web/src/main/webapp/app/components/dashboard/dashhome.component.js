System.register(["angular2/core", "../../services/rest.service", "./charts/chart.component"], function(exports_1, context_1) {
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
    var core_1, rest_service_1, chart_component_1;
    var DashHomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (chart_component_1_1) {
                chart_component_1 = chart_component_1_1;
            }],
        execute: function() {
            DashHomeComponent = (function () {
                function DashHomeComponent() {
                }
                DashHomeComponent = __decorate([
                    core_1.Component({
                        selector: 'dashhome-compoenent',
                        templateUrl: '../../../resources/template/dashboard/home.html',
                        encapsulation: core_1.ViewEncapsulation.None,
                        providers: [rest_service_1.RestService],
                        directives: [chart_component_1.ChartComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], DashHomeComponent);
                return DashHomeComponent;
            }());
            exports_1("DashHomeComponent", DashHomeComponent);
        }
    }
});
//# sourceMappingURL=dashhome.component.js.map