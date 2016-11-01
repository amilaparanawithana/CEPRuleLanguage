/**
 * @author Amila Paranawithana
 */
import {Component, ViewEncapsulation, ViewChild, Inject} from "angular2/core";
import {UIService} from "../../services/ui.service";
import {RestService} from "../../services/rest.service";
import {ChartComponent} from "./charts/chart.component";
import {HealthComponent} from "../../modules/health/health.component";
import {ClusterHealthComponent} from "../../modules/health/cluster.health.component";
import {Router} from "angular2/router";
import {NodeHealthComponent} from "../../modules/health/node.health.component";
@Component({
    selector: 'dashhome-compoenent',
    templateUrl: '../../../resources/template/dashboard/home.html',
    encapsulation: ViewEncapsulation.None,
    providers: [RestService],
    directives: [ChartComponent, HealthComponent, ClusterHealthComponent, NodeHealthComponent]
})

export class DashHomeComponent {

    @ViewChild(HealthComponent)
    healthComponent:HealthComponent;
    @ViewChild(ClusterHealthComponent)
    clusterHealthComponent:ClusterHealthComponent;
    @ViewChild(NodeHealthComponent)
    nodeHealthComponent:NodeHealthComponent;

    activeTab:String = "clusterHealth";

    constructor(@Inject(UIService)
                private uiService:UIService, private restService:RestService, private router:Router) {
        router.subscribe((val)=> {
            this.uiService.isFluidContainer = false;
            this.clusterHealthComponent.destroyInterval();
            this.nodeHealthComponent.destroyInterval();
            this.healthComponent.destroyInterval();
        });
        this.onTabChange();
    }

    ngOnDestroy() {
        this.clusterHealthComponent.destroyInterval();
        this.nodeHealthComponent.destroyInterval();
        this.healthComponent.destroyInterval();
    }


    onTabChange(activeTab:string) {
        this.activeTab = activeTab;
        if (activeTab == "clusterHealth") {
            this.healthComponent.destroyInterval();
            this.nodeHealthComponent.destroyInterval();
            this.clusterHealthComponent.initializeInterval();
        } else if (activeTab == "systemHealth") {
            this.clusterHealthComponent.destroyInterval();
            this.nodeHealthComponent.destroyInterval();
            this.healthComponent.initializeInterval();
        } else if (activeTab == "nodesHealth") {
            this.clusterHealthComponent.destroyInterval();
            this.healthComponent.destroyInterval();
            this.nodeHealthComponent.initializeInterval();
        }
    }

    ngOnInit() {
        this.uiService.initApp();
    }
}