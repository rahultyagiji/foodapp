export class Menu {
    item:string;
    imgSrc: string;
    name: string;
    price: string;
    category:string;

    constructor(options){
        this.item=options.item;
        this.name = options.name;
        this.category = options.category;
        this.imgSrc = options.imgSrc;
        this.price=options.price;
    }

}