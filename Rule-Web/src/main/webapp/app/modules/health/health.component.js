System.register(["angular2/core", "../../services/health.service", "../../services/ui/feedback.service", "../../components/dashboard/abstract.component"], function(exports_1, context_1) {
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
    var core_1, health_service_1, feedback_service_1, abstract_component_1;
    var HealthComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (health_service_1_1) {
                health_service_1 = health_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            HealthComponent = (function (_super) {
                __extends(HealthComponent, _super);
                function HealthComponent(healthService, feedbackService) {
                    this.healthService = healthService;
                    this.feedbackService = feedbackService;
                    this.healths = [];
                    this.requestProcessed = true;
                    this.initializeInterval();
                }
                HealthComponent.prototype.ngOnDestroy = function () {
                    this.destroyInterval();
                };
                HealthComponent.prototype.update = function () {
                    var _this = this;
                    if (this.requestProcessed) {
                        this.requestProcessed = false;
                        this.healthService.getHealth().subscribe(function (data) {
                            _this.requestProcessed = true;
                            _this.healths = [];
                            _this.healths = data;
                        }, function (err) {
                            _this.requestProcessed = true;
                            _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                        }, function () {
                            _this.requestProcessed = true;
                        });
                    }
                };
                HealthComponent.prototype.initializeInterval = function () {
                    var _this = this;
                    this.update();
                    this.interval = setInterval(function () {
                        _this.update();
                    }, 15000);
                };
                HealthComponent.prototype.destroyInterval = function () {
                    clearInterval(this.interval);
                };
                HealthComponent = __decorate([
                    core_1.Component({
                        selector: 'health-component',
                        templateUrl: '../../../resources/template/modules/health/health.html',
                        providers: [health_service_1.HealthService, feedback_service_1.FeedBackService]
                    }), 
                    __metadata('design:paramtypes', [health_service_1.HealthService, feedback_service_1.FeedBackService])
                ], HealthComponent);
                return HealthComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("HealthComponent", HealthComponent);
        }
    }
});
//# sourceMappingURL=health.component.js.map