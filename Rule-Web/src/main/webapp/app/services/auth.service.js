System.register(["angular2/core", "angular2/http", "../providers/jwt.provider", "./util.service", "rxjs/add/operator/map"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, http_1, jwt_provider_1, util_service_1;
    var AuthService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (jwt_provider_1_1) {
                jwt_provider_1 = jwt_provider_1_1;
            },
            function (util_service_1_1) {
                util_service_1 = util_service_1_1;
            },
            function (_1) {}],
        execute: function() {
            AuthService = (function () {
                function AuthService(http, jwtProvider, utilService) {
                    this.http = http;
                    this.jwtProvider = jwtProvider;
                    this.utilService = utilService;
                    this.baseUrl = this.utilService.getBaseUrl("auth");
                }
                AuthService.prototype.login = function (auth) {
                    return this.http.post(this.baseUrl, JSON.stringify(auth), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    }).map(function (res) {
                        return res.json();
                    });
                };
                /**
                 * Whether user is authorized to access the dashboard or other UI components
                 * @returns {undefined}
                 */
                AuthService.isAuthorized = function () {
                    return jwt_provider_1.JwtProvider.hasToken();
                };
                /**
                 * logs out the user from the app. ie. deletes the token.
                 */
                AuthService.logout = function () {
                    jwt_provider_1.JwtProvider.removeToken();
                    window.location.assign("#/auth/login");
                    window.location.reload();
                };
                AuthService.prototype.register = function (tenant) {
                    return this.http.post(this.baseUrl + "/" + "register", JSON.stringify(tenant), {
                        headers: new http_1.Headers({
                            'Content-Type': 'application/json'
                        })
                    });
                };
                AuthService = __decorate([
                    core_1.Injectable(),
                    __param(2, core_1.Inject(util_service_1.UtilService)), 
                    __metadata('design:paramtypes', [http_1.Http, jwt_provider_1.JwtProvider, util_service_1.UtilService])
                ], AuthService);
                return AuthService;
            }());
            exports_1("AuthService", AuthService);
        }
    }
});
//# sourceMappingURL=auth.service.js.map