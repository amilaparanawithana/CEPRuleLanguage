System.register(["angular2/core", "angular2/router", "../../../services/permission.service", "../../../services/ui/feedback.service", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, router_1, permission_service_1, feedback_service_1, abstract_component_1;
    var PermissionListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (permission_service_1_1) {
                permission_service_1 = permission_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            PermissionListComponent = (function (_super) {
                __extends(PermissionListComponent, _super);
                function PermissionListComponent(permissionService, feedBackService) {
                    var _this = this;
                    _super.call(this);
                    this.feedBackService = feedBackService;
                    permissionService.getAll().subscribe(function (data) {
                        _this.permissions = data;
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedBackService, err);
                    });
                }
                PermissionListComponent = __decorate([
                    core_1.Component({
                        selector: 'permission-component',
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    __param(1, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [permission_service_1.PermissionService, feedback_service_1.FeedBackService])
                ], PermissionListComponent);
                return PermissionListComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("PermissionListComponent", PermissionListComponent);
        }
    }
});
//# sourceMappingURL=permission.list.component.js.map