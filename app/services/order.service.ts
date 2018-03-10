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
    orderList:{"orderNo":string,"status":string}[]=[];


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

confirmOrder(order:Order[],cafe,payway,uid){

    //I am trying to control if cafeId is same.. not working yet
    // var status:boolean=true;
    if (payway == "Cash") {
        console.log(cafe,payway,JSON.stringify(order),uid,"2..");
                    firebase.push('/order-cafe/' + cafe,
                        {order, "status": "ordered", "uid": uid})
                        .then((res) => {
                    console.log(cafe,payway,JSON.stringify(order),uid,"3..");
                    firebase.push('/order-user/' + uid, {
                                order,
                                "status": "ordered",
                                "cafe": cafe,
                                "orderNo": res.key
                            })
                                .then()
                        })

                }
                else {
        console.log(cafe,payway,JSON.stringify(order),uid,"2..");
                    firebase.push('/order-cafe/' + cafe, {order, "status": "ordered", "uid": uid})
                        .then((res) => {
                            console.log(cafe,payway,JSON.stringify(order),uid,"3..");
                            firebase.push('/order-user/' + uid, {
                                order,
                                "status": "processing",
                                "cafe": cafe,
                                "orderNo": res.key
                            })
                                .then()
                        })
                }
            }


fetchOrder(uid){

    var onQueryEvent = function(result) {}
    firebase.query(
        onQueryEvent,
        'order-user/'+uid,
        {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY}
        }
    ).then(
        (res)=>{
            Object.keys(res.value).map((x)=>{
                this.orderList.push({"orderNo":res.value[x].orderNo,"status":res.value[x].status});
            })
        })
    .catch();


    return this.orderList;

}

}
