import {Component, OnDestroy, OnInit, OnChanges, DoCheck, AfterContentChecked, AfterContentInit,
    AfterViewChecked, AfterViewInit, Output, ViewContainerRef, EventEmitter, Input, ChangeDetectorRef} from "@angular/core";
import {OrderService} from "../services/order.service";
import {ModalDialogService, RouterExtensions} from "nativescript-angular";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import {Order} from "../datatypes/order";
import {OrderpopComponent} from "../ordermodal/orderpop.component";
import {firebase} from "nativescript-plugin-firebase/firebase-common";
import * as Toast from "nativescript-toast";
import {topmost} from "ui/frame";
import { ios, run as applicationRun } from "application";
import {PanGestureEventData} from "tns-core-modules/ui/gestures";
//import {OnChanges} from "../../platforms/ios/DQCafev02/app/tns_modules/@angular/core/src/metadata/lifecycle_hooks";
//import firebase = require("nativescript-plugin-firebase");
const FIREBASE_FUNCTION_ACCOUNT = 'https://us-central1-dekyou-cafe.cloudfunctions.net/account/';
const FIREBASE_FUNCTION_CHARGE = 'https://us-central1-dekyou-cafe.cloudfunctions.net/charge/';

@Component({
    selector: "ns-confirm-order",
    moduleId: module.id,
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.css"]
})
export class OrderConfirmComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit {

    order:Order[]=[];
    total$:number=0;
    fees$:number=30;
    totalCharge$:number=0;
    displayCart:boolean=true;
    uid:string="";
    itemCount:number=0;
    cardExists:boolean = false;
    payOrCard:string = "Add Card";
    accountID:string = "";
    customerID:string = "";

    @Input() cafeid: string;
    @Output() cartEmpty: EventEmitter<boolean> =   new EventEmitter();


    constructor(
        private orderService:OrderService,
        private routerextensions: RouterExtensions,
        private popup: ModalDialogService,
        private cdr: ChangeDetectorRef,
        private http: HttpClient,
        private vcRef: ViewContainerRef){

        firebase.getCurrentUser()
            .then((token)=> {

                firebase.getValue("/userInfo/"+token.uid)
                    .then((res)=>{
                        if (!res.value.cID.isEmpty) {
                            this.cardExists=true;
                            this.payOrCard = "Click to Pay";
                            this.customerID = res.value.cID;
                            console.log("customer id is " + res.value.cID);
                        }
                    });

                this.uid = token.uid; console.log("logged in as",token.uid)});
    }

    ngOnInit(){

        this.order=this.orderService.getOrder();
        this.totalPrice(this.order);
        console.log("order panel triggered",this.order,this.cafeid);


        firebase.getCurrentUser()
            .then((token)=> {

                firebase.getValue("/userInfo/" + token.uid)
                    .then((res)=> {
                        if (!res.value.cID.isEmpty) {
                            this.cardExists = true;
                            this.payOrCard = "Click to Pay";
                            console.log("customer id is " + res.value.cID);
                        }
                    });
            });


    }

    ngOnChanges(){
        console.log("in ngOnChanges");
        firebase.getCurrentUser()
            .then((token)=> {

                firebase.getValue("/userInfo/" + token.uid)
                    .then((res)=> {
                        if (!res.value.cID.isEmpty) {
                            this.cardExists = true;
                            this.payOrCard = "Click to Pay";
                            console.log("customer id is " + res.value.cID);
                        }
                    });
            });
    }

    ngOnDestroy(){
        //console.log("in ng Destroy");
    }

    ngDoCheck() {
        //console.log("in ng Do Check");
    }

    ngAfterContentInit() {
        //console.log("in ng After Content Init");
    }

    ngAfterContentChecked() {
        //console.log("in ng After Content Checked");
    }

    ngAfterViewInit() {
        //console.log("in ng After View Init");

        firebase.getCurrentUser()
            .then((token)=> {

                firebase.getValue("/userInfo/" + token.uid)
                    .then((res)=> {
                        if (!res.value.cID.isEmpty) {
                            this.cardExists = true;
                            this.payOrCard = "Click to Pay";
                            this.cdr.detectChanges();
                            console.log("customer id is " + res.value.cID);
                        }
                    });
            });

        //this.cdr.detectChanges();

    }

    ngAfterViewChecked() {
        //console.log("in ng After View Checked");
        this.cdr.detectChanges();
    }

    onCancelNav(){
        // let page = <Label>args.object;
        // let view = <Label>page.getViewById("cancel2");
        // view.backgroundColor = new Color("white");
        // view.animate({ backgroundColor: new Color("white"), duration: 500 });
        // view.animate({ backgroundColor: new Color("#1a626f"), duration: 500 });

        this.routerextensions.back();
    }

    increaseQuantity(item,i){
        //Remember that the quantity has been multiplied with price already... just sum it up for total

        this.order[i].quantity=this.order[i].quantity+1;
        this.order[i].priceQuantity=(parseFloat(this.order[i].price)*this.order[i].quantity).toString();
        this.totalPrice(this.order);
        this.orderService.setOrder(this.order);
        this.cartEmpty.emit(true);
    }

