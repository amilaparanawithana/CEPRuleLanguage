System.register(["angular2/core", "./alert.service"], function(exports_1, context_1) {
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
    var core_1, alert_service_1;
    var AlertComponent, AlertConfiguration;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            }],
        execute: function() {
            AlertComponent = (function () {
                function AlertComponent(alertService) {
                    this.service = alertService;
                }
                AlertComponent.prototype.positiveAction = function () {
                    if (this.service.config.callback !== null) {
                        this.service.config.callback();
                    }
                    this.dismissAlert();
                };
                AlertComponent.prototype.dismissAlert = function () {
                    this.service.config = null;
                };
                AlertComponent = __decorate([
                    core_1.Component({
                        selector: 'alert-component',
                        templateUrl: '../../../resources/template/modules/alert/alert.html'
                    }),
                    __param(0, core_1.Inject(alert_service_1.AlertService)), 
                    __metadata('design:paramtypes', [alert_service_1.AlertService])
                ], AlertComponent);
                return AlertComponent;
            }());
            exports_1("AlertComponent", AlertComponent);
            AlertConfiguration = (function () {
                function AlertConfiguration(title, message, callback, positiveButton, negativeButtonVisible, negativeButton) {
                    if (callback === void 0) { callback = null; }
                    if (positiveButton === void 0) { positiveButton = "Yes"; }
                    if (negativeButtonVisible === void 0) { negativeButtonVisible = true; }
                    if (negativeButton === void 0) { negativeButton = "No"; }
                    this.title = title;
                    this.message = message;
                    this.callback = callback;
                    this.positiveButton = positiveButton;
                    this.negativeButtonVisible = negativeButtonVisible;
                    this.negativeButton = negativeButton;
                }
                return AlertConfiguration;
            }());
            exports_1("AlertConfiguration", AlertConfiguration);
        }
    }
});
//# sourceMappingURL=alert.component.js.map