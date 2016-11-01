System.register(["../services/multipart/multipart-uploader", "../providers/jwt.provider", "../services/multipart/multipart-item"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var multipart_uploader_1, jwt_provider_1, multipart_item_1;
    var DeploymentConfig, ConfigType;
    return {
        setters:[
            function (multipart_uploader_1_1) {
                multipart_uploader_1 = multipart_uploader_1_1;
            },
            function (jwt_provider_1_1) {
                jwt_provider_1 = jwt_provider_1_1;
            },
            function (multipart_item_1_1) {
                multipart_item_1 = multipart_item_1_1;
            }],
        execute: function() {
            /**
             * This class will communicate with backend as a standalone service to perform
             * necessary actions according to the status set by the user. This will automatically retry
             * finite times on failure before it report as a failure.
             *
             * @author Dimuthu Upeksha
             * @author Chathura Widanage
             *
             */
            DeploymentConfig = (function () {
                function DeploymentConfig(id, name, confType, url, file, state, projectId, ports, restService) {
                    if (id === void 0) { id = null; }
                    if (name === void 0) { name = null; }
                    if (confType === void 0) { confType = null; }
                    if (url === void 0) { url = null; }
                    if (file === void 0) { file = null; }
                    if (state === void 0) { state = 0; }
                    if (projectId === void 0) { projectId = -1; }
                    if (ports === void 0) { ports = null; }
                    this.restService = restService;
                    this.confType = ConfigType.DEPLOYMENT_UNIT;
                    this.error = 0; //0= no error,1 = failed to upload, 2=failed to delete
                    this.processing = false; //indicate whether this Config is on process.
                    //this will
                    this.retries = 0;
                    this.id = id;
                    this.name = name;
                    this.confType = confType;
                    this.url = url;
                    this.file = file;
                    this.state = state;
                    this.projectId = projectId;
                    this.ports = ports;
                }
                DeploymentConfig.prototype.isNewlyCreated = function () {
                    return this.state === 0;
                };
                DeploymentConfig.prototype.isToBeDeleted = function () {
                    return this.state === 2;
                };
                DeploymentConfig.prototype.isDeleted = function () {
                    return this.state === 3;
                };
                DeploymentConfig.prototype.isProcessing = function () {
                    return this.processing;
                };
                DeploymentConfig.prototype.getStatus = function () {
                    switch (this.state) {
                        case 0:
                            return "Not Saved";
                        case 1:
                            return "Saved";
                        case 2:
                            return "To be deleted";
                        case 3:
                            return "Deleted";
                    }
                };
                DeploymentConfig.prototype.hasError = function () {
                    return this.error !== 0;
                };
                DeploymentConfig.prototype.getError = function () {
                    switch (this.error) {
                        case 1:
                            return "Failed to upload";
                        case 2:
                            return "Failed to delete";
                    }
                };
                DeploymentConfig.prototype.setStatus = function (state) {
                    this.state = state;
                };
                DeploymentConfig.prototype.setConfTypeFromString = function (conf) {
                    if ("CONFIG_FILE" === conf) {
                        this.confType = ConfigType.CONFIGURATION_FILE;
                    }
                    else if ("DEPLOYMENT_UNIT" === conf) {
                        this.confType = ConfigType.DEPLOYMENT_UNIT;
                    }
                    else if ("LIBRARY" === conf) {
                        this.confType = ConfigType.LIBRARY;
                    }
                };
                DeploymentConfig.prototype.isConfigFile = function () {
                    if (this.confType === ConfigType.CONFIGURATION_FILE) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                DeploymentConfig.prototype.isLibrary = function () {
                    if (this.confType === ConfigType.LIBRARY) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                DeploymentConfig.prototype.isDeploymentUnit = function () {
                    if (this.confType === ConfigType.DEPLOYMENT_UNIT) {
                        return true;
                    }
                    else {
                        return false;
                    }
                };
                DeploymentConfig.prototype.getConfLabel = function () {
                    switch (this.confType) {
                        case ConfigType.DEPLOYMENT_UNIT:
                        case 0:
                            return "Deployment Unit";
                        case ConfigType.CONFIGURATION_FILE:
                        case 1:
                            return "Configuration";
                        case ConfigType.LIBRARY:
                        case 2:
                            return "Library";
                        default:
                            return "";
                    }
                };
                /**
                 * check the status and communicate with the backend to perform the required operations.
                 */
                DeploymentConfig.prototype.refresh = function () {
                    var _this = this;
                    switch (this.state) {
                        case 0:
                            {
                                var uploader = new multipart_uploader_1.MultipartUploader({
                                    url: this.restService.getBaseUrl("deploymentConf/upload"),
                                    authToken: jwt_provider_1.JwtProvider.getToken()
                                });
                                var multipartItem = new multipart_item_1.MultipartItem(uploader);
                                if (multipartItem == null) {
                                    multipartItem = new multipart_item_1.MultipartItem(uploader);
                                }
                                if (multipartItem.formData == null)
                                    multipartItem.formData = new FormData();
                                multipartItem.formData.append("file", this.file);
                                multipartItem.formData.append("name", this.name);
                                multipartItem.formData.append("url", this.url);
                                multipartItem.formData.append("type", this.confType);
                                multipartItem.formData.append("projectId", this.projectId);
                                multipartItem.formData.append("portList", this.ports);
                                // multipartItem.formData.append("index", i);
                                multipartItem.onSuccess = function (response, status, headers) {
                                    try {
                                        _this.id = parseInt(JSON.parse(response).id);
                                    }
                                    catch (e) {
                                        console.log(response);
                                    }
                                    _this.state = 1;
                                    _this.error = 0;
                                    _this.processing = false;
                                };
                                multipartItem.onError = function (response, status, headers) {
                                    if (!_this.retry()) {
                                        _this.error = 1;
                                    }
                                };
                                multipartItem.callback = function (data) {
                                    //to prevent undefined error, we have to keep this function
                                };
                                //mark as processing
                                this.processing = true;
                                multipartItem.upload();
                                break;
                            }
                        case 2:
                            {
                                if (this.id > 0) {
                                    this.processing = true;
                                    this.restService.delete(this.restService.getResourceUrl("deploymentConf", this.id))
                                        .subscribe(function (data) {
                                        _this.state = 3;
                                        _this.error = 0;
                                        _this.processing = false;
                                    }, function (err) {
                                        if (!_this.retry()) {
                                            _this.error = 2;
                                        }
                                    });
                                }
                                else {
                                    this.state = 3;
                                    this.error = 0;
                                    this.processing = false;
                                }
                                break;
                            }
                    }
                };
                DeploymentConfig.prototype.retry = function () {
                    if (this.retries < 5) {
                        console.log('retrying...');
                        this.retries++;
                        this.refresh();
                        return true;
                    }
                    this.processing = false;
                    return false;
                };
                return DeploymentConfig;
            }());
            exports_1("DeploymentConfig", DeploymentConfig);
            (function (ConfigType) {
                ConfigType[ConfigType["DEPLOYMENT_UNIT"] = 0] = "DEPLOYMENT_UNIT";
                ConfigType[ConfigType["CONFIGURATION_FILE"] = 1] = "CONFIGURATION_FILE";
                ConfigType[ConfigType["LIBRARY"] = 2] = "LIBRARY";
            })(ConfigType || (ConfigType = {}));
            exports_1("ConfigType", ConfigType);
        }
    }
});
//# sourceMappingURL=deploymentConfig.js.map