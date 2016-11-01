System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var TableColumn, TableColumnType, Actionable, Checkable, Clickable, Selectable;
    return {
        setters:[],
        execute: function() {
            /**
             * @author chathura widanage
             */
            TableColumn = (function () {
                /**
                 *
                 * @param title title of the column
                 * @param sortable whether this column is sortable
                 * @param relativeWidth relative width of the column with respect to the other columns. Negative width will set
                 * column width automatically.
                 * @param {@link TableColumnType} determines the type of the content shown in this column.
                 */
                function TableColumn(title, sortable, relativeWidth, actionable) {
                    if (sortable === void 0) { sortable = false; }
                    if (relativeWidth === void 0) { relativeWidth = -1; }
                    if (actionable === void 0) { actionable = null; }
                    this.visible = true;
                    this.title = title;
                    this.sortable = sortable;
                    this.relativeWidth = relativeWidth;
                    this.uid = Math.random().toString(36).slice(2);
                    this.actionable = actionable;
                }
                TableColumn.prototype.isActionable = function (typeOfAction) {
                    if (typeOfAction === void 0) { typeOfAction = null; }
                    if (typeOfAction === null) {
                        return this.actionable !== null;
                    }
                    else {
                        return this.actionable !== null && this.actionable.getColType() === typeOfAction;
                    }
                };
                return TableColumn;
            }());
            exports_1("TableColumn", TableColumn);
            (function (TableColumnType) {
                TableColumnType[TableColumnType["PLAIN_TEXT"] = 0] = "PLAIN_TEXT";
                TableColumnType[TableColumnType["CLICKABLE"] = 1] = "CLICKABLE";
                TableColumnType[TableColumnType["SELECTABLE"] = 2] = "SELECTABLE";
                TableColumnType[TableColumnType["CHECKABLE"] = 3] = "CHECKABLE";
            })(TableColumnType || (TableColumnType = {}));
            exports_1("TableColumnType", TableColumnType);
            Actionable = (function () {
                function Actionable() {
                    this.cssClasses = new Array();
                }
                Actionable.prototype.getCssClasses = function () {
                    return this.cssClasses.join(" ");
                };
                return Actionable;
            }());
            exports_1("Actionable", Actionable);
            Checkable = (function (_super) {
                __extends(Checkable, _super);
                function Checkable() {
                    _super.apply(this, arguments);
                }
                Checkable.prototype.getColType = function () {
                    return TableColumnType.CHECKABLE;
                };
                /**
                 * Should implement this method
                 * @param index of the table row at current view.
                 * @param value value selected by an input component
                 */
                Checkable.prototype.doAction = function (index, value) {
                };
                /**
                 * Determines whether check box should be checked initially or not. Can be overridden to implement a custom logic
                 * @param compareValue value from the REST to check for
                 * @returns {boolean} return true if check box should be checked initially
                 */
                Checkable.prototype.isChecked = function (compareValue) {
                    if (compareValue === true || compareValue === "1" || compareValue === 1 || compareValue === "true") {
                        return true;
                    }
                    return false;
                };
                return Checkable;
            }(Actionable));
            exports_1("Checkable", Checkable);
            Clickable = (function (_super) {
                __extends(Clickable, _super);
                function Clickable() {
                    _super.apply(this, arguments);
                }
                Clickable.prototype.getColType = function () {
                    return TableColumnType.CLICKABLE;
                };
                /**
                 * Should implement this method
                 * @param index of the table row at current view.
                 * @param value value selected by an input component
                 */
                Clickable.prototype.doAction = function (index, value) {
                };
                return Clickable;
            }(Actionable));
            exports_1("Clickable", Clickable);
            /**
             * Selectable type populates a cell with a <select> tag.
             */
            Selectable = (function (_super) {
                __extends(Selectable, _super);
                function Selectable() {
                    _super.call(this);
                    this.optionData = new Array();
                    this.optionValues = new Array();
                }
                Selectable.prototype.add = function (value, data) {
                    this.optionValues.push(value);
                    this.optionData.push(data);
                };
                Selectable.prototype.getColType = function () {
                    return TableColumnType.SELECTABLE;
                };
                /**
                 * Should overridee this method
                 * @param index of the table row at current view.
                 * @param value value selected by an input component
                 */
                Selectable.prototype.doAction = function (index, value) {
                };
                /**
                 * Can override this function to specify which option should be selected, when there is
                 * a preset value for this <select> element. By default this method returns true if one of the value
                 * or the data equals with the compareValue
                 * @param compareValue value to compare with
                 * @param value index of the <option> tag
                 */
                Selectable.prototype.equals = function (compareValue, optionIndex) {
                    return compareValue + "" === this.optionData[optionIndex] + ""
                        || compareValue === this.optionValues[optionIndex] + "";
                };
                return Selectable;
            }(Actionable));
            exports_1("Selectable", Selectable);
        }
    }
});
//# sourceMappingURL=table.column.js.map