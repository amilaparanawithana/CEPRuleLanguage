System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Amila Paranawithana
             */
            User = (function () {
                function User(id, name, email, password, roles) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (email === void 0) { email = null; }
                    if (password === void 0) { password = null; }
                    if (roles === void 0) { roles = []; }
                    this.selected = false;
                    this.id = id;
                    this.name = name;
                    this.email = email;
                    this.password = password;
                    this.roles = roles;
                }
                User.prototype.check = function () {
                    this.selected = !this.selected;
                };
                return User;
            }());
            exports_1("User", User);
        }
    }
});
//# sourceMappingURL=user.js.map