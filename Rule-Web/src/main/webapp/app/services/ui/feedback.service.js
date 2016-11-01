System.register(["angular2/core", "angular2/router"], function(exports_1, context_1) {
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
    var core_1, router_1;
    var FeedBackService, Feedback, FeedbackType;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            /**
             * @author chathura widanage
             */
            FeedBackService = (function () {
                function FeedBackService(router) {
                    var _this = this;
                    this.router = router;
                    router.subscribe(function (val) {
                        _this.dismissAll();
                    });
                    this.feedbacks = new Map();
                }
                FeedBackService.prototype.getFeedbacks = function () {
                    var _this = this;
                    var feedbackList = new Array();
                    this.feedbacks.forEach(function (v, k) {
                        if (v.isValid()) {
                            feedbackList.push(v);
                        }
                        else {
                            _this.feedbacks.delete(k);
                        }
                    });
                    return feedbackList;
                };
                FeedBackService.prototype.dismissAll = function () {
                    this.feedbacks = new Map();
                };
                Object.defineProperty(FeedBackService.prototype, "showPreloader", {
                    get: function () {
                        return this._showPreloader;
                    },
                    set: function (value) {
                        this._showPreloader = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                FeedBackService.prototype.addFeedback = function (feedback) {
                    this.feedbacks.set(feedback.getId(), feedback);
                };
                /**
                 * Other components will ue this function to show feedbacks to the user.
                 * @param type type of the feedback
                 * @param message message to be shown
                 * @param selfDestruct whether the feedback should be self destructed
                 * @param selfDestructTime time till self destruct
                 */
                FeedBackService.prototype.showFeedback = function (type, message, selfDestruct, selfDestructTime) {
                    if (selfDestruct === void 0) { selfDestruct = true; }
                    if (selfDestructTime === void 0) { selfDestructTime = 10000; }
                    this.addFeedback(new Feedback(type, message, selfDestruct, selfDestructTime));
                };
                Object.defineProperty(FeedBackService.prototype, "error", {
                    /*
                     * deprecated API
                     * //todo migrate completely to the new API
                     * */
                    set: function (value) {
                        this.addFeedback(new Feedback(FeedbackType.ERROR, value));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FeedBackService.prototype, "success", {
                    set: function (value) {
                        this.addFeedback(new Feedback(FeedbackType.SUCCESS, value));
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(FeedBackService.prototype, "warning", {
                    set: function (value) {
                        this.addFeedback(new Feedback(FeedbackType.WARNING, value));
                    },
                    enumerable: true,
                    configurable: true
                });
                FeedBackService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [router_1.Router])
                ], FeedBackService);
                return FeedBackService;
            }());
            exports_1("FeedBackService", FeedBackService);
            /**
             * A self destructible Feedback
             */
            Feedback = (function () {
                function Feedback(type, message, selfDestruct, selfDestructTime) {
                    var _this = this;
                    if (selfDestruct === void 0) { selfDestruct = true; }
                    if (selfDestructTime === void 0) { selfDestructTime = 10000; }
                    this.type = type;
                    this.message = message;
                    this.id = Math.random().toString(36).substring(7);
                    this.valid = true;
                    if (selfDestruct) {
                        setTimeout(function () {
                            _this.valid = false;
                        }, selfDestructTime);
                    }
                }
                Feedback.prototype.invalidate = function () {
                    this.valid = false;
                };
                Feedback.prototype.getId = function () {
                    return this.id;
                };
                Feedback.prototype.isSuccess = function () {
                    return this.type === FeedbackType.SUCCESS;
                };
                Feedback.prototype.isError = function () {
                    return this.type === FeedbackType.ERROR;
                };
                Feedback.prototype.isWarning = function () {
                    return this.type === FeedbackType.WARNING;
                };
                Feedback.prototype.isValid = function () {
                    return this.valid;
                };
                return Feedback;
            }());
            exports_1("Feedback", Feedback);
            (function (FeedbackType) {
                FeedbackType[FeedbackType["SUCCESS"] = 0] = "SUCCESS";
                FeedbackType[FeedbackType["ERROR"] = 1] = "ERROR";
                FeedbackType[FeedbackType["WARNING"] = 2] = "WARNING";
            })(FeedbackType || (FeedbackType = {}));
            exports_1("FeedbackType", FeedbackType);
        }
    }
});
//# sourceMappingURL=feedback.service.js.map