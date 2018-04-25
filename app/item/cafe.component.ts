import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {Item} from "../datatypes/item";
import {Menu} from "../datatypes/menu";
import {ItemService} from "../services/item.service";
import {MenuService} from "../services/menu.service";
import {OrderService} from "../services/order.service";
import {Order} from "../datatypes/order";
import {ActivatedRoute} from "@angular/router";
import * as Toast from 'nativescript-toast';
import firebase = require("nativescript-plugin-firebase");

import { Label } from 'ui/label';
let view: Label;

import { Color } from 'color';
import {EventData} from "tns-core-modules/data/observable";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {ModalDialogService} from "nativescript-angular/directives/dialogs";
import {OptionspopComponent} from "./optionspop.component";
import {ObservableArray} from "tns-core-modules/data/observable-array";
import {percent} from "tns-core-modules/ui/core/view";
import {AnimationCurve} from "tns-core-modules/ui/enums";
import {OrderpopComponent} from "../ordermodal/orderpop.component";


@Component({
    selector: "ns-cafe",
    moduleId: module.id,
    templateUrl: "./cafe.component.html",
    styleUrls: ["./cafe.component.css"]
})
export class CafeComponent implements OnInit {
    cafe: Item;
    menu:Menu[];
    myMenu:Menu[];
    order:Order[]=[];
    categories:string[]=[];
    _menu:ObservableArray<Menu> = new ObservableArray<Menu>([]);
    total$:number=0;
    cartEmpty:boolean=true;
    buttondisable:boolean=false;
    confirmbuttondisable:boolean=false;
    scrollHeight:string="height: 50%";

    constructor(
        private itemService: ItemService,
        private menuService: MenuService,
        private orderService:OrderService,
        private route: ActivatedRoute,
        private popup: ModalDialogService,
        private vcRef: ViewContainerRef

    ) {

    }

    ngOnInit(): void {
        // /////
        // this.cafe = this.itemService.getSingleItem(this.route.snapshot.params["cafeid"])
        // this.order=this.orderService.getOrder();
        // if(this.order.length>0){this.cartEmpty=false}

//menu load
        this.menuService.loadMenu(this.route.snapshot.params["cafeid"])
            .subscribe((menu: Array<Menu>) => {
                this._menu = new ObservableArray(menu);
                this.menu=[];
                this._menu.forEach((x)=>{
                    this.menu.push(x);
                    this.categories.push(x.category);
                })
                this.myMenu=this.menu;
                this.categories = this.categories.filter(function (item, i, array) {
                    return array.indexOf(item) === i;
                });
            });

        this.order = this.orderService.getOrder();

        if(this.order.length>0) {
            if(this.order[0].cafeId!=this.route.snapshot.params["cafeid"]) {
                this.confirmbuttondisable = true;
            }
            this.cartEmpty=false;
            this.scrollHeight="height: 60%"
        }


    }

    ontapMenu(data:Menu){

        //modalcode
        let options={
            context:data,
            fullscreen:true,
            viewContainerRef:this.vcRef,

        };

        this.popup.showModal(OptionspopComponent,options).then((response)=>{
            if(response.response=='true') {
                //just trailing ordering via popup
                this.orderService.Order(data, this.route.snapshot.params["cafeid"],response.specialInstruction);
                this.order = this.orderService.getOrder();
                if (this.order.length > 0) {
                    this.cartEmpty = false;
                    this.scrollHeight = "height: 60%"
                }

                this.total$ = 0;
                this.order.forEach((x) => {
                    //for total
                    this.total$ = this.total$ + x.price
                })
            }
        })
    }

    addtoOrderlist(data,args:EventData){
        let page = <StackLayout>args.object;
        this.orderService.Order(data,this.route.snapshot.params["cafeid"],"");
        this.order = this.orderService.getOrder();

        let view = <StackLayout>page.getViewById("food1");
        view.backgroundColor = new Color("#7CA924");
        view.animate({ backgroundColor: new Color("#BCE46C"), duration: 1000 });
        view.animate({ backgroundColor: new Color("white"), duration: 1500 });

        ///


        if(this.order.length>0){this.cartEmpty=false;this.scrollHeight="height: 60%"}

        this.total$=0;
        this.order.forEach((x)=>{
        //for total
            this.total$=this.total$+x.price
        })

    }

    OnOrder(){


        //modalcode
        let options={
            fullscreen:false,
            viewContainerRef:this.vcRef,

        };
        var uid;
        this.popup.showModal(OrderpopComponent,options).then((response)=>
            {
                firebase.getCurrentUser()
                    .then((token)=> {
                        uid = token.uid;
                        this.orderService.confirmOrder(this.order,this.route.snapshot.params["cafeid"],response.payment,uid,response.location);

                        Toast.makeText("Your order has been placed").show();
                        this.order.length=0;
                        this.cartEmpty=true;
                        this.total$=0;
                        this.scrollHeight="height: 100%"
                    }).catch(()=>{
                    Toast.makeText("Please login to confirm order").show();
                })

            })

    }

    ontapOrder(order){
    }

    removefromOrderlist(order,args:EventData){

        let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("food2");
        view.backgroundColor = new Color("#8F130C");
        view.animate({ backgroundColor: new Color("#F57A73"), duration: 1000 });
        setTimeout(()=>{ this.order = this.orderService.removeOrder(order);

            this.total$=this.total$-order.price;
            if(this.total$<0){this.total$=0}
            this.order = this.orderService.getOrder();
            view.animate({ backgroundColor: new Color("white"), duration: 1000 });
            if(this.order.length>0){
            }
            else{
                this.cartEmpty=true;
                this.scrollHeight="height: 100%"
            }
            },1500)
        }

    onfiltercategory(category){
        this.myMenu = this.menu.filter( item =>
        {
            return item.category===category
        })
     }

    onclickAll(){

        this.myMenu=this.menu;
    }

    onorderCancel(){

        this.order.length=0;
        this.cartEmpty=true;
        this.total$=0;
        this.scrollHeight="height: 100%"
    }


}
