/**
 * @author Amila Paranawithana
 */
import {Component, Inject} from "angular2/core";
import {UIService} from "../../../services/ui.service";
import {RestService} from "../../../services/rest.service";
import {Directory} from "../../../models/treeview/directory";
import {RouteParams, Router} from "angular2/router";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AbstractComponent} from "../abstract.component";
import {ServicePackageService} from "../../../services/servicepackage.service";
import {ServicePackage} from "../../../models/ServicePackage";

@Component({
    selector: 'service-package-create-component',
    templateUrl: '../../../../resources/template/dashboard/servicepackage/create.html',
    providers: [UIService, RestService, ServicePackageService]
})

export class ServicePackageCreateComponent extends AbstractComponent{
    servicePackage = new ServicePackage();
    directories:Directory[];
    private createNew:boolean = true;
    levels:Array<string> = ["public_node" , "dedicated_node"];

    constructor(private servicePackageService:ServicePackageService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService, private _router:Router,
                private routeParam:RouteParams) {
        super();
        let packageId = routeParam.get('id');
        if (packageId) {
            this.createNew = false;
            this.fetchServicePackage(packageId);
        }
    }

    onSubmit(){
        if(this.createNew){
            this.onSubmitCreate();
        } else if (!this.createNew){
            this.onSubmitEdit();
        }
    }

    onSubmitCreate() {
        this.feedBackService.showPreloader = true;

        this.servicePackageService.create(this.servicePackage).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['ServicePackageList']);
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    onSubmitEdit() {
        this.feedBackService.showPreloader = true;

        this.servicePackageService.edit(this.servicePackage).subscribe(
            data=> {
                this.feedBackService.showPreloader = false;
                this._router.navigate(['ServicePackageList']);
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        )
    }

    private fetchServicePackage(packageId:string) {
        this.servicePackageService.getServicePackage(parseInt(packageId)).subscribe(
            res => {
                this.servicePackage = res;
                this.feedBackService.showPreloader = false;
            },
            err=> {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }

    private onLevelChange(level:string){
        this.servicePackage.packageLevel = level;
    }

}