/**
 * @author chathura widanage
 */
import {Component, Inject} from "angular2/core";
import {FeedBackService} from "../../services/ui/feedback.service";
@Component({
    selector: 'feedback',
    templateUrl: '../../../resources/template/dashboard/feedback.html',
})


export class FeedbackComponent {
    constructor(@Inject(FeedBackService)
                private feedbackService:FeedBackService) {
    }

    dismissError() {
        this.feedbackService.error = null;
    }

    dismissSuccess() {
        this.feedbackService.success = null;
    }

    dismissWarning() {
        this.feedbackService.warning = null;
    }
}