import {Component, OnDestroy, OnInit, OnChanges, DoCheck, AfterContentChecked, AfterContentInit,
    AfterViewChecked, AfterViewInit, Output, ViewContainerRef, EventEmitter, Input, ChangeDetectorRef,
    ViewChild, ElementRef, Injectable} from "@angular/core";
import {OrderService} from "../services/order.service";
import {ModalDialogService, RouterExtensions} from "nativescript-angular";
import { HttpClient, HTTP_INTERCEPTORS, HttpEventType, HttpErrorResponse,
    HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from "@angular/common/http";
import {Order} from "../datatypes/order";
import {OrderpopComponent} from "../ordermodal/orderpop.component";
import {firebase} from "nativescript-plugin-firebase/firebase-common";
import * as Toast from "nativescript-toast";
import {topmost} from "ui/frame";
import { ios, run as applicationRun } from "application";
import {PanGestureEventData} from "tns-core-modules/ui/gestures";
import * as dialogs from "ui/dialogs";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
//import {timeout} from "../../platforms/android/app/src/main/assets/app/tns_modules/rxjs/operator/timeout";
//import {OnChanges} from "../../platforms/ios/DQCafev02/app/tns_modules/@angular/core/src/metadata/lifecycle_hooks";
//import firebase = require("nativescript-plugin-firebase");
const FIREBASE_FUNCTION_CHARGE = 'https://us-central1-dekyou-cafe.cloudfunctions.net/charge/';
const application = require("tns-core-modules/application");


@Injectable()
export class CustomInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log(`[CustomInterceptor] intercept url: ${req.url}`);

        return next.handle(req).pipe(
            tap(event => {
                console.log(`[CustomInterceptor] handled type: ${HttpEventType[event.type]} url: ${req.url}`);
            })
        );
    }
}

interface DataResults<T> {
    results: Array<T>;
}

interface LocalData {
    title: string;
    description: string;
}

interface RemoteData {
    name: { first: string };
    email: string;
}



