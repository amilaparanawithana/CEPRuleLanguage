/**
 * @author amila paranawithana
 */
export class Audit {
    id:number;
    auditMessage:string;
    subject:string;
    timestamp:Date;
    type:string;
    username:string;

    constructor(id:number, auditMessage:string, subject:string, timestamp:Date, type:string, username:string) {
        this.id = id;
        this.auditMessage = auditMessage;
        this.subject = subject;
        this.timestamp = timestamp;
        this.type = type;
        this.username = username;
    }
}