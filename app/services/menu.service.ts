import { Injectable } from "@angular/core";

import { Item } from "../datatypes/item";
import {Menu} from "../datatypes/menu";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class MenuService {
    private menu = new Array<Menu>(
        { cafeId:"cafe1",item:"1", name: "Samosa",imgSrc:"", price: "$10"},
            { cafeId:"cafe1",item: "2", name: "Shashi Paneer",imgSrc:"", price: "$20"},
            { cafeId:"cafe1",item: "3", name: "Chicken ka kuch",imgSrc:"", price: "$15"},
            { cafeId:"cafe1",item: "4", name: "Donkey balls",imgSrc:"", price: "$1"}

    );

    getMenuItems(cafeId): Menu[] {
        
        return this.menu;
    }


}
