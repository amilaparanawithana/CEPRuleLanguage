/**
 * @author chathura widanage
 */
import {Component, Input, Inject} from "angular2/core";
import {GenericTableService} from "./generic.table.service";
import {DataRow} from "./data.row";
import {TableColumn, TableColumnType, Selectable, Checkable} from "./table.column";
import {FeedBackService, FeedbackType} from "../../services/ui/feedback.service";
import {AbstractComponent} from "../../components/dashboard/abstract.component";
declare let $:any;
declare let document:any;
@Component({
    selector: 'data-table',
    templateUrl: '../../../resources/template/modules/table/table.html',
    styleUrls: [
        "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css"
    ],
    styles: [
        `
        .dropdown-menu{
            minimum-width:auto;
            padding: 5px 10px 5px 10px;
        }
        .dropdown-menu li{
            margin-bottom: 5px;
        }
        #col-select-btn{
            height:34px;
        }
        `
    ]
})

export class DataTableComponent extends AbstractComponent{
    @Input()
    columns:Array<TableColumn> = [];
    @Input()
    service:GenericTableService;

    dataRows:Array<DataRow> = [];

    keyword:string = "";
    rows:number = 0;//total rows
    rowsPerPage:number = 25;//visible rows per page

    pages:number;//number of pages : calculated
    currentPage:number = 0;

    sortAscending:boolean = true;
    sortColumn:number = 0;

    rangeArr:Array<number>;//tem array for pagination

    //ui
    totalWidth:number = 1;//total relative width sum

    private additionalParams:Map<string,string> = new Map<string,string>();

    constructor(@Inject(FeedBackService) private feedbackService:FeedBackService) {
        super();
    }

    /**
     * Sets additional parameters to send with every future request. Calling this method will immediately update the current data
     * set of the table.
     * @param params
     */
    setAdditionalParams(params:Map<string,string>) {
        if (params == undefined || params == null) {
            return;
        }
        this.additionalParams = params;
        this.update(true);
    }

    /**
     * Will reset the additional parameters and immediately update the current data set.
     */
    resetAdditionalParams() {
        this.additionalParams.clear();
        this.update(true);
    }


    ngOnInit() {
        //calculating the column widths
        this.totalWidth = 1;
        this.columns.forEach(col=> {
            this.totalWidth += col.relativeWidth;
        });

        this.update();

        //prevent drop down collapse when user clicks on a li
        $(document).on('click', '.dropdown-menu', function (e) {
            e.stopPropagation();
        });
    }

    /**
     * sets the current page
     * @param page page number, zero based
     */
    setCurrentPage(page) {
        if (page >= 0 && page < this.pages) {
            this.currentPage = page;
            this.update(false);//should not reset pagination when, data is updated due to a page change.
        }
    }

    /**
     * This function will update the current data set of the table
     * @param resetPagination will set page to 1, if true
     */
    private update(resetPagination = true) {
        if (resetPagination) {
            this.currentPage = 0;
        }

        if (!this.service) {
            return;
        }
        this.service.get(this.keyword, this.rowsPerPage, this.currentPage, this.sortColumn, this.sortAscending, this.additionalParams).subscribe(
            data=> {
                this.rows = data.totalEntries;
                this.dataRows = data.dataRows;
                this.currentPage = data.currentPage;
                this.pages = data.totalPages;
                this.range();
            },
            err=> {
                super.handleServiceError(this.feedbackService, err);
                this.dataRows = new Array<DataRow>();
            }
        );
    }

    /**
     * sets number of rows per single page
     * @param value selected by the <select>
     */
    setRowsPerPages(value) {
        this.rowsPerPage = parseInt(value);
        this.update();
    }

    setSortColumn(index) {
        if (!this.columns[index].sortable) {
            return;
        }

        if (index == this.sortColumn) {
            this.sortAscending = !this.sortAscending;
        } else {
            this.sortAscending = true;
        }
        this.sortColumn = index;
        this.update();
    }

    /**
     * creates a temporary array to populate the pagination buttons
     */
    range() {
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
    }

    /**
     * Called when table is populated to fix the width of the columns. If column data overflows, this function will
     * not be effective for those columns
     * @param index of the column
     * @returns {string} width as a percentage of total width
     */
    getColumnWidth(index) {
        if (this.columns[index].relativeWidth <= 0) {
            return "";//auto set width
        }

        var relativeWidth = this.columns[index].relativeWidth * 100 / this.totalWidth;
        return [relativeWidth, '%'].join('');
    }

    /**
     * calls the Actionable@doAction of the actionable column
     * @param colIndex index of the column
     * @param rowIndex index of the row in the current view
     * @param value value associated withe cell
     */
    callActionable(colIndex:number, rowIndex:number, value:any) {
        var col = this.columns[colIndex];
        if (col.actionable !== null) {
            this.columns[colIndex].actionable.doAction(rowIndex, value);
        }
    }

    /**
     * Returns the current visibility of the column.
     * @param index of the column
     * @returns {boolean} true if visible and false if hidden
     */
    isColumnVisible(index) {
        return this.columns[index].visible;
    }

    /**
     *
     * @param index of the column
     * @returns {boolean} true if column has a {@link Actionable} object specified
     */
    isColumnActionable(index) {
        return this.columns[index].isActionable();
    }

    isColumnCheckable(index) {
        return this.columns[index].isActionable(TableColumnType.CHECKABLE);
    }

    isColumnClickable(index) {
        return this.columns[index].isActionable(TableColumnType.CLICKABLE);
    }

    isColumnSelectable(index) {
        return this.columns[index].isActionable(TableColumnType.SELECTABLE);
    }

    /**
     *
     * @param index of the column
     * @returns {any} the Selectable Object associated with the column
     */
    getColumnSelectable(index):Selectable {
        if (this.isColumnSelectable(index)) {
            return (<Selectable>this.columns[index].actionable);
        }
        return null;
    }

    getColumnCheckable(index):Checkable {
        if (this.isColumnCheckable(index)) {
            return (<Checkable>this.columns[index].actionable);
        }
        return null;
    }

    getColumnSpecificCssClassesForHtmlElement(index) {
        if (this.isColumnActionable(index)) {
            return this.columns[index].actionable.getCssClasses();
        }
        return "";
    }
}