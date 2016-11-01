System.register(["angular2/core", "../../../services/ui.service", "../../../services/rest.service", "angular2/router", "../../../services/ui/feedback.service", "../abstract.component", "../../../services/servicepackage.service", "../../../models/ServicePackage"], function(exports_1, context_1) {
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
    var core_1, ui_service_1, rest_service_1, router_1, feedback_service_1, abstract_component_1, servicepackage_service_1, ServicePackage_1;
    var ServicePackageCreateComponent;
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
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            },
            function (servicepackage_service_1_1) {
                servicepackage_service_1 = servicepackage_service_1_1;
            },
            function (ServicePackage_1_1) {
                ServicePackage_1 = ServicePackage_1_1;
            }],
        execute: function() {
            ServicePackageCreateComponent = (function (_super) {
                __extends(ServicePackageCreateComponent, _super);
                function ServicePackageCreateComponent(servicePackageService, feedBackService, _router, routeParam) {
                    _super.call(this);
                    this.servicePackageService = servicePackageService;
                    this.feedBackService = feedBackService;
                    this._router = _router;
                    this.routeParam = routeParam;
                    this.servicePackage = new ServicePackage_1.ServicePackage();
                    this.createNew = true;
                    this.levels = ["public_node", "dedicated_node"];
                    var packageId = routeParam.get('id');
                    if (packageId) {
                        this.createNew = false;
                        this.fetchServicePackage(packageId);
                    }
                }
                ServicePackageCreateComponent.prototype.onSubmit = function () {
                    if (this.createNew) {
                        this.onSubmitCreate();
                    }
                    else if (!this.createNew) {
                        this.onSubmitEdit();
                    }
                };
                ServicePackageCreateComponent.prototype.onSubmitCreate = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.servicePackageService.create(this.servicePackage).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['ServicePackageList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ServicePackageCreateComponent.prototype.onSubmitEdit = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.servicePackageService.edit(this.servicePackage).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['ServicePackageList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ServicePackageCreateComponent.prototype.fetchServicePackage = function (packageId) {
                    var _this = this;
                    this.servicePackageService.getServicePackage(parseInt(packageId)).subscribe(function (res) {
                        _this.servicePackage = res;
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ServicePackageCreateComponent.prototype.onLevelChange = function (level) {
                    this.servicePackage.packageLevel = level;
                };
                ServicePackageCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'service-package-create-component',
                        templateUrl: '../../../../resources/template/dashboard/servicepackage/create.html',
                        providers: [ui_service_1.UIService, rest_service_1.RestService, servicepackage_service_1.ServicePackageService]
                    }),
                    __param(1, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [servicepackage_service_1.ServicePackageService, feedback_service_1.FeedBackService, router_1.Router, router_1.RouteParams])
                ], ServicePackageCreateComponent);
                return ServicePackageCreateComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ServicePackageCreateComponent", ServicePackageCreateComponent);
        }
    }
});
//# sourceMappingURL=servicepackage.create.component.js.map