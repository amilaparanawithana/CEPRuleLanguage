/**
 * @author Amila Paranawithana
 */
import {Component, Inject} from "angular2/core";
import {RestService} from "../../../services/rest.service";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AlertService} from "../../../modules/alert/alert.service";
import {AlertConfiguration} from "../../../modules/alert/alert.component";
import {AbstractComponent} from "../abstract.component";
import {ServicePackageService} from "../../../services/servicepackage.service";
import {ServicePackage} from "../../../models/ServicePackage";

@Component({
    selector: 'package-list-component',
    templateUrl: '../../../../resources/template/dashboard/servicepackage/list.html',
    providers: [ServicePackageService, RestService],
    directives: [ROUTER_DIRECTIVES]
})

export class ServicePackageListComponent extends AbstractComponent {
    servicePackages:Array<ServicePackage>;

    constructor(private servicePackageService:ServicePackageService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService,
                @Inject(AlertService)
                private alertService:AlertService) {
        super();
        this.fetchPackages();
    }

    fetchPackages() {
        this.feedBackService.showPreloader = true;
        this.servicePackageService.getAll().subscribe(
            data=> {
                if (data.length > 0) {
                    this.servicePackages = data;
                } else {
                    this.feedBackService.warning = "No service packages are present at the moment"
                }
                this.feedBackService.showPreloader = false;
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    deletePackage(roleId:number) {
        this.alertService.showAlert(new AlertConfiguration("Do you really want to delete this roll?", "", ()=> {
            this.feedBackService.showPreloader = true;
            this.servicePackageService.deletePackage(roleId).subscribe(
                data=> {
                    this.fetchPackages();
                    this.feedBackService.showPreloader = false;
                    this.feedBackService.success = data.json().msg;
                },
                err=> {
                    this.fetchPackages();
                    super.handleServiceError(this.feedBackService, err);
                }
            )
        }));
    }
}