@Component({
    selector: "ns-confirm-order",
    moduleId: module.id,
    templateUrl: "./order.component.html",
    styleUrls: ["./order.component.css"]
})
export class OrderConfirmComponent implements OnInit, OnChanges, OnDestroy, DoCheck,
    AfterContentChecked, AfterContentInit, AfterViewChecked,
    AfterViewInit {

    static providers = [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptor,
            multi: true,
        }
    ];

    order:Order[]=[];
    total$:number=0;
    fees$:number=30;
    totalCharge$:number=0;
    displayCart:boolean=true;
    uid:string="";
    itemCount:number=0;
    cardExists:boolean = false;
    payOrCard:string = "Add Card";
    accountID:string = "";
    customerID:string = "";
    customerName:string = "";
    key:string;
    paymentSuccess:boolean = false;
    userVendor:boolean = false;

    @Input() cafeid: string;
    @ViewChild('activityIndicator') activityIndicator: ElementRef;
    @ViewChild('pb1') pb1: ElementRef;
    @ViewChild('pb2') pb2: ElementRef;
    @Output() cartEmpty: EventEmitter<boolean> =   new EventEmitter();


    constructor(
        private orderService:OrderService,
        private routerextensions: RouterExtensions,
        private popup: ModalDialogService,
        private cdr: ChangeDetectorRef,
        private http: HttpClient,
        private vcRef: ViewContainerRef){

        this.paymentSuccess = false;

        firebase.getCurrentUser()
            .then((token)=> {
                firebase.getValue("/userInfo/"+token.uid)
                    .then((res)=>{

                        if (res.value==null) {
                            this.userVendor = true;
                            this.cardExists = true;
                            console.log("vendor user found");
                        }
                        try {
                            this.customerName = res.value.name;
                            if (!res.value.cID.isEmpty) {
                                this.cardExists=true;
                                this.payOrCard = "Click to Pay";
                                this.customerID = res.value.cID;
                                console.log("customer id is " + res.value.cID);
                            }
                        }
                        catch(error) {
                            console.log("error in order component");
                        }
                    });

                this.uid = token.uid; console.log("logged in as",token.uid)});
    }

    ngOnInit(){

        this.order=this.orderService.getOrder();
        this.totalPrice(this.order);
        console.log("order panel triggered",this.order,this.cafeid);


        firebase.getCurrentUser()
            .then((token)=> {

                firebase.getValue("/userInfo/" + token.uid)
                    .then((res)=> {
                        if (!res.value.cID.isEmpty) {
                            this.cardExists = true;
                            this.payOrCard = "Click to Pay";
                            console.log("customer id is " + res.value.cID);
                        }
                    });
            });

        var onQueryEvent = function(result) {};

        firebase.query(
            onQueryEvent,
            '/businessName/',
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value:"cafeId"},
                range: { type: firebase.QueryRangeType.EQUAL_TO, value:this.cafeid }
            }
        ).then(
            (res)=>{

                Object.keys(res.value).map((x)=>{
                    //this.cafe=res.value[x];
                    this.key=x;
                    console.log("key is " + this.key);
                });
            })
            .catch();

    }

    ngOnChanges(){
        console.log("in ngOnChanges");
        firebase.getCurrentUser()
            .then((token)=> {

                firebase.getValue("/userInfo/" + token.uid)
                    .then((res)=> {
                        if (!res.value.cID.isEmpty) {
                            this.cardExists = true;
                            this.payOrCard = "Click to Pay";
                            console.log("customer id is " + res.value.cID);
                        }
                    });
            });
    }

    ngOnDestroy(){
        //console.log("in ng Destroy");
    }

    ngDoCheck() {
        //console.log("in ng Do Check");
    }

    ngAfterContentInit() {
        //console.log("in ng After Content Init");
    }

    ngAfterContentChecked() {
        //console.log("in ng After Content Checked");
    }

    ngAfterViewInit() {
        //console.log("in ng After View Init");

        firebase.getCurrentUser()
            .then((token)=> {

                firebase.getValue("/userInfo/" + token.uid)
                    .then((res)=> {
                        if (!res.value.cID.isEmpty) {
                            this.cardExists = true;
                            this.payOrCard = "Click to Pay";
                            this.cdr.detectChanges();
                            console.log("customer id is " + res.value.cID);
                        }
                    });
            });

        //this.cdr.detectChanges();

    }

    ngAfterViewChecked() {
        //console.log("in ng After View Checked");
        this.cdr.detectChanges();
    }

    onCancelNav(){
        // let page = <Label>args.object;
        // let view = <Label>page.getViewById("cancel2");
        // view.backgroundColor = new Color("white");
        // view.animate({ backgroundColor: new Color("white"), duration: 500 });
        // view.animate({ backgroundColor: new Color("#1a626f"), duration: 500 });

        this.routerextensions.back();
    }

    increaseQuantity(item,i){
        //Remember that the quantity has been multiplied with price already... just sum it up for total

        this.order[i].quantity=this.order[i].quantity+1;
        this.order[i].priceQuantity=(parseFloat(this.order[i].price)*this.order[i].quantity).toString();
        this.totalPrice(this.order);
        this.orderService.setOrder(this.order);
        this.cartEmpty.emit(true);
    }

    decreaseQuantity(item,i){
        this.cartEmpty.emit(true);
        if(this.order[i].quantity!=0){
            this.order[i].quantity=this.order[i].quantity-1;
            this.order[i].priceQuantity=(parseFloat(this.order[i].price)*this.order[i].quantity).toString();
            this.totalPrice(this.order);
            this.deleteQuantityZero();
            this.orderService.setOrder(this.order);
            this.cartEmpty.emit(true);
        }
        else {
            this.orderService.setOrder(this.order);
            this.cartEmpty.emit(true);

        }

    }

    totalPrice(order:Order[]){
        this.total$=0;
        order.forEach((x)=>{
            //for total
            this.total$=Math.round((this.total$+ parseFloat(x.priceQuantity))*100)/100;
        })
    }

    deleteQuantityZero(){
        this.order = this.order.filter((x)=>{
            return x.quantity!=0;
        });

        if(this.order.length===0){
            this.displayCart=false;
            this.orderService.deleteCart();
            this.cartEmpty.emit(false);
        }
    };


    onOrder(){

        if (this.cardExists) {

            dialogs.prompt({
                title: "Table Number",
                message: "Please enter your table number",
                okButtonText: "OK",
                cancelButtonText: "Cancel",
                neutralButtonText: "I'm getting takeaway!",
                defaultText: "",
                inputType: dialogs.inputType.text
            }).then(r => {
                console.log("Dialog result: " + r.result + ", text: " + r.text);

                //modalcode
                /*let options = {
                 fullscreen: false,
                 viewContainerRef: this.vcRef,

                 };*/
                if (r.result == false) {

                    console.log("do nothing");

                } else {

                    console.log("vendor user is " + this.userVendor);

                    if (this.uid && !this.userVendor) {
                        //this.popup.showModal(OrderpopComponent, options).then((response)=> {
                        console.log("passing...", this.cafeid);
                        this.processPayment(this.total$, r.text);

                    }
                    else if (this.uid && this.userVendor) {
                        this.orderService.confirmOrder(this.order, this.cafeid, "vendor", this.uid, r.text, this.total$);
                        Toast.makeText("Vendor order has been placed").show();
                        this.order.length = 0;
                        this.total$ = 0;
                        this.cartEmpty.emit(false);
                        this.routerextensions.navigate(["/items", 1]);
                    }
                    else {
                        Toast.makeText("Please login to order").show();
                    }
                }
            });
        }
        else {
            alert("Please add card details under Manage Cards option.");
        }
    }

    processPayment(total, userText) {

        let activityIndicator = this.activityIndicator.nativeElement;
        let pb1 = this.pb1.nativeElement;
        let pb2 = this.pb2.nativeElement;
        activityIndicator.busy = true;
        pb1.isDisabled = true;
        pb2.isDisabled = true;
        pb1.color = "gray";
        pb2.color = "gray";
        //this.btnenabled = false;

        console.log("in process payment for cafeid " + this.cafeid);


        /*firebase.getValue("/userInfo/" + token.uid)
         .then((res)=> {
         if (!res.value.cID.isEmpty) {
         this.cardExists = true;
         this.payOrCard = "Click to Pay";
         this.cdr.detectChanges();
         console.log("customer id is " + res.value.cID);
         }
         });*/

        var obj;

        console.log("the key is " + this.key);

        total = Math.round(total*100);
        this.fees$ = Math.round(this.fees$ + (total * (1.75/100)));
        this.totalCharge$ = Math.round(total - this.fees$);

        firebase.getValue('/businessName/'+this.key)
            .then((result) => {
                    console.log("the result is " + result);
                    this.accountID = result.value.aID;
                    console.log("the existing account id is " + result.value.cafeId + " " + result.value.aID);

                    //console.log("the total is " + total);
                    //console.log ("total fee is " + this.fees$);
                    //console.log("the totalCharge is " + this.totalCharge$);
                    //console.log("the account id is " + this.accountID);
                    //console.log("the customer id is " + this.customerID);

                    this.http.request("POST",
                        FIREBASE_FUNCTION_CHARGE,
                        {
                            body: {"function":"charge", "aID": this.accountID, "cID":this.customerID,
                                "amount":total, "chargeAmount":this.totalCharge$, "currency":"AUD"},
                            headers: {"Content-Type": "application/json"},
                        }).toPromise().then( (res) => {
                        obj = res;

                        if (obj.statusCode == 200) {
                            console.log(obj.body.charge.id);
                            console.log("the charge is " + obj.body.charge.id);
                            this.paymentSuccess = true;
                            this.orderService.confirmOrder(this.order, this.cafeid, "card", this.uid, userText, this.total$);
                            Toast.makeText("Your order has been placed").show();
                            this.order.length = 0;
                            this.total$ = 0;
                            this.cartEmpty.emit(false);
                            activityIndicator.busy = false;
                            pb1.isDisabled = false;
                            pb2.isDisabled = false;
                            pb1.color = "white";
                            pb2.color = "white";
                            //this.btnenabled = true;
                            this.routerextensions.navigate(["/items", 1]);
                        }
                        else {
                            console.error("here " + obj.statusCode);
                            activityIndicator.busy = false;
                            pb1.isDisabled = false;
                            pb2.isDisabled = false;
                            pb1.color = "white";
                            pb2.color = "white";
                            //this.btnenabled = true;
                            Toast.makeText("Your payment was unsuccessful").show();
                        }
                    });

                    /*subscribe(

                     (res) => {
                     obj = res;
                     console.log(obj.body.charge.id);
                     console.log("the charge is " + obj.body.charge.id);
                     this.paymentSuccess = true;
                     this.orderService.confirmOrder(this.order, this.cafeid, "card", this.uid, userText);
                     Toast.makeText("Your order has been placed").show();
                     this.order.length = 0;
                     this.total$ = 0;
                     this.cartEmpty.emit(false);
                     activityIndicator.busy = false;
                     this.routerextensions.navigate(["/items", 1]);
                     },

                     (error) => {

                     this.onError(error);
                     console.log("here the error happens");
                     this.paymentSuccess = false;
                     activityIndicator.busy = false;
                     Toast.makeText("Your payment was unsuccessful").show();
                     },

                     () => {
                     this.routerextensions.navigate(["/items", 1]);
                     }

                     );*/

                }
            );


    }

    private onError(error: HttpErrorResponse) {
        console.log("onError " + error);
        console.dir(error);
    }

//    testing slide menu

    onPan(args: PanGestureEventData) {
        console.log("Pan!",args);
        console.log("Object that triggered the event: " + args.object);
        console.log("View that triggered the event: " + args.view);
        console.log("Event name: " + args.eventName);
        console.log("Pan delta: [" + args.deltaX + ", " + args.deltaY + "] state: " + args.state);

    }

    manageCards() {
        //this.cardExists = true;
        //this.cdr.detectChanges();
        this.ngOnDestroy();
        this.routerextensions.navigateByUrl("/cards");
    }

    updateButton(cardExist) {
        console.log("in update button");
        this.payOrCard = "Click to Pay";
        this.cardExists = cardExist;
        this.cdr.detectChanges();
    }
}