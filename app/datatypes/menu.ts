export class Menu {
    item:number;
    imgSrc: string;
    name: string;
    price: string;
    category:string;
    description:string;
    option:{"name":string,"extraPrice":number}[];
    extra:{"name":string,"extraPrice":number}[];

    constructor(options){
        this.item=options.item;
        this.name = options.name;
        this.category = options.category;
        this.imgSrc = options.imgSrc;
        this.price=options.price;
        this.description=options.description;
        this.option=options.option;
        this.extra=options.extra;
    }

}