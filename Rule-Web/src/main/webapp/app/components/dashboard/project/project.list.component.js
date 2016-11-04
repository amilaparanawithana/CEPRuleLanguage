System.register(["angular2/core", "../../../services/project.service", "angular2/router", "../../../services/rest.service", "../../../services/user.service", "../../../services/ui/feedback.service", "../../../modules/alert/alert.service", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, project_service_1, router_1, rest_service_1, user_service_1, feedback_service_1, alert_service_1, abstract_component_1;
    var ProjectListComponent;
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
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (alert_service_1_1) {
                alert_service_1 = alert_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            ProjectListComponent = (function (_super) {
                __extends(ProjectListComponent, _super);
                function ProjectListComponent(projectService, feedBackService, alertService) {
                    _super.call(this);
                    this.projectService = projectService;
                    this.feedBackService = feedBackService;
                    this.alertService = alertService;
                }
                ProjectListComponent = __decorate([
                    core_1.Component({
                        selector: 'project-list-component',
                        templateUrl: '../../../../resources/template/dashboard/project/list.html',
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [project_service_1.ProjectService, rest_service_1.RestService, user_service_1.UserService]
                    }),
                    __param(1, core_1.Inject(feedback_service_1.FeedBackService)),
                    __param(2, core_1.Inject(alert_service_1.AlertService)), 
                    __metadata('design:paramtypes', [project_service_1.ProjectService, feedback_service_1.FeedBackService, alert_service_1.AlertService])
                ], ProjectListComponent);
                return ProjectListComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("ProjectListComponent", ProjectListComponent);
        }
    }
});
//# sourceMappingURL=project.list.component.js.map