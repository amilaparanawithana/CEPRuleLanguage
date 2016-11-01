/**
 * @author chathura widanage
 */
export class HealthResource {
    working:boolean;
    message:string;
    component:string;

    constructor(working:boolean, message:string, component:string) {
        this.working = working;
        this.message = message;
        this.component = component;
    }
}