/**
 * @author Amila Paranawithana
 */
export class User {
    id:number;
    name:string;
    email : string;
    password:string;
    roles   :Array<number>;
    public selected = false;

    constructor(id:number = null, name:string = null, email:string = null, password:string = null,roles:Array<number> = []) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roles = roles;
    }

    check() {
        this.selected = !this.selected;
    }
}