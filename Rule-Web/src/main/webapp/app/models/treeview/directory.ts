/**
 * @author Sajith Dilshan
 */
import {Permission} from "../permission";

export class Directory {
    expanded = false;
    checked = false;

    constructor(public name:string,
                public directories:Array<Directory>,
                public permissions:Array<Permission>) {
    }

    toggle() {
        this.expanded = !this.expanded;
    }

    getIcon() {

        if (this.expanded) {
            return 'minus';
        }

        return 'plus';
    }

    check() {
        this.checked = !this.checked;
        this.checkRecursive(this.checked);
    }

    addPermission(permission:Permission) {
        this.permissions.push(permission);
    }

    checkIfAllPermissionsSelected() {
        for (var i = 0; i < this.permissions.length; i++) {
            if (!this.permissions[i].checked) {
                break;
            }
            this.checked = true;
        }
    }

    checkRecursive(state:boolean) {
        this.directories.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        });
        this.permissions.forEach(p => {
            p.setCheck(state);
        });
    }
}
