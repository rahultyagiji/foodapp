export class Item {
cafeId:string;
    id: string;
    name: string;
    category: string;
    imgSrc: string;

    constructor(options){
        this.cafeId = options.cafeId
        this.id = options.id
        this.name = options.name
        this.category = options.category
        this.imgSrc = options.imgSrc
    }

}
