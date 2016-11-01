System.register(["angular2/core", "angular2/http", "./rest.service", "../models/user"], function(exports_1, context_1) {
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
    var core_1, http_1, rest_service_1, user_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            UserService = (function () {
                function UserService(http, restService) {
                    this.http = http;
                    this.restService = restService;
                    this.baseUrl = restService.getBaseUrl('user');
                }
                UserService.prototype.createUser = function (user) {
                    return this.restService.post(this.baseUrl, JSON.stringify(user)).map(function (res) { return res.json(); });
                };
                UserService.prototype.editUser = function (user) {
                    return this.restService.put(this.baseUrl + "/" + user.id, JSON.stringify(user)).map(function (res) { return res.json(); });
                };
                UserService.prototype.deleteUser = function (userId) {
                    return this.restService.delete(this.baseUrl + "/" + userId);
                };
                UserService.prototype.getAll = function () {
                    return this.restService.get(this.baseUrl)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (users) {
                        var result = [];
                        if (users) {
                            users.forEach(function (user) {
                                result.push(new user_1.User(user.id, user.name, user.email, user.password, user.roles));
                            });
                        }
                        return result;
                    });
                };
                UserService.prototype.getUser = function (userId) {
                    return this.restService.get(this.baseUrl + '/' + userId)
                        .map(function (res) {
                        return res.json();
                    })
                        .map(function (user) {
                        return new user_1.User(user.id, user.name, user.email, user.password, user.roles);
                    });
                };
                UserService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService])
                ], UserService);
                return UserService;
            }());
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map