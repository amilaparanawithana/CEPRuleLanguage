System.register(["angular2/core", "../../../services/ui.service", "../../../services/rest.service", "angular2/router", "../../../services/ui/feedback.service", "../../../services/datasource.service", "../../../models/datasource"], function(exports_1, context_1) {
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
    var core_1, ui_service_1, rest_service_1, router_1, feedback_service_1, datasource_service_1, datasource_1;
    var DatasourceViewComponent;
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
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (datasource_service_1_1) {
                datasource_service_1 = datasource_service_1_1;
            },
            function (datasource_1_1) {
                datasource_1 = datasource_1_1;
            }],
        execute: function() {
            DatasourceViewComponent = (function () {
                function DatasourceViewComponent(datasourceService, feedBackService, _router, routeParam) {
                    this.datasourceService = datasourceService;
                    this.feedBackService = feedBackService;
                    this._router = _router;
                    this.routeParam = routeParam;
                    this.datasource = new datasource_1.Datasource();
                    var datasourceId = routeParam.get('id');
                    var podIP = routeParam.get('podIP');
                    if (datasourceId) {
                        this.datasource.id = datasourceId;
                        this.podIP = podIP;
                    }
                    this.fetchDatasource(this.datasource.id, this.podIP);
                }
                /**
                 * Fetches and set the group object
                 * @param datasourceId id of the datasource
                 */
                DatasourceViewComponent.prototype.fetchDatasource = function (datasourceId, poiIP) {
                    var _this = this;
                    this.datasourceService.getById(datasourceId, poiIP).subscribe(function (data) {
                        _this.datasource = data;
                    });
                };
                DatasourceViewComponent = __decorate([
                    core_1.Component({
                        selector: 'datasource-view-component',
                        directives: [],
                        templateUrl: '../../../../resources/template/dashboard/datasource/view.html',
                        providers: [ui_service_1.UIService, rest_service_1.RestService, datasource_service_1.DatasourceService],
                        styleUrls: [
                            "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css"
                        ]
                    }),
                    __param(1, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [datasource_service_1.DatasourceService, feedback_service_1.FeedBackService, router_1.Router, router_1.RouteParams])
                ], DatasourceViewComponent);
                return DatasourceViewComponent;
            }());
            exports_1("DatasourceViewComponent", DatasourceViewComponent);
        }
    }
});
//# sourceMappingURL=datasurce.view.js.map