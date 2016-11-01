System.register(["angular2/core", "../models/node", "../models/nodeGroup", "./rest.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, node_1, nodeGroup_1, rest_service_1;
    var NodeGroupService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            },
            function (nodeGroup_1_1) {
                nodeGroup_1 = nodeGroup_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            }],
        execute: function() {
            NodeGroupService = (function () {
                function NodeGroupService(restService) {
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl('nodegroup');
                }
                /**
                 * Obtains all the node groups
                 * @returns {Observable<R>}
                 */
                NodeGroupService.prototype.getAll = function () {
                    return this.restService.get(this.baseUrl)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (nodeGroups) {
                        var result = [];
                        if (nodeGroups) {
                            nodeGroups.forEach(function (nodeGroup) {
                                result.push(new nodeGroup_1.NodeGroup(nodeGroup.id, nodeGroup.name, nodeGroup.description, nodeGroup.hostnames));
                            });
                        }
                        return result;
                    });
                };
                NodeGroupService.prototype.get = function (nodeGroupId) {
                    return this.restService.get(this.baseUrl + "/" + nodeGroupId)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (nodeGroup) {
                        var result;
                        if (nodeGroup) {
                            result = new nodeGroup_1.NodeGroup(nodeGroup.id, nodeGroup.name, nodeGroup.description, nodeGroup.hostnames);
                        }
                        return result;
                    });
                };
                NodeGroupService.prototype.getAllNodes = function () {
                    return this.restService.get(this.baseUrl + "/nodes")
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (nodes) {
                        var result = [];
                        if (nodes) {
                            nodes.forEach(function (node) {
                                result.push(new node_1.Node(node.nodeName, node.labels, node.machineId, node.cpus, node.memory, node.maxPods, node.ready, node.unschedulable));
                            });
                        }
                        return result;
                    });
                };
                NodeGroupService.prototype.deleteNodeGroup = function (nodeGroupId) {
                    return this.restService.delete(this.baseUrl + "/" + nodeGroupId);
                };
                NodeGroupService.prototype.createNodeGroup = function (nodeGroup) {
                    return this.restService.post(this.baseUrl, JSON.stringify(nodeGroup)).map(function (res) { return res.json(); });
                };
                NodeGroupService.prototype.updateNodeGroup = function (nodeGroupId, nodeGroup) {
                    return this.restService.put(this.baseUrl + "/" + nodeGroupId, JSON.stringify(nodeGroup)).map(function (res) { return res.json(); });
                };
                NodeGroupService.prototype.fetchPublicNodeGroups = function () {
                    return this.restService.get(this.baseUrl + "/publicnodes")
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (nodeGroups) {
                        var result = [];
                        if (nodeGroups) {
                            nodeGroups.forEach(function (nodeGroup) {
                                result.push(new nodeGroup_1.NodeGroup(nodeGroup.id, nodeGroup.name, nodeGroup.description, nodeGroup.hostnames));
                            });
                        }
                        return result;
                    });
                };
                NodeGroupService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [rest_service_1.RestService])
                ], NodeGroupService);
                return NodeGroupService;
            }());
            exports_1("NodeGroupService", NodeGroupService);
        }
    }
});
//# sourceMappingURL=nodegroup.service.js.map