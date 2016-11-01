/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 * @author Amila Paranawithana
 */
import {Component, Inject} from "angular2/core";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {ClusterService} from "../../../services/cluster.service";
import {Cluster} from "../../../models/cluster";
import {RestService} from "../../../services/rest.service";
import {NodeGroup} from "../../../models/nodeGroup";
import {Pod} from "../../../models/pod";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {Endpoint} from "../../../models/endpoint";
import {ChartComponent} from "../charts/chart.component";
import {ChartService} from "../../../services/ui/chart.service";
import {Chart, ChartType} from "../../../models/ui/chart";
import {Project} from "../../../models/project";
import {AbstractComponent} from "../abstract.component";
import {ServicePackage} from "../../../models/ServicePackage";
import {ServicePackageService} from "../../../services/servicepackage.service";
import {NodeGroupService} from "../../../services/nodegroup.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";

declare let moment:any;
declare let $:any;

@Component({
    selector: 'project-config-component',
    templateUrl: '../../../../resources/template/dashboard/cluster/config.html',
    directives: [ROUTER_DIRECTIVES, ChartComponent],
    providers: [ClusterService, RestService, ChartService, ServicePackageService]
    providers: [ClusterService, RestService, ChartService, NodeGroupService]
})

export class ClusterConfigComponent extends AbstractComponent{

    clusterId:number;
    cluster:Cluster = new Cluster();
    nodeGroups:Array<NodeGroup> = [];
    selectedNodeGroups:Array<number> = [];
    pods:Array<Pod>;
    endpoints:Array<Endpoint>;
    projects:Array<Project> = [];
    clusterServicePackage:ServicePackage = new ServicePackage();

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

    options:{} = {
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
        legend: {position: 'bottom'},
        height: 300,
        width: 510,
    };

    timeFormat:string = "h:mm a";

