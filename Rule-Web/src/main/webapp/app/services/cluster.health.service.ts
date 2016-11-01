/**
 * @author Sajith Dilshan
 */
import {Injectable, Inject} from "angular2/core";
import {RestService} from "./rest.service";
@Injectable()
export class ClusterHealthService {

    constructor(@Inject(RestService)
                private restService:RestService) {
    }

    getHealthOfSystem() {
        return this.restService.get(this.restService.getBaseUrl("jmx/system_stats"))
            .map(res=> {
                console.log(res);
                return res.json()
            })
    }

}