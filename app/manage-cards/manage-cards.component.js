"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var nativescript_stripe_1 = require("nativescript-stripe");
var firebase = require("nativescript-plugin-firebase");
var auth_service_1 = require("../services/auth.service");
//import { Page } from 'ui/page';
var application = require("tns-core-modules/application");
//const stripe = new Stripe('pk_live_vQDnFzdF5EDZmRqSf7z5b0yG');
var stripe = new nativescript_stripe_1.Stripe('pk_test_l6tuKlddwfIkKUWlYj1HnxiB');
//const FIREBASE_FUNCTION = 'https://[YOUR_FIREBASE_PROJECT].cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
var FIREBASE_FUNCTION = 'https://us-central1-dekyou-cafe.cloudfunctions.net/customer/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
var FIREBASE_FUNCTION_TEST = 'https://us-central1-dekyou-cafe.cloudfunctions.net/testfunction/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
var httpModule = require("http");
//const card = require('angular-credit-cards');
var ManageCardsComponent = /** @class */ (function () {
    function ManageCardsComponent(route, vcRef, routerextensions, auth, cdr, http) {
        this.route = route;
        this.vcRef = vcRef;
        this.routerextensions = routerextensions;
        this.auth = auth;
        this.cdr = cdr;
        this.http = http;
        this.cardExist = new core_1.EventEmitter();
        //card: CardDetails;
        //cardToken:string = "";
        //ccView:CreditCardView;
        //cc: Card;
        //cc:Card = this.ccView.card;
        this.isLoading = true;
        this.customerToken = "";
        this.cardExists = false;
        this.cardNumber = "";
        this.MM = "";
        this.YY = "";
        this.CVC = "";
        this.checkCard();
    }
    ManageCardsComponent.prototype.onCCReturnPress = function (args) {
        var textField = args.object;
        this.cardNumber = textField.text;
        console.log("card number is on return " + this.cardNumber);
        setTimeout(function () {
            textField.dismissSoftInput();
        }, 100);
    };
    ManageCardsComponent.prototype.onCCReturnBlur = function (args) {
        var textField = args.object;
        this.cardNumber = textField.text;
        //console.log("card number is on blur " + this.cardNumber);
        /*setTimeout(() => {
         textField.dismissSoftInput();
         }, 100);*/
    };
    ManageCardsComponent.prototype.onMMReturnPress = function (args) {
        var textField = args.object;
        this.MM = textField.text;
        console.log("MM is on return " + this.MM);
        setTimeout(function () {
            textField.dismissSoftInput();
        }, 100);
    };
    ManageCardsComponent.prototype.onMMReturnBlur = function (args) {
        var textField = args.object;
        this.MM = textField.text;
        //console.log("MM is on blur " + this.MM);
        /*setTimeout(() => {
         textField.dismissSoftInput();
         }, 100);*/
    };
    ManageCardsComponent.prototype.onYYReturnPress = function (args) {
        var textField = args.object;
        this.YY = textField.text;
        console.log("YY is on return " + this.YY);
        setTimeout(function () {
            textField.dismissSoftInput();
        }, 100);
    };
    ManageCardsComponent.prototype.onYYReturnBlur = function (args) {
        var textField = args.object;
        this.YY = textField.text;
        //console.log("YY is on blur " + this.YY);
        /*setTimeout(() => {
         textField.dismissSoftInput();
         }, 100);*/
    };
    ManageCardsComponent.prototype.onCVCReturnPress = function (args) {
        var textField = args.object;
        this.CVC = textField.text;
        console.log("CVC is on return " + this.CVC);
        setTimeout(function () {
            textField.dismissSoftInput();
        }, 100);
    };
    ManageCardsComponent.prototype.onCVCReturnBlur = function (args) {
        var textField = args.object;
        this.CVC = textField.text;
        //console.log("CVC is on blur " + this.CVC);
        /*setTimeout(() => {
         textField.dismissSoftInput();
         }, 100);*/
    };
    ManageCardsComponent.prototype.checkCard = function () {
        var _this = this;
        firebase.getCurrentUser()
            .then(function (token) {
            console.log(token);
            //this.uid = token.uid;
            //if(token.emailVerified){this.isVerified=true;}
            firebase.getValue("/userInfo/" + token.uid)
                .then(function (res) {
                if (!res.value.cID.isEmpty) {
                    _this.cardExists = true;
                    console.log("customer id is " + res.value.cID);
                }
            });
            //.then((res)=>{this.name=res.value.name})
        }).catch(function (error) { return console.log("Trouble in paradise: " + error); });
    };
    ManageCardsComponent.prototype.ngOnInit = function () {
        this.checkCard();
        //console.log ("card ref " + this.cardRef.nativeElement.card.number);
    };
    ManageCardsComponent.prototype.ngOnChanges = function () {
        this.checkCard();
    };
    ManageCardsComponent.prototype.ngDoCheck = function () {
    };
    ManageCardsComponent.prototype.ngAfterViewInit = function () {
        this.checkCard();
    };
    ManageCardsComponent.prototype.ngAfterViewChecked = function () {
    };
    ManageCardsComponent.prototype.onCardRegister = function (args) {
        var _this = this;
        if (application.ios) {
            console.log("In Card Register with card number is" + this.cardNumber);
            var cc = new nativescript_stripe_1.Card(this.cardNumber, Number(this.MM), Number(this.YY), this.CVC);
            //const cc = new Card(this.cardNumber,2,18,"123");
            cc.name = "customer-" + cc.last4;
            console.log("the card is" + cc.card);
            console.log("is the card valid? " + cc.validateCard());
            //this.ccView = this.cardRef.nativeElement;
            //let ccView:CreditCardView = this.cardRef.nativeElement;
            //let cc:Card = ccView.card;
            //var cardToken:string;
            //this.cc = ccView.card;
            //let page = args.object;
            //const ccView:CreditCardView = page.getViewById("card");
            //cc.name = "Kushagra Mehra";
            //console.log("theCard " + cc.name);
            var obj;
            stripe.createToken(cc.card, function (error, token) {
                if (!error) {
                    //Do something with your token;
                    console.log("the card token is " + token.tokenId);
                    //this.cardToken = token.tokenId;
                    //console.log("the token of the card is 1111 " + token.tokenId);
                    //console.log ("the token json stringify is " + JSON.stringify(token));
                    //console.log ("the token json stringify and parsed is " + JSON.parse(JSON.stringify(token)));
                    /*console.log(JSON.stringify({
                     token: token.tokenId,
                     charge : {
                     amount: 100,
                     currency: "AUD",
                     }
                     }));*/
                    /*var textString = JSON.stringify({
                     token: token.tokenId,
                     charge : {
                     amount: "100",
                     currency: "AUD",
                     }
                     });*?

                     //console.log("the text string is " + textString);


                     /*this.http.request({
                     method: "POST",
                     url: FIREBASE_FUNCTION,
                     body: JSON.stringify({
                     token: token.tokenId,
                     charge : {
                     amount: "100",
                     currency: "AUD",
                     }
                     }),headers: { "Content-Type": "application/json" }
                     }).then((response) => {
                     //const result = response.body
                     //console.log ("the result is " + result);
                     console.log ("the result is " + JSON.stringify(response));
                     console.log ("the result message is " + response.body);
                     }, (e) => {
                     console.log ("error is " + e);
                     });*/
                    var textString = "";
                    /*this.http.request("POST",
                     FIREBASE_FUNCTION,
                     {
                     body: {"token": "tok_visa", "charge": {"amount": "100", "currency": "AUD"}},
                     headers: {"Content-Type": "application/json"}
                     }).subscribe(res => console.log(res.));*/
                    //{
                    //});
                    //console.log("Text string is " + textString);
                    _this.http.request("POST", FIREBASE_FUNCTION, {
                        body: {
                            "function": "customer",
                            "token": token.tokenId,
                            "charge": { "amount": "100", "currency": "AUD" }
                        },
                        headers: { "Content-Type": "application/json" }
                    }).subscribe(function (res) {
                        obj = res;
                        console.log(obj.body.customer.id);
                        _this.customerToken = obj.body.customer.id;
                        console.log("the customer token is " + _this.customerToken);
                        firebase.getCurrentUser()
                            .then(function (token) {
                            console.log(token);
                            //this.uid = token.uid;
                            //if(token.emailVerified){this.isVerified=true;}
                            firebase.update("/userInfo/" + token.uid, { cID: _this.customerToken });
                            _this.cardExists = true;
                            _this.cdr.detectChanges();
                            _this.cardExist.emit(true);
                            alert("Details Updated");
                            //.then((res)=>{this.name=res.value.name})
                        }).catch(function (error) { return console.log("Trouble in paradise: " + error); });
                        /*firebase.getCurrentUser()
                         .then(user => console.log("User uid: " + user.uid))
                         .catch(error => console.log("Trouble in paradise: " + error));*/
                        //textString = JSON.stringify(res);
                        //console.log("res is " + textString);
                        //textString = (<any>res).json;
                    });
                    //var response = JSON.parse(textString);
                    /*httpModule.request({
                     url: FIREBASE_FUNCTION,
                     method: "POST",
                     headers: { "Content-Type": "application/json" },
                     body: JSON.stringify({
                     "token": "tok_visa",
                     "charge" : {
                     "amount": "100",
                     "currency": "AUD"
                     }
                     })
                     }).then((response) => {
                     //const result = response.body
                     //console.log ("the result is " + result);
                     console.log ("the result is " + JSON.stringify(response));
                     console.log ("the result message is " + response.body);
                     }, (e) => {
                     console.log ("error is " + e);
                     });*/
                }
                else {
                    //alert("Order Confirmed");
                    //Toast.makeText("Please login to confirm order").show();
                    alert(error.toString());
                    /*dialogs.alert({
                     title: "Error",
                     message: "test",
                     okButtonText: "Please enter details again!"
                     }).then(() => {
                     console.log("Dialog closed!");
                     });*/
                    console.log("the token error is " + error);
                }
            });
            console.log("Text string is " + this.customerToken);
        }
    };
    ManageCardsComponent.prototype.onCancelNav = function () {
        console.log("in cancel navigation");
        //this.routerextensions.back();
    };
    __decorate([
        core_1.ViewChild('cardView'),
        __metadata("design:type", core_1.ElementRef)
    ], ManageCardsComponent.prototype, "cardRef", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], ManageCardsComponent.prototype, "cardExist", void 0);
    ManageCardsComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'ns-manage-cards',
            templateUrl: './manage-cards.component.html',
            styleUrls: ['./manage-cards.component.css']
        }),
        core_2.Injectable(),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            core_1.ViewContainerRef,
            router_2.RouterExtensions,
            auth_service_1.AuthService,
            core_1.ChangeDetectorRef,
            http_1.HttpClient])
    ], ManageCardsComponent);
    return ManageCardsComponent;
}());
exports.ManageCardsComponent = ManageCardsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWNhcmRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZS1jYXJkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FDOEg7QUFDOUgsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBQy9ELDJEQUFrRTtBQUNsRSx1REFBMEQ7QUFDMUQseURBQXFEO0FBR3JELGlDQUFpQztBQUVqQyxJQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsOEJBQThCLENBQUMsQ0FBQztBQUM1RCxnRUFBZ0U7QUFDaEUsSUFBTSxNQUFNLEdBQUcsSUFBSSw0QkFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDOUQsdUlBQXVJO0FBQ3ZJLElBQU0saUJBQWlCLEdBQUcsOERBQThELENBQUMsQ0FBQyw2Q0FBNkM7QUFDdkksSUFBTSxzQkFBc0IsR0FBRyxrRUFBa0UsQ0FBQyxDQUFDLDZDQUE2QztBQUNoSixJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDbkMsK0NBQStDO0FBVS9DO0lBbUJJLDhCQUNZLEtBQXFCLEVBQ3JCLEtBQXVCLEVBQ3ZCLGdCQUFrQyxFQUNsQyxJQUFpQixFQUNqQixHQUFzQixFQUN0QixJQUFnQjtRQUxoQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQWE7UUFDakIsUUFBRyxHQUFILEdBQUcsQ0FBbUI7UUFDdEIsU0FBSSxHQUFKLElBQUksQ0FBWTtRQXRCbEIsY0FBUyxHQUEwQixJQUFJLG1CQUFZLEVBQUUsQ0FBQztRQUNoRSxvQkFBb0I7UUFDcEIsd0JBQXdCO1FBQ3hCLHdCQUF3QjtRQUN4QixXQUFXO1FBRVgsNkJBQTZCO1FBRXJCLGNBQVMsR0FBRyxJQUFJLENB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QUFFO1lBQ25CLFFBQVEsRUFBRSxpQkFBaUI7WUFDM0IsV0FBVyxFQUFFLCtCQUErQjtZQUM1QyxTQUFTLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztTQUM5QyxDQUFDO1FBQ0QsaUJBQVUsRUFBRTt5Q0FxQlUsdUJBQWM7WUFDZCx1QkFBZ0I7WUFDTCx5QkFBZ0I7WUFDNUIsMEJBQVc7WUFDWix3QkFBaUI7WUFDaEIsaUJBQVU7T0F6Qm5CLG9CQUFvQixDQXVVaEM7SUFBRCwyQkFBQztDQUFBLEFBdlVELElBdVVDO0FBdlVZLG9EQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPbkNoYW5nZXMsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQsXG4gICAgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBPbkRlc3Ryb3ksIENoYW5nZURldGVjdG9yUmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN0cmlwZSwgQ2FyZCwgQ3JlZGl0Q2FyZFZpZXd9IGZyb20gJ25hdGl2ZXNjcmlwdC1zdHJpcGUnO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBUZXh0RmllbGQgfSBmcm9tIFwidWkvdGV4dC1maWVsZFwiO1xuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuLy9pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5cbmNvbnN0IGFwcGxpY2F0aW9uID0gcmVxdWlyZShcInRucy1jb3JlLW1vZHVsZXMvYXBwbGljYXRpb25cIik7XG4vL2NvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUoJ3BrX2xpdmVfdlFEbkZ6ZEY1RURabVJxU2Y3ejViMHlHJyk7XG5jb25zdCBzdHJpcGUgPSBuZXcgU3RyaXBlKCdwa190ZXN0X2w2dHVLbGRkd2ZJa0tVV2xZajFIbnhpQicpO1xuLy9jb25zdCBGSVJFQkFTRV9GVU5DVElPTiA9ICdodHRwczovL1tZT1VSX0ZJUkVCQVNFX1BST0pFQ1RdLmNsb3VkZnVuY3Rpb25zLm5ldC9jaGFyZ2UvJzsgLy8gVE9ETzogUFVUIFlPVVIgRklSRUJBU0UgRlVOQ1RJT05TIFVSTCBIRVJFXG5jb25zdCBGSVJFQkFTRV9GVU5DVElPTiA9ICdodHRwczovL3VzLWNlbnRyYWwxLWRla3lvdS1jYWZlLmNsb3VkZnVuY3Rpb25zLm5ldC9jdXN0b21lci8nOyAvLyBUT0RPOiBQVVQgWU9VUiBGSVJFQkFTRSBGVU5DVElPTlMgVVJMIEhFUkVcbmNvbnN0IEZJUkVCQVNFX0ZVTkNUSU9OX1RFU1QgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1kZWt5b3UtY2FmZS5jbG91ZGZ1bmN0aW9ucy5uZXQvdGVzdGZ1bmN0aW9uLyc7IC8vIFRPRE86IFBVVCBZT1VSIEZJUkVCQVNFIEZVTkNUSU9OUyBVUkwgSEVSRVxuY29uc3QgaHR0cE1vZHVsZSA9IHJlcXVpcmUoXCJodHRwXCIpO1xuLy9jb25zdCBjYXJkID0gcmVxdWlyZSgnYW5ndWxhci1jcmVkaXQtY2FyZHMnKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHNlbGVjdG9yOiAnbnMtbWFuYWdlLWNhcmRzJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbWFuYWdlLWNhcmRzLmNvbXBvbmVudC5odG1sJyxcbiAgICBzdHlsZVVybHM6IFsnLi9tYW5hZ2UtY2FyZHMuY29tcG9uZW50LmNzcyddXG59KVxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hbmFnZUNhcmRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIERvQ2hlY2ssIEFmdGVyVmlld0luaXQsIEFmdGVyVmlld0NoZWNrZWQge1xuXG4gICAgQFZpZXdDaGlsZCgnY2FyZFZpZXcnKSBjYXJkUmVmOiBFbGVtZW50UmVmO1xuICAgIEBPdXRwdXQoKSBjYXJkRXhpc3Q6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgICAvL2NhcmQ6IENhcmREZXRhaWxzO1xuICAgIC8vY2FyZFRva2VuOnN0cmluZyA9IFwiXCI7XG4gICAgLy9jY1ZpZXc6Q3JlZGl0Q2FyZFZpZXc7XG4gICAgLy9jYzogQ2FyZDtcblxuICAgIC8vY2M6Q2FyZCA9IHRoaXMuY2NWaWV3LmNhcmQ7XG5cbiAgICBwcml2YXRlIGlzTG9hZGluZyA9IHRydWU7XG4gICAgcHJpdmF0ZSBjdXN0b21lclRva2VuOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBjYXJkRXhpc3RzOmJvb2xlYW4gPSBmYWxzZTtcbiAgICBwdWJsaWMgY2FyZE51bWJlcjpzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBNTTpzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBZWTpzdHJpbmcgPSBcIlwiO1xuICAgIHB1YmxpYyBDVkM6c3RyaW5nID0gXCJcIjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJleHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICApIHtcbiAgICAgICAgdGhpcy5jaGVja0NhcmQoKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DQ1JldHVyblByZXNzKGFyZ3MpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuY2FyZE51bWJlciA9IHRleHRGaWVsZC50ZXh0O1xuICAgICAgICBjb25zb2xlLmxvZyhcImNhcmQgbnVtYmVyIGlzIG9uIHJldHVybiBcIiArIHRoaXMuY2FyZE51bWJlcik7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNDUmV0dXJuQmx1cihhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLmNhcmROdW1iZXIgPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcImNhcmQgbnVtYmVyIGlzIG9uIGJsdXIgXCIgKyB0aGlzLmNhcmROdW1iZXIpO1xuXG4gICAgICAgIC8qc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgfSwgMTAwKTsqL1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk1NUmV0dXJuUHJlc3MoYXJncykge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5NTSA9IHRleHRGaWVsZC50ZXh0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIk1NIGlzIG9uIHJldHVybiBcIiArIHRoaXMuTU0pO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25NTVJldHVybkJsdXIoYXJncykge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5NTSA9IHRleHRGaWVsZC50ZXh0O1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiTU0gaXMgb24gYmx1ciBcIiArIHRoaXMuTU0pO1xuXG4gICAgICAgIC8qc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgfSwgMTAwKTsqL1xuICAgIH1cblxuICAgIHB1YmxpYyBvbllZUmV0dXJuUHJlc3MoYXJncykge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5ZWSA9IHRleHRGaWVsZC50ZXh0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIllZIGlzIG9uIHJldHVybiBcIiArIHRoaXMuWVkpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25ZWVJldHVybkJsdXIoYXJncykge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5ZWSA9IHRleHRGaWVsZC50ZXh0O1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiWVkgaXMgb24gYmx1ciBcIiArIHRoaXMuWVkpO1xuXG4gICAgICAgIC8qc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgfSwgMTAwKTsqL1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNWQ1JldHVyblByZXNzKGFyZ3MpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuQ1ZDID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQ1ZDIGlzIG9uIHJldHVybiBcIiArIHRoaXMuQ1ZDKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ1ZDUmV0dXJuQmx1cihhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLkNWQyA9IHRleHRGaWVsZC50ZXh0O1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiQ1ZDIGlzIG9uIGJsdXIgXCIgKyB0aGlzLkNWQyk7XG5cbiAgICAgICAgLypzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgICB9LCAxMDApOyovXG4gICAgfVxuXG4gICAgY2hlY2tDYXJkKCkge1xuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAudGhlbigodG9rZW4pPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMudWlkID0gdG9rZW4udWlkO1xuICAgICAgICAgICAgICAgIC8vaWYodG9rZW4uZW1haWxWZXJpZmllZCl7dGhpcy5pc1ZlcmlmaWVkPXRydWU7fVxuXG4gICAgICAgICAgICAgICAgZmlyZWJhc2UuZ2V0VmFsdWUoXCIvdXNlckluZm8vXCIrdG9rZW4udWlkKVxuICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXMudmFsdWUuY0lELmlzRW1wdHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRFeGlzdHM9dHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImN1c3RvbWVyIGlkIGlzIFwiICsgcmVzLnZhbHVlLmNJRCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8udGhlbigocmVzKT0+e3RoaXMubmFtZT1yZXMudmFsdWUubmFtZX0pXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIlRyb3VibGUgaW4gcGFyYWRpc2U6IFwiICsgZXJyb3IpKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmNoZWNrQ2FyZCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nIChcImNhcmQgcmVmIFwiICsgdGhpcy5jYXJkUmVmLm5hdGl2ZUVsZW1lbnQuY2FyZC5udW1iZXIpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmNoZWNrQ2FyZCgpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpe1xuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgICAgIHRoaXMuY2hlY2tDYXJkKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCl7XG4gICAgfVxuXG4gICAgb25DYXJkUmVnaXN0ZXIgKGFyZ3Mpe1xuXG4gICAgICAgIGlmKGFwcGxpY2F0aW9uLmlvcykge1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkluIENhcmQgUmVnaXN0ZXIgd2l0aCBjYXJkIG51bWJlciBpc1wiICsgdGhpcy5jYXJkTnVtYmVyKTtcblxuICAgICAgICAgICAgY29uc3QgY2MgPSBuZXcgQ2FyZCh0aGlzLmNhcmROdW1iZXIsTnVtYmVyKHRoaXMuTU0pLCBOdW1iZXIodGhpcy5ZWSksIHRoaXMuQ1ZDKTtcbiAgICAgICAgICAgIC8vY29uc3QgY2MgPSBuZXcgQ2FyZCh0aGlzLmNhcmROdW1iZXIsMiwxOCxcIjEyM1wiKTtcbiAgICAgICAgICAgIGNjLm5hbWUgPSBcImN1c3RvbWVyLVwiICsgY2MubGFzdDQ7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgY2FyZCBpc1wiICsgY2MuY2FyZCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImlzIHRoZSBjYXJkIHZhbGlkPyBcIiArIGNjLnZhbGlkYXRlQ2FyZCgpKTtcblxuICAgICAgICAgICAgLy90aGlzLmNjVmlldyA9IHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAgICAgLy9sZXQgY2NWaWV3OkNyZWRpdENhcmRWaWV3ID0gdGhpcy5jYXJkUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAvL2xldCBjYzpDYXJkID0gY2NWaWV3LmNhcmQ7XG4gICAgICAgICAgICAvL3ZhciBjYXJkVG9rZW46c3RyaW5nO1xuXG4gICAgICAgICAgICAvL3RoaXMuY2MgPSBjY1ZpZXcuY2FyZDtcblxuICAgICAgICAgICAgLy9sZXQgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAgICAgLy9jb25zdCBjY1ZpZXc6Q3JlZGl0Q2FyZFZpZXcgPSBwYWdlLmdldFZpZXdCeUlkKFwiY2FyZFwiKTtcbiAgICAgICAgICAgIC8vY2MubmFtZSA9IFwiS3VzaGFncmEgTWVocmFcIjtcblxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoZUNhcmQgXCIgKyBjYy5uYW1lKTtcblxuICAgICAgICAgICAgdmFyIG9iajtcblxuICAgICAgICAgICAgc3RyaXBlLmNyZWF0ZVRva2VuKGNjLmNhcmQsIChlcnJvciwgdG9rZW4pPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9EbyBzb21ldGhpbmcgd2l0aCB5b3VyIHRva2VuO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSBjYXJkIHRva2VuIGlzIFwiICsgdG9rZW4udG9rZW5JZCk7XG4gICAgICAgICAgICAgICAgICAgIC8vdGhpcy5jYXJkVG9rZW4gPSB0b2tlbi50b2tlbklkO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhlIHRva2VuIG9mIHRoZSBjYXJkIGlzIDExMTEgXCIgKyB0b2tlbi50b2tlbklkKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyAoXCJ0aGUgdG9rZW4ganNvbiBzdHJpbmdpZnkgaXMgXCIgKyBKU09OLnN0cmluZ2lmeSh0b2tlbikpO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nIChcInRoZSB0b2tlbiBqc29uIHN0cmluZ2lmeSBhbmQgcGFyc2VkIGlzIFwiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0b2tlbikpKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIC8qY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLnRva2VuSWQsXG4gICAgICAgICAgICAgICAgICAgICBjaGFyZ2UgOiB7XG4gICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIkFVRFwiLFxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgfSkpOyovXG5cbiAgICAgICAgICAgICAgICAgICAgLyp2YXIgdGV4dFN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbi50b2tlbklkLFxuICAgICAgICAgICAgICAgICAgICAgY2hhcmdlIDoge1xuICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBcIjEwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IFwiQVVEXCIsXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KTsqP1xuXG4gICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhlIHRleHQgc3RyaW5nIGlzIFwiICsgdGV4dFN0cmluZyk7XG5cblxuICAgICAgICAgICAgICAgICAgICAgLyp0aGlzLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgdXJsOiBGSVJFQkFTRV9GVU5DVElPTixcbiAgICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbi50b2tlbklkLFxuICAgICAgICAgICAgICAgICAgICAgY2hhcmdlIDoge1xuICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBcIjEwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IFwiQVVEXCIsXG4gICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICB9KSxoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH1cbiAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBpcyBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IGlzIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcInRoZSByZXN1bHQgbWVzc2FnZSBpcyBcIiArIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcImVycm9yIGlzIFwiICsgZSk7XG4gICAgICAgICAgICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAvKnRoaXMuaHR0cC5yZXF1ZXN0KFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICBib2R5OiB7XCJ0b2tlblwiOiBcInRva192aXNhXCIsIFwiY2hhcmdlXCI6IHtcImFtb3VudFwiOiBcIjEwMFwiLCBcImN1cnJlbmN5XCI6IFwiQVVEXCJ9fSxcbiAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn1cbiAgICAgICAgICAgICAgICAgICAgIH0pLnN1YnNjcmliZShyZXMgPT4gY29uc29sZS5sb2cocmVzLikpOyovXG4gICAgICAgICAgICAgICAgICAgIC8ve1xuICAgICAgICAgICAgICAgICAgICAvL30pO1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGV4dCBzdHJpbmcgaXMgXCIgKyB0ZXh0U3RyaW5nKTtcblxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCI6IFwiY3VzdG9tZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbi50b2tlbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoYXJnZVwiOiB7XCJhbW91bnRcIjogXCIxMDBcIiwgXCJjdXJyZW5jeVwiOiBcIkFVRFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9iaiA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iai5ib2R5LmN1c3RvbWVyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJUb2tlbiA9IG9iai5ib2R5LmN1c3RvbWVyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgY3VzdG9tZXIgdG9rZW4gaXMgXCIgKyB0aGlzLmN1c3RvbWVyVG9rZW4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodG9rZW4pPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy51aWQgPSB0b2tlbi51aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYodG9rZW4uZW1haWxWZXJpZmllZCl7dGhpcy5pc1ZlcmlmaWVkPXRydWU7fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZShcIi91c2VySW5mby9cIiArIHRva2VuLnVpZCwge2NJRDogdGhpcy5jdXN0b21lclRva2VufSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRFeGlzdC5lbWl0KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIkRldGFpbHMgVXBkYXRlZFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy50aGVuKChyZXMpPT57dGhpcy5uYW1lPXJlcy52YWx1ZS5uYW1lfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIlRyb3VibGUgaW4gcGFyYWRpc2U6IFwiICsgZXJyb3IpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLypmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiBjb25zb2xlLmxvZyhcIlVzZXIgdWlkOiBcIiArIHVzZXIudWlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJUcm91YmxlIGluIHBhcmFkaXNlOiBcIiArIGVycm9yKSk7Ki9cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy90ZXh0U3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZXMgaXMgXCIgKyB0ZXh0U3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGV4dFN0cmluZyA9ICg8YW55PnJlcykuanNvbjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy92YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRleHRTdHJpbmcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qaHR0cE1vZHVsZS5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgIHVybDogRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9LFxuICAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInRva192aXNhXCIsXG4gICAgICAgICAgICAgICAgICAgICBcImNoYXJnZVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgXCJhbW91bnRcIjogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJBVURcIlxuICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBpcyBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IGlzIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcInRoZSByZXN1bHQgbWVzc2FnZSBpcyBcIiArIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcImVycm9yIGlzIFwiICsgZSk7XG4gICAgICAgICAgICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcIk9yZGVyIENvbmZpcm1lZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgLy9Ub2FzdC5tYWtlVGV4dChcIlBsZWFzZSBsb2dpbiB0byBjb25maXJtIG9yZGVyXCIpLnNob3coKTtcblxuICAgICAgICAgICAgICAgICAgICBhbGVydChlcnJvci50b1N0cmluZygpKTtcbiAgICAgICAgICAgICAgICAgICAgLypkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcInRlc3RcIixcbiAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJQbGVhc2UgZW50ZXIgZGV0YWlscyBhZ2FpbiFcIlxuICAgICAgICAgICAgICAgICAgICAgfSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkRpYWxvZyBjbG9zZWQhXCIpO1xuICAgICAgICAgICAgICAgICAgICAgfSk7Ki9cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgdG9rZW4gZXJyb3IgaXMgXCIgKyBlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVGV4dCBzdHJpbmcgaXMgXCIgKyB0aGlzLmN1c3RvbWVyVG9rZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25DYW5jZWxOYXYoKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbiBjYW5jZWwgbmF2aWdhdGlvblwiKTtcbiAgICAgICAgLy90aGlzLnJvdXRlcmV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cblxufVxuIl19