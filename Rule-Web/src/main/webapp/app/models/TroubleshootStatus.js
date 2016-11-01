System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TroubleshootStatus;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Sajith Dilshan
             */
            TroubleshootStatus = (function () {
                function TroubleshootStatus(taskId, status, duration, lastUpdated, extraInfo, overallStatus) {
                    if (overallStatus === void 0) { overallStatus = null; }
                    this.taskId = taskId;
                    this.status = status;
                    this.duration = duration;
                    this.lastUpdated = lastUpdated;
                    this.extraInfo = extraInfo;
                    this.overallStatus = overallStatus;
                }
                return TroubleshootStatus;
            }());
            exports_1("TroubleshootStatus", TroubleshootStatus);
        }
    }
});
//# sourceMappingURL=TroubleshootStatus.js.map