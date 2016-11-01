/**
 * @author Amila Paranawithana
 */
export class Datasource {

    id:string;
    poolName:string;
    url:string;
    driverClass:string;
    maximumConnections:number;
    minimumConnections:number;
    initialConnections:number;
    maxWaitMillis:number;
    refreshIntervalMillis:number;
    maxConnectionIdleMillis:number;
    maxReuseAllowed:number;
    validationQuery:string;
    validationTimeoutSeconds:number;

    //statistics view parameters
    poolStatus:string;
    numTotal:number;
    numActive:number;
    numAvailable:number;
    waitQueueLength:number;
    numCreated:number;
    numDestroyed:number;
    numValidated:number;
    numValidationFailed:number;
    numFailedRequests:number;
    createdTime:Date;
    lastConnectionCreatedTime:Date;

    // aggregations
    averageUsage:number;
    highestUsageMillis:number;
    longestOpenMillis:number;
    averageConnectionLife:number;

    constructor(id:string= null, poolName:string= null, url:string= null, driverClass:string= null, maximumConnections:number, minimumConnections:number,
                initialConnections:number, maxWaitMillis:number, refreshIntervalMillis:number, maxConnectionIdleMillis:number,
                maxReuseAllowed:number, validationQuery:string, validationTimeoutSeconds:number,
                poolStatus:string= null, numTotal:number= null, numActive:number, numAvailable:number, waitQueueLength:number,
                numCreated:number= null, numDestroyed:number= null, numValidated:number= null, numValidationFailed:number= null,
                numFailedRequests:number= null, createdTime:number= null, averageUsage:number= null, highestUsageMillis:number= null,
                longestOpenMillis:number= null,lastConnectionCreatedTime:number= null,averageConnectionLife:number=null) {

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
}