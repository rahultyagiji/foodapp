import {Component, OnInit} from "@angular/core";
import { Item } from "../datatypes/item";
import { ItemService } from "../services/item.service";
import {ActivatedRoute} from "@angular/router";
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
import {StackLayout} from "ui/layouts/stack-layout";
import {Color} from "tns-core-modules/color";
// import {and} from "../../platforms/ios/DQCafev02/app/tns_modules/@angular/router/src/utils/collection";
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
                private route:ActivatedRoute,
                private routerextensions:RouterExtensions,
                private auth:AuthService,
                private orderservice:OrderService) {

        if(this.route.snapshot.params["tabId"] != null && this.route.snapshot.params["tabId"] == 1) {
            this.tabSelectedIndex = 1;
        } else {
            this.tabSelectedIndex = 0;
        }
    }

    ngOnInit(): void {

        if(this.items!=[]){
            this.itemService.load()
                .subscribe((items: Array<Item>) => {
                    this._items = new ObservableArray(items);
                    this.items=[];
                    this._items.forEach((x)=>{
                        this.items.push(x);
                    });
                    this.myItems.length=0;
                    this.filterByLocation();
                });
        }
        else{
            console.log("not loading again")
        }


//order load for your picks
        firebase.getCurrentUser()
            .then((token)=> {
                console.log(token);
                this.orderservice.loadOrder(token.uid)
                    .subscribe((orderlist: Array<{"orderNo":string,"cafe":string,"status":string}>) => {
                        this.orderComplexLocal=[];
                        this._orderList = new ObservableArray(orderlist);
                        this.orderList=[];
                        this._orderList.forEach((x)=>{
                            this.orderList.push(x);
                        });

                        this.orderList.forEach((x)=>{
//get Cafe details
                            this.orderservice.getOrderDetails(x.cafe,x.orderNo)
                                .then((result)=>{
                                    this.orderDisplay.cafeOwner=this.itemService.getCafeInfo(x.cafe).name;
                                    this.orderDisplay.imgSrc = this.itemService.getCafeInfo(x.cafe).imgSrc;
                                    this.orderDisplay.key = result.value.key;
                                    this.orderDisplay.uid = result.value.uid;
                                    this.orderDisplay.status = result.value.status;
                                    this.orderDisplay.orderNo2 = result.value.orderNo2;
                                    this.orderDisplay.order=result.value.order;
                                    this.orderDisplay.total=this.totalPrice(this.orderDisplay.order)
                                    this.orderComplexLocal.push(this.orderDisplay);
                                    this.onTapCurrentOrder();
                                    this.orderDisplay= {"key":"","uid":"","status":"","order": null,
                                        "cafeOwner":"","location":"","orderNo2":"","imgSrc":"","total":""};
                                })
                        });
                    });
                this.ontapListofFrequent(token.uid);
            });

    }

//Frequently visited - to be completed ....
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
    jumptoMenu(cafeId,args) {
        let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("cafename");
        view.backgroundColor = new Color("#f0f0f0");
        view.animate({ backgroundColor: new Color("white"), duration: 200 });

        this.routerextensions.navigate(["/cafe", cafeId]);
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
        if (searchBar.text!=""){
            let searchValue = searchBar.text.toLowerCase();
            if (searchBar.text != ""){
                this.myItems = this.items.filter( item => {
                    return `${item.name} ${item.name}`.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
                });
            }
            else {
                setTimeout(function() {
                    searchBar.dismissSoftInput();
                }, 300);
            }
        }
        else{
            // this.myItems.length=0;
            // this.filterByLocation();
        }
    }

    searchLoaded(event) {
        console.log("search loaded triggered");
        this.searchPhrase = "";
        event.object.android.setFocusable(false);
    }

    public onSubmit(args) {
        let searchbar = <SearchBar>args.object;
        searchbar.dismissSoftInput();
    }


    public onClear(args) {
        let searchbar = <SearchBar>args.object;
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
            total=(Math.round((parseFloat(total)+ parseFloat(x.price))*100)/100).toString();
        });
        return total;
    }

    filterByLocation(){
        const date: Date = new Date();
        this.items.forEach((x)=>{

            this.myItems.length=0;
            let that = this;

            getCurrentLocation({desiredAccuracy: 1, updateDistance: 10, maximumAge: 20000, timeout: 5000}).
            then(function(loc) {
                if (loc) {
                    var a = distance(loc,{"latitude":x.lat,"longitude":x.lng, "direction":0, "horizontalAccuracy":14,
                        "verticalAccuracy":14,"speed":0,"altitude":89,"timestamp":date});
                    if(a<25000){
                        that.myItems.push(x);
                    }
                    else{
                        //remove this when we need filtering by location
                        // that.myItems.push(x);
                    }
                }
            }, function(e){
                //push anyway
                that.myItems.push(x);
            });

        })
    }

}
