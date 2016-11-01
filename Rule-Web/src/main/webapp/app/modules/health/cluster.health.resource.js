System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ClusterHealthResource;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Sajith Dilshan
             */
            ClusterHealthResource = (function () {
                function ClusterHealthResource(clusterName, podData) {
                    this.podData = [];
                    this.clusterName = clusterName;
                    this.podData = podData;
                }
                return ClusterHealthResource;
            }());
            exports_1("ClusterHealthResource", ClusterHealthResource);
        }
    }
});
//# sourceMappingURL=cluster.health.resource.js.map