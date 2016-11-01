export class TourStepGroup {
    title:string;
    steps:Array<any> = [];
    initStep:number;
    stepCompleted:boolean;

    constructor(title:string) {
        this.title = title;
    }

    addStep(step:Object) {
        this.steps.push(step);
    }

    addSteps(steps:Array<any>) {
        this.steps = this.steps.concat(steps);
    }

    setStepCompleted() {
        this.stepCompleted = true;
    }
}