System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Pod;
    return {
        setters:[],
        execute: function() {
            /**
             * @author: dimuthu
             */
            Pod = (function () {
                function Pod(name, state, runningNode, restarts, clusterId, debugEnabled, debugPortMapping, debugSvcId, podIP) {
                    this.name = name;
                    this.state = state;
                    this.runningNode = runningNode;
                    this.restarts = restarts;
                    this.clusterId = clusterId;
                    this.debugEnabled = debugEnabled;
                    this.debugPortMapping = debugPortMapping;
                    this.debugSvcId = debugSvcId;
                    this.podIP = podIP;
                }
                return Pod;
            }());
            exports_1("Pod", Pod);
        }
    }
});
//# sourceMappingURL=pod.js.map