export class RadioOption {
    text: string;
    price: string;
    selected: boolean = false;

    constructor(text: string, price:string) {
        this.text = text;
        this.price = price;
    }
}