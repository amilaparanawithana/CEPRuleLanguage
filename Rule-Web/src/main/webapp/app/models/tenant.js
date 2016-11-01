System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Tenant;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Amila Paranawithana
             */
            Tenant = (function () {
                function Tenant(id, name, domain, email, admin) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (domain === void 0) { domain = null; }
                    if (email === void 0) { email = null; }
                    if (admin === void 0) { admin = null; }
                    this.id = id;
                    this.name = name;
                    this.domain = domain;
                    this.email = email;
                    this.admin = admin;
                }
                return Tenant;
            }());
            exports_1("Tenant", Tenant);
        }
    }
});
//# sourceMappingURL=tenant.js.map