/**
 * @author Chathura Widanage
 */
import {Injectable} from "angular2/core";

/**
 * This service will initialize jQuery based UI components when components are loaded.
 */
@Injectable()
export class UIService {

    public isFluidContainer:boolean = false;
    public toggled:string = "";

    initApp() {
        //IPSApp.init();
    }

    toggleSidebar() {
        if (this.toggled == "toggled") {
            this.toggled = "";
        } else {
            this.toggled = "toggled";
        }
    }

    hideSideBar() {
        this.toggled="toggled";
    }

    showSideBar() {
        this.toggled="";
    }
}