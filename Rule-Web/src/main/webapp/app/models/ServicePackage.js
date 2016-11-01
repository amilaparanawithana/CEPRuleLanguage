/**
 * @author Amila Paranawithana
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var ServicePackage;
    return {
        setters:[],
        execute: function() {
            ServicePackage = (function () {
                function ServicePackage(id, name, maxReplication, packageLevel) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (maxReplication === void 0) { maxReplication = null; }
                    if (packageLevel === void 0) { packageLevel = null; }
                    this.id = id;
                    this.name = name;
                    this.maxReplication = maxReplication;
                    this.packageLevel = packageLevel;
                }
                return ServicePackage;
            }());
            exports_1("ServicePackage", ServicePackage);
        }
    }
});
//# sourceMappingURL=ServicePackage.js.map