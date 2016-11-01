/**
 * @author amila paranawithana
 */
import {Injectable, Inject} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {RestService} from "./rest.service";
import {User} from "../models/user";
import "rxjs/add/operator/map";

@Injectable()
export class LoginService {

    private baseUrl;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
        this.baseUrl = restService.getBaseUrl('auth');
    }

    login(user:User) {
        console.log(user);
        return this.http.post(this.baseUrl, JSON.stringify(user), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).map(res=>res.json());
    }
}