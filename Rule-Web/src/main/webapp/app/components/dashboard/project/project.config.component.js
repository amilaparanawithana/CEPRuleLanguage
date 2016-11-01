System.register(["angular2/core", "../../../services/project.service", "angular2/router", "../../../models/project", "../../../services/rest.service", "../../../services/cluster.service", "../../../models/deploymentConfig", "../../../services/ui/feedback.service", "../../../modules/alert/alert.service", "../../../modules/alert/alert.component", "../abstract.component", "../../../services/user.service"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var core_1, project_service_1, router_1, project_1, rest_service_1, cluster_service_1, deploymentConfig_1, feedback_service_1, alert_service_1, alert_component_1, abstract_component_1, user_service_1;
    var ProjectConfigComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (project_1_1) {
                project_1 = project_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (cluster_service_1_1) {
                cluster_service_1 = cluster_service_1_1;
            },
            function (deploymentConfig_1_1) {
                deploymentConfig_1 = deploymentConfig_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            },
            function (alert_component_1_1) {
                alert_component_1 = alert_component_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            ProjectConfigComponent = (function (_super) {
                __extends(ProjectConfigComponent, _super);
                function ProjectConfigComponent(projectService, routeParam, feedBackService, alertService, restService, userService, clusterService) {
                    _super.call(this);
                    this.projectService = projectService;
                    this.routeParam = routeParam;
                    this.feedBackService = feedBackService;
                    this.alertService = alertService;
                    this.restService = restService;
                    this.userService = userService;
                    this.clusterService = clusterService;
                    this.project = new project_1.Project();
                    this.allUsers = [];
                    this.newConfigurationType = 0;
                    this.projectId = parseInt(routeParam.get('id'));
                    this.configs = [];
                    this.fetchConfigs();
                    this.addConfig = false;
                    this.portList = "";
                    this.fetchUsers();
                }
                ProjectConfigComponent.prototype.ngAfterViewInit = function () {
                    //this.addDropZone();
                };
                ProjectConfigComponent.prototype.addDropZone = function (force) {
                    var _this = this;
                    if (force === void 0) { force = false; }
                    if (document.getElementById('drop-zone') && typeof Dropzone !== 'undefined') {
                        Dropzone.autoDiscover = false;
                        if (!this.dropZone || force) {
                            console.log('new drop zone');
                            this.dropZone = new Dropzone("#drop-zone", {
                                url: '/no-end',
                                addRemoveLinks: true,
                                autoProcessQueue: false,
                                dictDefaultMessage: "Drop new ultraesb configurations here."
                            });
                        }
                    }
                    else {
                        setTimeout(function () {
                            console.log('retrying to add drop zone');
                            // retry adding drop zone
                            _this.addDropZone(true);
                        }, 1000);
                    }
                };
                ProjectConfigComponent.prototype.fetchClusterObj = function () {
                    var _this = this;
                    this.clusterService.getById(this.project.clusterId).subscribe(function (data) {
                        _this.clusterObj = data;
                    });
                };
                /**
                 * fetches project details from the server
                 */
                ProjectConfigComponent.prototype.fetchProject = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.projectService.getById(this.projectId).subscribe(function (data) {
                        _this.project = data;
                        _this.feedBackService.showPreloader = false;
                        console.log("checking............ user belongs..");
                        console.log(_this.project.users);
                        _this.allUsers.forEach(function (user) {
                            if (_this.project.users.indexOf(user.id) > -1) {
                                user.selected = true;
                                console.log("user belongs..");
                            }
                        });
                        _this.project.users = [];
                        _this.fetchClusterObj();
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ProjectConfigComponent.prototype.deployConfig = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.projectService.deployConfig(this.projectId).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.feedBackService.success = "Successfully deployed the configuration";
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ProjectConfigComponent.prototype.updateUsers = function () {
                    var _this = this;
                    this.allUsers.forEach(function (user) {
                        if (user.selected) {
                            _this.project.users.push(user.id);
                        }
                    });
                    this.feedBackService.showPreloader = true;
                    this.projectService.updateUsers(this.project).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.feedBackService.success = "Successfully updated the groups of the project";
                        //this._router.navigate(['GroupList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                /**
                 * Fetches existing configs for the project
                 */
                ProjectConfigComponent.prototype.fetchConfigs = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.projectService.getConfigurations(this.projectId).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this.configs = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ProjectConfigComponent.prototype.fetchUsers = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.userService.getAll().subscribe(function (data) {
                        _this.allUsers = data;
                        _this.feedBackService.showPreloader = false;
                        _this.fetchProject();
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ProjectConfigComponent.prototype.onConfigSave = function () {
                    // this.feedBackService.showPreloader = true;
                    // var operationsCount = 0;//take the pending operation count
                    // this.configs.forEach((conf)=> {
                    //     if (conf.isNewlyCreated() || conf.isToBeDeleted()) {
                    //         operationsCount++;
                    //     }
                    // });
                    // var operationsCompleted = 0;//keep track of calledback operations
                    // var operationFailed = 0;//keep track of failed operations
                    this.projectService.updateConfiguration(this.configs);
                };
                ProjectConfigComponent.prototype.addNewConfig = function () {
                    var _this = this;
                    if (!this.validatePorts()) {
                        return;
                    }
                    //check for multiple deployment units
                    if (this.newConfigurationType == 0 && this.dropZone.getAcceptedFiles().length > 1) {
                        var alConfig = new alert_component_1.AlertConfiguration("Not allowed", "Uploading multiple deployment units is not allowed since ports are unique for a specific DU.");
                        alConfig.positiveButton = "OK";
                        alConfig.negativeButtonVisible = false;
                        this.alertService.showAlert(alConfig);
                        return;
                    }
                    var acceptedFilesList = this.dropZone.getAcceptedFiles();
                    if (acceptedFilesList != null) {
                        if (!this.validatePath(this.filePath)) {
                            return;
                        }
                    }
                    acceptedFilesList.forEach(function (file) {
                        var newDepConfig = new deploymentConfig_1.DeploymentConfig(-1, file.name, _this.newConfigurationType, _this.filePath, file, 0, _this.projectId, _this.portList.trim(), _this.restService);
                        _this.configs.push(newDepConfig);
                    });
                    this.swapAddConfig();
                    this.dropZone.removeAllFiles();
                };
                ProjectConfigComponent.prototype.validatePath = function (filepath) {
                    if (this.newConfigurationType == deploymentConfig_1.ConfigType.DEPLOYMENT_UNIT) {
                        return true;
                    }
                    if (filepath == null || filepath.length < 1) {
                        this.feedBackService.error = "Configure a correct configuration path";
                        return false;
                    }
                    else {
                        return true;
                    }
                };
                ProjectConfigComponent.prototype.removeConfig = function (depConfig) {
                    var index = this.configs.indexOf(depConfig, 0);
                    if (index != undefined) {
                        if (this.configs[index].state == 0) {
                            this.configs.splice(index, 1);
                        }
                        else {
                            // Detting state deleted on " + this.configs[index].name
                            this.configs[index].setStatus(2);
                        }
                    }
                };
                ProjectConfigComponent.prototype.swapAddConfig = function () {
                    this.addConfig = !this.addConfig;
                    if (this.addConfig) {
                        console.log('adding drop zone called.');
                        this.addDropZone(true);
                    }
                };
                ProjectConfigComponent.prototype.validatePorts = function () {
                    //todo check port conflict within ports
                    if (this.newConfigurationType !== deploymentConfig_1.ConfigType.DEPLOYMENT_UNIT) {
                        return true;
                    }
                    //else if (!this.portList || this.portList.trim() === "") {
                    //    this.feedBackService.error = "Invalid or empty list of opened ports";
                    //    return false;
                    //}
                    var lowerVal = this.clusterObj.portFrom;
                    var upperVal = this.clusterObj.portTo;
                    var portLst = this.portList.trim().split(",");
                    for (var i = 0; i < portLst.length; i++) {
                        try {
                            var intPort = parseInt(portLst[i]);
                            if (lowerVal > intPort || upperVal < intPort) {
                                this.feedBackService.error = "Ports are out of range";
                                return false;
                            }
                        }
                        catch (e) {
                            this.feedBackService.error = "Invalid number in port list";
                            return false;
                        }
                    }
                    return true;
                };
                ProjectConfigComponent.prototype.changeConfigType = function (type) {
                    this.newConfigurationType = parseInt(type);
                };
                ProjectConfigComponent.prototype.getDeploymentUnits = function () {
                    var dus;
                    dus = [];
                    for (var i = 0; i < this.configs.length; i++) {
                        if (this.configs[i].isDeploymentUnit()) {
                            dus.push(this.configs[i]);
                        }
                    }
                    return dus;
                };
                ProjectConfigComponent.prototype.getConfigFiles = function () {
                    var confFiles;
                    confFiles = [];
                    for (var i = 0; i < this.configs.length; i++) {
                        if (this.configs[i].isConfigFile()) {
                            confFiles.push(this.configs[i]);
                        }
                    }
                    return confFiles;
                };
                ProjectConfigComponent.prototype.getLibraries = function () {
                    var libs;
                    libs = [];
                    for (var i = 0; i < this.configs.length; i++) {
                        if (this.configs[i].isLibrary()) {
                            libs.push(this.configs[i]);
                        }
                    }
                    return libs;
                };
                ProjectConfigComponent = __decorate([
                    core_1.Component({
                        selector: 'project-config-component',
                        templateUrl: '../../../../resources/template/dashboard/project/config.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [project_service_1.ProjectService, rest_service_1.RestService, cluster_service_1.ClusterService, user_service_1.UserService]
                    }),
                    __param(2, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(3, core_1.Inject(alert_service_1.AlertService)),
                    __param(4, core_1.Inject(rest_service_1.RestService)), 
                    __metadata('design:paramtypes', [project_service_1.ProjectService, router_1.RouteParams, feedback_service_1.FeedBackService, alert_service_1.AlertService, rest_service_1.RestService, user_service_1.UserService, cluster_service_1.ClusterService])
                ], ProjectConfigComponent);
                return ProjectConfigComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ProjectConfigComponent", ProjectConfigComponent);
        }
    }
});
//# sourceMappingURL=project.config.component.js.map