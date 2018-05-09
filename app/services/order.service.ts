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
    orderList:{"orderNo":string,"cafe":string,"status":string}[]=[];
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

        var a = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
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
                                "status": "ordered",
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
            const path = 'order-user/'+uid;
            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        })
    }


    handleSnapshot(data){

        if(data){
            this.orderList=[];
            let that = this
            Object.keys(data).forEach((x)=>{
                        that.orderList.push({"orderNo":data[x].orderNo,"cafe":data[x].cafe
                        ,"status":data[x].status});
            })
        }
        return this.orderList

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
                })
            })
            .catch();

    }


    getOrderDetails(cafe,key){
        return firebase.getValue('/order-cafe/'+cafe+'/'+key);
    }

}
