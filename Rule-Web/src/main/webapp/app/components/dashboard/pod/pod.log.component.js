System.register(["angular2/core", "angular2/router", "../../../modules/tables/table.column", "../../../modules/tables/table.component", "../../../services/pod.service", "../../../services/ui/feedback.service", "../../../services/ui.service", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, router_1, table_column_1, table_component_1, pod_service_1, feedback_service_1, ui_service_1, abstract_component_1;
    var PodLogComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (table_column_1_1) {
                table_column_1 = table_column_1_1;
            },
            function (table_component_1_1) {
                table_component_1 = table_component_1_1;
            },
            function (pod_service_1_1) {
                pod_service_1 = pod_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            PodLogComponent = (function (_super) {
                __extends(PodLogComponent, _super);
                function PodLogComponent(injector, routeParam, tableService, feedBackService, podService, uiService) {
                    _super.call(this);
                    this.injector = injector;
                    this.routeParam = routeParam;
                    this.tableService = tableService;
                    this.feedBackService = feedBackService;
                    this.podService = podService;
                    this.uiService = uiService;
                    this.headers = [];
                    this.logLevel = "ALL";
                    this.showAllLogs = false;
                    this.pods = [];
                    this.routeParam = injector.parent.parent.get(router_1.RouteParams);
                    this.clusterId = parseInt(this.routeParam.get('id'));
                    this.podName = this.routeParam.get('name');
                    if (this.podName) {
                        this.showAllLogs = false;
                    }
                    else {
                        this.fetchPodNameList();
                        this.showAllLogs = true;
                    }
                    this.headers.push(new table_column_1.TableColumn("ID"), new table_column_1.TableColumn("Time"), new table_column_1.TableColumn("Node"), new table_column_1.TableColumn("Node Group"), new table_column_1.TableColumn("Cluster"), new table_column_1.TableColumn("Logger Name"), new table_column_1.TableColumn("Remote Host"), new table_column_1.TableColumn("Remote IP"), new table_column_1.TableColumn("Thread ID"), new table_column_1.TableColumn("Message"), new table_column_1.TableColumn("Severity"), new table_column_1.TableColumn("Type"), new table_column_1.TableColumn("Error Code"), new table_column_1.TableColumn("Message ID"), new table_column_1.TableColumn("Log Level"));
                    this.uiService.isFluidContainer = true;
                }
                PodLogComponent.prototype.ngAfterViewInit = function () {
                    this.applyDateRangePicker();
                    this.updateParamMap();
                };
                PodLogComponent.prototype.ngOnDestroy = function () {
                    this.uiService.isFluidContainer = false;
                };
                PodLogComponent.prototype.fetchPodNameList = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.podService.getListOfPodsNames().subscribe(function (data) {
                        console.log(data);
                        _this.pods = [];
                        if (data.length > 0) {
                            _this.pods = data;
                        }
                        else {
                            _this.feedBackService.warning = "No Pod logs are available";
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                PodLogComponent.prototype.onPodChange = function (value) {
                    if (this.enableLogFilter) {
                        this.clusterId = 0;
                        this.podName = value;
                        this.updateParamMap();
                    }
                };
                PodLogComponent.prototype.applyDateRangePicker = function () {
                    var _this = this;
                    this.startDate = moment().subtract(1, 'hours').format('x');
                    this.endDate = moment().format('x');
                    var datePickerDiv = $('#daterange');
                    function cb(start, end) {
                        datePickerDiv.find('span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
                    }
                    if (window.daterangepicker !== undefined && window.moment !== undefined) {
                        cb(moment().subtract(1, 'hours'), moment());
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
                        datePickerDiv.on('apply.daterangepicker', function (ev, picker) {
                            _this.startDate = new Date(picker.startDate).getTime();
                            _this.endDate = new Date(picker.endDate).getTime();
                            _this.updateParamMap();
                        });
                    }
                    else {
                        // undefined date range picker. Retrying..
                        setTimeout(function () {
                            _this.applyDateRangePicker();
                        }, 1000);
                    }
                };
                PodLogComponent.prototype.toggleLogFilters = function (filter) {
                    this.enableLogFilter = filter;
                    this.updateParamMap();
                };
                PodLogComponent.prototype.changeLogLevel = function (level) {
                    this.logLevel = level;
                    this.updateParamMap();
                };
                PodLogComponent.prototype.updateParamMap = function () {
                    var map = new Map();
                    map.set('cluster-id', this.clusterId + "");
                    map.set('pod-name', this.podName);
                    if (this.showAllLogs) {
                        map.set('show-all-logs', 'true');
                    }
                    else {
                        map.delete('show-all-logs');
                    }
                    if (this.enableLogFilter) {
                        map.set('log-level', this.logLevel);
                        if (this.startDate && this.endDate) {
                            map.set('start-date', this.startDate + "");
                            map.set('end-date', this.endDate + "");
                        }
                    }
                    this.dataTableView.setAdditionalParams(map);
                };
                __decorate([
                    core_1.ViewChild(table_component_1.DataTableComponent), 
                    __metadata('design:type', table_component_1.DataTableComponent)
                ], PodLogComponent.prototype, "dataTableView", void 0);
                PodLogComponent = __decorate([
                    core_1.Component({
                        selector: 'PodLogComponent',
                        templateUrl: '../../../../resources/template/dashboard/pod/logs.html',
                        directives: [router_1.ROUTER_DIRECTIVES, table_component_1.DataTableComponent],
                        providers: [pod_service_1.PodService, feedback_service_1.FeedBackService],
                        styleUrls: [
                            "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css",
                            "../../../../resources/global/vendor/datepicker/daterangepicker.css"
                        ],
                    }),
                    __param(5, core_1.Inject(ui_service_1.UIService)), 
                    __metadata('design:paramtypes', [core_1.Injector, router_1.RouteParams, pod_service_1.PodService, feedback_service_1.FeedBackService, pod_service_1.PodService, ui_service_1.UIService])
                ], PodLogComponent);
                return PodLogComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("PodLogComponent", PodLogComponent);
        }
    }
});
//# sourceMappingURL=pod.log.component.js.map