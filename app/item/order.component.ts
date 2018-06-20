import {Component, OnDestroy, OnInit, Output, ViewContainerRef, EventEmitter, Input} from "@angular/core";
import {OrderService} from "../services/order.service";
import {ModalDialogService, RouterExtensions} from "nativescript-angular";
import {Order} from "../datatypes/order";
import {OrderpopComponent} from "../ordermodal/orderpop.component";
import {firebase} from "nativescript-plugin-firebase/firebase-common";
import * as Toast from "nativescript-toast";
import {topmost} from "ui/frame";
import { ios, run as applicationRun } from "application";
import {PanGestureEventData} from "tns-core-modules/ui/gestures";


@Component({
    selector: "ns-confirm-order",
    moduleId: module.id,
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.css"]
})
export class OrderConfirmComponent implements OnInit, OnDestroy {

    order:Order[]=[];
    total$:number=0;
    displayCart:boolean=true;
    uid:string="";

    @Input() cafeid: string;
    @Output() cartEmpty: EventEmitter<boolean> =   new EventEmitter();


    constructor(
        private orderService:OrderService,
        private routerextensions: RouterExtensions,
        private popup: ModalDialogService,
        private vcRef: ViewContainerRef,){

        firebase.getCurrentUser()
            .then((token)=> {
                this.uid = token.uid; console.log("logged in as",token.uid)});
    }

    ngOnInit(){

        this.order=this.orderService.getOrder();
        this.totalPrice(this.order);
        console.log("order panel triggered",this.order,this.cafeid);
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
        this.orderService.setOrder(this.order)
        this.cartEmpty.emit(true);
    }

    decreaseQuantity(item,i){
        this.cartEmpty.emit(true);
        if(this.order[i].quantity!=0){
        this.order[i].quantity=this.order[i].quantity-1;
        this.order[i].priceQuantity=(parseFloat(this.order[i].price)*this.order[i].quantity).toString();
        this.totalPrice(this.order);
        this.deleteQuantityZero();
        this.orderService.setOrder(this.order)
        this.cartEmpty.emit(true);
        }
        else {
            this.orderService.setOrder(this.order)
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

    ngOnDestroy(){

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

        if(this.uid){
            this.popup.showModal(OrderpopComponent,options).then((response)=>
            {

                this.orderService.confirmOrder(this.order,this.cafeid,response.payment,this.uid,response.location);
                Toast.makeText("Your order has been placed").show();
                this.order.length=0;
                this.total$=0;
            }).catch(()=>{
                Toast.makeText("").show();
            })

        }
        else{
            Toast.makeText("Please login to order").show()}
    }


//    testing slide menu

    onPan(args: PanGestureEventData) {
        console.log("Pan!",args);
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);

    }

}