export class RadioOption {
    text: string;
    price: number;
    selected: boolean = false;

    constructor(text: string, price:number) {
        this.text = text;
        this.price = price;
    }
}