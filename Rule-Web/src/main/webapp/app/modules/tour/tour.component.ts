import {Component} from "angular2/core";
import {JwtProvider} from "../../providers/jwt.provider";
import {Router} from "angular2/router";
import {TourStepGroup} from "./tour.group";
/**
 * @author Chathura Widanage
 * */

declare let Tour:any;
@Component({
    selector: 'tour-component',
    templateUrl: './resources/template/modules/tour/tour.html'
})
export class TourComponent {
    showTour:boolean;
    username:string;

    private tour:any;
    private steps:number = 1;

    debounce:boolean;

    private initStepMap:Map<number,TourStepGroup> = new Map();

    constructor(private router:Router) {
        this.username = JwtProvider.getUserName();
        this.initTour();
        this.router.subscribe((val)=> {
            console.log(val);
            if (this.tour && !this.debounce) {
                console.log('tour ping');

                //todo use a proper way to avoid flickering, rather than using debouncing
                //temporary de bouncing
                this.debounce = true;
                setTimeout(()=> {
                    this.debounce = false;
                }, 500);
                //end of temporary debouncing

                this.tour.showStep(this.tour.getCurrentStep());//This line is very important
            }
        });

        console.log("Tour.............." + sessionStorage.getItem("key"));
    }

    /**
     * This method will initialize the tour. The tour steps should be added here.
     */
    initTour() {
        this.tour = new Tour({
            storage: false,
            backdrop: true,
            backdropPadding: 0,
            orphan: 'true',
            debug: true,
            onNext: ()=> {
                /*if (this.initStepMap.get(this.tour.getCurrentStep())) {
                    console.log('ending tour');
                    this.tour.end();
                }*/
            },
            animation: true,
            steps: [
                {
                    element: "#clusterNav",
                    title: "Welcome to IPS",
                    backdropContainer: '#sidebar-wrapper',
                    path: "/#/dashboard",
                    reflex: true,
                    content: "Let's start by creating a new cluster."
                }
            ]
        });


        this.tour.init();
        /*cluster create tour*/
        let clusterTour = new TourStepGroup("Create a cluster");
        clusterTour.addSteps([
            {
                element: "#cluster-add-btn",
                title: "Create a new Cluster",
                placement: 'bottom',
                reflex: true,//reflex true should be added when step binds to a button or a link
                path: "/#/dashboard/cluster",
                content: "Click add to proceed."
            },
            {
                element: "#cluster-create-name",
                title: "Enter a name for your first cluster.",
                backdropContainer: '#sidebar-wrapper',
                placement: 'top',
                path: "/#/dashboard/cluster/new",
                content: "Cluster name can't have spaces or special characters."
            },
            {
                element: "#cluster-create-port-from",
                title: "Cluster - Open Ports",
                backdropContainer: '#sidebar-wrapper',
                placement: 'top',
                path: "/#/dashboard/cluster/new",
                content: "Enter the lowest port that will be used by this cluster."
            },
            {
                element: "#cluster-create-port-to",
                title: "Cluster - Open Ports",
                backdropContainer: '#sidebar-wrapper',
                placement: 'top',
                path: "/#/dashboard/cluster/new",
                content: "Enter the highest port that will be used by this cluster."
            },
            {
                element: "#cluster-create-replicas",
                title: "Cluster - Replications",
                backdropContainer: '#sidebar-wrapper',
                placement: 'top',
                path: "/#/dashboard/cluster/new",
                content: "How many parallel instances of UltraESB are required in this cluster?"
            },
            {
                element: "#cluster-create-btn",
                title: "Cluster - Create",
                backdropContainer: '#sidebar-wrapper',
                placement: 'top',
                reflex: true,
                path: "/#/dashboard/cluster/new",
                content: "Click create to populate the cluster."
            }
        ]);

        this.addStepGroup(clusterTour);
    }

    /**
     * Steps should be added only through this function
     * @param title to be used in the Tour Main panel
     * @param steps array of steps.
     */
    addStepGroup(stepGroup:TourStepGroup) {
        stepGroup.initStep = this.steps;
        this.initStepMap.set(this.steps, stepGroup);
        console.log(stepGroup.steps);
        this.tour.addSteps(stepGroup.steps);

        //increase the number of steps
        this.steps += stepGroup.steps.length;
    }

    getTourGroups():Array<TourStepGroup> {
        var tourSteps:Array<TourStepGroup> = [];
        this.initStepMap.forEach((v, k)=> {
            tourSteps.push(v);
        });
        return tourSteps;
    }

    showTourWindows() {
        //this.showTour = true;
        this.tour.goTo(0);
    }

    startTour(tourStep:TourStepGroup) {
        if (tourStep) {
            console.log('calling intermediate step');
            this.showTour = false;
            this.tour.goTo(tourStep.initStep);
        } else {
            this.tour.start(true);
        }
    }

    hideTour() {
        this.showTour = false;
    }
}