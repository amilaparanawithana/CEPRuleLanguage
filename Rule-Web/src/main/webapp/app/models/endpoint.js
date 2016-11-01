System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Endpoint;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Amila Karunathilaka
             */
            Endpoint = (function () {
                function Endpoint(port, type, endpoints) {
                    this.port = port;
                    this.type = type;
                    this.endpoints = endpoints;
                }
                return Endpoint;
            }());
            exports_1("Endpoint", Endpoint);
        }
    }
});
//# sourceMappingURL=endpoint.js.map