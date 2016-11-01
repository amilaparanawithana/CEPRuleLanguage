/**
 *@author Chathura Widanage
 *
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {Permission} from "../models/permission";
import {RestService} from "./rest.service";

@Injectable()
export class PermissionService {
    private baseUrl;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
        this.baseUrl = restService.getBaseUrl("permission");
    }

    getAll() {
        return this.restService.get(this.baseUrl)
            .map(res=> {
                return res.json();
            })
            .map((permissions:Array<any>)=> {
                let result:Array<Permission> = [];
                if (permissions) {
                    permissions.forEach((permission)=> {
                        result.push(new Permission(permission.id, permission.name, permission.category));
                    })
                }
                return result;
            });
    }
}