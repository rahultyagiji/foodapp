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
    price:string="0";


    constructor(private _ngZone:NgZone){

    }

getOrder(){

    return this.order;

}

setOrder(order:Order[]){
        this.order = order;
}


Order(menu:Menu,cafeId,specialInstruction,option:{'text':string,'price':string}
,extras:{'text':string,'price':string}[]){
    this.price="0";
    this.price = menu.price;
    //    add options price
    if(option){
    if(option.price!=null)
        this.price = (parseFloat(this.price)+parseFloat(option.price)).toString();}
    //add extras prices
    if(extras){
       extras.forEach((x)=>{
           if(x.price!=null)
        this.price = (parseFloat(this.price)+parseFloat(x.price)).toString();
       });
    }

    if(this.order.length==0){
    this.order.push({'cafeId':cafeId,'name':menu.name,'price':this.price,
        'quantity':1,'specialInstruction':specialInstruction,'option':option,'extras':extras,
    'priceQuantity':this.price});
    }
    else {
        if(this.order[0].cafeId==cafeId){

         if(this.order.some(e=>e.name===menu.name))
         {   this.order.map((x)=>{
             if(x.name===menu.name){
                 x.quantity=x.quantity+1;
                 x.priceQuantity=(parseFloat(x.price)*x.quantity).toString();
             }})
         }
         else{
            this.order.push({'cafeId':cafeId,'name':menu.name,'price':this.price,'quantity':1,'specialInstruction':specialInstruction
                ,'option':option,'extras':extras,
                'priceQuantity':this.price});
        }
        }
        else{
            dialogs.alert("Can only order from one cafe at a time, please clear your cart first").then(()=> {
            });        }
}
    this.price="0";
}

removeOrder(order:Order){

    var index = this.order.indexOf(order);
    if(index>=0)
      return  this.order.splice(index, 1);

}

confirmOrder(order:Order[],cafe,payway,uid,location){

        console.log("in confirm order",order,cafe,payway,uid,location);
        // order = order.filter((x)=>{x.quantity!=0});

        var a = Math.floor(Math.random() * (50 - 1 + 1)) + 1;
        var time = Math.floor(Date.now() / 1000);
    if (payway == "Cash") {
                    firebase.push('/order-cafe/' + cafe,
                            {order, "status": "ordered", "uid": uid,"location":location,"orderNo2":a,"timestamp":time} )
                        .then((res) => {
                    firebase.push('/order-user/' + uid, {
                                "status": "ordered",
                                "cafe": cafe,
                                "orderNo": res.key,
                                "orderNo2":a,
                                "timestamp":time
                            })
                                .then(()=>{
                                    this.orderNo(cafe,res.key)
                                    firebase.remove('/cart/'+uid+'/'+cafe)}
                                    )
                        }).catch((err)=>{console.log(err)})

                }
                else {
                    firebase.push('/order-cafe/' + cafe, {order, "status": "ordered", "uid": uid,"location":location,"orderNo2":a,"timestamp":time})
                        .then((res) => {
                        firebase.push('/order-user/' + uid, {
                                "status": "ordered",
                                "cafe": cafe,
                                "orderNo": res.key,
                                "orderNo2": a,
                                "timestamp":time
                            })
                                .then(()=>{this.orderNo(cafe,res.key)
                                    firebase.remove('/cart/'+uid+'/'+cafe)})
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
        return firebase.query(
            onQueryEvent,
            'order-user/' + uid,
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY
                }
            }
        )

    }


    getOrderDetails(cafe,key){
        return firebase.getValue('/order-cafe/'+cafe+'/'+key);
    }

    addToCart(cafe,cart,uid){
        firebase.push(
            '/cart/'+uid+'/',
            {
                'cart':cart,
                'cafe':cafe
                }
            ).then(
            function (result) {
                console.log("created key: " + result.key);
            }
        );
    }

    getCart(uid){
      return  firebase.getValue('/cart/'+uid)

    }

    removeCart(uid){
        firebase.remove('cart/'+uid);
    }

    deleteCart(){
        this.order.length=0;
    }


}
