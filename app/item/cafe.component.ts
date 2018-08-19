import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ElementRef} from "@angular/core";
import {Item} from "../datatypes/item";
import {Menu} from "../datatypes/menu";
import {ItemService} from "../services/item.service";
import {MenuService} from "../services/menu.service";
import {OrderService} from "../services/order.service";
import {Order} from "../datatypes/order";
import {ActivatedRoute} from "@angular/router";
import * as Toast from 'nativescript-toast';
import firebase = require("nativescript-plugin-firebase");
import {View} from "ui/core/view";
import { Color } from 'color';
import {EventData} from "tns-core-modules/data/observable";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {ModalDialogService} from "nativescript-angular/directives/dialogs";
import {OptionspopComponent} from "./optionspop.component";
import {ObservableArray} from "data/observable-array";
//var ObservableArray = new ObservableArray.observable();
import {RouterExtensions} from "nativescript-angular";
import labelModule = require("ui/label");
var label = new labelModule.Label();

//import { Label } from 'ui/label';
//const labelModule = require("tns-core-modules/ui/label");
//const view = new labelModule.Label();
//let view: Label;



//const ObservableArray = require("data/observablearray");


class FavList {
    constructor(public name: string,public timestamp) { }
}

@Component({
    selector: "ns-cafe",
    moduleId: module.id,
    templateUrl: "./cafe.component.html",
    styleUrls: ["./cafe.component.css"]
})
export class CafeComponent implements OnInit, OnDestroy {

    @ViewChild('scrollbar') scrollBarRef: ElementRef;
    @ViewChild('categoryScroll') categoryRef: ElementRef;

    cafe: Item;
    menu:Menu[];
    myMenu:Menu[];
    favList:Array<FavList>=[];
    uid:string;
    order:Order[]=[];
    categories:string[]=[];
    _menu:ObservableArray<Menu> = new ObservableArray<Menu>([]);
    //_menu:Menu = new ObservableArray<Menu>([]);
    total$:number=0;
    itemCount:number=0;
    cartEmpty:boolean=true;
    buttondisable:boolean=false;
    confirmbuttondisable:boolean=false;
    scrollHeight:string="height: 90%";
    scrollHeightBase:string="height:10%;width: 100%;border-width: 1px";
    imageVisible:boolean=true;
    touchDirection:number=0;
    opacity:string="1";
    cartCafe:string="";
    toggleMenuCart:boolean=true;
    menuorcart:string="Menu";

    public tabSelectedIndex: number;

    constructor(
        private itemService: ItemService,
        private menuService: MenuService,
        private orderService:OrderService,
        private route: ActivatedRoute,
        private popup: ModalDialogService,
        private vcRef: ViewContainerRef,
        private routerextensions: RouterExtensions
    ) {
        firebase.getCurrentUser()
            .then((token)=> {
                this.uid = token.uid});

        }

    ngOnInit(): void {

 //Also load cart...
        this.orderService.getCart(this.uid)
            .then((res)=> {
                Object.keys(res.value).forEach((x)=>{

                    if(res.value[x].cafe!=this.route.snapshot.params["cafeId"]){
                        Toast.makeText("Removed cart items from another cafe","2500").show();
                        this.orderService.removeCart(this.uid);
                        this.orderService.deleteCart();
                    }
                    else{
                        this.order = res.value[x].cart;
                        this.cartCafe=res.value[x].cafe;
                        this.cartEmpty=false;
                        this.checkCartStatus();
                        this.orderService.setOrder(this.order);
                        let orderCount = 0;
                        for (let i=0; i<this.order.length;i++) {
                            orderCount = orderCount + this.order[i].quantity;
                        }
                        this.itemCount = orderCount;
                        //this.itemCount=this.order.length;
                        this.totalPrice(res.value[x].cart);
                    }
                });
                this.orderService.removeCart(this.uid)
            });

        this.cafe=this.itemService.getCafeInfo(this.route.snapshot.params["cafeId"]);

//menu load
        this.menuService.loadMenu(this.route.snapshot.params["cafeId"])
            .subscribe((menu: Array<Menu>) => {
                this._menu = new ObservableArray(menu);
                this.menu=[];
                this.menu=this._menu.sort((a,b)=>a.item-b.item);
                this._menu.forEach((x)=>{
                    // this.menu.push(x);
                    this.categories.push(x.category);
                })
                this.myMenu=this.menu;
                this.categories = this.categories.filter(function (item, i, array) {
                    return array.indexOf(item) === i;
                });
            });

        //display last few picks from this cafe
        this.orderService.fetchCafeOrdersForUser(this.route.snapshot.params["cafeId"],this.uid)
            .then((x)=>{

                Object.keys(x.value).forEach((y)=>{
                    x.value[y].order.forEach((z)=>{
                    this.favList.push({name:z.name,timestamp:x.value.timestamp});
                    });
                })
                this.favList=this.favList.sort((a,b)=>a.timestamp-b.timestamp).splice(0,3);
            })
            .catch((err)=>{});
    }

