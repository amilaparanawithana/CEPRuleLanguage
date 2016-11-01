/**
 * @author chathura widanage
 */
import {Component} from "angular2/core";
import {HealthService} from "../../services/health.service";
import {HealthResource} from "./health.resource";
import {FeedBackService} from "../../services/ui/feedback.service";
import {AbstractComponent} from "../../components/dashboard/abstract.component";

@Component({
    selector: 'health-component',
    templateUrl: '../../../resources/template/modules/health/health.html',
    providers: [HealthService, FeedBackService]
})

export class HealthComponent extends AbstractComponent {
    healths:Array<HealthResource> = [];
    interval:any;
    requestProcessed:boolean = true;

    constructor(private healthService:HealthService, private feedbackService:FeedBackService) {
        this.initializeInterval();
    }

    ngOnDestroy() {
        this.destroyInterval();
    }

    update() {
        if (this.requestProcessed) {
            this.requestProcessed = false;
            this.healthService.getHealth().subscribe(
                data=> {
                    this.requestProcessed = true;
                    this.healths = [];
                    this.healths = data;
                }, err => {
                    this.requestProcessed = true;
                    super.handleServiceError(this.feedbackService, err);
                },
                () => {
                    this.requestProcessed = true;
                }
            )
        }
    }

    initializeInterval() {
        this.update();
        this.interval = setInterval(()=> {
            this.update();
        }, 15000);
    }

    destroyInterval() {
        clearInterval(this.interval);
    }
}