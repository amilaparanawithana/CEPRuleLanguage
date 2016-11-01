/**
 * @author Chathura Widanage
 */
import {Injectable, Inject} from "angular2/core";
import {Http, Headers} from "angular2/http";
import {JwtProvider} from "../providers/jwt.provider";
import {AuthService} from "./auth.service";
import {UtilService} from "./util.service";

@Injectable()
export class RestService {

    constructor(private http:Http, private jwtProvider:JwtProvider, private authService:AuthService,
                @Inject(UtilService)
                private utilService:UtilService) {
    }

    public  getBaseUrl(model) {
        return this.utilService.getBaseUrl(model);
    }

    public getResourceUrl(model, resource) {
        return this.utilService.getResourceUrl(model, resource);
    }

    public get(url, headers:Headers = new Headers()) {
        this.createHeader(headers);
        return this.http.get(url, {
            headers: headers
        }).map(res=> {
            return this.checkIfAuthorized(res)
        });
    }

    public post(url, body, headers:Headers = new Headers()) {
        this.createHeader(headers);
        return this.http.post(url, body, {
            headers: headers
        }).map(res=> {
            return this.checkIfAuthorized(res)
        });
    }

    public put(url, body, headers:Headers = new Headers()) {
        this.createHeader(headers);
        return this.http.put(url, body, {
            headers: headers
        }).map(res=> {
            return this.checkIfAuthorized(res)
        });
    }

    public delete(url, headers:Headers = new Headers()) {
        this.createHeader(headers);
        return this.http.delete(url, {
            headers: headers
        }).map(res=> {
            return this.checkIfAuthorized(res)
        });
    }

    private createHeader(headers:Headers) {
        if (!headers.has("Content-Type")) {//default content type is json, set it to something else from other services if you need it to be something else.
            headers.append("Content-Type", "application/json");
        }
        headers.append("Authorization", JwtProvider.getToken());
    }

    private checkIfAuthorized(res) {
        if (res.json().msg == "Unauthorized") {
            AuthService.logout();
        } else {
            return res;
        }
    }

}

