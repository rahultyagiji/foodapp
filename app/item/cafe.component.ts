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


@Component({
    selector: "ns-cafe",
    moduleId: module.id,
    templateUrl: "./cafe.component.html",
    styleUrls: ["./cafe.component.css"]
})
export class CafeComponent implements OnInit {
    items:Item[];
    cafe: Item;
    menu:Menu[];
    order:Order[]=[]


    constructor(
        private itemService: ItemService,
        private menuservice: MenuService,
        private orderservice:OrderService,
        private route: ActivatedRoute,
        private popup: ModalDialogService,
        private vcRef: ViewContainerRef

    ) {
        this.items = this.itemService.getItems();
    }

    ngOnInit(): void {

        this.cafe = this.itemService.getSingleItem(this.route.snapshot.params["cafeid"])

        this.menu=this.menuservice.getMenuItems(this.route.snapshot.params["cafeid"]);

        this.order=this.orderservice.getOrder();

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
        this.orderservice.Order(data);
        this.order = this.orderservice.getOrder();

        let view = <StackLayout>page.getViewById("food1");
        view.backgroundColor = new Color("#7CA924");
        view.animate({ backgroundColor: new Color("#BCE46C"), duration: 1000 });
        view.animate({ backgroundColor: new Color("white"), duration: 1500 });
    }

    OnOrder(){
        console.log("order confirmed....")

    }

    ontapOrder(order){
        console.log(JSON.stringify(order))

    }
    removefromOrderlist(order,args:EventData){

        let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("food2");
        view.backgroundColor = new Color("#8F130C");
        view.animate({ backgroundColor: new Color("#F57A73"), duration: 1000 });
        setTimeout(()=>{ this.orderservice.removeOrder(order)
            this.order = this.orderservice.getOrder();
            view.animate({ backgroundColor: new Color("white"), duration: 1000 });},1500)



    }


}
