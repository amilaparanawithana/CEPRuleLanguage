/**
 * @author chathura widanage
 */
import {Component} from "angular2/core";
import {DataTableComponent} from "../../../modules/tables/table.component";
@Component({
    selector: 'table-test',
    template: `<data-table [headers]="headers"></data-table>`,
    directives: [DataTableComponent]
})

export class DataTableTest {
    headers:Array<string> = [];

    constructor() {
        this.headers.push('Test1');
        this.headers.push('Test2');

    }
}