System.register(["angular2/core", "../../providers/jwt.provider", "angular2/router", "./tour.group"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, jwt_provider_1, router_1, tour_group_1;
    var TourComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (jwt_provider_1_1) {
                jwt_provider_1 = jwt_provider_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (tour_group_1_1) {
                tour_group_1 = tour_group_1_1;
            }],
        execute: function() {
            TourComponent = (function () {
                function TourComponent(router) {
                    var _this = this;
                    this.router = router;
                    this.steps = 1;
                    this.initStepMap = new Map();
                    this.username = jwt_provider_1.JwtProvider.getUserName();
                    this.initTour();
                    this.router.subscribe(function (val) {
                        console.log(val);
                        if (_this.tour && !_this.debounce) {
                            console.log('tour ping');
                            //todo use a proper way to avoid flickering, rather than using debouncing
                            //temporary de bouncing
                            _this.debounce = true;
                            setTimeout(function () {
                                _this.debounce = false;
                            }, 500);
                            //end of temporary debouncing
                            _this.tour.showStep(_this.tour.getCurrentStep()); //This line is very important
                        }
                    });
                    console.log("Tour.............." + sessionStorage.getItem("key"));
                }
                /**
                 * This method will initialize the tour. The tour steps should be added here.
                 */
                TourComponent.prototype.initTour = function () {
                    this.tour = new Tour({
                        storage: false,
                        backdrop: true,
                        backdropPadding: 0,
                        orphan: 'true',
                        debug: true,
                        onNext: function () {
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
                    var clusterTour = new tour_group_1.TourStepGroup("Create a cluster");
                    clusterTour.addSteps([
                        {
                            element: "#cluster-add-btn",
                            title: "Create a new Cluster",
                            placement: 'bottom',
                            reflex: true,
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
                };
                /**
                 * Steps should be added only through this function
                 * @param title to be used in the Tour Main panel
                 * @param steps array of steps.
                 */
                TourComponent.prototype.addStepGroup = function (stepGroup) {
                    stepGroup.initStep = this.steps;
                    this.initStepMap.set(this.steps, stepGroup);
                    console.log(stepGroup.steps);
                    this.tour.addSteps(stepGroup.steps);
                    //increase the number of steps
                    this.steps += stepGroup.steps.length;
                };
                TourComponent.prototype.getTourGroups = function () {
                    var tourSteps = [];
                    this.initStepMap.forEach(function (v, k) {
                        tourSteps.push(v);
                    });
                    return tourSteps;
                };
                TourComponent.prototype.showTourWindows = function () {
                    //this.showTour = true;
                    this.tour.goTo(0);
                };
                TourComponent.prototype.startTour = function (tourStep) {
                    if (tourStep) {
                        console.log('calling intermediate step');
                        this.showTour = false;
                        this.tour.goTo(tourStep.initStep);
                    }
                    else {
                        this.tour.start(true);
                    }
                };
                TourComponent.prototype.hideTour = function () {
                    this.showTour = false;
                };
                TourComponent = __decorate([
                    core_1.Component({
                        selector: 'tour-component',
                        templateUrl: './resources/template/modules/tour/tour.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], TourComponent);
                return TourComponent;
            }());
            exports_1("TourComponent", TourComponent);
        }
    }
});
//# sourceMappingURL=tour.component.js.map