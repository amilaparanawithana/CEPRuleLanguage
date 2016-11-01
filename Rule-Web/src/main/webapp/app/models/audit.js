System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Audit;
    return {
        setters:[],
        execute: function() {
            /**
             * @author amila paranawithana
             */
            Audit = (function () {
                function Audit(id, auditMessage, subject, timestamp, type, username) {
                    this.id = id;
                    this.auditMessage = auditMessage;
                    this.subject = subject;
                    this.timestamp = timestamp;
                    this.type = type;
                    this.username = username;
                }
                return Audit;
            }());
            exports_1("Audit", Audit);
        }
    }
});
//# sourceMappingURL=audit.js.map