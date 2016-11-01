/**
 * @author Amila Paranawithana
 */
import {Component, Inject} from "angular2/core";
import {UIService} from "../../../services/ui.service";
import {RestService} from "../../../services/rest.service";
import {RouteParams, Router} from "angular2/router";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {DatasourceService} from "../../../services/datasource.service";
import {Datasource} from "../../../models/datasource";

@Component({
    selector: 'datasource-view-component',
    directives: [],
    templateUrl: '../../../../resources/template/dashboard/datasource/view.html',
    providers: [UIService, RestService, DatasourceService],
    styleUrls: [
        "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css"
    ]
})

export class DatasourceViewComponent {
    datasource = new Datasource();
    podIP:string;

    constructor(private datasourceService:DatasourceService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService, private _router:Router,
                private routeParam:RouteParams) {
        let datasourceId = routeParam.get('id');
        let podIP = routeParam.get('podIP');
        if (datasourceId) {
            this.datasource.id = datasourceId;
            this.podIP = podIP
        }
        this.fetchDatasource(this.datasource.id,this.podIP);
    }

    /**
     * Fetches and set the group object
     * @param datasourceId id of the datasource
     */
    fetchDatasource(datasourceId:string, poiIP:string) {
        this.datasourceService.getById(datasourceId,poiIP).subscribe(
            data=> {
                this.datasource = data;
            }
        )
    }
}