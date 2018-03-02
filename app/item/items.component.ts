import {ChangeDetectorRef, Component, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import { Item } from "../datatypes/item";
import { ItemService } from "../services/item.service";
import { Router} from "@angular/router";
import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
import {RouterExtensions} from "nativescript-angular";
import {ObservableArray} from "data/observable-array";
import { SearchBar } from "ui/search-bar";
import {isAndroid} from "platform"

import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
import {DrawerStateChangedEventArgs, RadSideDrawer} from 'nativescript-pro-ui/sidedrawer';
import {AuthService} from "../services/auth.service";


@Component({
    selector: "ns-items",
    moduleId: module.id,
    templateUrl: "./items.component.html",
    styleUrls:["./items.component.css"]
})

export class ItemsComponent implements OnInit{
    businessName: String[];
    items: Item[]=[];
    myItems:Item[]=[];
    _items:ObservableArray<Item> = new ObservableArray<Item>([]);
    public tabSelectedIndex: number;
    public searchPhrase: string;

    private _currentNotification: string;

    private map: MapboxViewApi;
    //map parameters
    access_token:string="pk.eyJ1IjoicmFodWx0eWFnaWppIiwiYSI6ImNqZGd1ZTdoZjBwczkycXJsc3M3NGthaXAifQ.8YuDqg7iO8HrAQXF9w1j_w"
    map_style:string="streets";
    latitude:string ="-37.8136";
    longitude:string="144.9631";
    zoomlevel:string="15";
    ///

    constructor(private itemService: ItemService,
                private router:Router,
                private routerextensions:RouterExtensions,
                private _changeDetectionRef: ChangeDetectorRef,
                private auth:AuthService) {
        this.tabSelectedIndex = 1;
    }

    @ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngOnInit(): void {
        this.itemService.load()
            .subscribe((items: Array<Item>) => {
                this._items = new ObservableArray(items);
                this.items=[];
                this._items.forEach((x)=>{
                    this.items.push(x);
                })
                this.myItems=this.items;
            });
    }

//MapView
    onMapReady(args): void {
        this.map = args.map;

//this is hard coded this needs to be made dynamic
            this.map.addMarkers([
                    {
                        id: 1,
                        lat: -37.8136,
                        lng: 144.9631,
                        title: 'Cafe1',
                        // subtitle: 'Check out Cafe1',
                        onCalloutTap: ()=> {
                            this.jumptoMenu('cafe1')
                        }
                    },
                    {
                        id: 2,
                        lat: -37.811989,
                        lng: 144.965845,
                        title: 'Cafe2',
                        // subtitle: 'Check out Cafe1',
                        onCalloutTap: ()=> {
                            this.jumptoMenu('cafe2')
                        }
                    },
                    {
                        id: 3,
                        lat: -37.811040,
                        lng: 144.965802,
                        title: 'Cafe3',
                        // subtitle: 'Check out Cafe3',
                        onCalloutTap: () => {
                            this.jumptoMenu('cafe3')
                        }
                    }
                ]
            )


            }

//Navitage to next screen
            jumptoMenu(cafeId) {
               setTimeout(() =>{this.routerextensions.navigate(["/cafe", cafeId],
                    {
                        animated: true,
                        transition: {
                            name: "slide",
                            duration: 200,
                            curve: "ease"
                        }
                    }),100});
            }
//
// //TabView controls
    changeTab() {
        if (this.tabSelectedIndex === 0) {
            this.tabSelectedIndex = 1;
        } else if (this.tabSelectedIndex === 1) {
            this.tabSelectedIndex = 2;
        } else if (this.tabSelectedIndex === 2) {
            this.tabSelectedIndex = 0;
        }
    }

// search bar

    public onTextChanged(args) {
        let searchBar = <SearchBar>args.object;
        let searchValue = searchBar.text.toLowerCase();

        this.myItems = this.items.filter( item => {
            return `${item.name} ${item.name}`.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        });


    }

    searchLoaded(event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }

    }

    onSearchLayoutLoaded(event) {
        if (event.object.android) {
            event.object.android.setFocusableInTouchMode(true);
        }
    }


    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }


    openDrawer() {
        this.drawer.showDrawer();
    }

onDrawerOpened(args: DrawerStateChangedEventArgs) {
        this._currentNotification = "Drawer opened";
    }


    onCloseDrawerTap() {
        this.drawer.closeDrawer();
    }


    onRegister(){

    this.routerextensions.navigate(['register']);

    }

    onSignin(){

        this.routerextensions.navigate(['signin']);

    }

    onSignout(){

        this.auth.signout();
    }
}