    decreaseQuantity(item,i){
        this.cartEmpty.emit(true);
        if(this.order[i].quantity!=0){
            this.order[i].quantity=this.order[i].quantity-1;
            this.order[i].priceQuantity=(parseFloat(this.order[i].price)*this.order[i].quantity).toString();
            this.totalPrice(this.order);
            this.deleteQuantityZero();
            this.orderService.setOrder(this.order);
            this.cartEmpty.emit(true);
        }
        else {
            this.orderService.setOrder(this.order);
            this.cartEmpty.emit(true);

        }

    }

    totalPrice(order:Order[]){
        this.total$=0;
        order.forEach((x)=>{
            //for total
            this.total$=Math.round((this.total$+ parseFloat(x.priceQuantity))*100)/100;
        })
    }

    deleteQuantityZero(){
        this.order = this.order.filter((x)=>{
            return x.quantity!=0;
        })

        if(this.order.length===0){
            this.displayCart=false;
            this.orderService.deleteCart();
            this.cartEmpty.emit(false);
        }
    };


    onOrder(){

        //modalcode
        let options={
            fullscreen:false,
            viewContainerRef:this.vcRef,

        };
        if (this.uid) {
            this.popup.showModal(OrderpopComponent, options).then((response)=> {
                console.log("passing...", this.cafeid);

                this.orderService.confirmOrder(this.order,this.cafeid,response.payment,this.uid,response.location);
                this.processPayment(this.total$);
                Toast.makeText("Your order has been placed").show();
                this.order.length=0;
                this.total$=0;
                this.cartEmpty.emit(false);
                this.routerextensions.navigate(["/items", 1]);
            }).catch(()=>{
                Toast.makeText("").show();
            })
        }
        else {
            Toast.makeText("Please login to order").show();
        }
    }

    processPayment(total) {

        console.log("in process payment");


        /*firebase.getValue("/userInfo/" + token.uid)
         .then((res)=> {
         if (!res.value.cID.isEmpty) {
         this.cardExists = true;
         this.payOrCard = "Click to Pay";
         this.cdr.detectChanges();
         console.log("customer id is " + res.value.cID);
         }
         });*/

        var obj;

        total = Math.round(total*100);
        this.fees$ = Math.round(this.fees$ + (total * (1.75/100)));
        this.totalCharge$ = Math.round(total - this.fees$);

        firebase.getValue("/businessName/-L6petTdgTRP_HfpTNYA")
            .then((result) => {
                    console.log("the result is " + result);
                    this.accountID = result.value.aID;
                    console.log("the existing account id is " + result.value.cafeId + " " + result.value.aID);

                    //console.log("the total is " + total);
                    //console.log ("total fee is " + this.fees$);
                    //console.log("the totalCharge is " + this.totalCharge$);
                    //console.log("the account id is " + this.accountID);
                    //console.log("the customer id is " + this.customerID);

                    this.http.request("POST",
                        FIREBASE_FUNCTION_CHARGE,
                        {
                            body: {"function":"charge", "aID": this.accountID, "cID":this.customerID,
                                "amount":total, "chargeAmount":this.totalCharge$, "currency":"AUD"},
                            headers: {"Content-Type": "application/json"}
                        }).subscribe(res => {

                        obj = res;
                        console.log(obj.body.charge.id);
                        console.log("the charge is " + obj.body.charge.id);

                    });

                }
            );

        //console.log("the account id is " + this.accountID);

        //var obj;

        /*if (!this.accountID) {
         var obj;

         this.http.request("POST",
         FIREBASE_FUNCTION_ACCOUNT,
         {
         body: {"id": this.cafeid},
         headers: {"Content-Type": "application/json"}
         }).subscribe(res => {

         obj = res;
         console.log(obj.body.account.id);
         this.accountID = obj.body.account.id;
         console.log("the customer token is " + this.accountID);

         firebase.update("/businessName/-L6petTdgTRP_HfpTNYA", {"aID": this.accountID});*/

        /*firebase.getCurrentUser()
         .then(user => console.log("User uid: " + user.uid))
         .catch(error => console.log("Trouble in paradise: " + error));*/

        //textString = JSON.stringify(res);
        //console.log("res is " + textString);
        //textString = (<any>res).json;
        //});

        //firebase.update("/businessName/-L6petTdgTRP_HfpTNYA", {aID: this.accountID});
        //}


    }


//    testing slide menu

    onPan(args: PanGestureEventData) {
        console.log("Pan!",args);
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);

    }

    manageCards() {
        //this.cardExists = true;
        //this.cdr.detectChanges();
        this.ngOnDestroy();
        this.routerextensions.navigateByUrl("/cards");
    }

    updateButton(cardExist) {
        console.log("in update button");
        this.payOrCard = "Click to Pay";
        this.cardExists = cardExist;
        this.cdr.detectChanges();
    }
}