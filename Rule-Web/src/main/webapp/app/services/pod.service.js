System.register(["angular2/core", "angular2/http", "./rest.service", "../models/pod", "../modules/tables/generic.table.service", "../modules/tables/data.row", "../modules/tables/table.resource", "rxjs/Observable"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var core_1, http_1, rest_service_1, pod_1, generic_table_service_1, data_row_1, table_resource_1, Observable_1;
    var PodService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (pod_1_1) {
                pod_1 = pod_1_1;
            },
            function (generic_table_service_1_1) {
                generic_table_service_1 = generic_table_service_1_1;
            },
            function (data_row_1_1) {
                data_row_1 = data_row_1_1;
            },
            function (table_resource_1_1) {
                table_resource_1 = table_resource_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            PodService = (function (_super) {
                __extends(PodService, _super);
                function PodService(http, restService) {
                    _super.call(this);
                    this.http = http;
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl('project');
                }
                PodService.prototype.getListOfPodsNames = function () {
                    return this.restService.get(this.restService.getBaseUrl("logs/pods"))
                        .map(function (res) {
                        console.log(res.json());
                        return res.json();
                    });
                };
                PodService.prototype.getByName = function (clusterId, name) {
                    return this.restService.get(this.restService.getBaseUrl("cluster/" + clusterId + "/pod/" + name))
                        .map(function (res) {
                        return res.json();
                    }).map(function (item) {
                        var status;
                        var debugEnabled = false;
                        var debugSvcId = "";
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
                        return new pod_1.Pod(item.metadata.name, status, item.spec.nodeName, item.status.containerStatuses[0].restartCount, clusterId, debugEnabled, {}, debugSvcId, item.status.podIP);
                    });
                };
                PodService.prototype.getProxyList = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/proxy/" + podIP))
                        .map(function (res) {
                        return res.json();
                    }).map(function (item) {
                        return item;
                    });
                };
                PodService.prototype.getListeners = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/listener/" + podIP))
                        .map(function (res) {
                        return res.json();
                    }).map(function (item) {
                        return item;
                    });
                };
                PodService.prototype.getSenders = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/sender/" + podIP))
                        .map(function (res) {
                        return res.json();
                    }).map(function (item) {
                        return item;
                    });
                };
                PodService.prototype.getSequences = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/sequence/" + podIP))
                        .map(function (res) {
                        return res.json();
                    }).map(function (item) {
                        return item;
                    });
                };
                PodService.prototype.getDUs = function (podIP) {
                    return this.restService.get(this.restService.getBaseUrl("jmx/dus/" + podIP))
                        .map(function (res) {
                        return res.json();
                    }).map(function (item) {
                        return item;
                    });
                };
                PodService.prototype.toggleDebug = function (clusterId, name) {
                    return this.http.post(this.restService.getBaseUrl("cluster/" + clusterId + "/pod/debug/" + name), JSON.stringify("{}")).map(function (res) { return res.json(); });
                };
                PodService.prototype.get = function (keyword, limit, page, sorter, asc, params) {
                    var podName = params.get('pod-name');
                    var clusterId = params.get('cluster-id');
                    var url;
                    if (params.has('show-all-logs')) {
                        url = this.restService.getBaseUrl("logs/pod/") + podName + "?" + "key=" + keyword + "&limit=" + limit + "&page=" + page + "&sorter=" + sorter + "&asc=" + asc;
                    }
                    else {
                        if (clusterId) {
                            url = this.restService.getBaseUrl("cluster/" + clusterId + "/pod/" + podName + "/log/") + "?" + "key=" + keyword + "&limit=" + limit + "&page=" + page + "&sorter=" + sorter + "&asc=" + asc;
                        }
                        else {
                            return Observable_1.Observable.create(function (observer) {
                                observer.next(new table_resource_1.TableResource());
                            });
                        }
                    }
                    //set log level
                    if (params.has('log-level')) {
                        url += "&logLevel=" + params.get('log-level');
                    }
                    if (params.has('start-date') && params.has('end-date')) {
                        url += "&fromDate=" + params.get('start-date');
                        url += "&toDate=" + params.get('end-date');
                    }
                    return this.restService.get(url)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (resource) {
                        var tableResource = new table_resource_1.TableResource();
                        tableResource.currentPage = resource.currentPage;
                        tableResource.totalEntries = resource.totalEntries;
                        tableResource.totalPages = resource.totalPages;
                        if (resource) {
                            resource.dataRows.forEach(function (log) {
                                var dataRow = new data_row_1.DataRow();
                                dataRow.data.push(log.id, new Date(log.occurrenceTime), log.node, log.node_Group, log.space, log.loggerName, log.remoteHost, log.remoteIp, log.threadId, log.message, log.severity, log.type, log.errorCode, log.messageId, log.logLevel);
                                tableResource.dataRows.push(dataRow);
                            });
                        }
                        return tableResource;
                    });
                };
                PodService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], PodService);
                return PodService;
            }(generic_table_service_1.GenericTableService));
            exports_1("PodService", PodService);
        }
    }
});
//# sourceMappingURL=pod.service.js.map