    ngOnChanges(){
        this.order = this.orderService.getOrder();
        this.totalPrice(this.orderService.getOrder());
        if(this.order.length>0) {
            if(this.order[0].cafeId!=this.route.snapshot.params["cafeid"]) {
                this.confirmbuttondisable = true;
            }
            this.cartEmpty=false;
            this.scrollHeight="height: 90%"
        } else if (this.order.length == 0) {
            this.cartEmpty=true;
        }
        this.order = this.orderService.getOrder();
        let orderCount = 0;
        for (let i=0; i<this.order.length;i++) {
            orderCount = orderCount + this.order[i].quantity;
        }
        this.itemCount = orderCount;
        //this.itemCount=this.order.length;
        this.totalPrice(this.orderService.getOrder());
    }


    ontapMenu(data:Menu,args){

        let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("menuitem");
        view.backgroundColor = new Color("#f0f0f0");
        view.animate({ backgroundColor: new Color("white"), duration: 200 });


        //modalcode
        let options={
            context:data,
            fullscreen:true,
            viewContainerRef:this.vcRef,

        };

        this.popup.showModal(OptionspopComponent,options).then((response)=>{
            if(response.response=='true') {
                    this.orderService.Order(data, this.route.snapshot.params["cafeid"],response.specialInstruction,response.option,response.extras);
                    this.order = this.orderService.getOrder();
                    if (this.order.length > 0) {
                        this.cartEmpty = false;
                        this.scrollHeight = "height: 90%"
                    }
                    this.totalPrice(this.order);
                    let orderCount = 0;
                    for (let i=0; i<this.order.length;i++) {
                        orderCount = orderCount + this.order[i].quantity;
                    }
                    this.itemCount = orderCount;
                    Toast.makeText(data.name+" added to Cart!","1500").show()};
        })
    }

    addtoOrderlist(data,args:EventData){
        this.orderService.Order(data,this.route.snapshot.params["cafeid"],"",null,null);
        this.order = this.orderService.getOrder();

        ///
        if(this.order.length>0){
            this.cartEmpty=false;this.scrollHeight="height: 90%";
            this.totalPrice(this.order);
        }
    }

    OnViewCart(args){
        this.toggleMenuCart=false;
        this.menuorcart="Cart";
    }


    onfiltercategory(category,args){

        let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("category");
        view.backgroundColor = new Color("#1a626f");
        //view.color = new Color("white");
        view.animate({ backgroundColor: new Color("white"), duration: 600 });
        //view.animate({ backgroundColor: new Color("white"), duration: 200 });

        this.myMenu = this.menu.filter( item =>
        {
            return item.category===category
        })
    }

    onclickAll(args){

        let scrollBar = this.scrollBarRef.nativeElement;
        //let view = this.page.getViewById("all");


        scrollBar.backgroundColor = new Color("#1a626f");
        scrollBar.animate({ backgroundColor: new Color("white"), duration: 600 });
        scrollBar.backgroundColor = new Color("white");
        //scrollBar.animate({ backgroundColor: new Color("#1a626f"), duration: 200 });
        //scrollBar.animate({ backgroundColor: new Color("white"), duration: 200 });

        /*let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("all");
        view.backgroundColor = new Color("#1a626f");
        view.animate({ backgroundColor: new Color("#1a626f"), duration: 200 });
        view.animate({ backgroundColor: new Color("white"), duration: 200 });*/


        this.myMenu=this.menu;
    }

    onorderCancel(){

        this.order.length=0;
        this.cartEmpty=true;
        this.total$=0;
        this.scrollHeight="height: 90%"
    }


    onCancelNav(){
        this.routerextensions.back();
    }

    totalPrice(order:Order[]){
        this.total$=0;
        order.forEach((x)=>{
            //for total
            this.total$=Math.round((this.total$+ parseFloat(x.priceQuantity))*100)/100;
        });
    }


    checkCartStatus() {
        if (this.order.length > 0) {
            if (this.order[0].cafeId != this.route.snapshot.params["cafeid"]) {
                this.confirmbuttondisable = true;
            }
            this.cartEmpty = false;
            this.scrollHeight = "height: 90%"
        }
        else if (this.order.length == 0) {
            this.scrollHeight = "height:90%"
        }
    }


    ngOnDestroy(){
        if(this.order.length!=0) {
            this.orderService.addToCart(this.cafe.cafeId, this.order, this.uid)
        }
    }

    OnViewMenu(args){
        this.toggleMenuCart=true;
        this.menuorcart="Menu";

    }

    cartInfoReturned(cartDisplay){

        // this.cartEmpty=cartDisplay;
        this.toggleMenuCart=!cartDisplay;
        this.order=this.orderService.getOrder();
        this.totalPrice(this.orderService.getOrder());
        let orderCount = 0;
        for (let i=0; i<this.order.length;i++) {
            orderCount = orderCount + this.order[i].quantity;
        }
        this.itemCount = orderCount;
        //this.itemCount=this.order.length;
        if (this.order.length===0){
            this.cartEmpty=true;
            this.toggleMenuCart=true;
        }
    }
}