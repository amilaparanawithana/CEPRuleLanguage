System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TroubleshootTask;
    return {
        setters:[],
        execute: function() {
            /**
             *@author Sajith Dilshan
             */
            TroubleshootTask = (function () {
                function TroubleshootTask(id, name, description, intensive, maskable, params) {
                    this._parameters = {};
                    this._id = id;
                    this._description = description;
                    this._name = name;
                    this._maskable = maskable;
                    this._intensive = intensive;
                    this._parameters = params;
                    this._divId = this.setTaskId(this._id);
                }
                Object.defineProperty(TroubleshootTask.prototype, "id", {
                    get: function () {
                        return this._id;
                    },
                    set: function (value) {
                        this._id = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TroubleshootTask.prototype, "description", {
                    get: function () {
                        return this._description;
                    },
                    set: function (value) {
                        this._description = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TroubleshootTask.prototype, "name", {
                    get: function () {
                        return this._name;
                    },
                    set: function (value) {
                        this._name = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TroubleshootTask.prototype, "intensive", {
                    get: function () {
                        return this._intensive;
                    },
                    set: function (value) {
                        this._intensive = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TroubleshootTask.prototype, "maskable", {
                    get: function () {
                        return this._maskable;
                    },
                    set: function (value) {
                        this._maskable = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TroubleshootTask.prototype, "parameters", {
                    get: function () {
                        return this._parameters;
                    },
                    set: function (value) {
                        this._parameters = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(TroubleshootTask.prototype, "divId", {
                    get: function () {
                        return this._divId;
                    },
                    set: function (value) {
                        this._divId = value;
                    },
                    enumerable: true,
                    configurable: true
                });
                TroubleshootTask.prototype.setTaskId = function (taskId) {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
                    for (var i = 0; i < 5; i++)
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return text + ":" + taskId;
                };
                return TroubleshootTask;
            }());
            exports_1("TroubleshootTask", TroubleshootTask);
        }
    }
});
//# sourceMappingURL=TroubleshootTask.js.map