export class Result {
    id: number;
    value!: any;

    constructor(id: number, value: any) {
        this.id = id;
        this.value = value;
    }
}