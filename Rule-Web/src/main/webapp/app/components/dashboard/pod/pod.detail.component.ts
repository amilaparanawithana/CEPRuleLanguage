/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
import {Component, Inject, Injector} from "angular2/core";
import {RestService} from "../../../services/rest.service";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {Pod} from "../../../models/pod";
import {PodService} from "../../../services/pod.service";
import {Chart, ChartType} from "../../../models/ui/chart";
import {ChartComponent} from "../charts/chart.component";
import {UIService} from "../../../services/ui.service";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {ChartService} from "../../../services/ui/chart.service";
import {AbstractComponent} from "../abstract.component";
declare let Map:any, moment:any, $:any;
@Component({
    selector: 'pod-detail-component',
    templateUrl: '../../../../resources/template/dashboard/pod/detail.html',
    providers: [RestService, PodService, UIService, ChartService],
    directives: [ChartComponent, ROUTER_DIRECTIVES]
})

export class PodDetailComponent extends AbstractComponent{

    podName:string;
    pod:Pod = new Pod();
    clusterId:number;

    proxies:Array<Map<string,string>> = [];
    listeners:Array<Map<string,string>> = [];
    senders:Array<Map<string,string>> = [];
    sequences:Array<Map<string,string>> = [];
    deploymentUnits:Array<string> = [];

    // main active tab
    activeTab:string;
    // active tab of stats page
    activeChartTab:string = 'osMetrics';

    // OS metrics Charts
    cpuUsageChart:Chart;
    heapUsageChart:Chart;
    fdUsageChart:Chart;
    threadUsageChart:Chart;

    // ESB metrics Charts
    threadCountChart:Chart;
    fileCacheUsageChart:Chart;
    totalLatencyChart:Chart;
    failedInCountChart:Chart;
    failedOutCountChart:Chart;

    // communication metrics chart
    receivedCountChart:Chart;
    sentCountChart:Chart;

    interval:any;

    startTime:any;
    endTime:any;
    timeZone:any;

    timeFormat:string = "h:mm a";

