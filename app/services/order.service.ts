import { Injectable } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { Order } from "../datatypes/order";
import {Menu} from "../datatypes/menu";


@Injectable()
export class OrderService {

    order:Order[]=[];

getOrder(){

    return this.order;

}

Order(menu:Menu,cafeId){
    this.order.push({'cafeId':cafeId,'name':menu.name,'price':menu.price,'quantity':1});
}

removeOrder(order:Order){

    var index = this.order.indexOf(order);
    if(index>=0)
        this.order.splice(index, 1);
}

confirmOrder(){


}


}
