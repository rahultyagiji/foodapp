import {Component, OnInit} from "@angular/core";
import { Item } from "../datatypes/item";
import { ItemService } from "../services/item.service";
import { Router} from "@angular/router";
// import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
import {RouterExtensions} from "nativescript-angular";
import {ObservableArray} from "data/observable-array";
import { SearchBar } from "ui/search-bar";



import {AuthService} from "../services/auth.service";
import {Order} from "../datatypes/order";
import {OrderService} from "../services/order.service";
import {OrderDisplay} from "../datatypes/order.display";
import firebase = require("nativescript-plugin-firebase");

//trying location
import {Location, isEnabled, enableLocationRequest, getCurrentLocation, watchLocation, distance, clearWatch } from "nativescript-geolocation";
import {Accuracy} from "tns-core-modules/ui/enums/enums";
// var Vibrate = require("nativescript-vibrate").Vibrate;
// let vibrator = new Vibrate();


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
    orderList:{"orderNo":string,"cafe":string,"status":string}[]=[];
    _orderList:ObservableArray<{"orderNo":string,"cafe":string,"status":string}> = new ObservableArray<{"orderNo":string,"cafe":string,"status":string}>([]);
    _items:ObservableArray<Item> = new ObservableArray<Item>([]);
    orderComplexLocal:OrderDisplay[]=[];
    orderComplexLocalFilter:OrderDisplay[]=[];
    orderDisplay:OrderDisplay={"key":"","uid":"","status":"","order": null,
        "cafeOwner":"","location":"","orderNo2":"","imgSrc":"","total":""}
    _order:ObservableArray<OrderDisplay> = new ObservableArray<OrderDisplay>([]);
    frequentCafes:string[]=[];

    startLocation:Location=new Location();

    public tabSelectedIndex: number;
    public searchPhrase: string;
    username:string="";
    private _currentNotification: string;

    constructor(private itemService: ItemService,
                private router:Router,
                private routerextensions:RouterExtensions,
                private auth:AuthService,
                private orderservice:OrderService) {
        this.tabSelectedIndex = 0;
    }

    ngOnInit(): void {

        const date: Date = new Date();

        this.itemService.load()
            .subscribe((items: Array<Item>) => {
                this._items = new ObservableArray(items);
                this.items=[];
                this._items.forEach((x)=>{

                    let that = this;

        //Testing current location
                var location = getCurrentLocation({desiredAccuracy: 1, updateDistance: 10, maximumAge: 20000, timeout: 5000}).
                    then(function(loc) {
                        if (loc) {
                    var a = distance(loc,{"latitude":x.lat,"longitude":x.lng, "direction":0, "horizontalAccuracy":14,
                    "verticalAccuracy":14,"speed":0,"altitude":89,"timestamp":date});

                    if(a<10000){
                           that.items.push(x);
                    }
                    else{
                    }
                            }
                        }, function(e){
                    //push anyway
                        that.items.push(x);
                    });

                });
                this.myItems=this.items;
            });


//order load for your picks
        firebase.getCurrentUser()
            .then((token)=> {
                this.orderservice.loadOrder(token.uid)
                    .subscribe((orderlist: Array<{"orderNo":string,"cafe":string,"status":string}>) => {
                        this.orderComplexLocal=[];
                        this._orderList = new ObservableArray(orderlist);
                        this.orderList=[];
                        this._orderList.forEach((x)=>{
                            // vibrator.vibrate(2000);
                            this.orderList.push(x);
                        });

                        this.orderList.forEach((x)=>{
//get Cafe details
                            this.itemService.fetchCafeInfo(x.cafe)
                            .then((res)=>{
                                Object.keys(res.value).forEach((y)=>
                                    {
                                this.orderservice.getOrderDetails(x.cafe,x.orderNo)
                                .then((result)=>{
                                    this.orderDisplay.cafeOwner=res.value[y].name;
                                    this.orderDisplay.imgSrc = res.value[y].imgSrc;
                                    this.orderDisplay.key = result.value.key;
                                    this.orderDisplay.uid = result.value.uid;
                                    this.orderDisplay.status = result.value.status;
                                    this.orderDisplay.orderNo2 = result.value.orderNo2;
                                    this.orderDisplay.order=result.value.order;
                                    this.orderDisplay.total=this.totalPrice(this.orderDisplay.order)
                                    this.orderComplexLocal.push(this.orderDisplay);
                                    this.orderDisplay= {"key":"","uid":"","status":"","order": null,
                                        "cafeOwner":"","location":"","orderNo2":"","imgSrc":"","total":""};
                                })
                                    });
                                });
                                    });
                        });
                this.ontapListofFrequent(token.uid);
            });

    }

//Frequently visited
ontapListofFrequent(token){
    var counts: {}[];
        this.orderservice.frequentCafe(token)
        .then(
            (res) => {
                Object.keys(res.value).forEach((x) => {
                    this.frequentCafes.push(res.value[x].cafe);
                })
            })
        .catch();
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

        if (searchBar.text != ""){
            this.myItems = this.items.filter( item => {
            return `${item.name} ${item.name}`.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        });}
        else {
            setTimeout(function() {
                searchBar.dismissSoftInput();
            }, 300);
        }
    }

    searchLoaded(event) {
        this.searchPhrase = "";
    }

    public onSubmit(args) {
        let searchbar = <SearchBar>args.object;

        console.log("onSubmit");
        searchbar.dismissSoftInput();
    }


    // onSearchLayoutLoaded(event) {
    //     if (event.object.android) {
    //         event.object.android.setFocusableInTouchMode(false);
    //     }
    // }
    public onClear(args) {
        let searchbar = <SearchBar>args.object;

        console.log("onClear");
        searchbar.dismissSoftInput();
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


//For your picks...
        topThreeCafes(){

            this.orderservice.frequentCafe("CBNUluA6FogVIkOSlD4WKOFvMjf1");

        }


    onTapCurrentOrder(){
        this.orderComplexLocalFilter = this.orderComplexLocal.filter(function (x) {
            console.log("current order triggered");
            return x.status != "collected"

        })
    }


    onTapPastOrders(){
        this.orderComplexLocalFilter = this.orderComplexLocal.filter(function(x) {
            return x.status === "collected"
        })
    }

    totalPrice(order:Order[]){
        var total="0";
        order.forEach((x)=>{
            //for total
            total=(parseFloat(total)+ parseFloat(x.price)).toString();
        })
        return total;
    }

}
