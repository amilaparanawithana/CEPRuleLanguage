System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var TroubleshootLaunch;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Sajith Dilshan
             */
            TroubleshootLaunch = (function () {
                function TroubleshootLaunch(filePath, credentialMask, credentialPassword, keyFactoryName, cipherName) {
                    this.filePath = filePath;
                    this.credentialMask = credentialMask;
                    this.credentialPassword = credentialPassword;
                    this.keyFactoryName = keyFactoryName;
                    this.cipherName = cipherName;
                }
                return TroubleshootLaunch;
            }());
            exports_1("TroubleshootLaunch", TroubleshootLaunch);
        }
    }
});
//# sourceMappingURL=TroubleshootLaunch.js.map