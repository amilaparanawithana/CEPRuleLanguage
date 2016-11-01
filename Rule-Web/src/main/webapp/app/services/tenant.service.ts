/**
 * @author Chathura Widanage
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {Tenant} from "../models/tenant";
import {RestService} from "./rest.service";
import "rxjs/add/operator/map";
@Injectable()
export class TenantService {
    private baseUrl;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
        this.baseUrl = restService.getBaseUrl("tenant");
    }

    createTenant(tenant:Tenant) {
        return this.restService.post(this.baseUrl, JSON.stringify(tenant)).map(res=>res.json());
    }
}