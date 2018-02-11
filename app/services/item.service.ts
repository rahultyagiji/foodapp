import { Injectable } from "@angular/core";
import { Item } from "../datatypes/item";
import firebase = require("nativescript-plugin-firebase");


@Injectable()
export class ItemService {


    private businessName = "";

    private items = new Array<Item>();

    getItems(): Item[] {

        firebase.query(
            ()=> {
            },
            '/businessName',
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY
                }
            }
        ).then(
            (res)=> {
                for(let uid in res.value){
                    console.log(uid);
                    this.items.push(res.value[uid])
                }
            })

        return this.items;

    }

    getItem(cafeId): Item {

        return this.items.filter(item => item.cafeId == cafeId)[0];

    }
}
