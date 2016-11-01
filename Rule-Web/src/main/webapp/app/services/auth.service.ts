/**
 * @author Chathura Widanage
 * @author amila paranawithana
 */
import {Injectable, Inject} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {JwtProvider} from "../providers/jwt.provider";
import {UtilService} from "./util.service";
import "rxjs/add/operator/map";
import {Tenant} from "../models/tenant";
import {Auth} from "../models/auth";

@Injectable()
export class AuthService {

    private baseUrl;

    constructor(private http:Http, private jwtProvider:JwtProvider, @Inject(UtilService)
    private utilService:UtilService) {
        this.baseUrl = this.utilService.getBaseUrl("auth");
    }

    login(auth:Auth) {
        return this.http.post(this.baseUrl, JSON.stringify(auth), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).map(res=>
            res.json()
        );
    }

    /**
     * Whether user is authorized to access the dashboard or other UI components
     * @returns {undefined}
     */
    static isAuthorized() {
        return JwtProvider.hasToken();
    }

    /**
     * logs out the user from the app. ie. deletes the token.
     */
    static logout() {
        JwtProvider.removeToken();
        window.location.assign("#/auth/login");
        window.location.reload();
    }

    register(tenant:Tenant) {

        return this.http.post(this.baseUrl + "/" + "register", JSON.stringify(tenant), {
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        });


    }
}