import { Injectable } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { Order } from "../datatypes/order";
import {Menu} from "../datatypes/menu";
import * as dialogs from "ui/dialogs";
import {Observable} from "rxjs/Observable";

//Stripe trial
// import stripePackage from 'stripe';


@Injectable()
export class OrderService {

    order:Order[]=[];

getOrder(){

    return this.order;

}

Order(menu:Menu,cafeId){

    if(this.order.length==0){
    this.order.push({'cafeId':cafeId,'name':menu.name,'price':menu.price,'quantity':1});
    }
    else {
        if(this.order[0].cafeId==cafeId){
            this.order.push({'cafeId':cafeId,'name':menu.name,'price':menu.price,'quantity':1});
        }
        else{
            dialogs.alert("Can only order from one cafe at a time, please clear your cart first").then(()=> {
            });        }
}

}

removeOrder(order:Order){

    var index = this.order.indexOf(order);
    if(index>=0)
      return  this.order.splice(index, 1);

}

confirmOrder(order:Order[],cafe){

    var uid;
    firebase.getCurrentUser()
        .then(
        function (token) {
                uid=token.uid

            // const stripe=stripePackage('sk_test_azUv3buJQkPoneBWFWY9KAzq');



            firebase.push('/order-user/'+uid,{order,"status":"ordered","cafe":cafe})
                .then();
            firebase.push('/order-cafe/'+cafe,{order,"status":"ordered","uid":uid})
                .then();
        },
        function (errorMessage) {
        });
}


}
