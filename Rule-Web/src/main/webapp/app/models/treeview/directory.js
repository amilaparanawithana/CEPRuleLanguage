System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Directory;
    return {
        setters:[],
        execute: function() {
            Directory = (function () {
                function Directory(name, directories, permissions) {
                    this.name = name;
                    this.directories = directories;
                    this.permissions = permissions;
                    this.expanded = false;
                    this.checked = false;
                }
                Directory.prototype.toggle = function () {
                    this.expanded = !this.expanded;
                };
                Directory.prototype.getIcon = function () {
                    if (this.expanded) {
                        return 'minus';
                    }
                    return 'plus';
                };
                Directory.prototype.check = function () {
                    this.checked = !this.checked;
                    this.checkRecursive(this.checked);
                };
                Directory.prototype.addPermission = function (permission) {
                    this.permissions.push(permission);
                };
                Directory.prototype.checkIfAllPermissionsSelected = function () {
                    for (var i = 0; i < this.permissions.length; i++) {
                        if (!this.permissions[i].checked) {
                            break;
                        }
                        this.checked = true;
                    }
                };
                Directory.prototype.checkRecursive = function (state) {
                    this.directories.forEach(function (d) {
                        d.checked = state;
                        d.checkRecursive(state);
                    });
                    this.permissions.forEach(function (p) {
                        p.setCheck(state);
                    });
                };
                return Directory;
            }());
            exports_1("Directory", Directory);
        }
    }
});
//# sourceMappingURL=directory.js.map