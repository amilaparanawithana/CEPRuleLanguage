System.register(["angular2/core", "angular2/http", "../providers/jwt.provider", "./auth.service", "./util.service"], function(exports_1, context_1) {
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
    var core_1, http_1, jwt_provider_1, auth_service_1, util_service_1;
    var RestService;
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
            function (auth_service_1_1) {
                auth_service_1 = auth_service_1_1;
            },
            function (util_service_1_1) {
                util_service_1 = util_service_1_1;
            }],
        execute: function() {
            RestService = (function () {
                function RestService(http, jwtProvider, authService, utilService) {
                    this.http = http;
                    this.jwtProvider = jwtProvider;
                    this.authService = authService;
                    this.utilService = utilService;
                }
                RestService.prototype.getBaseUrl = function (model) {
                    return this.utilService.getBaseUrl(model);
                };
                RestService.prototype.getResourceUrl = function (model, resource) {
                    return this.utilService.getResourceUrl(model, resource);
                };
                RestService.prototype.get = function (url, headers) {
                    var _this = this;
                    if (headers === void 0) { headers = new http_1.Headers(); }
                    this.createHeader(headers);
                    return this.http.get(url, {
                        headers: headers
                    }).map(function (res) {
                        return _this.checkIfAuthorized(res);
                    });
                };
                RestService.prototype.post = function (url, body, headers) {
                    var _this = this;
                    if (headers === void 0) { headers = new http_1.Headers(); }
                    this.createHeader(headers);
                    return this.http.post(url, body, {
                        headers: headers
                    }).map(function (res) {
                        return _this.checkIfAuthorized(res);
                    });
                };
                RestService.prototype.put = function (url, body, headers) {
                    var _this = this;
                    if (headers === void 0) { headers = new http_1.Headers(); }
                    this.createHeader(headers);
                    return this.http.put(url, body, {
                        headers: headers
                    }).map(function (res) {
                        return _this.checkIfAuthorized(res);
                    });
                };
                RestService.prototype.delete = function (url, headers) {
                    var _this = this;
                    if (headers === void 0) { headers = new http_1.Headers(); }
                    this.createHeader(headers);
                    return this.http.delete(url, {
                        headers: headers
                    }).map(function (res) {
                        return _this.checkIfAuthorized(res);
                    });
                };
                RestService.prototype.createHeader = function (headers) {
                    if (!headers.has("Content-Type")) {
                        headers.append("Content-Type", "application/json");
                    }
                    headers.append("Authorization", jwt_provider_1.JwtProvider.getToken());
                };
                RestService.prototype.checkIfAuthorized = function (res) {
                    if (res.json().msg == "Unauthorized") {
                        auth_service_1.AuthService.logout();
                    }
                    else {
                        return res;
                    }
                };
                RestService = __decorate([
                    core_1.Injectable(),
                    __param(3, core_1.Inject(util_service_1.UtilService)), 
                    __metadata('design:paramtypes', [http_1.Http, jwt_provider_1.JwtProvider, auth_service_1.AuthService, util_service_1.UtilService])
                ], RestService);
                return RestService;
            }());
            exports_1("RestService", RestService);
        }
    }
});
//# sourceMappingURL=rest.service.js.map