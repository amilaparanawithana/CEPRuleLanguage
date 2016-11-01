/**
 * @author chathura widanage
 */
import {Component, Inject} from "angular2/core";
import {AlertService} from "./alert.service";
@Component({
    selector: 'alert-component',
    templateUrl: '../../../resources/template/modules/alert/alert.html'
})

export class AlertComponent {
    service:AlertService;
    visible:boolean;

    constructor(@Inject(AlertService) alertService:AlertService) {
        this.service = alertService;
    }

    positiveAction() {
        if (this.service.config.callback !== null) {
            this.service.config.callback();
        }
        this.dismissAlert();
    }

    dismissAlert() {
        this.service.config = null;
    }
}

export class AlertConfiguration {
    title:string;
    message:string;
    callback:Function;
    positiveButton:string;
    negativeButton:string;
    negativeButtonVisible;

    constructor(title:string, message:string, callback:Function = null, positiveButton:string = "Yes", 
                negativeButtonVisible:boolean = true, negativeButton:string = "No") {
        this.title = title;
        this.message = message;
        this.callback = callback;
        this.positiveButton = positiveButton;
        this.negativeButtonVisible = negativeButtonVisible;
        this.negativeButton = negativeButton;
    }
}