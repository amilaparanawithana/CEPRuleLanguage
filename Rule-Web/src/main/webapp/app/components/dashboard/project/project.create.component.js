System.register(["angular2/core", "angular2/router", "../../../services/ui.service", "../../../models/project", "../../../services/cluster.service", "../../../services/rest.service", "../../../services/project.service", "../../../services/ui/feedback.service", "../abstract.component", "../../../services/user.service"], function(exports_1, context_1) {
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
    var core_1, router_1, ui_service_1, project_1, cluster_service_1, rest_service_1, project_service_1, feedback_service_1, abstract_component_1, user_service_1;
    var ProjectCreateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (ui_service_1_1) {
                ui_service_1 = ui_service_1_1;
            },
            function (project_1_1) {
                project_1 = project_1_1;
            },
            function (cluster_service_1_1) {
                cluster_service_1 = cluster_service_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (project_service_1_1) {
                project_service_1 = project_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            ProjectCreateComponent = (function (_super) {
                __extends(ProjectCreateComponent, _super);
                function ProjectCreateComponent(uiService, clusterService, userService, projectService, feedBackService, _router) {
                    _super.call(this);
                    this.uiService = uiService;
                    this.clusterService = clusterService;
                    this.userService = userService;
                    this.projectService = projectService;
                    this.feedBackService = feedBackService;
                    this._router = _router;
                    this.project = new project_1.Project();
                    this.errorMsg = null;
                    this.successMsg = null;
                    this.loadClusters();
                    this.loadUsers();
                }
                ProjectCreateComponent.prototype.loadClusters = function () {
                    var _this = this;
                    console.log("loading clusters..");
                    this.feedBackService.showPreloader = true;
                    this.clusterService.getAllClusters().subscribe(function (data) {
                        _this.clusters = data;
                        //Initial selected value
                        if (_this.clusters != null && _this.clusters.length > 0) {
                            _this.project.clusterId = _this.clusters[0].id;
                        }
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ProjectCreateComponent.prototype.onSubmit = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.users.forEach(function (user) {
                        if (user.selected) {
                            _this.project.users.push(user.id);
                        }
                    });
                    this.projectService.createProject(this.project).subscribe(function (data) {
                        _this.feedBackService.showPreloader = false;
                        _this._router.navigate(['ProjectList']);
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                };
                ProjectCreateComponent.prototype.loadUsers = function () {
                    var _this = this;
                    this.feedBackService.showPreloader = true;
                    this.userService.getAll().subscribe(function (data) {
                        _this.users = data;
                        _this.feedBackService.showPreloader = false;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                    console.log(this.users);
                };
                /**
                 * A temp fix till angular2 fix the bug of <select>
                 * @param cId
                 */
                ProjectCreateComponent.prototype.setClusterId = function (cId) {
                    this.project.clusterId = parseInt(cId);
                };
                ProjectCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'project-create-component',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        templateUrl: '../../../../resources/template/dashboard/project/create.html',
                        providers: [ui_service_1.UIService, cluster_service_1.ClusterService, rest_service_1.RestService, project_service_1.ProjectService, user_service_1.UserService],
                        styleUrls: [
                            "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css"
                        ]
                    }),
                    __param(4, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [ui_service_1.UIService, cluster_service_1.ClusterService, user_service_1.UserService, project_service_1.ProjectService, feedback_service_1.FeedBackService, router_1.Router])
                ], ProjectCreateComponent);
                return ProjectCreateComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ProjectCreateComponent", ProjectCreateComponent);
        }
    }
});
//# sourceMappingURL=project.create.component.js.map