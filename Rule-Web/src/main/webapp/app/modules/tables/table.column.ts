/**
 * @author chathura widanage
 */
export class TableColumn {
    title:string;
    sortable:boolean;
    relativeWidth:number;
    visible:boolean = true;
    uid:string;
    actionable:Actionable;

    /**
     *
     * @param title title of the column
     * @param sortable whether this column is sortable
     * @param relativeWidth relative width of the column with respect to the other columns. Negative width will set
     * column width automatically.
     * @param {@link TableColumnType} determines the type of the content shown in this column.
     */
    constructor(title:string,
                sortable:boolean = false,
                relativeWidth:number = -1,
                actionable:Actionable = null) {
        this.title = title;
        this.sortable = sortable;
        this.relativeWidth = relativeWidth;
        this.uid = Math.random().toString(36).slice(2);
        this.actionable = actionable;
    }

    isActionable(typeOfAction:TableColumnType = null):boolean {
        if (typeOfAction === null) {//should check both
            return this.actionable !== null;
        } else {
            return this.actionable !== null && this.actionable.getColType() === typeOfAction;
        }
    }
}


export enum TableColumnType{
    PLAIN_TEXT, CLICKABLE, SELECTABLE, CHECKABLE
}

export abstract class Actionable {
    cssClasses:Array<string> = new Array();

    abstract doAction(index:number, value:any);

    abstract getColType():TableColumnType;

    getCssClasses() {
        return this.cssClasses.join(" ");
    }
}

export class Checkable extends Actionable {

    getColType():TableColumnType {
        return TableColumnType.CHECKABLE;
    }

    /**
     * Should implement this method
     * @param index of the table row at current view.
     * @param value value selected by an input component
     */
    doAction(index:number, value:any) {

    }

    /**
     * Determines whether check box should be checked initially or not. Can be overridden to implement a custom logic
     * @param compareValue value from the REST to check for
     * @returns {boolean} return true if check box should be checked initially
     */
    isChecked(compareValue):boolean {
        if (compareValue === true || compareValue === "1" || compareValue === 1 || compareValue === "true") {
            return true;
        }
        return false;
    }
}

export class Clickable extends Actionable {

    getColType():TableColumnType {
        return TableColumnType.CLICKABLE;
    }

    /**
     * Should implement this method
     * @param index of the table row at current view.
     * @param value value selected by an input component
     */
    doAction(index:number, value:any) {

    }
}

/**
 * Selectable type populates a cell with a <select> tag.
 */
export class Selectable extends Actionable {
    //value and data to be used in <option value={value}>{data}</option>
    //Not going to use maps here since it is difficult to manipulate maps inside views and we don't need 
    //all operations of the map in this case. we just need add(or set in ts) here.
    optionValues:Array<string>;
    optionData:Array<string>;

    constructor() {
        super();
        this.optionData = new Array();
        this.optionValues = new Array();
    }

    add(value, data) {
        this.optionValues.push(value);
        this.optionData.push(data);
    }

    getColType():TableColumnType {
        return TableColumnType.SELECTABLE;
    }

    /**
     * Should overridee this method
     * @param index of the table row at current view.
     * @param value value selected by an input component
     */
    doAction(index:number, value:any) {

    }

    /**
     * Can override this function to specify which option should be selected, when there is
     * a preset value for this <select> element. By default this method returns true if one of the value
     * or the data equals with the compareValue
     * @param compareValue value to compare with
     * @param value index of the <option> tag
     */
    equals(compareValue, optionIndex) {
        return compareValue + "" === this.optionData[optionIndex] + ""
            || compareValue === this.optionValues[optionIndex] + "";
    }


}