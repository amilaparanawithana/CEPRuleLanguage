/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */

export class Role {
    id:number;
    name:string;
    permissions:Array<number>;
    public selected = false;

    constructor(id:number = null, name:string = null, permission:Array<number> = []) {
        this.id = id;
        this.name = name;
        this.permissions = permission;
    }

    check() {
        this.selected = !this.selected;
    }
}