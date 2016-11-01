System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Cluster;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Chathura Widanage
             */
            Cluster = (function () {
                function Cluster(id, name, portFrom, portTo, replicationCounter, nodeGroups, clusterServicePackage) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (portFrom === void 0) { portFrom = null; }
                    if (portTo === void 0) { portTo = null; }
                    if (replicationCounter === void 0) { replicationCounter = null; }
                    if (nodeGroups === void 0) { nodeGroups = []; }
                    if (clusterServicePackage === void 0) { clusterServicePackage = null; }
                    this.id = id;
                    this.name = name;
                    this.portFrom = portFrom;
                    this.portTo = portTo;
                    this.replicationCounter = replicationCounter;
                    this.nodeGroups = nodeGroups;
                    this.clusterServicePackage = clusterServicePackage;
                }
                return Cluster;
            }());
            exports_1("Cluster", Cluster);
        }
    }
});
//# sourceMappingURL=cluster.js.map