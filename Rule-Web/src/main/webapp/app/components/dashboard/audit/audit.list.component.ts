/**
 * @author Amila Paranawithana
 * @author Chathura Widanage
 */
import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RestService} from "../../../services/rest.service";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {TableColumn} from "../../../modules/tables/table.column";
import {AuditTableService} from "../../../services/ui/audit.table.service";
import {DataTableComponent} from "../../../modules/tables/table.component";
import {AbstractComponent} from "../abstract.component";

@Component({
    selector: 'audit-list-component',
    templateUrl: '../../../../resources/template/dashboard/audit/list.html',
    directives: [ROUTER_DIRECTIVES, DataTableComponent],
    providers: [RestService, AuditTableService]
})

export class AuditListComponent extends AbstractComponent{

    headers:Array<TableColumn> = [];

    constructor(private tableService:AuditTableService, @Inject(FeedBackService)
    private feedBackService:FeedBackService) {
        super();
        this.tableService = tableService;
        this.feedBackService = feedBackService;
        this.headers.push(
            new TableColumn('ID', true, 5),
            new TableColumn('Time', true, 20),
            new TableColumn('Subject', true, 20),
            new TableColumn('Type', true, 10),
            new TableColumn('User', true, 10),
            new TableColumn('Message', true, 35)
        );
    }

}