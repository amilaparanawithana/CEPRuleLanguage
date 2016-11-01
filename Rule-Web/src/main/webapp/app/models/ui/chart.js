System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Chart, ChartType;
    return {
        setters:[],
        execute: function() {
            /**
             * @author chathura widanage
             */
            Chart = (function () {
                function Chart(dataUrl, live, updateFrequency, chartType, axisLabels, chartTitle) {
                    this.data = [];
                    this.summary = [];
                    this.options = {
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
                        legend: 'none',
                        height: 240,
                        width: 510,
                        tooltip: { isHtml: false }
                    };
                    this.live = false;
                    this.updateFrequency = 5000;
                    this.dataFetchFrequency = 15000;
                    this.isDirty = true;
                    this.axisLabels = ["", ""];
                    this.multipleLabels = [];
                    this.dataUrl = dataUrl;
                    this.live = live;
                    this.updateFrequency = updateFrequency;
                    this.chartType = chartType;
                    this.axisLabels = axisLabels;
                    this.title = chartTitle;
                    if (this.axisLabels) {
                        this.options.hAxis['title'] = this.axisLabels[0];
                        this.options.vAxis['title'] = this.axisLabels[1];
                    }
                }
                Chart.prototype.updateDataPoints = function (data, summary) {
                    if (data.length == 0) {
                        this.data = data;
                        this.isDirty = true;
                        return true;
                    }
                    for (var i = 0; i < data.length; i++) {
                        data[i][0] = new Date(parseFloat(data[i][0]));
                    }
                    if (this.multipleLabels.length > 0) {
                        data.unshift(this.multipleLabels);
                    }
                    else {
                        data.unshift(this.axisLabels);
                    }
                    this.data = data;
                    this.summary = summary;
                    this.isDirty = true;
                };
                Chart.prototype.updateDataFetchFrequency = function (dataFetchFrequency) {
                    this.dataFetchFrequency = dataFetchFrequency;
                };
                Chart.prototype.addAdditionalAxis = function (labels) {
                    this.multipleLabels = [];
                    this.multipleLabels.push(this.axisLabels[0]);
                    for (var i in labels) {
                        this.multipleLabels.push(labels[i]);
                    }
                };
                Chart.prototype.setChartOptions = function (options) {
                    this.options = options;
                };
                Chart.prototype.setHorizontalAxisFormat = function (format) {
                    this.options.hAxis.format = format;
                };
                return Chart;
            }());
            exports_1("Chart", Chart);
            (function (ChartType) {
                ChartType[ChartType["AreaChart"] = 0] = "AreaChart";
                ChartType[ChartType["PieChart"] = 1] = "PieChart";
                ChartType[ChartType["LineChart"] = 2] = "LineChart";
            })(ChartType || (ChartType = {}));
            exports_1("ChartType", ChartType);
        }
    }
});
//# sourceMappingURL=chart.js.map