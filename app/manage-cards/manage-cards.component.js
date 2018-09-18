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
var dialogs = require("ui/dialogs");
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
        var activityIndicator = this.activityIndicator.nativeElement;
        activityIndicator.busy = true;
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
                if (application.ios) {
                    console.log("the card token is " + token.tokenId);
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
                            //alert("Details Updated");
                            //.then((res)=>{this.name=res.value.name})
                        }).catch(function (error) { return console.log("Trouble in paradise: " + error); });
                        /*firebase.getCurrentUser()
                         .then(user => console.log("User uid: " + user.uid))
                         .catch(error => console.log("Trouble in paradise: " + error));*/
                        //textString = JSON.stringify(res);
                        //console.log("res is " + textString);
                        //textString = (<any>res).json;
                    }, function (error) {
                        activityIndicator.busy = false;
                        dialogs.alert({
                            title: "Error",
                            message: "Please check the card details.",
                            okButtonText: "Ok"
                        });
                    }, function () {
                        activityIndicator.busy = false;
                        dialogs.alert({
                            title: "Success",
                            message: "Details successfully Updated. Press Ok to navigate to Home.",
                            okButtonText: "Ok"
                        }).then(function (r) {
                            _this.routerextensions.navigate([""], { clearHistory: true });
                        });
                    });
                }
                else if (application.android) {
                    console.log("the card token is " + token.getId());
                    _this.http.request("POST", FIREBASE_FUNCTION, {
                        body: {
                            "function": "customer",
                            "token": token.getId(),
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
                            firebase.update("/userInfo/" + token.uid, { cID: _this.customerToken });
                            _this.cardExists = true;
                            _this.cdr.detectChanges();
                            _this.cardExist.emit(true);
                            //alert("Details Updated");
                            //.then((res)=>{this.name=res.value.name})
                        }).catch(function (error) { return console.log("Trouble in paradise: " + error); });
                    }, function (error) {
                        activityIndicator.busy = false;
                        dialogs.alert({
                            title: "Error",
                            message: "Please check the card details.",
                            okButtonText: "Ok"
                        });
                    }, function () {
                        activityIndicator.busy = false;
                        dialogs.alert({
                            title: "Success",
                            message: "Details successfully Updated. Press Ok to navigate to Home.",
                            okButtonText: "Ok"
                        }).then(function (r) {
                            _this.routerextensions.navigate([""], { clearHistory: true });
                        });
                    });
                }
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
                /*activityIndicator.busy = false;
                dialogs.alert({
                    title: "Success",
                    message: "Details successfully Updated",
                    okButtonText: "Ok"
                }).then(r => {
                    this.routerextensions.navigate([""], {clearHistory: true});
                });*/
            }
            else {
                //alert("Order Confirmed");
                //Toast.makeText("Please login to confirm order").show();
                alert(error.toString());
                console.log("the token error is " + error);
                activityIndicator.busy = false;
            }
        });
        console.log("Text string is " + this.customerToken);
    };
    ManageCardsComponent.prototype.onCancelNav = function () {
        console.log("in cancel navigation");
        //this.routerextensions.back();
    };
    __decorate([
        core_1.ViewChild('activityIndicator'),
        __metadata("design:type", core_1.ElementRef)
    ], ManageCardsComponent.prototype, "activityIndicator", void 0);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWNhcmRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZS1jYXJkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FDOEg7QUFDOUgsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBQy9ELDJEQUFrRTtBQUNsRSx1REFBMEQ7QUFDMUQseURBQXFEO0FBRXJELG9DQUFzQztBQUN0QyxpQ0FBaUM7QUFFakMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDNUQsZ0VBQWdFO0FBQ2hFLElBQU0sTUFBTSxHQUFHLElBQUksNEJBQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQzlELHVJQUF1STtBQUN2SSxJQUFNLGlCQUFpQixHQUFHLDhEQUE4RCxDQUFDLENBQUMsNkNBQTZDO0FBQ3ZJLElBQU0sc0JBQXNCLEdBQUcsa0VBQWtFLENBQUMsQ0FBQyw2Q0FBNkM7QUFDaEosSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLCtDQUErQztBQVUvQztJQW9CSSw4QkFDWSxLQUFxQixFQUNyQixLQUF1QixFQUN2QixnQkFBa0MsRUFDbEMsSUFBaUIsRUFDakIsR0FBc0IsRUFDdEIsSUFBZ0I7UUFMaEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQVk7UUF0QmxCLGNBQVMsR0FBMEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDaEUsb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsV0FBVztRQUVYLDZCQUE2QjtRQUVyQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBVyxLQUFLLENBQUM7UUFDNUIsZUFBVSxHQUFVLEVBQUUsQ0FBQztRQUN2QixPQUFFLEdBQVUsRUFBRSxDQUFDO1FBQ2YsT0FBRSxHQUFVLEVBQUUsQ0FBQztRQUNmLFFBQUcsR0FBVSxFQUFFLENBQUM7UUFVbkIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFTSw4Q0FBZSxHQUF0QixVQUF1QixJQUFJO1FBQ3ZCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRTNELFVBQVUsQ0FBQztZQUNQLFNBQVMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ2pDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFFTSw2Q0FBYyxHQUFyQixVQUFzQixJQUFJO1FBQ3RCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ2pDLDJEQUEyRDtRQUUzRDs7bUJBRVc7SUFDZixDQUFDO0lBRU0sOENBQWUsR0FBdEIsVUFBdUIsSUFBSTtRQUN2QixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUxQyxVQUFVLENBQUM7WUFDUCxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRU0sNkNBQWMsR0FBckIsVUFBc0IsSUFBSTtRQUN0QixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxFQUFFLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUN6QiwwQ0FBMEM7UUFFMUM7O21CQUVXO0lBQ2YsQ0FBQztJQUVNLDhDQUFlLEdBQXRCLFVBQXVCLElBQUk7UUFDdkIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFMUMsVUFBVSxDQUFDO1lBQ1AsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDakMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQztJQUVNLDZDQUFjLEdBQXJCLFVBQXNCLElBQUk7UUFDdEIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxJQUFJLENBQUMsRUFBRSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7UUFDekIsMENBQTBDO1FBRTFDOzttQkFFVztJQUNmLENBQUM7SUFFTSwrQ0FBZ0IsR0FBdkIsVUFBd0IsSUFBSTtRQUN4QixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUU1QyxVQUFVLENBQUM7WUFDUCxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUNqQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBRU0sOENBQWUsR0FBdEIsVUFBdUIsSUFBSTtRQUN2QixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxHQUFHLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQztRQUMxQiw0Q0FBNEM7UUFFNUM7O21CQUVXO0lBQ2YsQ0FBQztJQUVELHdDQUFTLEdBQVQ7UUFBQSxpQkFpQkM7UUFoQkcsUUFBUSxDQUFDLGNBQWMsRUFBRTthQUNwQixJQUFJLENBQUMsVUFBQyxLQUFLO1lBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNuQix1QkFBdUI7WUFDdkIsZ0RBQWdEO1lBRWhELFFBQVEsQ0FBQyxRQUFRLENBQUMsWUFBWSxHQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ3BDLElBQUksQ0FBQyxVQUFDLEdBQUc7Z0JBQ04sRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO29CQUN6QixLQUFJLENBQUMsVUFBVSxHQUFDLElBQUksQ0FBQztvQkFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNuRCxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFUCwwQ0FBMEM7UUFDOUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCx1Q0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ2pCLHFFQUFxRTtJQUN6RSxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0lBRUQsd0NBQVMsR0FBVDtJQUVBLENBQUM7SUFFRCw4Q0FBZSxHQUFmO1FBQ0ksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFFRCxpREFBa0IsR0FBbEI7SUFDQSxDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFnQixJQUFJO1FBQXBCLGlCQWlRQztRQS9QRyxJQUFJLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUM7UUFDN0QsaUJBQWlCLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUU5QixPQUFPLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUV0RSxJQUFNLEVBQUUsR0FBRyxJQUFJLDBCQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hGLGtEQUFrRDtRQUNsRCxFQUFFLENBQUMsSUFBSSxHQUFHLFdBQVcsR0FBRyxFQUFFLENBQUMsS0FBSyxDQUFDO1FBQ2pDLE9BQU8sQ0FBQyxHQUFHLENBQUUsYUFBYSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO1FBRXZELDJDQUEyQztRQUMzQyx5REFBeUQ7UUFDekQsNEJBQTRCO1FBQzVCLHVCQUF1QjtRQUV2Qix3QkFBd0I7UUFFeEIseUJBQXlCO1FBQ3pCLHlEQUF5RDtRQUN6RCw2QkFBNkI7UUFFN0Isb0NBQW9DO1FBRXBDLElBQUksR0FBRyxDQUFDO1FBRVIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLFVBQUMsS0FBSyxFQUFFLEtBQUs7WUFFckMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNULCtCQUErQjtnQkFDL0IsaUNBQWlDO2dCQUNqQyxnRUFBZ0U7Z0JBQ2hFLHVFQUF1RTtnQkFDdkUsOEZBQThGO2dCQUc5Rjs7Ozs7O3VCQU1PO2dCQUVQOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQTRCTTtnQkFFTixJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUM7Z0JBRXBCOzs7OzswREFLMEM7Z0JBQzFDLEdBQUc7Z0JBQ0gsS0FBSztnQkFDTCw4Q0FBOEM7Z0JBRTlDLEVBQUUsQ0FBQSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUVqQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFbEQsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUNwQixpQkFBaUIsRUFDakI7d0JBQ0ksSUFBSSxFQUFFOzRCQUNGLFVBQVUsRUFBRSxVQUFVOzRCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87NEJBQ3RCLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQzt5QkFDakQ7d0JBQ0QsT0FBTyxFQUFFLEVBQUMsY0FBYyxFQUFFLGtCQUFrQixFQUFDO3FCQUNoRCxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQUEsR0FBRzt3QkFFWixHQUFHLEdBQUcsR0FBRyxDQUFDO3dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ2xDLEtBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO3dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFHM0QsUUFBUSxDQUFDLGNBQWMsRUFBRTs2QkFDcEIsSUFBSSxDQUFDLFVBQUMsS0FBSzs0QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUNuQix1QkFBdUI7NEJBQ3ZCLGdEQUFnRDs0QkFFaEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDLEdBQUcsRUFBRSxFQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsYUFBYSxFQUFDLENBQUMsQ0FBQzs0QkFFckUsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUM7NEJBQ3ZCLEtBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLENBQUM7NEJBQ3pCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUMxQiwyQkFBMkI7NEJBRTNCLDBDQUEwQzt3QkFDOUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQUEsS0FBSyxJQUFJLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsR0FBRyxLQUFLLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO3dCQUVwRTs7eUZBRWlFO3dCQUVqRSxtQ0FBbUM7d0JBQ25DLHNDQUFzQzt3QkFDdEMsK0JBQStCO29CQUNuQyxDQUFDLEVBQ0QsVUFBQSxLQUFLO3dCQUNELGlCQUFpQixDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7d0JBRS9CLE9BQU8sQ0FBQyxLQUFLLENBQUM7NEJBQ1YsS0FBSyxFQUFFLE9BQU87NEJBQ2QsT0FBTyxFQUFFLGdDQUFnQzs0QkFDekMsWUFBWSxFQUFFLElBQUk7eUJBQ3JCLENBQUMsQ0FBQTtvQkFDTixDQUFDLEVBRUQ7d0JBQ0ksaUJBQWlCLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzt3QkFFL0IsT0FBTyxDQUFDLEtBQUssQ0FBQzs0QkFDVixLQUFLLEVBQUUsU0FBUzs0QkFDaEIsT0FBTyxFQUFFLDZEQUE2RDs0QkFDdEUsWUFBWSxFQUFFLElBQUk7eUJBQ3JCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDOzRCQUNMLEtBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO3dCQUMvRCxDQUFDLENBQUMsQ0FBQztvQkFDUCxDQUFDLENBRUosQ0FBQztnQkFDTixDQUFDO2dCQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztvQkFFNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsR0FBRyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztvQkFFbEQsS0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUNwQixpQkFBaUIsRUFDakI7d0JBQ0ksSUFBSSxFQUFFOzRCQUNGLFVBQVUsRUFBRSxVQUFVOzRCQUN0QixPQUFPLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBRTs0QkFDdEIsUUFBUSxFQUFFLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFDO3lCQUNqRDt3QkFDRCxPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUM7cUJBQ2hELENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO3dCQUVoQixHQUFHLEdBQUcsR0FBRyxDQUFDO3dCQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ2xDLEtBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDO3dCQUMxQyxPQUFPLENBQUMsR0FBRyxDQUFDLHdCQUF3QixHQUFHLEtBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQzt3QkFHM0QsUUFBUSxDQUFDLGNBQWMsRUFBRTs2QkFDcEIsSUFBSSxDQUFDLFVBQUMsS0FBSzs0QkFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDOzRCQUVuQixRQUFRLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLEVBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxhQUFhLEVBQUMsQ0FBQyxDQUFDOzRCQUVyRSxLQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQzs0QkFDdkIsS0FBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsQ0FBQzs0QkFDekIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzFCLDJCQUEyQjs0QkFFM0IsMENBQTBDO3dCQUM5QyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixHQUFHLEtBQUssQ0FBQyxFQUE1QyxDQUE0QyxDQUFDLENBQUM7b0JBQ3hFLENBQUMsRUFDRyxVQUFBLEtBQUs7d0JBQ0QsaUJBQWlCLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzt3QkFDL0IsT0FBTyxDQUFDLEtBQUssQ0FBQzs0QkFDVixLQUFLLEVBQUUsT0FBTzs0QkFDZCxPQUFPLEVBQUUsZ0NBQWdDOzRCQUN6QyxZQUFZLEVBQUUsSUFBSTt5QkFDckIsQ0FBQyxDQUFBO29CQUNOLENBQUMsRUFFRDt3QkFDSSxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO3dCQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDOzRCQUNWLEtBQUssRUFBRSxTQUFTOzRCQUNoQixPQUFPLEVBQUUsNkRBQTZEOzRCQUN0RSxZQUFZLEVBQUUsSUFBSTt5QkFDckIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUM7NEJBQ0wsS0FBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7d0JBQy9ELENBQUMsQ0FBQyxDQUFDO29CQUNQLENBQUMsQ0FDSixDQUFDO2dCQUNOLENBQUM7Z0JBRUQsd0NBQXdDO2dCQUV4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NCQWtCTTtnQkFFTjs7Ozs7OztxQkFPSztZQUVULENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSiwyQkFBMkI7Z0JBQzNCLHlEQUF5RDtnQkFFekQsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUV4QixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUUzQyxpQkFBaUIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1lBQ25DLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCwwQ0FBVyxHQUFYO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLCtCQUErQjtJQUNuQyxDQUFDO0lBM1orQjtRQUEvQixnQkFBUyxDQUFDLG1CQUFtQixDQUFDO2tDQUFvQixpQkFBVTttRUFBQztJQUN2QztRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVSxpQkFBVTt5REFBQztJQUNqQztRQUFULGFBQU0sRUFBRTtrQ0FBWSxtQkFBWTsyREFBK0I7SUFKdkQsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzlDLENBQUM7UUFDRCxpQkFBVSxFQUFFO3lDQXNCVSx1QkFBYztZQUNkLHVCQUFnQjtZQUNMLHlCQUFnQjtZQUM1QiwwQkFBVztZQUNaLHdCQUFpQjtZQUNoQixpQkFBVTtPQTFCbkIsb0JBQW9CLENBK1poQztJQUFELDJCQUFDO0NBQUEsQUEvWkQsSUErWkM7QUEvWlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3RyaXBlLCBDYXJkLCBDcmVkaXRDYXJkVmlld30gZnJvbSAnbmF0aXZlc2NyaXB0LXN0cmlwZSc7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG4vL2ltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcblxuY29uc3QgYXBwbGljYXRpb24gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbi8vY29uc3Qgc3RyaXBlID0gbmV3IFN0cmlwZSgncGtfbGl2ZV92UURuRnpkRjVFRFptUnFTZjd6NWIweUcnKTtcbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUoJ3BrX3Rlc3RfbDZ0dUtsZGR3ZklrS1VXbFlqMUhueGlCJyk7XG4vL2NvbnN0IEZJUkVCQVNFX0ZVTkNUSU9OID0gJ2h0dHBzOi8vW1lPVVJfRklSRUJBU0VfUFJPSkVDVF0uY2xvdWRmdW5jdGlvbnMubmV0L2NoYXJnZS8nOyAvLyBUT0RPOiBQVVQgWU9VUiBGSVJFQkFTRSBGVU5DVElPTlMgVVJMIEhFUkVcbmNvbnN0IEZJUkVCQVNFX0ZVTkNUSU9OID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtZGVreW91LWNhZmUuY2xvdWRmdW5jdGlvbnMubmV0L2N1c3RvbWVyLyc7IC8vIFRPRE86IFBVVCBZT1VSIEZJUkVCQVNFIEZVTkNUSU9OUyBVUkwgSEVSRVxuY29uc3QgRklSRUJBU0VfRlVOQ1RJT05fVEVTVCA9ICdodHRwczovL3VzLWNlbnRyYWwxLWRla3lvdS1jYWZlLmNsb3VkZnVuY3Rpb25zLm5ldC90ZXN0ZnVuY3Rpb24vJzsgLy8gVE9ETzogUFVUIFlPVVIgRklSRUJBU0UgRlVOQ1RJT05TIFVSTCBIRVJFXG5jb25zdCBodHRwTW9kdWxlID0gcmVxdWlyZShcImh0dHBcIik7XG4vL2NvbnN0IGNhcmQgPSByZXF1aXJlKCdhbmd1bGFyLWNyZWRpdC1jYXJkcycpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICducy1tYW5hZ2UtY2FyZHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtY2FyZHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21hbmFnZS1jYXJkcy5jb21wb25lbnQuY3NzJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFuYWdlQ2FyZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgICBAVmlld0NoaWxkKCdhY3Rpdml0eUluZGljYXRvcicpIGFjdGl2aXR5SW5kaWNhdG9yOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2NhcmRWaWV3JykgY2FyZFJlZjogRWxlbWVudFJlZjtcbiAgICBAT3V0cHV0KCkgY2FyZEV4aXN0OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLy9jYXJkOiBDYXJkRGV0YWlscztcbiAgICAvL2NhcmRUb2tlbjpzdHJpbmcgPSBcIlwiO1xuICAgIC8vY2NWaWV3OkNyZWRpdENhcmRWaWV3O1xuICAgIC8vY2M6IENhcmQ7XG5cbiAgICAvL2NjOkNhcmQgPSB0aGlzLmNjVmlldy5jYXJkO1xuXG4gICAgcHJpdmF0ZSBpc0xvYWRpbmcgPSB0cnVlO1xuICAgIHByaXZhdGUgY3VzdG9tZXJUb2tlbjpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgY2FyZEV4aXN0czpib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGNhcmROdW1iZXI6c3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgTU06c3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgWVk6c3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgQ1ZDOnN0cmluZyA9IFwiXCI7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgcm91dGVyZXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgcHJpdmF0ZSBhdXRoOiBBdXRoU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgKSB7XG4gICAgICAgIHRoaXMuY2hlY2tDYXJkKCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ0NSZXR1cm5QcmVzcyhhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLmNhcmROdW1iZXIgPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgY29uc29sZS5sb2coXCJjYXJkIG51bWJlciBpcyBvbiByZXR1cm4gXCIgKyB0aGlzLmNhcmROdW1iZXIpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DQ1JldHVybkJsdXIoYXJncykge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5jYXJkTnVtYmVyID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJjYXJkIG51bWJlciBpcyBvbiBibHVyIFwiICsgdGhpcy5jYXJkTnVtYmVyKTtcblxuICAgICAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgIH0sIDEwMCk7Ki9cbiAgICB9XG5cbiAgICBwdWJsaWMgb25NTVJldHVyblByZXNzKGFyZ3MpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuTU0gPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgY29uc29sZS5sb2coXCJNTSBpcyBvbiByZXR1cm4gXCIgKyB0aGlzLk1NKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uTU1SZXR1cm5CbHVyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuTU0gPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIk1NIGlzIG9uIGJsdXIgXCIgKyB0aGlzLk1NKTtcblxuICAgICAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgIH0sIDEwMCk7Ki9cbiAgICB9XG5cbiAgICBwdWJsaWMgb25ZWVJldHVyblByZXNzKGFyZ3MpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuWVkgPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgY29uc29sZS5sb2coXCJZWSBpcyBvbiByZXR1cm4gXCIgKyB0aGlzLllZKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uWVlSZXR1cm5CbHVyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuWVkgPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIllZIGlzIG9uIGJsdXIgXCIgKyB0aGlzLllZKTtcblxuICAgICAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgIH0sIDEwMCk7Ki9cbiAgICB9XG5cbiAgICBwdWJsaWMgb25DVkNSZXR1cm5QcmVzcyhhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLkNWQyA9IHRleHRGaWVsZC50ZXh0O1xuICAgICAgICBjb25zb2xlLmxvZyhcIkNWQyBpcyBvbiByZXR1cm4gXCIgKyB0aGlzLkNWQyk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNWQ1JldHVybkJsdXIoYXJncykge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5DVkMgPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgLy9jb25zb2xlLmxvZyhcIkNWQyBpcyBvbiBibHVyIFwiICsgdGhpcy5DVkMpO1xuXG4gICAgICAgIC8qc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgfSwgMTAwKTsqL1xuICAgIH1cblxuICAgIGNoZWNrQ2FyZCgpIHtcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgLnRoZW4oKHRva2VuKT0+IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG4gICAgICAgICAgICAgICAgLy90aGlzLnVpZCA9IHRva2VuLnVpZDtcbiAgICAgICAgICAgICAgICAvL2lmKHRva2VuLmVtYWlsVmVyaWZpZWQpe3RoaXMuaXNWZXJpZmllZD10cnVlO31cblxuICAgICAgICAgICAgICAgIGZpcmViYXNlLmdldFZhbHVlKFwiL3VzZXJJbmZvL1wiK3Rva2VuLnVpZClcbiAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzLnZhbHVlLmNJRC5pc0VtcHR5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkRXhpc3RzPXRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJjdXN0b21lciBpZCBpcyBcIiArIHJlcy52YWx1ZS5jSUQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIC8vLnRoZW4oKHJlcyk9Pnt0aGlzLm5hbWU9cmVzLnZhbHVlLm5hbWV9KVxuICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJUcm91YmxlIGluIHBhcmFkaXNlOiBcIiArIGVycm9yKSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgdGhpcy5jaGVja0NhcmQoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyAoXCJjYXJkIHJlZiBcIiArIHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50LmNhcmQubnVtYmVyKTtcbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpIHtcbiAgICAgICAgdGhpcy5jaGVja0NhcmQoKTtcbiAgICB9XG5cbiAgICBuZ0RvQ2hlY2soKXtcblxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpe1xuICAgICAgICB0aGlzLmNoZWNrQ2FyZCgpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpe1xuICAgIH1cblxuICAgIG9uQ2FyZFJlZ2lzdGVyIChhcmdzKXtcblxuICAgICAgICBsZXQgYWN0aXZpdHlJbmRpY2F0b3IgPSB0aGlzLmFjdGl2aXR5SW5kaWNhdG9yLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGFjdGl2aXR5SW5kaWNhdG9yLmJ1c3kgPSB0cnVlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSW4gQ2FyZCBSZWdpc3RlciB3aXRoIGNhcmQgbnVtYmVyIGlzXCIgKyB0aGlzLmNhcmROdW1iZXIpO1xuXG4gICAgICAgIGNvbnN0IGNjID0gbmV3IENhcmQodGhpcy5jYXJkTnVtYmVyLE51bWJlcih0aGlzLk1NKSwgTnVtYmVyKHRoaXMuWVkpLCB0aGlzLkNWQyk7XG4gICAgICAgIC8vY29uc3QgY2MgPSBuZXcgQ2FyZCh0aGlzLmNhcmROdW1iZXIsMiwxOCxcIjEyM1wiKTtcbiAgICAgICAgY2MubmFtZSA9IFwiY3VzdG9tZXItXCIgKyBjYy5sYXN0NDtcbiAgICAgICAgY29uc29sZS5sb2cgKFwidGhlIGNhcmQgaXNcIiArIGNjLmNhcmQpO1xuICAgICAgICBjb25zb2xlLmxvZyhcImlzIHRoZSBjYXJkIHZhbGlkPyBcIiArIGNjLnZhbGlkYXRlQ2FyZCgpKTtcblxuICAgICAgICAvL3RoaXMuY2NWaWV3ID0gdGhpcy5jYXJkUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIC8vbGV0IGNjVmlldzpDcmVkaXRDYXJkVmlldyA9IHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICAvL2xldCBjYzpDYXJkID0gY2NWaWV3LmNhcmQ7XG4gICAgICAgIC8vdmFyIGNhcmRUb2tlbjpzdHJpbmc7XG5cbiAgICAgICAgLy90aGlzLmNjID0gY2NWaWV3LmNhcmQ7XG5cbiAgICAgICAgLy9sZXQgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAvL2NvbnN0IGNjVmlldzpDcmVkaXRDYXJkVmlldyA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJjYXJkXCIpO1xuICAgICAgICAvL2NjLm5hbWUgPSBcIkt1c2hhZ3JhIE1laHJhXCI7XG5cbiAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoZUNhcmQgXCIgKyBjYy5uYW1lKTtcblxuICAgICAgICB2YXIgb2JqO1xuXG4gICAgICAgIHN0cmlwZS5jcmVhdGVUb2tlbihjYy5jYXJkLCAoZXJyb3IsIHRva2VuKT0+IHtcblxuICAgICAgICAgICAgaWYgKCFlcnJvcikge1xuICAgICAgICAgICAgICAgIC8vRG8gc29tZXRoaW5nIHdpdGggeW91ciB0b2tlbjtcbiAgICAgICAgICAgICAgICAvL3RoaXMuY2FyZFRva2VuID0gdG9rZW4udG9rZW5JZDtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhlIHRva2VuIG9mIHRoZSBjYXJkIGlzIDExMTEgXCIgKyB0b2tlbi50b2tlbklkKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nIChcInRoZSB0b2tlbiBqc29uIHN0cmluZ2lmeSBpcyBcIiArIEpTT04uc3RyaW5naWZ5KHRva2VuKSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyAoXCJ0aGUgdG9rZW4ganNvbiBzdHJpbmdpZnkgYW5kIHBhcnNlZCBpcyBcIiArIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodG9rZW4pKSk7XG5cblxuICAgICAgICAgICAgICAgIC8qY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW4udG9rZW5JZCxcbiAgICAgICAgICAgICAgICAgY2hhcmdlIDoge1xuICAgICAgICAgICAgICAgICBhbW91bnQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgY3VycmVuY3k6IFwiQVVEXCIsXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSkpOyovXG5cbiAgICAgICAgICAgICAgICAvKnZhciB0ZXh0U3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW4udG9rZW5JZCxcbiAgICAgICAgICAgICAgICAgY2hhcmdlIDoge1xuICAgICAgICAgICAgICAgICBhbW91bnQ6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIkFVRFwiLFxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH0pOyo/XG5cbiAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoZSB0ZXh0IHN0cmluZyBpcyBcIiArIHRleHRTdHJpbmcpO1xuXG5cbiAgICAgICAgICAgICAgICAgLyp0aGlzLmh0dHAucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgIHVybDogRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLnRva2VuSWQsXG4gICAgICAgICAgICAgICAgIGNoYXJnZSA6IHtcbiAgICAgICAgICAgICAgICAgYW1vdW50OiBcIjEwMFwiLFxuICAgICAgICAgICAgICAgICBjdXJyZW5jeTogXCJBVURcIixcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KSxoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH1cbiAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgLy9jb25zdCByZXN1bHQgPSByZXNwb25zZS5ib2R5XG4gICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBpcyBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcInRoZSByZXN1bHQgaXMgXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IG1lc3NhZ2UgaXMgXCIgKyByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwiZXJyb3IgaXMgXCIgKyBlKTtcbiAgICAgICAgICAgICAgICAgfSk7Ki9cblxuICAgICAgICAgICAgICAgIHZhciB0ZXh0U3RyaW5nID0gXCJcIjtcblxuICAgICAgICAgICAgICAgIC8qdGhpcy5odHRwLnJlcXVlc3QoXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgIEZJUkVCQVNFX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgIGJvZHk6IHtcInRva2VuXCI6IFwidG9rX3Zpc2FcIiwgXCJjaGFyZ2VcIjoge1wiYW1vdW50XCI6IFwiMTAwXCIsIFwiY3VycmVuY3lcIjogXCJBVURcIn19LFxuICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9XG4gICAgICAgICAgICAgICAgIH0pLnN1YnNjcmliZShyZXMgPT4gY29uc29sZS5sb2cocmVzLikpOyovXG4gICAgICAgICAgICAgICAgLy97XG4gICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwiVGV4dCBzdHJpbmcgaXMgXCIgKyB0ZXh0U3RyaW5nKTtcblxuICAgICAgICAgICAgICAgIGlmKGFwcGxpY2F0aW9uLmlvcykge1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlIGNhcmQgdG9rZW4gaXMgXCIgKyB0b2tlbi50b2tlbklkKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucmVxdWVzdChcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEZJUkVCQVNFX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJmdW5jdGlvblwiOiBcImN1c3RvbWVyXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogdG9rZW4udG9rZW5JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFyZ2VcIjoge1wiYW1vdW50XCI6IFwiMTAwXCIsIFwiY3VycmVuY3lcIjogXCJBVURcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnN1YnNjcmliZShyZXMgPT4ge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2JqID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iai5ib2R5LmN1c3RvbWVyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmN1c3RvbWVyVG9rZW4gPSBvYmouYm9keS5jdXN0b21lci5pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSBjdXN0b21lciB0b2tlbiBpcyBcIiArIHRoaXMuY3VzdG9tZXJUb2tlbik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHRva2VuKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdGhpcy51aWQgPSB0b2tlbi51aWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2lmKHRva2VuLmVtYWlsVmVyaWZpZWQpe3RoaXMuaXNWZXJpZmllZD10cnVlO31cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFwiL3VzZXJJbmZvL1wiICsgdG9rZW4udWlkLCB7Y0lEOiB0aGlzLmN1c3RvbWVyVG9rZW59KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEV4aXN0LmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiRGV0YWlscyBVcGRhdGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy50aGVuKChyZXMpPT57dGhpcy5uYW1lPXJlcy52YWx1ZS5uYW1lfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJUcm91YmxlIGluIHBhcmFkaXNlOiBcIiArIGVycm9yKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKmZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiBjb25zb2xlLmxvZyhcIlVzZXIgdWlkOiBcIiArIHVzZXIudWlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiVHJvdWJsZSBpbiBwYXJhZGlzZTogXCIgKyBlcnJvcikpOyovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RleHRTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZXMgaXMgXCIgKyB0ZXh0U3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RleHRTdHJpbmcgPSAoPGFueT5yZXMpLmpzb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5SW5kaWNhdG9yLmJ1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlBsZWFzZSBjaGVjayB0aGUgY2FyZCBkZXRhaWxzLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlJbmRpY2F0b3IuYnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEZXRhaWxzIHN1Y2Nlc3NmdWxseSBVcGRhdGVkLiBQcmVzcyBPayB0byBuYXZpZ2F0ZSB0byBIb21lLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJcIl0sIHtjbGVhckhpc3Rvcnk6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgY2FyZCB0b2tlbiBpcyBcIiArIHRva2VuLmdldElkKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCI6IFwiY3VzdG9tZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbi5nZXRJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoYXJnZVwiOiB7XCJhbW91bnRcIjogXCIxMDBcIiwgXCJjdXJyZW5jeVwiOiBcIkFVRFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9iaiA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iai5ib2R5LmN1c3RvbWVyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJUb2tlbiA9IG9iai5ib2R5LmN1c3RvbWVyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgY3VzdG9tZXIgdG9rZW4gaXMgXCIgKyB0aGlzLmN1c3RvbWVyVG9rZW4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodG9rZW4pPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFwiL3VzZXJJbmZvL1wiICsgdG9rZW4udWlkLCB7Y0lEOiB0aGlzLmN1c3RvbWVyVG9rZW59KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEV4aXN0LmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJEZXRhaWxzIFVwZGF0ZWRcIik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8udGhlbigocmVzKT0+e3RoaXMubmFtZT1yZXMudmFsdWUubmFtZX0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJUcm91YmxlIGluIHBhcmFkaXNlOiBcIiArIGVycm9yKSk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvciA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlJbmRpY2F0b3IuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlBsZWFzZSBjaGVjayB0aGUgY2FyZCBkZXRhaWxzLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlJbmRpY2F0b3IuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGV0YWlscyBzdWNjZXNzZnVsbHkgVXBkYXRlZC4gUHJlc3MgT2sgdG8gbmF2aWdhdGUgdG8gSG9tZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoW1wiXCJdLCB7Y2xlYXJIaXN0b3J5OiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy92YXIgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHRleHRTdHJpbmcpO1xuXG4gICAgICAgICAgICAgICAgLypodHRwTW9kdWxlLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICB1cmw6IEZJUkVCQVNFX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInRva192aXNhXCIsXG4gICAgICAgICAgICAgICAgIFwiY2hhcmdlXCIgOiB7XG4gICAgICAgICAgICAgICAgIFwiYW1vdW50XCI6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJBVURcIlxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgIC8vY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuYm9keVxuICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nIChcInRoZSByZXN1bHQgaXMgXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IGlzIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBtZXNzYWdlIGlzIFwiICsgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcImVycm9yIGlzIFwiICsgZSk7XG4gICAgICAgICAgICAgICAgIH0pOyovXG5cbiAgICAgICAgICAgICAgICAvKmFjdGl2aXR5SW5kaWNhdG9yLmJ1c3kgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkaWFsb2dzLmFsZXJ0KHtcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU6IFwiU3VjY2Vzc1wiLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIkRldGFpbHMgc3VjY2Vzc2Z1bGx5IFVwZGF0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgb2tCdXR0b25UZXh0OiBcIk9rXCJcbiAgICAgICAgICAgICAgICB9KS50aGVuKHIgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoW1wiXCJdLCB7Y2xlYXJIaXN0b3J5OiB0cnVlfSk7XG4gICAgICAgICAgICAgICAgfSk7Ki9cblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiT3JkZXIgQ29uZmlybWVkXCIpO1xuICAgICAgICAgICAgICAgIC8vVG9hc3QubWFrZVRleHQoXCJQbGVhc2UgbG9naW4gdG8gY29uZmlybSBvcmRlclwiKS5zaG93KCk7XG5cbiAgICAgICAgICAgICAgICBhbGVydChlcnJvci50b1N0cmluZygpKTtcblxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlIHRva2VuIGVycm9yIGlzIFwiICsgZXJyb3IpO1xuXG4gICAgICAgICAgICAgICAgYWN0aXZpdHlJbmRpY2F0b3IuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIlRleHQgc3RyaW5nIGlzIFwiICsgdGhpcy5jdXN0b21lclRva2VuKTtcbiAgICB9XG5cbiAgICBvbkNhbmNlbE5hdigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImluIGNhbmNlbCBuYXZpZ2F0aW9uXCIpO1xuICAgICAgICAvL3RoaXMucm91dGVyZXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG59XG4iXX0=