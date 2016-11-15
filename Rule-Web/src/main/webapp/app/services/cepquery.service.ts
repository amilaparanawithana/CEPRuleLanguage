/**
 * @author Amila Paranawithana
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {RestService} from "./rest.service";
import {MultipartUploader} from "./multipart/multipart-uploader";
import {MultipartItem} from "./multipart/multipart-item";
import {JwtProvider} from "../providers/jwt.provider";
import {Observable} from "rxjs/Observable";
import {UserService} from "./user.service";
import {Cepquery} from "../models/cepquery";

@Injectable()
export class CepqueryService {
    baseUrl:string;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService,
                @Inject(UserService)
                private userService:UserService,
                private jwtProvider:JwtProvider) {
        this.baseUrl = restService.getBaseUrl("");
        this.restService = restService;
    }

    convertXmlToQuery(cepQuery:Cepquery){
        return this.restService.post(this.baseUrl + 'xmltoquery', JSON.stringify(cepQuery)).map(res=>res.json());
    }

    convertQueryToXML(cepQuery:Cepquery){
        return this.restService.post(this.baseUrl + 'querytoxml', JSON.stringify(cepQuery)).map(res=>res.json());
    }

}