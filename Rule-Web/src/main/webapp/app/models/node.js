System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Node;
    return {
        setters:[],
        execute: function() {
            /**
             * @author: dimuthu
             */
            Node = (function () {
                function Node(nodeName, labels, machineId, cpus, memory, maxPods, ready, unschedulable) {
                    this.nodeName = nodeName;
                    this.labels = labels;
                    this.machineId = machineId;
                    this.cpus = cpus;
                    this.memory = memory;
                    this.maxPods = maxPods;
                    this.ready = ready;
                    this.unschedulable = unschedulable;
                }
                return Node;
            }());
            exports_1("Node", Node);
        }
    }
});
//# sourceMappingURL=node.js.map