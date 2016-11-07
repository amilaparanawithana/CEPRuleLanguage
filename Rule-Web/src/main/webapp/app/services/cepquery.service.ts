/**
 * @author Amila Paranawithana
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {Project} from "../models/project";
import {RestService} from "./rest.service";
import {MultipartUploader} from "./multipart/multipart-uploader";
import {MultipartItem} from "./multipart/multipart-item";
import {JwtProvider} from "../providers/jwt.provider";
import {Observable} from "rxjs/Observable";
import {UserService} from "./user.service";

@Injectable()
export class CepqueryService {
    baseUrl:string;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService,
                @Inject(UserService)
                private userService:UserService,
                private jwtProvider:JwtProvider) {
        this.baseUrl = restService.getBaseUrl('cepquery');
        this.restService = restService;
    }

    convert(){

    }





}