System.register(["angular2/http", "angular2/core", "../rest.service"], function(exports_1, context_1) {
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
    var http_1, core_1, rest_service_1;
    var ChartService;
    return {
        setters:[
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            }],
        execute: function() {
            /**
             * @author chathura widanage
             */
            ChartService = (function () {
                function ChartService(http, restService) {
                    this.http = http;
                    this.restService = restService;
                }
                ChartService.prototype.getChart = function (chart) {
                    return this.restService.get(chart.dataUrl).map(function (res) {
                        return res.json();
                    });
                };
                ChartService.prototype.getChartData = function (url) {
                    return this.restService.get(url).map(function (res) {
                        return res.json();
                    });
                };
                ChartService.aggregateCharts = function (data, cpuUsageChart, fieldName) {
                    var dataPoints = [];
                    var podNamesList = [];
                    var firstPod = true;
                    for (var podName in data.container) {
                        podNamesList.push(podName);
                        var d = data.container[podName].dataContainer[fieldName]['data'];
                        if (firstPod) {
                            for (var j in d) {
                                dataPoints.push(d[j]);
                            }
                            firstPod = false;
                        }
                        else {
                            for (var j in d) {
                                dataPoints[j].push(d[j][1]);
                            }
                        }
                    }
                    if (dataPoints.length > 0) {
                        cpuUsageChart.addAdditionalAxis(podNamesList);
                        cpuUsageChart.updateDataPoints(dataPoints, []);
                    }
                    else {
                        cpuUsageChart.updateDataPoints([], []);
                    }
                };
                ChartService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], ChartService);
                return ChartService;
            }());
            exports_1("ChartService", ChartService);
        }
    }
});
//# sourceMappingURL=chart.service.js.map