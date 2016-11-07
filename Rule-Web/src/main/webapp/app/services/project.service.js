System.register(["angular2/core", "angular2/http", "./rest.service", "../providers/jwt.provider", "./user.service"], function(exports_1, context_1) {
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
    var core_1, http_1, rest_service_1, jwt_provider_1, user_service_1;
    var ProjectService, UploadStatus;
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
            function (jwt_provider_1_1) {
                jwt_provider_1 = jwt_provider_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            ProjectService = (function () {
                function ProjectService(http, restService, userService, jwtProvider) {
                    this.http = http;
                    this.restService = restService;
                    this.userService = userService;
                    this.jwtProvider = jwtProvider;
                    this.baseUrl = restService.getBaseUrl('project');
                    this.restService = restService;
                }
                ProjectService.prototype.getById = function (id) {
                };
                /**
                 * Obtains all the projects belongs to the user
                 * @returns {Observable<R>}
                 */
                ProjectService.prototype.getAll = function () {
                };
                ProjectService = __decorate([
                    core_1.Injectable(),
                    __param(1, core_1.Inject(rest_service_1.RestService)),
                    __param(2, core_1.Inject(user_service_1.UserService)), 
                    __metadata('design:paramtypes', [http_1.Http, rest_service_1.RestService, user_service_1.UserService, jwt_provider_1.JwtProvider])
                ], ProjectService);
                return ProjectService;
            }());
            exports_1("ProjectService", ProjectService);
            UploadStatus = (function () {
                function UploadStatus(fileName, successful, msg) {
                    this.fileName = fileName;
                    this.successful = successful;
                    this.msg = msg;
                }
                return UploadStatus;
            }());
            exports_1("UploadStatus", UploadStatus);
        }
    }
});
//# sourceMappingURL=project.service.js.map