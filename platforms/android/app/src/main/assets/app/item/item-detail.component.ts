import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { Item } from "../datatypes/item";
import { ItemService } from "../services/item.service";
import {Menu} from "../datatypes/menu";
import {MenuService} from "../services/menu.service";

import * as Toast from 'nativescript-toast';

@Component({
    selector: "ns-details",
    moduleId: module.id,
    templateUrl: "./item-detail.component.html"
})
export class ItemDetailComponent implements OnInit {
    item: Item;
    menu:Menu[];

    constructor(
        private itemService: ItemService,
        private menuservice: MenuService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        const id = this.route.snapshot.params["id"];
        this.item = this.itemService.getItem(id);
        this.menu=this.menuservice.getMenuItems(id);
    }

    ontapMenu(id){
        console.log("something ordered")
        var toast = Toast.makeText(id+" ordered");
        toast.show();
    }

}
