/**
 * @author amila karunathilaka
 */
import {Injectable, Inject} from "angular2/core";
import {RestService} from "./rest.service";
@Injectable()
export class NodeHealthService {

    constructor(@Inject(RestService)
                private restService:RestService) {
    }

    getHealthOfNode() {
        return this.restService.get(this.restService.getBaseUrl("stat/nodes/"))
            .map(res=> {
                console.log(res);
                return res.json()
            })
    }

}