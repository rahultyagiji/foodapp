import { Component, OnInit, ViewContainerRef } from "@angular/core";
import {Item} from "../datatypes/item";
import {Menu} from "../datatypes/menu";
import {ItemService} from "../services/item.service";
import {MenuService} from "../services/menu.service";
import {OrderService} from "../services/order.service";
import {Order} from "../datatypes/order";
import {ActivatedRoute} from "@angular/router";


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
    order:Order[]=[]
    categories:string[]=[];
    _menu:ObservableArray<Menu> = new ObservableArray<Menu>([]);
    total$:number=0;
    cartEmpty:boolean=true;
    buttondisable:boolean=false;
    scrollHeight:string="height: 100%";

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

        //this is buggered..fix it
        this.cafe = this.itemService.getSingleItem(this.route.snapshot.params["cafeid"])
        this.order=this.orderService.getOrder();
        if(this.order.length>0){this.cartEmpty=false}

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

    }

    ontapMenu(data){

    //modalcode
        let options={
            context:{},
            fullscreen:true,
            viewContainerRef:this.vcRef

        };

        this.popup.showModal(OptionspopComponent,options).then((response)=>{
            console.log(response);
        })


    }

    addtoOrderlist(data,args:EventData){
        let page = <StackLayout>args.object;
        this.orderService.Order(data,this.route.snapshot.params["cafeid"]);
        this.order = this.orderService.getOrder();

        let view = <StackLayout>page.getViewById("food1");
        view.backgroundColor = new Color("#7CA924");
        view.animate({ backgroundColor: new Color("#BCE46C"), duration: 1000 });
        view.animate({ backgroundColor: new Color("white"), duration: 1500 });



        if(this.order.length>0){this.cartEmpty=false;this.scrollHeight="height: 60%"}

        this.total$=0;
        this.order.forEach((x)=>{
        //for total
            this.total$=this.total$+x.price
        })

    }

    OnOrder(){

        this.orderService.confirmOrder(this.order,this.route.snapshot.params["cafeid"]);
        this.buttondisable = true

    }

    ontapOrder(order){
        console.log(JSON.stringify(order))

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
