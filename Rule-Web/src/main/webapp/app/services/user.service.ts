/**
 * @author amila paranawithana
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {RestService} from "./rest.service";
import {User} from "../models/user";
@Injectable()
export class UserService {
    private baseUrl;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
        this.baseUrl = restService.getBaseUrl('user');
    }

    createUser(user:User) {
        return this.restService.post(this.baseUrl, JSON.stringify(user)).map(res=>res.json());
    }

    editUser(user:User) {
        return this.restService.put(this.baseUrl + "/" + user.id, JSON.stringify(user)).map(res=>res.json());
    }

    deleteUser(userId:number) {
        return this.restService.delete(this.baseUrl + "/" + userId);
    }

    getAll() {
        return this.restService.get(this.baseUrl)
            .map(res=> {
                return res.json();
            })
            .map((users:Array<any>)=> {
                let result:Array<User> = [];
                if (users) {
                    users.forEach((user)=> {
                        result.push(new User(user.id, user.name,user.email,user.password,user.roles));
                    })
                }
                return result;
            });
    }

    getUser(userId:number) {
        return this.restService.get(this.baseUrl + '/' + userId)
            .map(res => {
                return res.json();
            })
            .map(user => {
                return new User(user.id, user.name,user.email,user.password,user.roles)
            });
    }
}