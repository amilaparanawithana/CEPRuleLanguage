System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Project;
    return {
        setters:[],
        execute: function() {
            Project = (function () {
                //object type variables
                function Project(id, name, clusterId, users) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (clusterId === void 0) { clusterId = null; }
                    if (users === void 0) { users = []; }
                    this.id = id;
                    this.name = name;
                    this.clusterId = clusterId;
                    this.users = users;
                }
                return Project;
            }());
            exports_1("Project", Project);
        }
    }
});
//# sourceMappingURL=project.js.map