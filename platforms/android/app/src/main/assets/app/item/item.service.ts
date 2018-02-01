import { Injectable } from "@angular/core";
import { Item } from "./item";
import firebase = require("nativescript-plugin-firebase");


@Injectable()
export class ItemService {
    private items = new Array<Item>(
        { id: 1, name: "Masala Curry Cafe", category: "Indian Cafe" },
        { id: 2, name: "Mast Japani Cafe", category: "Japani Cafe" },
        { id: 3, name: "Nyala", category: "Ethiopian Cafe" },
    );

    getItems(): Item[] {

        var a = firebase.query(
            ()=>{},
            "/businessName/cafe",
            {
                singleEvent: true,
                orderBy:{
                    type: firebase.QueryOrderByType.KEY
                }
            }

        ).then(
            (res=>{

                console.log("something should come here",res)
            })
        ).catch((res=>{
            console.log("yahan kuch panga hai...",res)}))

        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}
