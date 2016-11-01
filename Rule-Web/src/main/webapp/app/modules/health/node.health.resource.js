System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NodeHealthResource;
    return {
        setters:[],
        execute: function() {
            /**
             * @author amila karunathilaka
             */
            NodeHealthResource = (function () {
                function NodeHealthResource(externalID, nodeData) {
                    this.nodeData = [];
                    this.externalID = externalID;
                    this.nodeData = nodeData;
                }
                return NodeHealthResource;
            }());
            exports_1("NodeHealthResource", NodeHealthResource);
        }
    }
});
//# sourceMappingURL=node.health.resource.js.map