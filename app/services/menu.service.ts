import { Injectable } from "@angular/core";

import { Item } from "../datatypes/item";
import {Menu} from "../datatypes/menu";
import firebase = require("nativescript-plugin-firebase");

@Injectable()
export class MenuService {
    private menu = new Array<Menu>(
        //{ cafe:1,item:1, name: "Samosa", price: "$10"},
        //{ cafe:1,item: 2, name: "Shashi Paneer", price: "$20"},
        //{ cafe:1,item: 3, name: "Chicken ka kuch", price: "$15"},
        //{ cafe:1,item: 4, name: "Donkey balls", price: "$1"}

    );

    getMenuItems(id): Menu[] {
        var counter = 0;
        var base = "/businessName/cafe";
        base = base.concat(id.toString());
        base = base.concat("/menu/menuItem");
        console.log("in menu service " + base);
        this.menu.splice(this.menu.length);

        for (counter = 0; counter < 2; counter++) {
            var count = (counter+1).toString();
            var cafeName = base.concat(count);
            console.log("menu is " + cafeName);

            var a = firebase.query(
                ()=> {
                },
                cafeName,
                {
                    singleEvent: true,
                    orderBy: {
                        type: firebase.QueryOrderByType.KEY
                    }
                }
            ).then(
                (res=> {
                    console.log("something should come here", JSON.stringify(res.value));
                    var b = res.value;
                    //console.log(JSON.stringify(b.menu));
                    //console.log(JSON.stringify(b.menu.menuItem1.name));
                    //var c = JSON.stringify(b.menu);
                    //var d = b.menu;
                    //console.log("length is " + res.value.menu.getChildrenCount());
                    this.menu.push(res.value);
                    console.log("length is " + this.menu.length);
                })
            ).catch((res=> {
                console.log("yahan kuch panga hai...", res)
            }))
            cafeName = "";
        }
        
        return this.menu;
    }


}
