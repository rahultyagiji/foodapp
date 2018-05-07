import {Order} from "./order";

export interface OrderComplex {
    key:string;
    uid:string;
    status:string;
    order: Order;
    cafeOwner:string;
    location:string;
    orderNo2:string;
}