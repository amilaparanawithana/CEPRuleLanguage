/**
 * @author chathura widanage
 */
import {Injectable, Inject} from "angular2/core";
import {RestService} from "./rest.service";
import {HealthResource} from "../modules/health/health.resource";
@Injectable()
export class HealthService {
    baseUrl:string;

    constructor(@Inject(RestService)
                private restService:RestService) {
        this.baseUrl = restService.getBaseUrl("health");
    }

    getHealth() {
        return this.restService.get(this.baseUrl)
            .map(res=> {
                return res.json();
            })
            .map((healths:Array<any>)=> {
                let result:Array<HealthResource> = [];
                if (healths) {
                    healths.forEach((health)=> {
                        result.push(new HealthResource(health.working, health.message, health.component));
                    })
                }
                return result;
            });
    }
}