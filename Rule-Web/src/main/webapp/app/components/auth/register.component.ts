/**
 * @author Amila Paranawithana
 */

import {Component} from "angular2/core";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {Tenant} from "../../models/tenant";
import {TenantService} from "../../services/tenant.service";
import {RestService} from "../../services/rest.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user";
@Component({
    selector: 'register-component',
    templateUrl: '../../../resources/template/auth/register.html',
    directives: [ROUTER_DIRECTIVES],
    providers: [RestService,AuthService]
})


export class RegisterComponent {
    tenant = new Tenant();
    tenantAdmin = new User();
    errorMsg = null;

    constructor(private authService:AuthService) {
    }

    doRegister() {
        console.log("came to register........");
        this.tenant.admin = this.tenantAdmin;
        console.log(this.tenant);

        var response = this.authService.register(this.tenant);
        response.subscribe(
            data => console.log(data),
            err => console.log(err),
            () => console.log('Tenant Created')
        );
        window.location.assign("#/auth/login");
        window.location.reload();

    }

    dismissError() {
        this.errorMsg = null;
    }
}