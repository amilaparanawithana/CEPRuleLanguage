System.register(["angular2/core", "./rest.service", "../models/cluster", "../models/pod", "../models/endpoint", "../models/project", "rxjs/add/operator/map"], function(exports_1, context_1) {
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
    var core_1, rest_service_1, cluster_1, pod_1, endpoint_1, project_1;
    var ClusterService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (cluster_1_1) {
                cluster_1 = cluster_1_1;
            },
            function (pod_1_1) {
                pod_1 = pod_1_1;
            },
            function (endpoint_1_1) {
                endpoint_1 = endpoint_1_1;
            },
            function (project_1_1) {
                project_1 = project_1_1;
            },
            function (_1) {}],
        execute: function() {
            ClusterService = (function () {
                function ClusterService(restService) {
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl('cluster');
                }
                /**
                 * Obtains the information of the cluster for the given ID
                 * @param id ID of the cluster
                 * @returns JSON response
                 */
                ClusterService.prototype.getById = function (id) {
                    return this.restService.get(this.restService.getResourceUrl('cluster', id))
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (cluster) {
                        var result;
                        if (cluster) {
                            result = new cluster_1.Cluster(cluster.id, cluster.name, cluster.portFrom, cluster.portTo, cluster.replicationCounter, cluster.nodeGroups, cluster.clusterServicePackage);
                        }
                        return result;
                    });
                };
                /**
                 * Obtains the details of all the clusters
                 * @returns JSON response
                 */
                ClusterService.prototype.getAllClusters = function () {
                    return this.restService.get(this.baseUrl).map(function (res) {
                        return res.json();
                    }).map(function (clusters) {
                        var result = [];
                        if (clusters) {
                            clusters.forEach(function (cluster) {
                                result.push(new cluster_1.Cluster(cluster.id, cluster.name, cluster.portFrom, cluster.portTo, cluster.replicationCounter, cluster.nodeGroups, cluster.clusterServicePackage));
                            });
                        }
                        return result;
                    });
                };
                ClusterService.prototype.createCluster = function (cluster) {
                    return this.restService.post(this.baseUrl, JSON.stringify(cluster)).map(function (res) { return res.json(); });
                };
                ClusterService.prototype.updateCluster = function (cluster) {
                    return this.restService.put(this.restService.getResourceUrl("cluster", cluster.id), JSON.stringify(cluster)).map(function (res) { return res.json(); });
                };
                ClusterService.prototype.refreshCluster = function (cluster) {
                    return this.restService.get(this.restService.getResourceUrl("cluster", cluster.id) + "/refresh").map(function (res) { return res.json(); });
                };
                ClusterService.prototype.getPodsOfCluster = function (id) {
                    return this.restService.get(this.restService.getBaseUrl("cluster/" + id + "/pods"))
                        .map(function (res) {
                        return res.json();
                    }).map(function (jsonObj) {
                        return jsonObj.items;
                    }).map(function (items) {
                        var pods = [];
                        if (items) {
                            items.forEach(function (item) {
                                var debugEnabled = false;
                                var debugSvcId = "";
                                var status;
                                if (item.metadata.deletionGracePeriodSeconds != 0) {
                                    status = "Terminating in " + item.metadata.deletionGracePeriodSeconds + "seconds";
                                }
                                else {
                                    status = item.status.phase;
                                }
                                if (item.metadata.labels['pod-debug-enable'] == 'true') {
                                    debugEnabled = true;
                                    debugSvcId = item.metadata.labels['pod-debug'];
                                }
                                pods.push(new pod_1.Pod(item.metadata.name, status, item.spec.nodeName, item.status.containerStatuses[0].restartCount, id, debugEnabled, {}, debugSvcId, item.status.podIP));
                            });
                        }
                        return pods;
                    });
                };
                ClusterService.prototype.deleteCluster = function (clusterId) {
                    return this.restService.delete(this.baseUrl + "/" + clusterId);
                };
                ClusterService.prototype.getEndpoints = function (id) {
                    return this.restService.get(this.restService.getResourceUrl('cluster', id + '/endpoints'))
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (endpoints) {
                        var result = [];
                        endpoints.forEach(function (endpoint) {
                            if (endpoint) {
                                var ep = new endpoint_1.Endpoint(endpoint.port, endpoint.type, endpoint.endpoints);
                                result.push(ep);
                            }
                        });
                        return result;
                    });
                };
                ClusterService.prototype.getProjects = function (clusterId) {
                    return this.restService.get(this.restService.getResourceUrl('cluster', clusterId + '/projects'))
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (projects) {
                        var result = [];
                        projects.forEach(function (project) {
                            if (project) {
                                var proj = new project_1.Project(project.id, project.name, clusterId, project.users);
                                result.push(proj);
                            }
                        });
                        return result;
                    });
                };
                ClusterService = __decorate([
                    core_1.Injectable(),
                    __param(0, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [rest_service_1.RestService])
                ], ClusterService);
                return ClusterService;
            }());
            exports_1("ClusterService", ClusterService);
        }
    }
});
//# sourceMappingURL=cluster.service.js.map