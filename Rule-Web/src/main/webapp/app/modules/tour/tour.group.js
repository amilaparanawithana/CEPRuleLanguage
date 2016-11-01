System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TourStepGroup;
    return {
        setters:[],
        execute: function() {
            TourStepGroup = (function () {
                function TourStepGroup(title) {
                    this.steps = [];
                    this.title = title;
                }
                TourStepGroup.prototype.addStep = function (step) {
                    this.steps.push(step);
                };
                TourStepGroup.prototype.addSteps = function (steps) {
                    this.steps = this.steps.concat(steps);
                };
                TourStepGroup.prototype.setStepCompleted = function () {
                    this.stepCompleted = true;
                };
                return TourStepGroup;
            }());
            exports_1("TourStepGroup", TourStepGroup);
        }
    }
});
//# sourceMappingURL=tour.group.js.map