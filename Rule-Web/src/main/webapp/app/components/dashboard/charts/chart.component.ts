/**
 * @author chathura widanage
 */
import {Component, Input} from "angular2/core";
import {Chart, ChartType} from "../../../models/ui/chart";
import {ChartService} from "../../../services/ui/chart.service";
import {RoundNumber} from "../../../pipes/round.number.pipe";
declare let google:any;
@Component({
    selector: 'chart',
    templateUrl: '../../../../resources/template/modules/chart/chart.html',
    pipes: [RoundNumber],
    providers: [ChartService]
})

export class ChartComponent {

    divId;//a unique div id will be generated automatically
    @Input()
    chart:Chart;
    networkCallInProgress:boolean = false;
    interval:any;

    constructor(private chartService:ChartService) {
        this.divId = "chart_div_" + Math.floor(Math.random() * 99999);
    }

    ngAfterViewInit() {
        this.update();
        if (this.chart.live) { //start interval if chart is live
            this.interval = setInterval(()=> {
                this.update();
            }, this.chart.updateFrequency);
        }
    }

    ngOnDestroy() {//!Important, stop interval when charts are not currently visible in the browser.
        clearInterval(this.interval);
    }

    update() {
        if (this.networkCallInProgress) {
            return;
        }
        if (this.chart.dataUrl != null) {
            this.networkCallInProgress = true;
            this.chartService.getChart(this.chart).subscribe(
                data=> {
                    this.chart.data = data.data;
                    this.chart.options = data.options;
                    this.networkCallInProgress = false;
                },
                err=> {
                    this.networkCallInProgress = false;
                },
                ()=> {
                    this.networkCallInProgress = false;
                }
            );
        }
        if (this.chart.isDirty) {
            this.drawIfReady();
            this.chart.isDirty = false;
        }
    }

    drawIfReady() { //guarantees google library has loaded before call drawChart()
        if (!google.visualization) {
            google.charts.load('current', {'packages': ['corechart'], callback: this.drawChart()});
        } else {
            this.drawChart();
        }
    }

    drawChart() {
        if (!google.visualization) {
            this.drawIfReady();
            return;
        }
        if (this.chart.data.length > 0) {
            var data = google.visualization.arrayToDataTable(this.chart.data);
            var chart;
            if (this.chart.chartType == ChartType.AreaChart) {
                chart = new google.visualization.AreaChart(document.getElementById(this.divId));
            } else if (this.chart.chartType == ChartType.PieChart) {
                chart = new google.visualization.PieChart(document.getElementById(this.divId));
            } else if (this.chart.chartType == ChartType.LineChart) {
                chart = new google.visualization.LineChart(document.getElementById(this.divId));
            }
            if (chart) {
                chart.draw(data, this.chart.options);
            }
        }
    }
}