/**
 *@author Sajith Dilshan
 */
export class TroubleshootTask {
    private _id:string;
    private _divId:string;
    private _description:string;
    private _name:string;
    private _intensive:boolean;
    private _maskable:boolean;
    private _parameters:any = {};

    constructor(id:string, name:string, description:string, intensive:boolean, maskable:boolean, params:any) {
        this._id = id;
        this._description = description;
        this._name = name;
        this._maskable = maskable;
        this._intensive = intensive;
        this._parameters = params;
        this._divId = this.setTaskId(this._id);
    }

    get id():string {
        return this._id;
    }

    set id(value:string) {
        this._id = value;
    }

    get description():string {
        return this._description;
    }

    set description(value:string) {
        this._description = value;
    }

    get name():string {
        return this._name;
    }

    set name(value:string) {
        this._name = value;
    }

    get intensive():boolean {
        return this._intensive;
    }

    set intensive(value:boolean) {
        this._intensive = value;
    }

    get maskable():boolean {
        return this._maskable;
    }

    set maskable(value:boolean) {
        this._maskable = value;
    }

    get parameters() {
        return this._parameters;
    }

    set parameters(value:Array<string>) {
        this._parameters = value;
    }


    get divId():string {
        return this._divId;
    }

    set divId(value:string) {
        this._divId = value;
    }

    private setTaskId(taskId:string) {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        for( var i=0; i < 5; i++ )
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text + ":" + taskId;
    }
}