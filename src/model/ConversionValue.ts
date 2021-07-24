export class ConversionValue {
    name: string;
    value: boolean|string|number;

    constructor(name:string, value:boolean|string|number) {
        this.name = name;
        this.value = value;
    }
}