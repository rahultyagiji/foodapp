import { Component, OnInit } from "@angular/core";
import {Item} from "./datatypes/item";
import {Menu} from "./datatypes/menu";
import {ItemService} from "./services/item.service";
import {MenuService} from "./services/menu.service";
import {OrderService} from "./services/order.service";
import {Order} from "./datatypes/order";
import {ActivatedRoute} from "@angular/router";
import {ListViewEventData} from "nativescript-pro-ui/listview";

@Component({
    selector: "ns-cafe",
    moduleId: module.id,
    templateUrl: "./cafe.component.html"
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
        private route: ActivatedRoute
    ) {
        this.items = this.itemService.getItems();
    }

    ngOnInit(): void {

        this.cafe = this.itemService.getSingleItem(this.route.snapshot.params["cafeid"])

        this.menu=this.menuservice.getMenuItems(this.route.snapshot.params["cafeid"]);

        this.order=this.orderservice.getOrder();

    }

    ontapMenu(data){

        console.log(JSON.stringify(data),"Options will be added here...")

    }

    addtoOrderlist(data){
        this.orderservice.Order(data);
        this.order = this.orderservice.getOrder();
    }

    OnOrder(){
        console.log("order confirmed....")

    }

    ontapOrder(order){
        console.log(JSON.stringify(order))

    }
    removefromOrderlist(order){
        this.orderservice.removeOrder(order)
        this.order = this.orderservice.getOrder();

    }


}
