/**
 * @author Chathura Widanage
 */
import {Component, Inject} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {PermissionService} from "../../../services/permission.service";
import {Permission} from "../../../models/permission";
import {FeedBackService} from "../../../services/ui/feedback.service";
import {AbstractComponent} from "../abstract.component";
@Component({
    selector: 'permission-component',
    directives: [ROUTER_DIRECTIVES]
})

export class PermissionListComponent extends AbstractComponent{
    permissions:Array<Permission>;

    constructor(permissionService:PermissionService,
                @Inject(FeedBackService)
                private feedBackService:FeedBackService) {
        super();
        permissionService.getAll().subscribe(
            data=> {
                this.permissions = data
            }, err => {
                super.handleServiceError(this.feedBackService, err);
            }
        );
    }
}