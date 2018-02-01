import { Injectable } from "@angular/core";

import { Item } from "../datatypes/item";
import {Menu} from "../datatypes/menu";

@Injectable()
export class MenuService {
    private menu = new Array<Menu>(
        { cafe:1,item:1, name: "Samosa", price: "$10"},
        { cafe:1,item: 2, name: "Shashi Paneer", price: "$20"},
        { cafe:1,item: 3, name: "Chicken ka kuch", price: "$15"},
        { cafe:1,item: 4, name: "Donkey balls", price: "$1"},

    );

    getMenuItems(): Menu[] {
        return this.menu;
    }


}
