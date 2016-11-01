/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Role;
    return {
        setters:[],
        execute: function() {
            Role = (function () {
                function Role(id, name, permission) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (permission === void 0) { permission = []; }
                    this.selected = false;
                    this.id = id;
                    this.name = name;
                    this.permissions = permission;
                }
                Role.prototype.check = function () {
                    this.selected = !this.selected;
                };
                return Role;
            }());
            exports_1("Role", Role);
        }
    }
});
//# sourceMappingURL=role.js.map