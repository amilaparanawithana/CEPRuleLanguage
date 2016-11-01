System.register(["angular2/core", "../../services/ui/feedback.service"], function(exports_1, context_1) {
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
    var core_1, feedback_service_1;
    var FeedbackComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            }],
        execute: function() {
            FeedbackComponent = (function () {
                function FeedbackComponent(feedbackService) {
                    this.feedbackService = feedbackService;
                }
                FeedbackComponent.prototype.dismissError = function () {
                    this.feedbackService.error = null;
                };
                FeedbackComponent.prototype.dismissSuccess = function () {
                    this.feedbackService.success = null;
                };
                FeedbackComponent.prototype.dismissWarning = function () {
                    this.feedbackService.warning = null;
                };
                FeedbackComponent = __decorate([
                    core_1.Component({
                        selector: 'feedback',
                        templateUrl: '../../../resources/template/dashboard/feedback.html',
                    }),
                    __param(0, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [feedback_service_1.FeedBackService])
                ], FeedbackComponent);
                return FeedbackComponent;
            }());
            exports_1("FeedbackComponent", FeedbackComponent);
        }
    }
});
//# sourceMappingURL=feedback.component.js.map