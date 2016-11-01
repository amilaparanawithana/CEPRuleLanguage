System.register(["angular2/core", "../../../services/rest.service", "angular2/router", "../../../services/ui/feedback.service", "../../../modules/alert/alert.service", "../../../modules/alert/alert.component", "../abstract.component", "../../../services/servicepackage.service"], function(exports_1, context_1) {
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
    var core_1, rest_service_1, router_1, feedback_service_1, alert_service_1, alert_component_1, abstract_component_1, servicepackage_service_1;
    var ServicePackageListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
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
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            },
            function (servicepackage_service_1_1) {
                servicepackage_service_1 = servicepackage_service_1_1;
            }],
        execute: function() {
            ServicePackageListComponent = (function (_super) {
                __extends(ServicePackageListComponent, _super);
                function ServicePackageListComponent(servicePackageService, feedBackService, alertService) {
                    _super.call(this);
                    this.servicePackageService = servicePackageService;
                    this.feedBackService = feedBackService;
                    this.alertService = alertService;
                    this.fetchPackages();
                }
                ServicePackageListComponent.prototype.fetchPackages = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.servicePackageService.getAll().subscribe(function (data) {
                        if (data.length > 0) {
                            _this.servicePackages = data;
                        }
                        else {
                            _this.feedBackService.warning = "No service packages are present at the moment";
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ServicePackageListComponent.prototype.deletePackage = function (roleId) {
                    var _this = this;
                    this.alertService.showAlert(new alert_component_1.AlertConfiguration("Do you really want to delete this roll?", "", function () {
                        _this.feedBackService.showPreloader = true;
                        _this.servicePackageService.deletePackage(roleId).subscribe(function (data) {
                            _this.fetchPackages();
                            _this.feedBackService.showPreloader = false;
                            _this.feedBackService.success = data.json().msg;
                        }, function (err) {
                            _this.fetchPackages();
                            _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                        });
                    }));
                };
                ServicePackageListComponent = __decorate([
                    core_1.Component({
                        selector: 'package-list-component',
                        templateUrl: '../../../../resources/template/dashboard/servicepackage/list.html',
                        providers: [servicepackage_service_1.ServicePackageService, rest_service_1.RestService],
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    __param(1, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(2, core_1.Inject(alert_service_1.AlertService)), 
                    __metadata('design:paramtypes', [servicepackage_service_1.ServicePackageService, feedback_service_1.FeedBackService, alert_service_1.AlertService])
                ], ServicePackageListComponent);
                return ServicePackageListComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ServicePackageListComponent", ServicePackageListComponent);
        }
    }
});
//# sourceMappingURL=servicepackage.list.component.js.map