System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var NodeGroup;
    return {
        setters:[],
        execute: function() {
            /**
             * @author: dimuthu
             */
            NodeGroup = (function () {
                function NodeGroup(id, name, description, hostnames, type) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (description === void 0) { description = null; }
                    if (hostnames === void 0) { hostnames = []; }
                    if (type === void 0) { type = null; }
                    this.id = id;
                    this.name = name;
                    this.description = description;
                    this.hostnames = hostnames;
                    this.type = type;
                }
                NodeGroup.prototype.check = function () {
                    this.selected = !this.selected;
                };
                return NodeGroup;
            }());
            exports_1("NodeGroup", NodeGroup);
        }
    }
});
//# sourceMappingURL=nodeGroup.js.map