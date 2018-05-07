import { Injectable , NgZone} from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { Order } from "../datatypes/order";
import {Menu} from "../datatypes/menu";
import * as dialogs from "ui/dialogs";
import {Observable} from "rxjs/Observable";
import {layout} from "tns-core-modules/utils/utils";
import * as moment from 'moment';
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {OrderComplex} from "../datatypes/order.complex";
//Stripe trial
// import stripePackage from 'stripe';


@Injectable()
export class OrderService {

    order:Order[]=[];
    orderComplex:OrderComplex[]=[];
    orderList:{"orderNo":string,"status":string}[]=[];
    vorderNo:number=0;

    constructor(private _ngZone:NgZone){

    }

getOrder(){

    return this.order;

}

Order(menu:Menu,cafeId,specialInstruction,option:{'text':string,'price':string}
,extras:{'text':string,'price':string}[]){

        var price = menu.price;
    //    add options price
    if(option){
        if(option.text!="")
        price = (parseFloat(price)+parseFloat(option.price)).toString();
    }

    //add extras price
    if(extras){
        if(extras.length){
       extras.forEach((x)=>{
        price = (parseFloat(price)+parseFloat(x.price)).toString();
       })};}


    if(this.order.length==0){
    this.order.push({'cafeId':cafeId,'name':menu.name,'price':price,
        'quantity':1,'specialInstruction':specialInstruction,'option':option,'extras':extras});
    }
    else {
        if(this.order[0].cafeId==cafeId){
            this.order.push({'cafeId':cafeId,'name':menu.name,'price':price,'quantity':1,'specialInstruction':specialInstruction
                ,'option':option,'extras':extras});
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

confirmOrder(order:Order[],cafe,payway,uid,location){

        var a = Math.random() * 20;
    if (payway == "Cash") {
                    firebase.push('/order-cafe/' + cafe,
                        {order, "status": "ordered", "uid": uid,"location":location,"orderNo2":a} )
                        .then((res) => {
                    firebase.push('/order-user/' + uid, {
                                "status": "ordered",
                                "cafe": cafe,
                                "orderNo": res.key,
                                "orderNo2":a
                            })
                                .then(()=>{this.orderNo(cafe,res.key)})
                        }).catch((err)=>{console.log(err)})

                }
                else {
                    firebase.push('/order-cafe/' + cafe, {order, "status": "ordered", "uid": uid,"location":location,"orderNo2":a})
                        .then((res) => {
                        firebase.push('/order-user/' + uid, {
                                "status": "processing",
                                "cafe": cafe,
                                "orderNo": res.key,
                                "orderNo2": a
                            })
                                .then(()=>{this.orderNo(cafe,res.key)})
                        }).catch((err)=>{console.log(err)})
                }
            }


    loadOrder(uid) : Observable<any> {
        return new Observable((observer: any) => {
            const path = 'order-user/';
            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value,uid);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        })

    }



    handleSnapshot(data,uid:string){
        this.orderComplex=[];

        if(data){
            Object.keys(data).forEach((x)=>{
                if(data[x].orderNo=uid){
                    this.orderComplex.push({"key":x,"order":data[x].order,"status":data[x].status,
                        "uid":data[x].uid,"cafeOwner":data[x].cafeOwner,"location":data[x].location,"orderNo2":data[x].orderNo2});
                }
            })
        }
        return this.orderComplex

    }

    orderNo(cafe,key) {

// fix this later
        // var onQueryEvent = function (result) {
        // }
        // firebase.query(
        //     onQueryEvent,
        //     'orderCounter/' + cafe,
        //     {
        //         singleEvent: true,
        //         orderBy: {
        //             type: firebase.QueryOrderByType.KEY
        //         }
        //     }
        // ).then(
        //     (res) => {
        //         console.log(JSON.stringify(res.value))
        //     })
        //     .catch();
        // const path="orderCounter/"+key;
// //create entry in synthetic order number table
//     firebase.push([path],{})


    }

    frequentCafe(uid) {

        var onQueryEvent = function (result) {
        }
        firebase.query(
            onQueryEvent,
            'order-user/' + uid,
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'uid'
                },
                ranges: [
                    {
                        type: firebase.QueryRangeType.EQUAL_TO,
                        value: uid
                    }]
            }
        ).then(
            (res) => {
                Object.keys(res.value).map((x) => {
                    console.log("testing...", JSON.stringify(x))
                })
            })
            .catch();

    }


}
