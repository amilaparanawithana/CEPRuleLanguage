/**
 * @author Amila Karunathilaka
 */
export class Endpoint {
    port:number;
    type:string;
    endpoints:Array<string>;


    constructor(port:number, type:string, endpoints:Array<string>) {
        this.port = port;
        this.type = type;
        this.endpoints = endpoints;
    }
}