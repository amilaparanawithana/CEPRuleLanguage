System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Permission;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Chathura Widanage
             * @author Sajith Dilshan
             */
            Permission = (function () {
                function Permission(id, name, category) {
                    this.checked = false;
                    this.id = id;
                    this.name = name;
                    this.category = category;
                }
                Permission.prototype.setCheck = function (check) {
                    this.checked = check;
                };
                Permission.prototype.check = function () {
                    this.checked = !this.checked;
                };
                return Permission;
            }());
            exports_1("Permission", Permission);
        }
    }
});
//# sourceMappingURL=permission.js.map