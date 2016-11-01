System.register(["../../services/ui/feedback.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var feedback_service_1;
    var AbstractComponent;
    return {
        setters:[
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            }],
        execute: function() {
            AbstractComponent = (function () {
                function AbstractComponent() {
                }
                AbstractComponent.prototype.handleServiceError = function (feedbackService, err) {
                    console.log(err);
                    feedbackService.showPreloader = false;
                    try {
                        feedbackService.showFeedback(feedback_service_1.FeedbackType.ERROR, err.json().msg, false);
                    }
                    catch (e) {
                        feedbackService.showFeedback(feedback_service_1.FeedbackType.ERROR, "Operation failed due to a connection failure.", false);
                    }
                };
                return AbstractComponent;
            }());
            exports_1("AbstractComponent", AbstractComponent);
        }
    }
});
//# sourceMappingURL=abstract.component.js.map