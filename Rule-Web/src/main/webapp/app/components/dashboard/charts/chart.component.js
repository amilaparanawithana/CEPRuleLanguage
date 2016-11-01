System.register(["angular2/core", "../../../models/ui/chart", "../../../services/ui/chart.service", "../../../pipes/round.number.pipe"], function(exports_1, context_1) {
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
    var core_1, chart_1, chart_service_1, round_number_pipe_1;
    var ChartComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (chart_1_1) {
                chart_1 = chart_1_1;
            },
            function (chart_service_1_1) {
                chart_service_1 = chart_service_1_1;
            },
            function (round_number_pipe_1_1) {
                round_number_pipe_1 = round_number_pipe_1_1;
            }],
        execute: function() {
            ChartComponent = (function () {
                function ChartComponent(chartService) {
                    this.chartService = chartService;
                    this.networkCallInProgress = false;
                    this.divId = "chart_div_" + Math.floor(Math.random() * 99999);
                }
                ChartComponent.prototype.ngAfterViewInit = function () {
                    var _this = this;
                    this.update();
                    if (this.chart.live) {
                        this.interval = setInterval(function () {
                            _this.update();
                        }, this.chart.updateFrequency);
                    }
                };
                ChartComponent.prototype.ngOnDestroy = function () {
                    clearInterval(this.interval);
                };
                ChartComponent.prototype.update = function () {
                    var _this = this;
                    if (this.networkCallInProgress) {
                        return;
                    }
                    if (this.chart.dataUrl != null) {
                        this.networkCallInProgress = true;
                        this.chartService.getChart(this.chart).subscribe(function (data) {
                            _this.chart.data = data.data;
                            _this.chart.options = data.options;
                            _this.networkCallInProgress = false;
                        }, function (err) {
                            _this.networkCallInProgress = false;
                        }, function () {
                            _this.networkCallInProgress = false;
                        });
                    }
                    if (this.chart.isDirty) {
                        this.drawIfReady();
                        this.chart.isDirty = false;
                    }
                };
                ChartComponent.prototype.drawIfReady = function () {
                    if (!google.visualization) {
                        google.charts.load('current', { 'packages': ['corechart'], callback: this.drawChart() });
                    }
                    else {
                        this.drawChart();
                    }
                };
                ChartComponent.prototype.drawChart = function () {
                    if (!google.visualization) {
                        this.drawIfReady();
                        return;
                    }
                    if (this.chart.data.length > 0) {
                        var data = google.visualization.arrayToDataTable(this.chart.data);
                        var chart;
                        if (this.chart.chartType == chart_1.ChartType.AreaChart) {
                            chart = new google.visualization.AreaChart(document.getElementById(this.divId));
                        }
                        else if (this.chart.chartType == chart_1.ChartType.PieChart) {
                            chart = new google.visualization.PieChart(document.getElementById(this.divId));
                        }
                        else if (this.chart.chartType == chart_1.ChartType.LineChart) {
                            chart = new google.visualization.LineChart(document.getElementById(this.divId));
                        }
                        if (chart) {
                            chart.draw(data, this.chart.options);
                        }
                    }
                };
                __decorate([
                    //a unique div id will be generated automatically
                    core_1.Input(), 
                    __metadata('design:type', chart_1.Chart)
                ], ChartComponent.prototype, "chart", void 0);
                ChartComponent = __decorate([
                    core_1.Component({
                        selector: 'chart',
                        templateUrl: '../../../../resources/template/modules/chart/chart.html',
                        pipes: [round_number_pipe_1.RoundNumber],
                        providers: [chart_service_1.ChartService]
                    }), 
                    __metadata('design:paramtypes', [chart_service_1.ChartService])
                ], ChartComponent);
                return ChartComponent;
            }());
            exports_1("ChartComponent", ChartComponent);
        }
    }
});
//# sourceMappingURL=chart.component.js.map