    constructor(private clusterService:ClusterService, private routeParam:RouteParams, private restService:RestService,
                @Inject(NodeGroupService)
                private nodeGroupService:NodeGroupService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService,
                @Inject(ChartService)
                private chartService:ChartService,private servicePackageService:ServicePackageService) {
        super();
        this.clusterId = parseInt(routeParam.get('id'));
        this.clusterService = clusterService;

        this.fetchCluster();
        this.fetchPods();
        this.fetchEndpoints();
        this.fetchProjects();

        // OS metrics Charts
        this.cpuUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "Usage"],
            "CPU Usage"
        );
        this.cpuUsageChart.setChartOptions(this.options);

        this.heapUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "MB"],
            "Heap Memory Usage"
        );
        this.heapUsageChart.setChartOptions(this.options);

        this.fdUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "Usage"],
            "File Descriptor Usage"
        );
        this.fdUsageChart.setChartOptions(this.options);

        this.threadUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "Usage"],
            "Active Threads"
        );
        this.threadUsageChart.setChartOptions(this.options);

        // ESB metrics Charts
        this.threadCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "Count"],
            "Thread Usage"
        );
        this.threadCountChart.setChartOptions(this.options);

        this.fileCacheUsageChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "Count"],
            "File Cache Usage"
        );
        this.fileCacheUsageChart.setChartOptions(this.options);

        this.totalLatencyChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "ms"],
            "Latency"
        );
        this.totalLatencyChart.setChartOptions(this.options);

        this.failedInCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "ms"],
            "Failed In Count"
        );
        this.failedInCountChart.setChartOptions(this.options);

        this.failedOutCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "ms"],
            "Failed Out Count"
        );
        this.failedOutCountChart.setChartOptions(this.options);


        // Communication metrics charts
        this.receivedCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "Count"],
            "Received Messages"
        );
        this.receivedCountChart.setChartOptions(this.options);

        this.sentCountChart = new Chart(
            null,
            true,
            1000,
            ChartType.LineChart,
            ["Time", "Count"],
            "Sent Messages"
        );
        this.sentCountChart.setChartOptions(this.options);
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
            this.onChartTabChange(null);
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
        let threadUsageURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/threadusage") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
        let fileCacheURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/filecache") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
        let latencyURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/latency") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
        let failedInCountURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/failedincount") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
        let failedOutCountURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/esb/failedoutcount") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;

        this.chartService.getChartData(threadUsageURL).subscribe(
            data => {
                this.threadCountChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.threadCountChart, "threadUsage");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        this.chartService.getChartData(fileCacheURL).subscribe(
            data => {
                this.fileCacheUsageChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.fileCacheUsageChart, "fileCacheUsage");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        this.chartService.getChartData(latencyURL).subscribe(
            data => {
                this.totalLatencyChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.totalLatencyChart, "totalLatency");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        this.chartService.getChartData(failedInCountURL).subscribe(
            data => {
                this.failedInCountChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.failedInCountChart, "failedInCount");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        this.chartService.getChartData(failedOutCountURL).subscribe(
            data => {
                this.failedOutCountChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.failedOutCountChart, "failedOutCount");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }


    /**
     * This method will fetch backend data for OS metrics graphs and update the chart data.
     */
    private updateOSMetrics() {
        let cpuStatURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/system/cpu") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
        let heapStatURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/system/heap") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
        let openFDStatURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/system/openfd") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
        let activeThreadStatURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/system/activethread") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;

        this.chartService.getChartData(cpuStatURL).subscribe(
            data => {
                this.cpuUsageChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.cpuUsageChart, "cpuUsageGauge");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        this.chartService.getChartData(heapStatURL).subscribe(
            data => {
                this.heapUsageChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.heapUsageChart, "usedMemoryGauge");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        this.chartService.getChartData(openFDStatURL).subscribe(
            data => {
                this.fdUsageChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.fdUsageChart, "openFDGauge");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        this.chartService.getChartData(activeThreadStatURL).subscribe(
            data => {
                this.threadUsageChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.threadUsageChart, "activeThreadsGauge");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    /**
     * This method will fetch backend data for communication metrics graphs and update the chart data.
     */
    private updateCommMetrics() {
        let receivedCountURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/communication/receivedcount") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;
        let sentCountURL = this.restService.getBaseUrl("stat/cluster/" + this.cluster.name + "/communication/sentcount") + "?startTime="
            + this.startTime + "&endTime=" + this.endTime + "&timeZone=" + this.timeZone;

        this.chartService.getChartData(receivedCountURL).subscribe(
            data => {
                this.receivedCountChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.receivedCountChart, "receivedCount");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );

        this.chartService.getChartData(sentCountURL).subscribe(
            data => {
                this.sentCountChart.setHorizontalAxisFormat(this.timeFormat);
                ChartService.aggregateCharts(data, this.sentCountChart, "sentCount");
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    /**
     * when main tab changes, if it is not the stats tab, the interval will be cleared to stop drawing graphs
     * @param activeTab name of the selected tab
     */
    onTabChange(activeTab:string) {
        this.activeTab = activeTab;
        if (this.activeTab == 'stat') {
            this.onChartTabChange(null);
        } else {
            clearInterval(this.interval);
        }
    }

    onUpdate() {
        if (this.selectedNodeGroups.length == 0) {
            this.alertService.showAlert(new AlertConfiguration("Cluster has no Node Groups",
                "Please select at least one node group for this cluster.", null, "OK", false));
            return;
        }
        this.feedBackService.showPreloader = true;
        this.cluster.nodeGroups = this.selectedNodeGroups;
        var response = this.clusterService.updateCluster(this.cluster);
        response.subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.feedBackService.success = data.msg
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            },
            () => this.feedBackService.success = "Cluster Updated Successfully."
        );
    }

    onRefresh() {
        this.feedBackService.showPreloader = true;
        var response = this.clusterService.refreshCluster(this.cluster);
        response.subscribe(
            data => {
                this.feedBackService.showPreloader = false;
                this.feedBackService.success = data.msg
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }


    fetchCluster() {
        this.feedBackService.showPreloader = true;
        this.clusterService.getById(this.clusterId).subscribe(
            data=> {
                this.cluster = data;
                this.selectedNodeGroups = data.nodeGroups;
                this.fetchNodeGroups();
                this.feedBackService.showPreloader = false;

                // initially update all the graphs
                this.updateOSMetrics();
                this.updateCommMetrics();
                this.updateESBMetrics();
                this.fetchClusterServicePackage();
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchClusterServicePackage() {
        this.feedBackService.showPreloader = true;
        this.servicePackageService.getServicePackage(this.cluster.clusterServicePackage).subscribe(
            data=> {
                this.clusterServicePackage = data;
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchNodeGroups() {
        this.feedBackService.showPreloader = true;
        this.nodeGroupService.getAll().subscribe(
            data=> {
                this.nodeGroups = data;
                this.nodeGroups.forEach(nodeGroup=> {
                    if (this.cluster.nodeGroups.indexOf(nodeGroup.id) > -1) {
                        nodeGroup.check();
                    }
                });
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchPods() {
        this.feedBackService.showPreloader = true;
        this.clusterService.getPodsOfCluster(this.clusterId).subscribe(
            data=> {
                this.pods = data;
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchEndpoints() {
        this.feedBackService.showPreloader = true;
        this.clusterService.getEndpoints(this.clusterId).subscribe(
            data=> {
                this.endpoints = data;
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    fetchProjects() {
        this.feedBackService.showPreloader = true;
        this.clusterService.getProjects(this.clusterId).subscribe(
            data=> {
                this.projects = data;
                this.feedBackService.showPreloader = false;
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    isAddedNodeGroup(nodeGroupId:number) {
        var index = this.selectedNodeGroups.indexOf(nodeGroupId, 0);
        return index != -1;
    }

    addNodeGroup(nodeGroupId:number) {
        if (!this.isAddedNodeGroup(nodeGroupId)) {
            this.selectedNodeGroups.push(nodeGroupId);
        }
    }

    removeNodeGroup(nodeGroupId:number) {
        if (this.isAddedNodeGroup(nodeGroupId)) {
            var index = this.selectedNodeGroups.indexOf(nodeGroupId, 0);
            if (index != -1) {
                this.selectedNodeGroups.splice(index, 1);
            }
        }
    }
}