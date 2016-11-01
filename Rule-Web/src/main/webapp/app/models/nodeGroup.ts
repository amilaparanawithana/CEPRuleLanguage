/**
 * @author: dimuthu
 */
export class NodeGroup {
    id:number;
    name:string;
    description:string;
    hostnames:Array<string>;
    type:string;
    public selected:boolean;
    
    constructor(id:number = null, name:string = null, description:string = null, hostnames:Array<string> = [], type:string = null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.hostnames = hostnames;
        this.type = type;
    }

    check() {
        this.selected = !this.selected;
    }
}