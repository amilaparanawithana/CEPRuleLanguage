/**
 * @author Sajith Dilshan
 */
import {Component, Input} from "angular2/core";
import {Directory} from "../../../models/treeview/directory";

@Component({
    selector: 'tree-view',
    templateUrl: '../../../../resources/template/dashboard/treeview/view.html',
    styleUrls: [
        "../../../../resources/global/vendor/checkbox/awesome-bootstrap-checkbox.css"
    ],
    directives: [TreeView]
})
export class TreeView {
    @Input()
    directories:Array<Directory>;
}