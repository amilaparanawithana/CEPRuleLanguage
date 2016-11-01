/**
 * @author chathura widanage
 */
import {Component, Injector, ViewChild, Inject} from "angular2/core";
import {RouteParams, ROUTER_DIRECTIVES} from "angular2/router";
import {TableColumn} from "../../../modules/tables/table.column";
import {DataTableComponent} from "../../../modules/tables/table.component";
import {PodService} from "../../../services/pod.service";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {UIService} from "../../../services/ui.service";
import {AbstractComponent} from "../abstract.component";
declare let $:any, moment:any, window:any;
@Component({
    selector: 'PodLogComponent',
    templateUrl: '../../../../resources/template/dashboard/pod/logs.html',
    directives: [ROUTER_DIRECTIVES, DataTableComponent],
    providers: [PodService, FeedBackService],
    styleUrls: [
        "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css",
        "../../../../resources/global/vendor/datepicker/daterangepicker.css"
    ],
})

export class PodLogComponent extends AbstractComponent{
    podName:string;
    clusterId:number;

    headers:Array<TableColumn> = [];
    @ViewChild(DataTableComponent)
    dataTableView:DataTableComponent;

    logLevel:string = "ALL";
    enableLogFilter:boolean;
    startDate:number;
    endDate:number;

    showAllLogs:boolean = false;

    pods:Array<string> = [];

    constructor(private injector:Injector, private routeParam:RouteParams, private tableService:PodService,
                private feedBackService:FeedBackService, private podService:PodService,
                @Inject(UIService)
                private uiService:UIService) {
        super();
        this.routeParam = injector.parent.parent.get(RouteParams);
        this.clusterId = parseInt(this.routeParam.get('id'));
        this.podName = this.routeParam.get('name');

        if (this.podName) {
            this.showAllLogs = false;
        } else {
            this.fetchPodNameList();
            this.showAllLogs = true;
        }

        this.headers.push(
            new TableColumn("ID"),
            new TableColumn("Time"),
            new TableColumn("Node"),
            new TableColumn("Node Group"),
            new TableColumn("Cluster"),
            new TableColumn("Logger Name"),
            new TableColumn("Remote Host"),
            new TableColumn("Remote IP"),
            new TableColumn("Thread ID"),
            new TableColumn("Message"),
            new TableColumn("Severity"),
            new TableColumn("Type"),
            new TableColumn("Error Code"),
            new TableColumn("Message ID"),
            new TableColumn("Log Level")
        );
        this.uiService.isFluidContainer = true;
    }

    ngAfterViewInit() {
        this.applyDateRangePicker();
        this.updateParamMap();
    }

    ngOnDestroy() {
        this.uiService.isFluidContainer = false;
    }

    fetchPodNameList() {
        this.feedBackService.showPreloader = true;
        this.podService.getListOfPodsNames().subscribe(
            data=> {
                console.log(data);
                this.pods = [];
                if (data.length > 0) {
                    this.pods = data;
                } else {
                    this.feedBackService.warning = "No Pod logs are available"
                }
                this.feedBackService.showPreloader = false;
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    private onPodChange(value:string) {
        if (this.enableLogFilter) {
            this.clusterId = 0;
            this.podName = value;
            this.updateParamMap();
        }
    }

    private applyDateRangePicker() {

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

            datePickerDiv.on('apply.daterangepicker', (ev, picker) => {
                this.startDate = new Date(picker.startDate).getTime();
                this.endDate = new Date(picker.endDate).getTime();
                this.updateParamMap();
            });
        } else {
            // undefined date range picker. Retrying..
            setTimeout(()=> {
                this.applyDateRangePicker();
            }, 1000);
        }
    }

    toggleLogFilters(filter) {
        this.enableLogFilter = filter;
        this.updateParamMap();
    }

    changeLogLevel(level) {
        this.logLevel = level;
        this.updateParamMap();
    }

    private updateParamMap() {
        let map:Map<string,string> = new Map<string,string>();
        map.set('cluster-id', this.clusterId + "");
        map.set('pod-name', this.podName);
        if (this.showAllLogs) {
            map.set('show-all-logs', 'true');
        } else {
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
    }
}