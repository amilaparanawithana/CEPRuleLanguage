/**
 * @author chathura widanage
 */
import {Injectable} from "angular2/core";
import {AlertConfiguration} from "./alert.component";
@Injectable()
export class AlertService {
    config:AlertConfiguration;

    showAlert(config:AlertConfiguration) {
        this.config = config;
    }
}