import {FeedBackService, FeedbackType} from "../../services/ui/feedback.service";
export abstract class AbstractComponent {

    protected handleServiceError(feedbackService:FeedBackService, err) {
        console.log(err);
        feedbackService.showPreloader = false;
        try {
            feedbackService.showFeedback(FeedbackType.ERROR, err.json().msg, false);
        } catch (e) {
            feedbackService.showFeedback(FeedbackType.ERROR, "Operation failed due to a connection failure.", false);
        }
    }
}