    constructor(private podService:PodService, private routeParam:RouteParams, private restService:RestService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(ChartService)
                private chartService:ChartService, private injector:Injector) {
        super();
        this.routeParam = injector.parent.parent.get(RouteParams);
        this.podName = this.routeParam.get('name');
        this.clusterId = parseInt(this.routeParam.get('id'));
        this.podService = podService;
        this.restService = restService;
        this.fetchPod();

        // OS metrics Charts
        this.cpuUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "Usage"],
            "CPU Usage"
        );

        this.heapUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "MB"],
            "Heap Memory Usage"
        );

        this.fdUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "Usage"],
            "File Descriptor Usage"
        );

        this.threadUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "Usage"],
            "Active Threads"
        );


        // ESB metrics Charts
        this.threadCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "Count"],
            "Thread Usage"
        );

        this.fileCacheUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "Count"],
            "File Cache Usage"
        );

        this.totalLatencyChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "ms"],
            "Latency"
        );

        this.failedInCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "ms"],
            "Failed In Count"
        );

        this.failedOutCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "ms"],
            "Failed Out Count"
        );


        // Communication metrics charts
        this.receivedCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "Count"],
            "Received Messages"
        );

        this.sentCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.AreaChart,
            ["Time", "Count"],
            "Sent Messages"
        );

    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }

    ngAfterViewInit() {
        // initializing start, end time and time zone
        this.startTime = moment().subtract(1, 'hours').format('x');
        this.endTime = moment().format('x');
        this.timeZone = encodeURIComponent(moment().format('Z'));

        var datePickerDiv = $('#reportrange');

        function cb(start, end) {   // function to chaange daterange picker UI
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
        datePickerDiv.on('apply.daterangepicker', (ev, picker)=> {
            this.startTime = new Date(picker.startDate).getTime();
            this.endTime = new Date(picker.endDate).getTime();
            var timediff = parseFloat(this.endTime) - parseFloat(this.startTime);
            if (timediff > 86400010) {
                this.timeFormat = "MMM dd";
            } else {
                this.timeFormat = "h:mm a";
            }
            this.onChartTabChange();
        });


    }

    /**
     * This method will draw respective charts for each stats tab pane
     * @param activeChartTab selected chart tab
     */
    onChartTabChange(activeChartTab:string) {
        if (activeChartTab) {
            this.activeChartTab = activeChartTab;
        }
        if (this.activeChartTab == 'osMetrics') {
            this.updateOSMetrics();
            clearInterval(this.interval);
            this.interval = setInterval(()=> {
                this.updateOSMetrics();
            }, this.cpuUsageChart.dataFetchFrequency);
        } else if (this.activeChartTab == 'esbMetrics') {
            this.updateESBMetrics();
            clearInterval(this.interval);
            this.interval = setInterval(()=> {
                this.updateESBMetrics();
            }, this.threadCountChart.dataFetchFrequency);
        } else if (this.activeChartTab == 'comMetrics') {
            this.updateCommMetrics();
            clearInterval(this.interval);
            this.interval = setInterval(()=> {
                this.updateCommMetrics();
            }, this.receivedCountChart.dataFetchFrequency);
        }
    }

    /**
     * This method will fetch backend data for ESB metrics graphs and update the chart data.
     */
    private updateESBMetrics() {
        let statURL = this.restService.getBaseUrl("stat/pod/" + this.podName + "/esb") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;

        this.chartService.getChartData(statURL).subscribe(
            data=> {
                this.threadCountChart.setHorizontalAxisFormat(this.timeFormat);
                this.threadCountChart.updateDataPoints(data.dataContainer.threadUsage.data, data.dataContainer.threadUsage.summary);
                this.fileCacheUsageChart.setHorizontalAxisFormat(this.timeFormat);
                this.fileCacheUsageChart.updateDataPoints(data.dataContainer.fileCacheUsage.data, data.dataContainer.fileCacheUsage.summary);
                this.totalLatencyChart.setHorizontalAxisFormat(this.timeFormat);
                this.totalLatencyChart.updateDataPoints(data.dataContainer.totalLatency.data, data.dataContainer.totalLatency.summary);
                this.failedInCountChart.setHorizontalAxisFormat(this.timeFormat);
                this.failedInCountChart.updateDataPoints(data.dataContainer.failedInCount.data, data.dataContainer.failedInCount.summary);
                this.failedOutCountChart.setHorizontalAxisFormat(this.timeFormat);
                this.failedOutCountChart.updateDataPoints(data.dataContainer.failedOutCount.data, data.dataContainer.failedOutCount.summary);
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    /**
     * This method will fetch backend data for OS metrics graphs and update the chart data.
     */
    private updateOSMetrics() {
        let statURL = this.restService.getBaseUrl("stat/pod/" + this.podName + "/system") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;

        this.chartService.getChartData(statURL).subscribe(
            data=> {
                this.cpuUsageChart.setHorizontalAxisFormat(this.timeFormat);
                this.cpuUsageChart.updateDataPoints(data.dataContainer.cpuUsageGauge.data, data.dataContainer.cpuUsageGauge.summary);
                this.heapUsageChart.setHorizontalAxisFormat(this.timeFormat);
                this.heapUsageChart.updateDataPoints(data.dataContainer.usedMemoryGauge.data, data.dataContainer.usedMemoryGauge.summary);
                this.fdUsageChart.setHorizontalAxisFormat(this.timeFormat);
                this.fdUsageChart.updateDataPoints(data.dataContainer.openFDGauge.data, data.dataContainer.openFDGauge.summary);
                this.threadUsageChart.setHorizontalAxisFormat(this.timeFormat);
                this.threadUsageChart.updateDataPoints(data.dataContainer.activeThreadsGauge.data, data.dataContainer.activeThreadsGauge.summary);
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    /**
     * This method will fetch backend data for communication metrics graphs and update the chart data.
     */
    private updateCommMetrics() {
        let statURL = this.restService.getBaseUrl("stat/pod/" + this.podName + "/communication") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;

        this.chartService.getChartData(statURL).subscribe(
            data=> {
                this.receivedCountChart.setHorizontalAxisFormat(this.timeFormat);
                this.receivedCountChart.updateDataPoints(data.dataContainer.receivedCount.data, data.dataContainer.receivedCount.summary);
                this.sentCountChart.setHorizontalAxisFormat(this.timeFormat);
                this.sentCountChart.updateDataPoints(data.dataContainer.sentCount.data, data.dataContainer.sentCount.summary);
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    /**
     * when main tab changes, if it is not the stats tab, the interval will be cleared to stop drawing graphs
     * @param activeTab name of the selected tab
     */
    onTabChange(activeTab:string) {
        this.activeTab = activeTab;
        if (this.activeTab == 'stat') {
            this.onChartTabChange()
        } else {
            clearInterval(this.interval);
        }
    }

    fetchPod() {
        this.feedBackService.showPreloader = true;
        this.podService.getByName(this.clusterId, this.podName).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this.pod = data;
                this.fetchProxies();
                this.fetchListeners();
                this.fetchSenders();
                this.fetchSequences();
                this.fetchDUs();

                // initially update all the graphs
                this.updateOSMetrics();
                this.updateCommMetrics();
                this.updateESBMetrics()
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchProxies() {
        this.feedBackService.showPreloader = true;
        this.podService.getProxyList(this.pod.podIP).subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.proxies = data;
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchListeners() {
        this.feedBackService.showPreloader = true;
        this.podService.getListeners(this.pod.podIP).subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.listeners = data;
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchSenders() {
        this.feedBackService.showPreloader = true;
        this.podService.getSenders(this.pod.podIP).subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.senders = data;
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchSequences() {
        this.feedBackService.showPreloader = true;
        this.podService.getSequences(this.pod.podIP).subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.sequences = data;
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchDUs() {
        this.feedBackService.showPreloader = true;
        this.podService.getDUs(this.pod.podIP).subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.deploymentUnits = data;
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    toggleDebug() {
        this.podService.toggleDebug(this.clusterId, this.podName).subscribe(
            data => {

            }
        );

    }
}