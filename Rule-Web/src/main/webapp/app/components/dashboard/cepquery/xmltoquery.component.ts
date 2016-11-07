/**
 * @author Amila Paranawithana
 */
import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {RestService} from "../../../services/rest.service";
import {UserService} from "../../../services/user.service";
import {FeedBackService, FeedbackType} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";
import {Cepquery} from "../../../models/cepquery";
import {CepqueryService} from "../../../services/cepquery.service";
@Component({
    selector: 'xmltoquery-component',
    templateUrl: '../../../../resources/template/dashboard/cepquery/list.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [CepqueryService, RestService, UserService]
})

export class XmltoqueryComponent extends AbstractComponent {

    cepquery = new Cepquery();

    constructor(private cepqueryService:CepqueryService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService) {
        super();
    }


    convertXML(type:string){
        console.log("eeeeeeeeeeeeeeeeeee");
        this.cepquery.queryType = type;
        this.cepqueryService.convertXmlToQuery(this.cepquery).subscribe(
            data=> {
                this.cepquery = data;
                console.log(this.cepquery.query);
            },
            err => {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

}