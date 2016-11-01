/**
 * @author Amila Paranawithana
 */
import {Injectable, Inject} from "angular2/core";
import {Http} from "angular2/http";
import {RestService} from "./rest.service";
import {Role} from "../models/role";
import {ServicePackage} from "../models/ServicePackage";
@Injectable()
export class ServicePackageService {
    private baseUrl;

    constructor(private http:Http, @Inject(RestService)
    private restService:RestService) {
        this.baseUrl = restService.getBaseUrl('servicepackage');
    }

    create(servicePackage:ServicePackage) {
        return this.restService.post(this.baseUrl, JSON.stringify(servicePackage)).map(res=>res.json());
    }

    edit(servicePackage:ServicePackage) {
        return this.restService.put(this.baseUrl + "/" + servicePackage.id, JSON.stringify(servicePackage)).map(res=>res.json());
    }

    deletePackage(packageId:number) {
        return this.restService.delete(this.baseUrl + "/" + packageId);
    }

    getAll() {
        return this.restService.get(this.baseUrl)
            .map(res=> {
                return res.json();
            })
            .map((servicePackages:Array<any>)=> {
                let result:Array<ServicePackage> = [];
                if (servicePackages) {
                    servicePackages.forEach((servicePackage)=> {
                        result.push(new ServicePackage(servicePackage.id, servicePackage.name,servicePackage.maxReplication));
                    })
                }
                return result;
            });
    }

    getServicePackage(packageId:number) {
        return this.restService.get(this.baseUrl + '/' + packageId)
            .map(res => {
                return res.json();
            })
            .map(servicePackage => {
                return new ServicePackage(servicePackage.id, servicePackage.name, servicePackage.maxReplication, servicePackage.packageLevel)
            });
    }
}