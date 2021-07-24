export class ValueOption {
    nextId!: number | boolean;
    value!: boolean | string | number;
    text!: string;

    constructor(obj: any) {
        this.nextId = obj.nextId;
        this.value = obj.value;
        this.text = obj.text;
    }
}