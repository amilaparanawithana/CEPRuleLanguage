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
    var JwtProvider;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            JwtProvider = (function () {
                function JwtProvider() {
                }
                /**
                 * removes token from the browser storage. i.e logs out user.
                 */
                JwtProvider.removeToken = function () {
                    localStorage.removeItem('token');
                    localStorage.removeItem('username');
                };
                /**
                 * returns whether browser has a token in it's storage
                 */
                JwtProvider.hasToken = function () {
                    return JwtProvider.getToken() != null;
                };
                /**
                 * Saves the token to the browser storage
                 * @param token
                 */
                JwtProvider.saveToken = function (token) {
                    localStorage.setItem('token', token);
                };
                JwtProvider.saveUserName = function (username) {
                    localStorage.setItem('username', username);
                };
                JwtProvider.getUserName = function () {
                    return localStorage.getItem('username');
                };
                /**
                 * returns the token
                 * @returns {any}
                 */
                JwtProvider.getToken = function () {
                    return localStorage.getItem('token');
                };
                JwtProvider = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], JwtProvider);
                return JwtProvider;
            }());
            exports_1("JwtProvider", JwtProvider);
        }
    }
});
//# sourceMappingURL=jwt.provider.js.map