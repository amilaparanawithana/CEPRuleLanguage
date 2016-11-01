System.register(["angular2/core", "angular2/router", "../../../services/rest.service", "../../../services/ui/feedback.service", "../../../modules/tables/table.column", "../../../services/ui/audit.table.service", "../../../modules/tables/table.component", "../abstract.component"], function(exports_1, context_1) {
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
    var core_1, router_1, rest_service_1, feedback_service_1, table_column_1, audit_table_service_1, table_component_1, abstract_component_1;
    var AuditListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (rest_service_1_1) {
                rest_service_1 = rest_service_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (table_column_1_1) {
                table_column_1 = table_column_1_1;
            },
            function (audit_table_service_1_1) {
                audit_table_service_1 = audit_table_service_1_1;
            },
            function (table_component_1_1) {
                table_component_1 = table_component_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            AuditListComponent = (function (_super) {
                __extends(AuditListComponent, _super);
                function AuditListComponent(tableService, feedBackService) {
                    _super.call(this);
                    this.tableService = tableService;
                    this.feedBackService = feedBackService;
                    this.headers = [];
                    this.tableService = tableService;
                    this.feedBackService = feedBackService;
                    this.headers.push(new table_column_1.TableColumn('ID', true, 5), new table_column_1.TableColumn('Time', true, 20), new table_column_1.TableColumn('Subject', true, 20), new table_column_1.TableColumn('Type', true, 10), new table_column_1.TableColumn('User', true, 10), new table_column_1.TableColumn('Message', true, 35));
                }
                AuditListComponent = __decorate([
                    core_1.Component({
                        selector: 'audit-list-component',
                        templateUrl: '../../../../resources/template/dashboard/audit/list.html',
                        directives: [router_1.ROUTER_DIRECTIVES, table_component_1.DataTableComponent],
                        providers: [rest_service_1.RestService, audit_table_service_1.AuditTableService]
                    }),
                    __param(1, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [audit_table_service_1.AuditTableService, feedback_service_1.FeedBackService])
                ], AuditListComponent);
                return AuditListComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("AuditListComponent", AuditListComponent);
        }
    }
});
//# sourceMappingURL=audit.list.component.js.map