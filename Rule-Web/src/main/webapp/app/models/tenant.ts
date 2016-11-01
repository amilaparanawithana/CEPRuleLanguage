import {User} from "./user";
/**
 * @author Amila Paranawithana
 */
export class Tenant {

    id:number;
    name:string;
    domain:string;
    email:string;
    admin:User;

    constructor(id:number = null, name:string = null, domain:string = null, email:string = null, admin:User = null) {
        this.id = id;
        this.name = name;
        this.domain = domain;
        this.email = email;
        this.admin = admin;
    }
}