System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Datasource;
    return {
        setters:[],
        execute: function() {
            /**
             * @author Amila Paranawithana
             */
            Datasource = (function () {
                function Datasource(id, poolName, url, driverClass, maximumConnections, minimumConnections, initialConnections, maxWaitMillis, refreshIntervalMillis, maxConnectionIdleMillis, maxReuseAllowed, validationQuery, validationTimeoutSeconds, poolStatus, numTotal, numActive, numAvailable, waitQueueLength, numCreated, numDestroyed, numValidated, numValidationFailed, numFailedRequests, createdTime, averageUsage, highestUsageMillis, longestOpenMillis, lastConnectionCreatedTime, averageConnectionLife) {
                    if (id === void 0) { id = null; }
                    if (poolName === void 0) { poolName = null; }
                    if (url === void 0) { url = null; }
                    if (driverClass === void 0) { driverClass = null; }
                    if (poolStatus === void 0) { poolStatus = null; }
                    if (numTotal === void 0) { numTotal = null; }
                    if (numCreated === void 0) { numCreated = null; }
                    if (numDestroyed === void 0) { numDestroyed = null; }
                    if (numValidated === void 0) { numValidated = null; }
                    if (numValidationFailed === void 0) { numValidationFailed = null; }
                    if (numFailedRequests === void 0) { numFailedRequests = null; }
                    if (createdTime === void 0) { createdTime = null; }
                    if (averageUsage === void 0) { averageUsage = null; }
                    if (highestUsageMillis === void 0) { highestUsageMillis = null; }
                    if (longestOpenMillis === void 0) { longestOpenMillis = null; }
                    if (lastConnectionCreatedTime === void 0) { lastConnectionCreatedTime = null; }
                    if (averageConnectionLife === void 0) { averageConnectionLife = null; }
                    this.id = id;
                    this.poolName = poolName;
                    this.url = url;
                    this.driverClass = driverClass;
                    this.maximumConnections = maximumConnections;
                    this.minimumConnections = minimumConnections;
                    this.initialConnections = initialConnections;
                    this.maxWaitMillis = maxWaitMillis;
                    this.refreshIntervalMillis = refreshIntervalMillis;
                    this.maxConnectionIdleMillis = maxConnectionIdleMillis;
                    this.maxReuseAllowed = maxReuseAllowed;
                    this.validationQuery = validationQuery;
                    this.validationTimeoutSeconds = validationTimeoutSeconds;
                    this.poolStatus = poolStatus;
                    this.numTotal = numTotal;
                    this.numActive = numActive;
                    this.numAvailable = numAvailable;
                    this.waitQueueLength = waitQueueLength;
                    this.numCreated = numCreated;
                    this.numDestroyed = numDestroyed;
                    this.numValidated = numValidated;
                    this.numValidationFailed = numValidationFailed;
                    this.numFailedRequests = numFailedRequests;
                    this.createdTime = new Date(createdTime);
                    this.lastConnectionCreatedTime = new Date(lastConnectionCreatedTime);
                    this.averageUsage = averageUsage;
                    this.highestUsageMillis = highestUsageMillis;
                    this.longestOpenMillis = longestOpenMillis;
                    this.averageConnectionLife = averageConnectionLife;
                }
                return Datasource;
            }());
            exports_1("Datasource", Datasource);
        }
    }
});
//# sourceMappingURL=datasource.js.map