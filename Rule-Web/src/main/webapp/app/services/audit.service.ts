/**
 * @author amila paranawithana
 */
import {Injectable, Inject} from "angular2/core";
import {RestService} from "./rest.service";
import {Audit} from "../models/audit";

@Injectable()
export class AuditService {
    baseUrl:string;

    constructor(@Inject(RestService)
                private restService:RestService) {
        this.baseUrl = restService.getBaseUrl('auditlog');
    }

    getAll() {
        return this.restService.get(this.baseUrl)
            .map(res=> {
                return res.json();
            })
            .map((audits:Array<any>)=> {
                let result:Array<Audit> = [];
                if (audits) {
                    audits.forEach((audit)=> {

                        result.push(new Audit(audit.id, audit.auditMessage, audit.subject, audit.timestamp, audit.type, audit.username));
                    })
                }
                return result;
            });
    }
}