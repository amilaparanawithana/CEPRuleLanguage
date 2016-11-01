/**
 * @author Sajith Dilshan
 */
import {Component, ViewChild, Injector, Inject} from "angular2/core";
import {TableColumn, TableColumnType, Clickable, Selectable, Checkable} from "../../../modules/tables/table.column";
import {DataTableComponent} from "../../../modules/tables/table.component";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {ClusterLoggerService} from "../../../services/cluster.logger.service";
import {Cluster} from "../../../models/cluster";
import {FeedbackComponent} from "../feedback.component";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {ClusterService} from "../../../services/cluster.service";
import {AbstractComponent} from "../abstract.component";
@Component({
    selector: 'ClusterLoggerListComponent',
    templateUrl: '../../../../resources/template/dashboard/cluster/loggers.html',
    directives: [ROUTER_DIRECTIVES, DataTableComponent],
    providers: [ClusterLoggerService, ClusterService]
})

export class ClusterLoggerListComponent extends AbstractComponent {

    selectedClusterId:number;
    selectedClusterName:string;
    clusters:Array<Cluster> = [];

    headers:Array<TableColumn> = [];
    @ViewChild(DataTableComponent)
    dataTableView:DataTableComponent;

    constructor(private tableService:ClusterLoggerService,
                @Inject(FeedBackService)
                private feedbackService:FeedBackService,
                @Inject(ClusterService)
                private clusterService:ClusterService) {
        super();
        this.fetchClusterList();

        //clickable example
        /*var actionableCol = new Clickable();
         actionableCol.doAction = function (index:number, value:any) {
         console.log("index :" + index + ", value:" + value);
         }*/

        //checkable example
        var checkCol = new Checkable();
        checkCol.doAction = (index:number, value:any)=> {

        };
        checkCol.cssClasses.push("");

        //selectable example
        var actionableCol = new Selectable();
        actionableCol.add(0, "ALL");
        actionableCol.add(1, "TRACE");
        actionableCol.add(2, "DEBUG");
        actionableCol.add(3, "INFO");
        actionableCol.add(4, "WARN");
        actionableCol.add(5, "ERROR");
        actionableCol.add(6, "FATAL");
        actionableCol.add(7, "OFF");
        actionableCol.cssClasses.push("form-control");


        actionableCol.doAction = (index:number, value:any) => {
            this.feedbackService.showPreloader = true;
            this.tableService.changeLogLevel(this.selectedClusterId, this.dataTableView.dataRows[index].data[0], actionableCol.optionData[value]).subscribe(
                data=> {
                    this.feedbackService.showPreloader = false;
                    this.feedbackService.success = data.msg;
                }, err => {
                    super.handleServiceError(this.feedbackService, err);
                }
            );
        };

        this.headers.push(
            new TableColumn("Logger", true, 40),
            new TableColumn("Parent Logger", true, 20),
            new TableColumn("Level", false, 20, actionableCol),
            new TableColumn("Additivity", false, 20, checkCol)
        );
    }

    changeLogLevel(index:number, value:any) {

    }

    ngAfterViewInit() {
        this.updateSelectedCluster();
    }

    private fetchClusterList() {
        this.feedbackService.showPreloader = true;
        this.clusterService.getAllClusters().subscribe(
            data => {
                this.clusters = [];
                if (data.length > 0) {
                    this.clusters = data;
                    this.selectedClusterId = this.clusters[0].id;
                    this.selectedClusterName = this.clusters[0].name;
                    this.updateSelectedCluster();
                } else {
                    this.feedbackService.warning = "No Clusters are present at the moment";
                }
                this.feedbackService.showPreloader = false;
            }, err => {
                super.handleServiceError(this.feedbackService, err);
            }
        )
    }

    private updateSelectedCluster() {
        let map:Map<string,string> = new Map<string,string>();
        map.set('selected-cluster-id', this.selectedClusterId + "");
        this.dataTableView.setAdditionalParams(map);
    }

    private onClusterSelect(value:number) {
        this.selectedClusterId = this.clusters[value].id;
        this.selectedClusterName = this.clusters[value].name;
        this.updateSelectedCluster();
    }

}

export enum LoggerLevel {
    OFF, TRACE, DEBUG, INFO, WARN, ERROR, FATAL, ALL
}