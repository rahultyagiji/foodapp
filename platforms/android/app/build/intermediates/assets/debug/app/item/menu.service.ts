import { Injectable } from "@angular/core";

import { Item } from "./item";
import {Menu} from "./menu";

@Injectable()
export class MenuService {
    private menu = new Array<Menu>(
        { cafe:1,item:1, name: "Samosa", price: "$10" },
        { cafe:1,item: 2, name: "Shashi Paneer", price: "$20" },

    );

    getMenuItems(): Menu[] {
        return this.menu;
    }


}
