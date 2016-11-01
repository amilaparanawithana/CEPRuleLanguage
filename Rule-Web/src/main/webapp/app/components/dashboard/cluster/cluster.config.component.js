System.register(["angular2/core", "angular2/router", "../../../services/cluster.service", "../../../models/cluster", "../../../services/rest.service", "../../../services/ui/feedback.service", "../charts/chart.component", "../../../services/ui/chart.service", "../../../models/ui/chart", "../abstract.component", "../../../models/ServicePackage", "../../../services/servicepackage.service", "../../../services/nodegroup.service", "../../../modules/alert/alert.service", "../../../modules/alert/alert.component"], function(exports_1, context_1) {
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
    var core_1, router_1, cluster_service_1, cluster_1, rest_service_1, feedback_service_1, chart_component_1, chart_service_1, chart_1, abstract_component_1, ServicePackage_1, servicepackage_service_1, nodegroup_service_1, alert_service_1, alert_component_1;
    var ClusterConfigComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (cluster_service_1_1) {
                cluster_service_1 = cluster_service_1_1;
            },
            function (cluster_1_1) {
                cluster_1 = cluster_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (chart_component_1_1) {
                chart_component_1 = chart_component_1_1;
            },
            function (chart_service_1_1) {
                chart_service_1 = chart_service_1_1;
            },
            function (chart_1_1) {
                chart_1 = chart_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            },
            function (ServicePackage_1_1) {
                ServicePackage_1 = ServicePackage_1_1;
            },
            function (servicepackage_service_1_1) {
                servicepackage_service_1 = servicepackage_service_1_1;
            },
            function (nodegroup_service_1_1) {
                nodegroup_service_1 = nodegroup_service_1_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            }],
        execute: function() {
            ClusterConfigComponent = (function (_super) {
                __extends(ClusterConfigComponent, _super);
                function ClusterConfigComponent(clusterService, routeParam, restService, nodeGroupService, feedBackService, alertService, chartService, servicePackageService) {
                    _super.call(this);
                    this.clusterService = clusterService;
                    this.routeParam = routeParam;
                    this.restService = restService;
                    this.nodeGroupService = nodeGroupService;
                    this.feedBackService = feedBackService;
                    this.alertService = alertService;
                    this.chartService = chartService;
                    this.servicePackageService = servicePackageService;
                    this.cluster = new cluster_1.Cluster();
                    this.nodeGroups = [];
                    this.selectedNodeGroups = [];
                    this.projects = [];
                    this.clusterServicePackage = new ServicePackage_1.ServicePackage();
                    // active tab of stats page
                    this.activeChartTab = 'osMetrics';
                    this.options = {
                        tooltip: {
                            isHtml: false
                        },
                        animation: {
                            duration: 1100,
                            easing: 'linear'
                        },
                        hAxis: {
                            titleTextStyle: {
                                color: '#333'
                            },
                            format: 'MMM dd'
                        },
                        theme: 'material',
                        vAxis: {
                            format: 'short',
                            minValue: 0
                        },
                        legend: { position: 'bottom' },
                        height: 300,
                        width: 510,
                    };
                    this.timeFormat = "h:mm a";
                    this.clusterId = parseInt(routeParam.get('id'));
                    this.clusterService = clusterService;
                    this.fetchCluster();
                    this.fetchPods();
                    this.fetchEndpoints();
                    this.fetchProjects();
                    // OS metrics Charts
                    this.cpuUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "Usage"], "CPU Usage");
                    this.cpuUsageChart.setChartOptions(this.options);
                    this.heapUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "MB"], "Heap Memory Usage");
                    this.heapUsageChart.setChartOptions(this.options);
                    this.fdUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "Usage"], "File Descriptor Usage");
                    this.fdUsageChart.setChartOptions(this.options);
                    this.threadUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "Usage"], "Active Threads");
                    this.threadUsageChart.setChartOptions(this.options);
                    // ESB metrics Charts
                    this.threadCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "Count"], "Thread Usage");
                    this.threadCountChart.setChartOptions(this.options);
                    this.fileCacheUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "Count"], "File Cache Usage");
                    this.fileCacheUsageChart.setChartOptions(this.options);
                    this.totalLatencyChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "ms"], "Latency");
                    this.totalLatencyChart.setChartOptions(this.options);
                    this.failedInCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "ms"], "Failed In Count");
                    this.failedInCountChart.setChartOptions(this.options);
                    this.failedOutCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "ms"], "Failed Out Count");
                    this.failedOutCountChart.setChartOptions(this.options);
                    // Communication metrics charts
                    this.receivedCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "Count"], "Received Messages");
                    this.receivedCountChart.setChartOptions(this.options);
                    this.sentCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.LineChart, ["Time", "Count"], "Sent Messages");
                    this.sentCountChart.setChartOptions(this.options);
                }
                ClusterConfigComponent.prototype.ngOnDestroy = function () {
                    clearInterval(this.interval);
                };
                ClusterConfigComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    // initializing start, end time and time zone
                    this.startTime = moment().subtract(1, 'hours').format('x');
                    this.endTime = moment().format('x');
                    this.timeZone = encodeURIComponent(moment().format('Z'));
                    var datePickerDiv = $('#reportrange');
                    function cb(start, end) {
                        datePickerDiv.find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    }
                    // set initial time range as last 29 days
                    cb(moment().subtract(1, 'hours'), moment());
                    // initializing date range picker
                    datePickerDiv.daterangepicker({
                        "timePicker": true,
                        startDate: moment().subtract(1, 'hours'),
                        endDate: moment(),
                        minDate: moment().subtract(1, 'years').startOf('month'),
                        maxDate: moment(),
                        format: 'YYYY-MM-DD h:mm A',
                        timePickerIncrement: 5,
                        timePicker12Hour: true,
                        timePickerSeconds: false,
                        "autoApply": true,
                        ranges: {
                            'Last Hour': [moment().subtract(1, 'hours'), moment()],
                            'Today': [moment().startOf('day'), moment()],
                            'This Week': [moment().startOf('week'), moment()],
                            'This Month': [moment().startOf('month'), moment()]
                        },
                        locale: {
                            applyLabel: 'Apply',
                            cancelLabel: 'Cancel',
                            fromLabel: 'From',
                            toLabel: 'To',
                            customRangeLabel: 'Custom',
                            daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                            monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                            firstDay: 1
                        }
                    }, cb);
                    // listener for daterange picker changes
                    datePickerDiv.on('apply.daterangepicker', function (ev, picker) {
                        _this.startTime = new Date(picker.startDate).getTime();
                        _this.endTime = new Date(picker.endDate).getTime();
                        var timediff = parseFloat(_this.endTime) - parseFloat(_this.startTime);
                        if (timediff > 86400010) {
                            _this.timeFormat = "MMM dd";
                        }
                        else {
                            _this.timeFormat = "h:mm a";
                        }
                        _this.onChartTabChange(null);
                    });
                };
                /**
                 * This method will draw respective charts for each stats tab pane
                 * @param activeChartTab selected chart tab
                 */
                ClusterConfigComponent.prototype.onChartTabChange = function (activeChartTab) {
                    var _this = this;
                    if (activeChartTab) {
                        this.activeChartTab = activeChartTab;
                    }
                    if (this.activeChartTab == 'osMetrics') {
                        this.updateOSMetrics();
                        clearInterval(this.interval);
                        this.interval = setInterval(function () {
                            _this.updateOSMetrics();
                        }, this.cpuUsageChart.dataFetchFrequency);
                    }
                    else if (this.activeChartTab == 'esbMetrics') {
                        this.updateESBMetrics();
                        clearInterval(this.interval);
                        this.interval = setInterval(function () {
                            _this.updateESBMetrics();
                        }, this.threadCountChart.dataFetchFrequency);
                    }
                    else if (this.activeChartTab == 'comMetrics') {
                        this.updateCommMetrics();
                        clearInterval(this.interval);
                        this.interval = setInterval(function () {
                            _this.updateCommMetrics();
                        }, this.receivedCountChart.dataFetchFrequency);
                    }
                };
                /**
                 * This method will fetch backend data for ESB metrics graphs and update the chart data.
                 */
                ClusterConfigComponent.prototype.updateESBMetrics = function () {
                    var _this = this;
                    var threadUsageURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/threadusage") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    var fileCacheURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/filecache") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    var latencyURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/latency") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    var failedInCountURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/failedincount") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    var failedOutCountURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/failedoutcount") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    this.chartService.getChartData(threadUsageURL).subscribe(function (data) {
                        _this.threadCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.threadCountChart, "threadUsage");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    this.chartService.getChartData(fileCacheURL).subscribe(function (data) {
                        _this.fileCacheUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.fileCacheUsageChart, "fileCacheUsage");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    this.chartService.getChartData(latencyURL).subscribe(function (data) {
                        _this.totalLatencyChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.totalLatencyChart, "totalLatency");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    this.chartService.getChartData(failedInCountURL).subscribe(function (data) {
                        _this.failedInCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.failedInCountChart, "failedInCount");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    this.chartService.getChartData(failedOutCountURL).subscribe(function (data) {
                        _this.failedOutCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.failedOutCountChart, "failedOutCount");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                /**
                 * This method will fetch backend data for OS metrics graphs and update the chart data.
                 */
                ClusterConfigComponent.prototype.updateOSMetrics = function () {
                    var _this = this;
                    var cpuStatURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/system/cpu") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    var heapStatURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/system/heap") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    var openFDStatURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/system/openfd") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    var activeThreadStatURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/system/activethread") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    this.chartService.getChartData(cpuStatURL).subscribe(function (data) {
                        _this.cpuUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.cpuUsageChart, "cpuUsageGauge");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    this.chartService.getChartData(heapStatURL).subscribe(function (data) {
                        _this.heapUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.heapUsageChart, "usedMemoryGauge");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    this.chartService.getChartData(openFDStatURL).subscribe(function (data) {
                        _this.fdUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.fdUsageChart, "openFDGauge");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    this.chartService.getChartData(activeThreadStatURL).subscribe(function (data) {
                        _this.threadUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.threadUsageChart, "activeThreadsGauge");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                /**
                 * This method will fetch backend data for communication metrics graphs and update the chart data.
                 */
                ClusterConfigComponent.prototype.updateCommMetrics = function () {
                    var _this = this;
                    var receivedCountURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/communication/receivedcount") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    var sentCountURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/communication/sentcount") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    this.chartService.getChartData(receivedCountURL).subscribe(function (data) {
                        _this.receivedCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.receivedCountChart, "receivedCount");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    this.chartService.getChartData(sentCountURL).subscribe(function (data) {
                        _this.sentCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        chart_service_1.ChartService.aggregateCharts(data, _this.sentCountChart, "sentCount");
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                /**
                 * when main tab changes, if it is not the stats tab, the interval will be cleared to stop drawing graphs
                 * @param activeTab name of the selected tab
                 */
                ClusterConfigComponent.prototype.onTabChange = function (activeTab) {
                    this.activeTab = activeTab;
                    if (this.activeTab == 'stat') {
                        this.onChartTabChange(null);
                    }
                    else {
                        clearInterval(this.interval);
                    }
                };
                ClusterConfigComponent.prototype.onUpdate = function () {
                    var _this = this;
                    if (this.selectedNodeGroups.length == 0) {
                        this.alertService.showAlert(new alert_component_1.AlertConfiguration("Cluster has no Node Groups", "Please select at least one node group for this cluster.", null, "OK", false));
                        return;
                    }
                    this.feedBackService.showPreloader = true;
                    this.cluster.nodeGroups = this.selectedNodeGroups;
                    var response = this.clusterService.updateCluster(this.cluster);
                    response.subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.feedBackService.success = data.msg;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    }, function () { return _this.feedBackService.success = "Cluster Updated Successfully."; });
                };
                ClusterConfigComponent.prototype.onRefresh = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    var response = this.clusterService.refreshCluster(this.cluster);
                    response.subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.feedBackService.success = data.msg;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterConfigComponent.prototype.fetchCluster = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.clusterService.getById(this.clusterId).subscribe(function (data) {
                        _this.cluster = data;
                        _this.selectedNodeGroups = data.nodeGroups;
                        _this.fetchNodeGroups();
                        _this.feedBackService.showPreloader = false;
                        // initially update all the graphs
                        _this.updateOSMetrics();
                        _this.updateCommMetrics();
                        _this.updateESBMetrics();
                        _this.fetchClusterServicePackage();
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterConfigComponent.prototype.fetchClusterServicePackage = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.servicePackageService.getServicePackage(this.cluster.clusterServicePackage).subscribe(function (data) {
                        _this.clusterServicePackage = data;
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterConfigComponent.prototype.fetchNodeGroups = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.nodeGroupService.getAll().subscribe(function (data) {
                        _this.nodeGroups = data;
                        _this.nodeGroups.forEach(function (nodeGroup) {
                            if (_this.cluster.nodeGroups.indexOf(nodeGroup.id) > -1) {
                                nodeGroup.check();
                            }
                        });
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterConfigComponent.prototype.fetchPods = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.clusterService.getPodsOfCluster(this.clusterId).subscribe(function (data) {
                        _this.pods = data;
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterConfigComponent.prototype.fetchEndpoints = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.clusterService.getEndpoints(this.clusterId).subscribe(function (data) {
                        _this.endpoints = data;
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterConfigComponent.prototype.fetchProjects = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.clusterService.getProjects(this.clusterId).subscribe(function (data) {
                        _this.projects = data;
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ClusterConfigComponent.prototype.isAddedNodeGroup = function (nodeGroupId) {
                    var index = this.selectedNodeGroups.indexOf(nodeGroupId, 0);
                    return index != -1;
                };
                ClusterConfigComponent.prototype.addNodeGroup = function (nodeGroupId) {
                    if (!this.isAddedNodeGroup(nodeGroupId)) {
                        this.selectedNodeGroups.push(nodeGroupId);
                    }
                };
                ClusterConfigComponent.prototype.removeNodeGroup = function (nodeGroupId) {
                    if (this.isAddedNodeGroup(nodeGroupId)) {
                        var index = this.selectedNodeGroups.indexOf(nodeGroupId, 0);
                        if (index != -1) {
                            this.selectedNodeGroups.splice(index, 1);
                        }
                    }
                };
                ClusterConfigComponent = __decorate([
                    core_1.Component({
                        selector: 'project-config-component',
                        templateUrl: '../../../../resources/template/dashboard/cluster/config.html',
                        directives: [router_1.ROUTER_DIRECTIVES, chart_component_1.ChartComponent],
                        providers: [cluster_service_1.ClusterService, rest_service_1.RestService, chart_service_1.ChartService, servicepackage_service_1.ServicePackageService],
                        providers: [cluster_service_1.ClusterService, rest_service_1.RestService, chart_service_1.ChartService, nodegroup_service_1.NodeGroupService]
                    }),
                    __param(3, core_1.Inject(nodegroup_service_1.NodeGroupService)),
                    __param(4, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(5, core_1.Inject(alert_service_1.AlertService)),
                    __param(6, core_1.Inject(chart_service_1.ChartService)), 
                    __metadata('design:paramtypes', [cluster_service_1.ClusterService, router_1.RouteParams, rest_service_1.RestService, nodegroup_service_1.NodeGroupService, feedback_service_1.FeedBackService, alert_service_1.AlertService, chart_service_1.ChartService, servicepackage_service_1.ServicePackageService])
                ], ClusterConfigComponent);
                return ClusterConfigComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ClusterConfigComponent", ClusterConfigComponent);
        }
    }
});
//# sourceMappingURL=cluster.config.component.js.map