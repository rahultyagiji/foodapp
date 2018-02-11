import { Component, OnInit, ViewContainerRef } from "@angular/core";
import { Item } from "../datatypes/item";
import { ItemService } from "../services/item.service";
import { Router} from "@angular/router";
import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html"
})
export class ItemsComponent implements OnInit{
    businessName: String[];
    items: Item[];

    private map: MapboxViewApi;
    //map parameters
    access_token:string="pk.eyJ1IjoicmFodWx0eWFnaWppIiwiYSI6ImNqZGd1ZTdoZjBwczkycXJsc3M3NGthaXAifQ.8YuDqg7iO8HrAQXF9w1j_w"
    map_style:string="streets";
    latitude:string="-37.8136";
    longitude:string="144.9631";
    zoomlevel:string="14";
    ///

    constructor(private itemService: ItemService,
                private router:Router,
                private routerextension:RouterExtensions) {
    }

    ngOnInit(): void {
        this.items = this.itemService.getItems();
    }

    onMapReady(args): void {
        this.map = args.map;
        this.map.addMarkers([
            {
                id: 1,
                lat: -37.8136,
                lng: 144.9631,
                title: 'Cafe1',
                // subtitle: 'Check out Cafe1',
                onCalloutTap: () => {
                    console.log("Cafe 1 was tapped");
                    this.jumptoMenu("cafe1")
                }
            },
            {
                id: 2,
                lat: -37.811989,
                lng: 144.965845,
                title: 'Cafe2',
                // subtitle: 'Check out Cafe1',
                onCalloutTap: () => {
                    console.log("Cafe 2 was tapped");
                    this.jumptoMenu("cafe2")
                }
            },
            {
                id: 3,
                lat: -37.811040,
                lng: 144.965802,
                title: 'Cafe3',
                // subtitle: 'Check out Cafe3',
                onCalloutTap: () => {
                    console.log("Cafe 3 was tapped");
                    this.jumptoMenu("cafe3")
                }
            }
                ]
        )
            }

            jumptoMenu(cafeId){
                console.log("test..",cafeId)

                setTimeout(()=>{
                    this.routerextension.navigate(["item/",cafeId], { clearHistory: true })
                        .then(console.log)
                        .catch((err)=>{console.log("error navigating",err)})

                },100)


            }
}