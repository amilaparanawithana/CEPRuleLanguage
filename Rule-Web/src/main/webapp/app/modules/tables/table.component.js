System.register(["angular2/core", "./generic.table.service", "./table.column", "../../services/ui/feedback.service", "../../components/dashboard/abstract.component"], function(exports_1, context_1) {
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
    var core_1, generic_table_service_1, table_column_1, feedback_service_1, abstract_component_1;
    var DataTableComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (generic_table_service_1_1) {
                generic_table_service_1 = generic_table_service_1_1;
            },
            function (table_column_1_1) {
                table_column_1 = table_column_1_1;
            },
            function (feedback_service_1_1) {
                feedback_service_1 = feedback_service_1_1;
            },
            function (abstract_component_1_1) {
                abstract_component_1 = abstract_component_1_1;
            }],
        execute: function() {
            DataTableComponent = (function (_super) {
                __extends(DataTableComponent, _super);
                function DataTableComponent(feedbackService) {
                    _super.call(this);
                    this.feedbackService = feedbackService;
                    this.columns = [];
                    this.dataRows = [];
                    this.keyword = "";
                    this.rows = 0; //total rows
                    this.rowsPerPage = 25; //visible rows per page
                    this.currentPage = 0;
                    this.sortAscending = true;
                    this.sortColumn = 0;
                    //ui
                    this.totalWidth = 1; //total relative width sum
                    this.additionalParams = new Map();
                }
                /**
                 * Sets additional parameters to send with every future request. Calling this method will immediately update the current data
                 * set of the table.
                 * @param params
                 */
                DataTableComponent.prototype.setAdditionalParams = function (params) {
                    if (params == undefined || params == null) {
                        return;
                    }
                    this.additionalParams = params;
                    this.update(true);
                };
                /**
                 * Will reset the additional parameters and immediately update the current data set.
                 */
                DataTableComponent.prototype.resetAdditionalParams = function () {
                    this.additionalParams.clear();
                    this.update(true);
                };
                DataTableComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    //calculating the column widths
                    this.totalWidth = 1;
                    this.columns.forEach(function (col) {
                        _this.totalWidth += col.relativeWidth;
                    });
                    this.update();
                    //prevent drop down collapse when user clicks on a li
                    $(document).on('click', '.dropdown-menu', function (e) {
                        e.stopPropagation();
                    });
                };
                /**
                 * sets the current page
                 * @param page page number, zero based
                 */
                DataTableComponent.prototype.setCurrentPage = function (page) {
                    if (page >= 0 && page < this.pages) {
                        this.currentPage = page;
                        this.update(false); //should not reset pagination when, data is updated due to a page change.
                    }
                };
                /**
                 * This function will update the current data set of the table
                 * @param resetPagination will set page to 1, if true
                 */
                DataTableComponent.prototype.update = function (resetPagination) {
                    var _this = this;
                    if (resetPagination === void 0) { resetPagination = true; }
                    if (resetPagination) {
                        this.currentPage = 0;
                    }
                    if (!this.service) {
                        return;
                    }
                    this.service.get(this.keyword, this.rowsPerPage, this.currentPage, this.sortColumn, this.sortAscending, this.additionalParams).subscribe(function (data) {
                        _this.rows = data.totalEntries;
                        _this.dataRows = data.dataRows;
                        _this.currentPage = data.currentPage;
                        _this.pages = data.totalPages;
                        _this.range();
                    }, function (err) {
                        _super.prototype.handleServiceError.call(_this, _this.feedbackService, err);
                        _this.dataRows = new Array();
                    });
                };
                /**
                 * sets number of rows per single page
                 * @param value selected by the <select>
                 */
                DataTableComponent.prototype.setRowsPerPages = function (value) {
                    this.rowsPerPage = parseInt(value);
                    this.update();
                };
                DataTableComponent.prototype.setSortColumn = function (index) {
                    if (!this.columns[index].sortable) {
                        return;
                    }
                    if (index == this.sortColumn) {
                        this.sortAscending = !this.sortAscending;
                    }
                    else {
                        this.sortAscending = true;
                    }
                    this.sortColumn = index;
                    this.update();
                };
                /**
                 * creates a temporary array to populate the pagination buttons
                 */
                DataTableComponent.prototype.range = function () {
                    var limit = this.pages > 7 ? 7 : this.pages;
                    var margin = Math.ceil(limit / 2);
                    var start = 0;
                    if (this.currentPage - margin >= 0) {
                        start = this.currentPage - margin;
                    }
                    if (this.currentPage + margin >= this.pages) {
                        start = this.currentPage - limit >= 0 ? this.pages - limit : 0;
                    }
                    this.rangeArr = [];
                    for (var i = 0; i < limit; i++) {
                        this.rangeArr.push(start + i);
                    }
                };
                /**
                 * Called when table is populated to fix the width of the columns. If column data overflows, this function will
                 * not be effective for those columns
                 * @param index of the column
                 * @returns {string} width as a percentage of total width
                 */
                DataTableComponent.prototype.getColumnWidth = function (index) {
                    if (this.columns[index].relativeWidth <= 0) {
                        return ""; //auto set width
                    }
                    var relativeWidth = this.columns[index].relativeWidth * 100 / this.totalWidth;
                    return [relativeWidth, '%'].join('');
                };
                /**
                 * calls the Actionable@doAction of the actionable column
                 * @param colIndex index of the column
                 * @param rowIndex index of the row in the current view
                 * @param value value associated withe cell
                 */
                DataTableComponent.prototype.callActionable = function (colIndex, rowIndex, value) {
                    var col = this.columns[colIndex];
                    if (col.actionable !== null) {
                        this.columns[colIndex].actionable.doAction(rowIndex, value);
                    }
                };
                /**
                 * Returns the current visibility of the column.
                 * @param index of the column
                 * @returns {boolean} true if visible and false if hidden
                 */
                DataTableComponent.prototype.isColumnVisible = function (index) {
                    return this.columns[index].visible;
                };
                /**
                 *
                 * @param index of the column
                 * @returns {boolean} true if column has a {@link Actionable} object specified
                 */
                DataTableComponent.prototype.isColumnActionable = function (index) {
                    return this.columns[index].isActionable();
                };
                DataTableComponent.prototype.isColumnCheckable = function (index) {
                    return this.columns[index].isActionable(table_column_1.TableColumnType.CHECKABLE);
                };
                DataTableComponent.prototype.isColumnClickable = function (index) {
                    return this.columns[index].isActionable(table_column_1.TableColumnType.CLICKABLE);
                };
                DataTableComponent.prototype.isColumnSelectable = function (index) {
                    return this.columns[index].isActionable(table_column_1.TableColumnType.SELECTABLE);
                };
                /**
                 *
                 * @param index of the column
                 * @returns {any} the Selectable Object associated with the column
                 */
                DataTableComponent.prototype.getColumnSelectable = function (index) {
                    if (this.isColumnSelectable(index)) {
                        return this.columns[index].actionable;
                    }
                    return null;
                };
                DataTableComponent.prototype.getColumnCheckable = function (index) {
                    if (this.isColumnCheckable(index)) {
                        return this.columns[index].actionable;
                    }
                    return null;
                };
                DataTableComponent.prototype.getColumnSpecificCssClassesForHtmlElement = function (index) {
                    if (this.isColumnActionable(index)) {
                        return this.columns[index].actionable.getCssClasses();
                    }
                    return "";
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], DataTableComponent.prototype, "columns", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', generic_table_service_1.GenericTableService)
                ], DataTableComponent.prototype, "service", void 0);
                DataTableComponent = __decorate([
                    core_1.Component({
                        selector: 'data-table',
                        templateUrl: '../../../resources/template/modules/table/table.html',
                        styleUrls: [
                            "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css"
                        ],
                        styles: [
                            "\n        .dropdown-menu{\n            minimum-width:auto;\n            padding: 5px 10px 5px 10px;\n        }\n        .dropdown-menu li{\n            margin-bottom: 5px;\n        }\n        #col-select-btn{\n            height:34px;\n        }\n        "
                        ]
                    }),
                    __param(0, core_1.Inject(feedback_service_1.FeedBackService)), 
                    __metadata('design:paramtypes', [feedback_service_1.FeedBackService])
                ], DataTableComponent);
                return DataTableComponent;
            }(abstract_component_1.AbstractComponent));
            exports_1("DataTableComponent", DataTableComponent);
        }
    }
});
//# sourceMappingURL=table.component.js.map