/**
 * @author Amila Paranawithana
 */
import {Component, ViewEncapsulation, ViewChild, Inject} from "angular2/core";
import {UIService} from "../../services/ui.service";
import {RestService} from "../../services/rest.service";
import {ChartComponent} from "./charts/chart.component";
import {Router} from "angular2/router";
@Component({
    selector: 'dashhome-compoenent',
    templateUrl: '../../../resources/template/dashboard/home.html',
    encapsulation: ViewEncapsulation.None,
    providers: [RestService],
    directives: [ChartComponent]
})

export class DashHomeComponent {



}