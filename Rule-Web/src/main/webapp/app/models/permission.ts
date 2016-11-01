/**
 * @author Chathura Widanage
 * @author Sajith Dilshan
 */
export class Permission {
    public id:number;
    public name:string;
    public category:string;
    public checked = false;

    constructor(id:number, name:string, category:string) {
        this.id = id;
        this.name = name;
        this.category = category;
    }

    public setCheck(check:boolean) {
        this.checked = check;
    }

    check() {
        this.checked = !this.checked;
    }
}