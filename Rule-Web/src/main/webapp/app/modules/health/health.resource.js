System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var HealthResource;
    return {
        setters:[],
        execute: function() {
            /**
             * @author chathura widanage
             */
            HealthResource = (function () {
                function HealthResource(working, message, component) {
                    this.working = working;
                    this.message = message;
                    this.component = component;
                }
                return HealthResource;
            }());
            exports_1("HealthResource", HealthResource);
        }
    }
});
//# sourceMappingURL=health.resource.js.map