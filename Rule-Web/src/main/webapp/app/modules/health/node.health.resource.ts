/**
 * @author amila karunathilaka
 */
export class NodeHealthResource {
    externalID:string;
    nodeData = [];

    constructor(externalID:string, nodeData:Array<any>) {
        this.externalID = externalID;
        this.nodeData = nodeData;
    }
}