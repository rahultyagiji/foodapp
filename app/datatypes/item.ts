export class Item {
cafeId:string;
    id: string;
    name: string;
    category: string;
    imgSrc: string;
    description:string;
    lat:number;
    lng:number;


    constructor(options){
        this.cafeId = options.cafeId;
        this.id = options.id;
        this.name = options.name;
        this.category = options.category;
        this.imgSrc = options.imgSrc;
        this.description=options.description;
        this.lat=options.lat;
        this.lng=options.lng;
    }

}
