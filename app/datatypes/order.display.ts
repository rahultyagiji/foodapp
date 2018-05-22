import {Order} from "./order";

export interface OrderDisplay {
    key:string;
    uid:string;
    status:string;
    order: Order[];
    cafeOwner:string;
    location:string;
    orderNo2:string;
    imgSrc:string;
    total:string;
}