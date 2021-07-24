import {ValueOption} from "./ValueOption";

export class TreeNode {
    id!: number;
    name!: string;
    text!: string;
    uiType!: string;
    valueType!: string;
    valueOptions!: ValueOption[];

    constructor(obj:any) {
        this.id = obj.id;
        this.name = obj.name;
        this.text = obj.text;
        this.uiType = obj.uiType;
        this.valueType = obj.valueType;
        this.valueOptions = obj.valueOptions;
    }
}

