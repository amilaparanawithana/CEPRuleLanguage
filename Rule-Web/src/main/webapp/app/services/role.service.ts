/**
 * @author chathura widanage
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {RestService} from "./rest.service";
import {Role} from "../models/role";
@Injectable()
export class RoleService {
    private baseUrl;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
        this.baseUrl = restService.getBaseUrl('role');
    }

    createRoll(role:Role) {
        return this.restService.post(this.baseUrl, JSON.stringify(role)).map(res=>res.json());
    }

    editRoll(role:Role) {
        return this.restService.put(this.baseUrl + "/" + role.id, JSON.stringify(role)).map(res=>res.json());
    }

    deleteRoll(roleId:number) {
        return this.restService.delete(this.baseUrl + "/" + roleId);
    }

    getAll() {
        return this.restService.get(this.baseUrl)
            .map(res=> {
                return res.json();
            })
            .map((roles:Array<any>)=> {
                let result:Array<Role> = [];
                if (roles) {
                    roles.forEach((role)=> {
                        result.push(new Role(role.id, role.name));
                    })
                }
                return result;
            });
    }

    getRole(roleId:number) {
        return this.restService.get(this.baseUrl + '/' + roleId)
            .map(res => {
                return res.json();
            })
            .map(role => {
                return new Role(role.id, role.name, role.permissions)
            });
    }
}