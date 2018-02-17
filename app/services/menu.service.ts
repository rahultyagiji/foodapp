import { Injectable } from "@angular/core";

import { Item } from "../datatypes/item";
import {Menu} from "../datatypes/menu";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class MenuService {
    private menu = new Array<Menu>(
        { cafeId:"cafe1",item:"1", name: "Samosa",imgSrc:"", price: "$10",category:"Entree"},
            { cafeId:"cafe1",item: "2", name: "Kadhai Paneer",imgSrc:"", price: "$20",category:"Mains"},
            { cafeId:"cafe1",item: "3", name: "Chicken Lababdaar",imgSrc:"", price: "$15",category:"Mains"},
            { cafeId:"cafe1",item: "4", name: "Jalebi",imgSrc:"", price: "$1",category:"Dessert"}

    );

    getMenuItems(cafeId): Menu[] {
        
        return this.menu;
    }


}
