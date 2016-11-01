System.register(["angular2/core", "../../../services/rest.service", "angular2/router", "../../../models/pod", "../../../services/pod.service", "../../../models/ui/chart", "../charts/chart.component", "../../../services/ui.service", "../../../services/ui/feedback.service", "../../../services/ui/chart.service", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, rest_service_1, router_1, pod_1, pod_service_1, chart_1, chart_component_1, ui_service_1, feedback_service_1, chart_service_1, abstract_component_1;
    var PodDetailComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (pod_1_1) {
                pod_1 = pod_1_1;
            },
            function (pod_service_1_1) {
                pod_service_1 = pod_service_1_1;
            },
            function (chart_1_1) {
                chart_1 = chart_1_1;
            },
            function (chart_component_1_1) {
                chart_component_1 = chart_component_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (chart_service_1_1) {
                chart_service_1 = chart_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            PodDetailComponent = (function (_super) {
                __extends(PodDetailComponent, _super);
                function PodDetailComponent(podService, routeParam, restService, feedBackService, chartService, injector) {
                    _super.call(this);
                    this.podService = podService;
                    this.routeParam = routeParam;
                    this.restService = restService;
                    this.feedBackService = feedBackService;
                    this.chartService = chartService;
                    this.injector = injector;
                    this.pod = new pod_1.Pod();
                    this.proxies = [];
                    this.listeners = [];
                    this.senders = [];
                    this.sequences = [];
                    this.deploymentUnits = [];
                    // active tab of stats page
                    this.activeChartTab = 'osMetrics';
                    this.timeFormat = "h:mm a";
                    this.routeParam = injector.parent.parent.get(router_1.RouteParams);
                    this.podName = this.routeParam.get('name');
                    this.clusterId = parseInt(this.routeParam.get('id'));
                    this.podService = podService;
                    this.restService = restService;
                    this.fetchPod();
                    // OS metrics Charts
                    this.cpuUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "Usage"], "CPU Usage");
                    this.heapUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "MB"], "Heap Memory Usage");
                    this.fdUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "Usage"], "File Descriptor Usage");
                    this.threadUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "Usage"], "Active Threads");
                    // ESB metrics Charts
                    this.threadCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "Count"], "Thread Usage");
                    this.fileCacheUsageChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "Count"], "File Cache Usage");
                    this.totalLatencyChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "ms"], "Latency");
                    this.failedInCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "ms"], "Failed In Count");
                    this.failedOutCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "ms"], "Failed Out Count");
                    // Communication metrics charts
                    this.receivedCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "Count"], "Received Messages");
                    this.sentCountChart = new chart_1.Chart(null, true, 1000, chart_1.ChartType.AreaChart, ["Time", "Count"], "Sent Messages");
                }
                PodDetailComponent.prototype.ngOnDestroy = function () {
                    clearInterval(this.interval);
                };
                PodDetailComponent.prototype.ngAfterViewInit = function () {
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
                        _this.onChartTabChange();
                    });
                };
                /**
                 * This method will draw respective charts for each stats tab pane
                 * @param activeChartTab selected chart tab
                 */
                PodDetailComponent.prototype.onChartTabChange = function (activeChartTab) {
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
                PodDetailComponent.prototype.updateESBMetrics = function () {
                    var _this = this;
                    var statURL = this.restService.getBaseUrl("stat/pod/" + this.podName + "/esb") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    this.chartService.getChartData(statURL).subscribe(function (data) {
                        _this.threadCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.threadCountChart.updateDataPoints(data.dataContainer.threadUsage.data, data.dataContainer.threadUsage.summary);
                        _this.fileCacheUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.fileCacheUsageChart.updateDataPoints(data.dataContainer.fileCacheUsage.data, data.dataContainer.fileCacheUsage.summary);
                        _this.totalLatencyChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.totalLatencyChart.updateDataPoints(data.dataContainer.totalLatency.data, data.dataContainer.totalLatency.summary);
                        _this.failedInCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.failedInCountChart.updateDataPoints(data.dataContainer.failedInCount.data, data.dataContainer.failedInCount.summary);
                        _this.failedOutCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.failedOutCountChart.updateDataPoints(data.dataContainer.failedOutCount.data, data.dataContainer.failedOutCount.summary);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                /**
                 * This method will fetch backend data for OS metrics graphs and update the chart data.
                 */
                PodDetailComponent.prototype.updateOSMetrics = function () {
                    var _this = this;
                    var statURL = this.restService.getBaseUrl("stat/pod/" + this.podName + "/system") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    this.chartService.getChartData(statURL).subscribe(function (data) {
                        _this.cpuUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.cpuUsageChart.updateDataPoints(data.dataContainer.cpuUsageGauge.data, data.dataContainer.cpuUsageGauge.summary);
                        _this.heapUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.heapUsageChart.updateDataPoints(data.dataContainer.usedMemoryGauge.data, data.dataContainer.usedMemoryGauge.summary);
                        _this.fdUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.fdUsageChart.updateDataPoints(data.dataContainer.openFDGauge.data, data.dataContainer.openFDGauge.summary);
                        _this.threadUsageChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.threadUsageChart.updateDataPoints(data.dataContainer.activeThreadsGauge.data, data.dataContainer.activeThreadsGauge.summary);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                /**
                 * This method will fetch backend data for communication metrics graphs and update the chart data.
                 */
                PodDetailComponent.prototype.updateCommMetrics = function () {
                    var _this = this;
                    var statURL = this.restService.getBaseUrl("stat/pod/" + this.podName + "/communication") + "?startTime="
                        + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
                    this.chartService.getChartData(statURL).subscribe(function (data) {
                        _this.receivedCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.receivedCountChart.updateDataPoints(data.dataContainer.receivedCount.data, data.dataContainer.receivedCount.summary);
                        _this.sentCountChart.setHorizontalAxisFormat(_this.timeFormat);
                        _this.sentCountChart.updateDataPoints(data.dataContainer.sentCount.data, data.dataContainer.sentCount.summary);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                /**
                 * when main tab changes, if it is not the stats tab, the interval will be cleared to stop drawing graphs
                 * @param activeTab name of the selected tab
                 */
                PodDetailComponent.prototype.onTabChange = function (activeTab) {
                    this.activeTab = activeTab;
                    if (this.activeTab == 'stat') {
                        this.onChartTabChange();
                    }
                    else {
                        clearInterval(this.interval);
                    }
                };
                PodDetailComponent.prototype.fetchPod = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.podService.getByName(this.clusterId, this.podName).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.pod = data;
                        _this.fetchProxies();
                        _this.fetchListeners();
                        _this.fetchSenders();
                        _this.fetchSequences();
                        _this.fetchDUs();
                        // initially update all the graphs
                        _this.updateOSMetrics();
                        _this.updateCommMetrics();
                        _this.updateESBMetrics();
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                PodDetailComponent.prototype.fetchProxies = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.podService.getProxyList(this.pod.podIP).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.proxies = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                PodDetailComponent.prototype.fetchListeners = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.podService.getListeners(this.pod.podIP).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.listeners = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                PodDetailComponent.prototype.fetchSenders = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.podService.getSenders(this.pod.podIP).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.senders = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                PodDetailComponent.prototype.fetchSequences = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.podService.getSequences(this.pod.podIP).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.sequences = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                PodDetailComponent.prototype.fetchDUs = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.podService.getDUs(this.pod.podIP).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.deploymentUnits = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                PodDetailComponent.prototype.toggleDebug = function () {
                    this.podService.toggleDebug(this.clusterId, this.podName).subscribe(function (data) {
                    });
                };
                PodDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'pod-detail-component',
                        templateUrl: '../../../../resources/template/dashboard/pod/detail.html',
                        providers: [rest_service_1.RestService, pod_service_1.PodService, ui_service_1.UIService, chart_service_1.ChartService],
                        directives: [chart_component_1.ChartComponent, router_1.ROUTER_DIRECTIVES]
                    }),
                    __param(3, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(4, core_1.Inject(chart_service_1.ChartService)), 
                    __metadata('design:paramtypes', [pod_service_1.PodService, router_1.RouteParams, rest_service_1.RestService, feedback_service_1.FeedBackService, chart_service_1.ChartService, core_1.Injector])
                ], PodDetailComponent);
                return PodDetailComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("PodDetailComponent", PodDetailComponent);
        }
    }
});
//# sourceMappingURL=pod.detail.component.js.map