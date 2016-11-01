import {Injectable} from "angular2/core";
import {Router} from "angular2/router";
/**
 * @author chathura widanage
 */
@Injectable()
export class FeedBackService {
    
    private _showPreloader:boolean;

    private feedbacks:Map<string,Feedback>;

    constructor(private router:Router) {
        router.subscribe((val)=> {//comment this part if it is required to show errors and warnings until user manually close them
            this.dismissAll();
        });
        this.feedbacks = new Map<string,Feedback>();
    }

    getFeedbacks():Array<Feedback> {
        var feedbackList:Array<Feedback> = new Array<Feedback>();
        this.feedbacks.forEach((v:Feedback, k:string)=> {
            if (v.isValid()) {
                feedbackList.push(v);
            } else {
                this.feedbacks.delete(k);
            }
        });
        return feedbackList;
    }

    dismissAll() {
        this.feedbacks = new Map<string,Feedback>();
    }

    get showPreloader():boolean {
        return this._showPreloader;
    }

    set showPreloader(value:boolean) {
        this._showPreloader = value;
    }

    private addFeedback(feedback:Feedback) {
        this.feedbacks.set(feedback.getId(), feedback);
    }

    /**
     * Other components will ue this function to show feedbacks to the user.
     * @param type type of the feedback
     * @param message message to be shown
     * @param selfDestruct whether the feedback should be self destructed
     * @param selfDestructTime time till self destruct
     */
    showFeedback(type:FeedbackType, message:string,
                 selfDestruct:boolean = true,
                 selfDestructTime:number = 10000) {
        this.addFeedback(new Feedback(type, message, selfDestruct, selfDestructTime));
    }

    /*
     * deprecated API
     * //todo migrate completely to the new API
     * */
    
    set error(value:string) {
        this.addFeedback(new Feedback(FeedbackType.ERROR, value));
    }

    
    set success(value:string) {
        this.addFeedback(new Feedback(FeedbackType.SUCCESS, value));
    }

   
    set warning(value:string) {
        this.addFeedback(new Feedback(FeedbackType.WARNING, value));
    }

    //end of deprecated API
}

/**
 * A self destructible Feedback
 */
export class Feedback {
    valid:boolean;
    id:string;

    constructor(public type:FeedbackType,
                public message:string,
                selfDestruct:boolean = true,
                selfDestructTime:number = 10000) {
        this.id = Math.random().toString(36).substring(7);
        this.valid = true;
        if (selfDestruct) {
            setTimeout(()=> {
                this.valid = false;
            }, selfDestructTime);
        }
    }

    invalidate() {
        this.valid = false;
    }

    getId():string {
        return this.id;
    }

    isSuccess() {
        return this.type === FeedbackType.SUCCESS;
    }

    isError() {
        return this.type === FeedbackType.ERROR;
    }

    isWarning() {
        return this.type === FeedbackType.WARNING;
    }

    isValid():boolean {
        return this.valid;
    }
}

export enum FeedbackType{
    SUCCESS, ERROR, WARNING
}