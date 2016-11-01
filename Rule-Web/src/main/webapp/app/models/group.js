System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Group;
    return {
        setters:[],
        execute: function() {
            Group = (function () {
                function Group(id, name, roles) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (roles === void 0) { roles = []; }
                    this.selected = false;
                    this.id = id;
                    this.name = name;
                    this.roles = roles;
                }
                Group.prototype.check = function () {
                    this.selected = !this.selected;
                };
                return Group;
            }());
            exports_1("Group", Group);
        }
    }
});
//# sourceMappingURL=group.js.map