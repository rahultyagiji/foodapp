import { Injectable } from "@angular/core";
import { Item } from "../datatypes/item";
import firebase = require("nativescript-plugin-firebase");


@Injectable()
export class ItemService {

    private businessName = "";

    private items = new Array<Item>(
        //{ id: 1, name: "Masala Curry Cafe", category: "Indian", imgSrc: "https://cdn5.norecipes.com/wp-content/uploads/2017/05/05021747/chicken-biryani-11.jpg", menu: "{menuItem1:{name:Chicken Biryani, price: 9.95}, {menuItem2:{name:Veg Biryani, price: 8.95}}"},
        //{ id: 1, name: "Masala Curry Cafe 2", category: "Indian", imgSrc: "https://cdn5.norecipes.com/wp-content/uploads/2017/05/05021747/chicken-biryani-11.jpg", menu: "{menuItem1:{name:Chicken Biryani, price: 9.95}, {menuItem2:{name:Veg Biryani, price: 8.95}}"}
        //{ id: 2, name: "Mast Japani Cafe", category: "Japani Cafe" },
        //{ id: 3, name: "Nyala", category: "Ethiopian Cafe" },
    );

    getItems(): Item[] {
        var base = "/businessName/cafe";
        var cafeName = "";
        var counter = 0;

        for(counter = 0; counter < 6; counter++) {

            var count = (counter+1).toString();
            var cafeName = cafeName.concat(base, count);
            console.log(cafeName);

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
                    //console.log("something should come here", JSON.stringify(res.value));
                    var b = res.value;
                    //console.log(JSON.stringify(b.menu));
                    //console.log(JSON.stringify(b.menu.menuItem1.name));
                    //var c = JSON.stringify(b.menu);
                    //var d = b.menu;
                    //console.log("length is " + res.value.menu.getChildrenCount());
                    this.items.push(res.value);
                })
            ).catch((res=> {
                console.log("yahan kuch panga hai...", res)
            }))
            //console.log("length is and path is " + this.items.length + " " + this.items[counter].path);
            cafeName = "";
        }

        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}
