System.register(["angular2/core"], function(exports_1, context_1) {
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
    var core_1;
    var UtilService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UtilService = (function () {
                function UtilService() {
                    this.PREFIX = "/rest/";
                }
                /**
                 * This function builds the url that is corresponding to the REST controller of the
                 * provided model
                 * @param model
                 * @returns {string}
                 */
                UtilService.prototype.getBaseUrl = function (model) {
                    return this.PREFIX +
                        model;
                };
                /**
                 * This function builds the url that can be used to access a specific object a
                 * provided model
                 * @param model
                 * @param resource
                 * @returns {string}
                 */
                UtilService.prototype.getResourceUrl = function (model, resource) {
                    return this.PREFIX +
                        model +
                        "/" +
                        resource;
                };
                UtilService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], UtilService);
                return UtilService;
            }());
            exports_1("UtilService", UtilService);
        }
    }
});
//# sourceMappingURL=util.service.js.map