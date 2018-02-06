import { Component, OnInit } from "@angular/core";

import { Item } from "../datatypes/item";
import { ItemService } from "../services/item.service";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit {
    businessName: String[];
    items: Item[];

    constructor(private itemService: ItemService) { }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
        //console.log(this.businessName);
        //this.items = this.itemService.getItems();
    }
}