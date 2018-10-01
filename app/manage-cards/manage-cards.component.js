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
        this.last4 = "";
        this.brand = "";
        this.last4 = "";
        this.brand = "";
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
                    _this.last4 = res.value.last4;
                    _this.brand = res.value.brand;
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
                            firebase.update("/userInfo/" + token.uid, { last4: cc.last4 });
                            firebase.update("/userInfo/" + token.uid, { brand: cc.brand });
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
                            firebase.update("/userInfo/" + token.uid, { last4: cc.last4 });
                            firebase.update("/userInfo/" + token.uid, { brand: cc.brand });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWNhcmRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZS1jYXJkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FDOEg7QUFDOUgsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBQy9ELDJEQUFrRTtBQUNsRSx1REFBMEQ7QUFDMUQseURBQXFEO0FBRXJELG9DQUFzQztBQUN0QyxpQ0FBaUM7QUFFakMsSUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7QUFDNUQsZ0VBQWdFO0FBQ2hFLElBQU0sTUFBTSxHQUFHLElBQUksNEJBQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQzlELHVJQUF1STtBQUN2SSxJQUFNLGlCQUFpQixHQUFHLDhEQUE4RCxDQUFDLENBQUMsNkNBQTZDO0FBQ3ZJLElBQU0sc0JBQXNCLEdBQUcsa0VBQWtFLENBQUMsQ0FBQyw2Q0FBNkM7QUFDaEosSUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ25DLCtDQUErQztBQVUvQztJQXNCSSw4QkFDWSxLQUFxQixFQUNyQixLQUF1QixFQUN2QixnQkFBa0MsRUFDbEMsSUFBaUIsRUFDakIsR0FBc0IsRUFDdEIsSUFBZ0I7UUFMaEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQVk7UUF4QmxCLGNBQVMsR0FBMEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDaEUsb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsV0FBVztRQUVYLDZCQUE2QjtRQUVyQixjQUFT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QUErQjtJQUNuQyxDQUFDO0lBcmErQjtRQUEvQixnQkFBUyxDQUFDLG1CQUFtQixDQUFDO2tDQUFvQixpQkFBVTttRUFBQztJQUN2QztRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVSxpQkFBVTt5REFBQztJQUNqQztRQUFULGFBQU0sRUFBRTtrQ0FBWSxtQkFBWTsyREFBK0I7SUFKdkQsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzlDLENBQUM7UUFDRCxpQkFBVSxFQUFFO3lDQXdCVSx1QkFBYztZQUNkLHVCQUFnQjtZQUNMLHlCQUFnQjtZQUM1QiwwQkFBVztZQUNaLHdCQUFpQjtZQUNoQixpQkFBVTtPQTVCbkIsb0JBQW9CLENBeWFoQztJQUFELDJCQUFDO0NBQUEsQUF6YUQsSUF5YUM7QUF6YVksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3RyaXBlLCBDYXJkLCBDcmVkaXRDYXJkVmlld30gZnJvbSAnbmF0aXZlc2NyaXB0LXN0cmlwZSc7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7IFRleHRGaWVsZCB9IGZyb20gXCJ1aS90ZXh0LWZpZWxkXCI7XG5pbXBvcnQgKiBhcyBkaWFsb2dzIGZyb20gXCJ1aS9kaWFsb2dzXCI7XG4vL2ltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcblxuY29uc3QgYXBwbGljYXRpb24gPSByZXF1aXJlKFwidG5zLWNvcmUtbW9kdWxlcy9hcHBsaWNhdGlvblwiKTtcbi8vY29uc3Qgc3RyaXBlID0gbmV3IFN0cmlwZSgncGtfbGl2ZV92UURuRnpkRjVFRFptUnFTZjd6NWIweUcnKTtcbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUoJ3BrX3Rlc3RfbDZ0dUtsZGR3ZklrS1VXbFlqMUhueGlCJyk7XG4vL2NvbnN0IEZJUkVCQVNFX0ZVTkNUSU9OID0gJ2h0dHBzOi8vW1lPVVJfRklSRUJBU0VfUFJPSkVDVF0uY2xvdWRmdW5jdGlvbnMubmV0L2NoYXJnZS8nOyAvLyBUT0RPOiBQVVQgWU9VUiBGSVJFQkFTRSBGVU5DVElPTlMgVVJMIEhFUkVcbmNvbnN0IEZJUkVCQVNFX0ZVTkNUSU9OID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtZGVreW91LWNhZmUuY2xvdWRmdW5jdGlvbnMubmV0L2N1c3RvbWVyLyc7IC8vIFRPRE86IFBVVCBZT1VSIEZJUkVCQVNFIEZVTkNUSU9OUyBVUkwgSEVSRVxuY29uc3QgRklSRUJBU0VfRlVOQ1RJT05fVEVTVCA9ICdodHRwczovL3VzLWNlbnRyYWwxLWRla3lvdS1jYWZlLmNsb3VkZnVuY3Rpb25zLm5ldC90ZXN0ZnVuY3Rpb24vJzsgLy8gVE9ETzogUFVUIFlPVVIgRklSRUJBU0UgRlVOQ1RJT05TIFVSTCBIRVJFXG5jb25zdCBodHRwTW9kdWxlID0gcmVxdWlyZShcImh0dHBcIik7XG4vL2NvbnN0IGNhcmQgPSByZXF1aXJlKCdhbmd1bGFyLWNyZWRpdC1jYXJkcycpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICducy1tYW5hZ2UtY2FyZHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtY2FyZHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21hbmFnZS1jYXJkcy5jb21wb25lbnQuY3NzJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFuYWdlQ2FyZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgICBAVmlld0NoaWxkKCdhY3Rpdml0eUluZGljYXRvcicpIGFjdGl2aXR5SW5kaWNhdG9yOiBFbGVtZW50UmVmO1xuICAgIEBWaWV3Q2hpbGQoJ2NhcmRWaWV3JykgY2FyZFJlZjogRWxlbWVudFJlZjtcbiAgICBAT3V0cHV0KCkgY2FyZEV4aXN0OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLy9jYXJkOiBDYXJkRGV0YWlscztcbiAgICAvL2NhcmRUb2tlbjpzdHJpbmcgPSBcIlwiO1xuICAgIC8vY2NWaWV3OkNyZWRpdENhcmRWaWV3O1xuICAgIC8vY2M6IENhcmQ7XG5cbiAgICAvL2NjOkNhcmQgPSB0aGlzLmNjVmlldy5jYXJkO1xuXG4gICAgcHJpdmF0ZSBpc0xvYWRpbmcgPSB0cnVlO1xuICAgIHByaXZhdGUgY3VzdG9tZXJUb2tlbjpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgY2FyZEV4aXN0czpib29sZWFuID0gZmFsc2U7XG4gICAgcHVibGljIGNhcmROdW1iZXI6c3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgTU06c3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgWVk6c3RyaW5nID0gXCJcIjtcbiAgICBwdWJsaWMgQ1ZDOnN0cmluZyA9IFwiXCI7XG4gICAgcHJpdmF0ZSBsYXN0NDpzdHJpbmcgPSBcIlwiO1xuICAgIHByaXZhdGUgYnJhbmQ6c3RyaW5nID0gXCJcIjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJleHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIGF1dGg6IEF1dGhTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICApIHtcbiAgICAgICAgdGhpcy5sYXN0NCA9IFwiXCI7XG4gICAgICAgIHRoaXMuYnJhbmQgPSBcIlwiO1xuICAgICAgICB0aGlzLmNoZWNrQ2FyZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbkNDUmV0dXJuUHJlc3MoYXJncykge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5jYXJkTnVtYmVyID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2FyZCBudW1iZXIgaXMgb24gcmV0dXJuIFwiICsgdGhpcy5jYXJkTnVtYmVyKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgfVxuXG4gICAgcHVibGljIG9uQ0NSZXR1cm5CbHVyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuY2FyZE51bWJlciA9IHRleHRGaWVsZC50ZXh0O1xuICAgICAgICAvL2NvbnNvbGUubG9nKFwiY2FyZCBudW1iZXIgaXMgb24gYmx1ciBcIiArIHRoaXMuY2FyZE51bWJlcik7XG5cbiAgICAgICAgLypzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgICB9LCAxMDApOyovXG4gICAgfVxuXG4gICAgcHVibGljIG9uTU1SZXR1cm5QcmVzcyhhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLk1NID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiTU0gaXMgb24gcmV0dXJuIFwiICsgdGhpcy5NTSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbk1NUmV0dXJuQmx1cihhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLk1NID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJNTSBpcyBvbiBibHVyIFwiICsgdGhpcy5NTSk7XG5cbiAgICAgICAgLypzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgICB9LCAxMDApOyovXG4gICAgfVxuXG4gICAgcHVibGljIG9uWVlSZXR1cm5QcmVzcyhhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLllZID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiWVkgaXMgb24gcmV0dXJuIFwiICsgdGhpcy5ZWSk7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0ZXh0RmllbGQuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICB9LCAxMDApO1xuICAgIH1cblxuICAgIHB1YmxpYyBvbllZUmV0dXJuQmx1cihhcmdzKSB7XG4gICAgICAgIGxldCB0ZXh0RmllbGQgPSA8VGV4dEZpZWxkPmFyZ3Mub2JqZWN0O1xuICAgICAgICB0aGlzLllZID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJZWSBpcyBvbiBibHVyIFwiICsgdGhpcy5ZWSk7XG5cbiAgICAgICAgLypzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgIHRleHRGaWVsZC5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgICAgICB9LCAxMDApOyovXG4gICAgfVxuXG4gICAgcHVibGljIG9uQ1ZDUmV0dXJuUHJlc3MoYXJncykge1xuICAgICAgICBsZXQgdGV4dEZpZWxkID0gPFRleHRGaWVsZD5hcmdzLm9iamVjdDtcbiAgICAgICAgdGhpcy5DVkMgPSB0ZXh0RmllbGQudGV4dDtcbiAgICAgICAgY29uc29sZS5sb2coXCJDVkMgaXMgb24gcmV0dXJuIFwiICsgdGhpcy5DVkMpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25DVkNSZXR1cm5CbHVyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHRleHRGaWVsZCA9IDxUZXh0RmllbGQ+YXJncy5vYmplY3Q7XG4gICAgICAgIHRoaXMuQ1ZDID0gdGV4dEZpZWxkLnRleHQ7XG4gICAgICAgIC8vY29uc29sZS5sb2coXCJDVkMgaXMgb24gYmx1ciBcIiArIHRoaXMuQ1ZDKTtcblxuICAgICAgICAvKnNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgdGV4dEZpZWxkLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICAgICAgIH0sIDEwMCk7Ki9cbiAgICB9XG5cbiAgICBjaGVja0NhcmQoKSB7XG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbik9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgICAgICAgICAgIC8vdGhpcy51aWQgPSB0b2tlbi51aWQ7XG4gICAgICAgICAgICAgICAgLy9pZih0b2tlbi5lbWFpbFZlcmlmaWVkKXt0aGlzLmlzVmVyaWZpZWQ9dHJ1ZTt9XG5cbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZShcIi91c2VySW5mby9cIit0b2tlbi51aWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy52YWx1ZS5jSUQuaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEV4aXN0cz10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3VzdG9tZXIgaWQgaXMgXCIgKyByZXMudmFsdWUuY0lEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3Q0ID0gcmVzLnZhbHVlLmxhc3Q0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYnJhbmQgPSByZXMudmFsdWUuYnJhbmQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8udGhlbigocmVzKT0+e3RoaXMubmFtZT1yZXMudmFsdWUubmFtZX0pXG4gICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIlRyb3VibGUgaW4gcGFyYWRpc2U6IFwiICsgZXJyb3IpKTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICB0aGlzLmNoZWNrQ2FyZCgpO1xuICAgICAgICAvL2NvbnNvbGUubG9nIChcImNhcmQgcmVmIFwiICsgdGhpcy5jYXJkUmVmLm5hdGl2ZUVsZW1lbnQuY2FyZC5udW1iZXIpO1xuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCkge1xuICAgICAgICB0aGlzLmNoZWNrQ2FyZCgpO1xuICAgIH1cblxuICAgIG5nRG9DaGVjaygpe1xuXG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCl7XG4gICAgICAgIHRoaXMuY2hlY2tDYXJkKCk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdDaGVja2VkKCl7XG4gICAgfVxuXG4gICAgb25DYXJkUmVnaXN0ZXIgKGFyZ3Mpe1xuXG4gICAgICAgIGxldCBhY3Rpdml0eUluZGljYXRvciA9IHRoaXMuYWN0aXZpdHlJbmRpY2F0b3IubmF0aXZlRWxlbWVudDtcbiAgICAgICAgYWN0aXZpdHlJbmRpY2F0b3IuYnVzeSA9IHRydWU7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBDYXJkIFJlZ2lzdGVyIHdpdGggY2FyZCBudW1iZXIgaXNcIiArIHRoaXMuY2FyZE51bWJlcik7XG5cbiAgICAgICAgY29uc3QgY2MgPSBuZXcgQ2FyZCh0aGlzLmNhcmROdW1iZXIsTnVtYmVyKHRoaXMuTU0pLCBOdW1iZXIodGhpcy5ZWSksIHRoaXMuQ1ZDKTtcbiAgICAgICAgLy9jb25zdCBjYyA9IG5ldyBDYXJkKHRoaXMuY2FyZE51bWJlciwyLDE4LFwiMTIzXCIpO1xuICAgICAgICBjYy5uYW1lID0gXCJjdXN0b21lci1cIiArIGNjLmxhc3Q0O1xuICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgY2FyZCBpc1wiICsgY2MuY2FyZCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaXMgdGhlIGNhcmQgdmFsaWQ/IFwiICsgY2MudmFsaWRhdGVDYXJkKCkpO1xuXG4gICAgICAgIC8vdGhpcy5jY1ZpZXcgPSB0aGlzLmNhcmRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgLy9sZXQgY2NWaWV3OkNyZWRpdENhcmRWaWV3ID0gdGhpcy5jYXJkUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIC8vbGV0IGNjOkNhcmQgPSBjY1ZpZXcuY2FyZDtcbiAgICAgICAgLy92YXIgY2FyZFRva2VuOnN0cmluZztcblxuICAgICAgICAvL3RoaXMuY2MgPSBjY1ZpZXcuY2FyZDtcblxuICAgICAgICAvL2xldCBwYWdlID0gYXJncy5vYmplY3Q7XG4gICAgICAgIC8vY29uc3QgY2NWaWV3OkNyZWRpdENhcmRWaWV3ID0gcGFnZS5nZXRWaWV3QnlJZChcImNhcmRcIik7XG4gICAgICAgIC8vY2MubmFtZSA9IFwiS3VzaGFncmEgTWVocmFcIjtcblxuICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhlQ2FyZCBcIiArIGNjLm5hbWUpO1xuXG4gICAgICAgIHZhciBvYmo7XG5cbiAgICAgICAgc3RyaXBlLmNyZWF0ZVRva2VuKGNjLmNhcmQsIChlcnJvciwgdG9rZW4pPT4ge1xuXG4gICAgICAgICAgICBpZiAoIWVycm9yKSB7XG4gICAgICAgICAgICAgICAgLy9EbyBzb21ldGhpbmcgd2l0aCB5b3VyIHRva2VuO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5jYXJkVG9rZW4gPSB0b2tlbi50b2tlbklkO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGUgdG9rZW4gb2YgdGhlIGNhcmQgaXMgMTExMSBcIiArIHRva2VuLnRva2VuSWQpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwidGhlIHRva2VuIGpzb24gc3RyaW5naWZ5IGlzIFwiICsgSlNPTi5zdHJpbmdpZnkodG9rZW4pKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nIChcInRoZSB0b2tlbiBqc29uIHN0cmluZ2lmeSBhbmQgcGFyc2VkIGlzIFwiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0b2tlbikpKTtcblxuXG4gICAgICAgICAgICAgICAgLypjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbi50b2tlbklkLFxuICAgICAgICAgICAgICAgICBjaGFyZ2UgOiB7XG4gICAgICAgICAgICAgICAgIGFtb3VudDogMTAwLFxuICAgICAgICAgICAgICAgICBjdXJyZW5jeTogXCJBVURcIixcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICB9KSk7Ki9cblxuICAgICAgICAgICAgICAgIC8qdmFyIHRleHRTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbi50b2tlbklkLFxuICAgICAgICAgICAgICAgICBjaGFyZ2UgOiB7XG4gICAgICAgICAgICAgICAgIGFtb3VudDogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgY3VycmVuY3k6IFwiQVVEXCIsXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSk7Kj9cblxuICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhlIHRleHQgc3RyaW5nIGlzIFwiICsgdGV4dFN0cmluZyk7XG5cblxuICAgICAgICAgICAgICAgICAvKnRoaXMuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgdXJsOiBGSVJFQkFTRV9GVU5DVElPTixcbiAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW4udG9rZW5JZCxcbiAgICAgICAgICAgICAgICAgY2hhcmdlIDoge1xuICAgICAgICAgICAgICAgICBhbW91bnQ6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIkFVRFwiLFxuICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIH0pLGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxuICAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAvL2NvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmJvZHlcbiAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IGlzIFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBpcyBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcInRoZSByZXN1bHQgbWVzc2FnZSBpcyBcIiArIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJlcnJvciBpcyBcIiArIGUpO1xuICAgICAgICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICAgICAgdmFyIHRleHRTdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgLyp0aGlzLmh0dHAucmVxdWVzdChcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgYm9keToge1widG9rZW5cIjogXCJ0b2tfdmlzYVwiLCBcImNoYXJnZVwiOiB7XCJhbW91bnRcIjogXCIxMDBcIiwgXCJjdXJyZW5jeVwiOiBcIkFVRFwifX0sXG4gICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn1cbiAgICAgICAgICAgICAgICAgfSkuc3Vic2NyaWJlKHJlcyA9PiBjb25zb2xlLmxvZyhyZXMuKSk7Ki9cbiAgICAgICAgICAgICAgICAvL3tcbiAgICAgICAgICAgICAgICAvL30pO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJUZXh0IHN0cmluZyBpcyBcIiArIHRleHRTdHJpbmcpO1xuXG4gICAgICAgICAgICAgICAgaWYoYXBwbGljYXRpb24uaW9zKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgY2FyZCB0b2tlbiBpcyBcIiArIHRva2VuLnRva2VuSWQpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCI6IFwiY3VzdG9tZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbi50b2tlbklkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoYXJnZVwiOiB7XCJhbW91bnRcIjogXCIxMDBcIiwgXCJjdXJyZW5jeVwiOiBcIkFVRFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmogPSByZXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqLmJvZHkuY3VzdG9tZXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJUb2tlbiA9IG9iai5ib2R5LmN1c3RvbWVyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidGhlIGN1c3RvbWVyIHRva2VuIGlzIFwiICsgdGhpcy5jdXN0b21lclRva2VuKTtcblxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodG9rZW4pPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnVpZCA9IHRva2VuLnVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vaWYodG9rZW4uZW1haWxWZXJpZmllZCl7dGhpcy5pc1ZlcmlmaWVkPXRydWU7fVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoXCIvdXNlckluZm8vXCIgKyB0b2tlbi51aWQsIHtjSUQ6IHRoaXMuY3VzdG9tZXJUb2tlbn0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFwiL3VzZXJJbmZvL1wiICsgdG9rZW4udWlkLCB7bGFzdDQ6IGNjLmxhc3Q0fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaXJlYmFzZS51cGRhdGUoXCIvdXNlckluZm8vXCIgKyB0b2tlbi51aWQsIHticmFuZDogY2MuYnJhbmR9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkRXhpc3RzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEV4aXN0LmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiRGV0YWlscyBVcGRhdGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy50aGVuKChyZXMpPT57dGhpcy5uYW1lPXJlcy52YWx1ZS5uYW1lfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJUcm91YmxlIGluIHBhcmFkaXNlOiBcIiArIGVycm9yKSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvKmZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiBjb25zb2xlLmxvZyhcIlVzZXIgdWlkOiBcIiArIHVzZXIudWlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiVHJvdWJsZSBpbiBwYXJhZGlzZTogXCIgKyBlcnJvcikpOyovXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RleHRTdHJpbmcgPSBKU09OLnN0cmluZ2lmeShyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZXMgaXMgXCIgKyB0ZXh0U3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3RleHRTdHJpbmcgPSAoPGFueT5yZXMpLmpzb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5SW5kaWNhdG9yLmJ1c3kgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJFcnJvclwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBcIlBsZWFzZSBjaGVjayB0aGUgY2FyZCBkZXRhaWxzLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlJbmRpY2F0b3IuYnVzeSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEZXRhaWxzIHN1Y2Nlc3NmdWxseSBVcGRhdGVkLiBQcmVzcyBPayB0byBuYXZpZ2F0ZSB0byBIb21lLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJcIl0sIHtjbGVhckhpc3Rvcnk6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihhcHBsaWNhdGlvbi5hbmRyb2lkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgY2FyZCB0b2tlbiBpcyBcIiArIHRva2VuLmdldElkKCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaHR0cC5yZXF1ZXN0KFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImZ1bmN0aW9uXCI6IFwiY3VzdG9tZXJcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiB0b2tlbi5nZXRJZCgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImNoYXJnZVwiOiB7XCJhbW91bnRcIjogXCIxMDBcIiwgXCJjdXJyZW5jeVwiOiBcIkFVRFwifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1wiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwifVxuICAgICAgICAgICAgICAgICAgICAgICAgfSkuc3Vic2NyaWJlKHJlcyA9PiB7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9iaiA9IHJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iai5ib2R5LmN1c3RvbWVyLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3VzdG9tZXJUb2tlbiA9IG9iai5ib2R5LmN1c3RvbWVyLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgY3VzdG9tZXIgdG9rZW4gaXMgXCIgKyB0aGlzLmN1c3RvbWVyVG9rZW4pO1xuXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigodG9rZW4pPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0b2tlbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFwiL3VzZXJJbmZvL1wiICsgdG9rZW4udWlkLCB7Y0lEOiB0aGlzLmN1c3RvbWVyVG9rZW59KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFwiL3VzZXJJbmZvL1wiICsgdG9rZW4udWlkLCB7bGFzdDQ6IGNjLmxhc3Q0fSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpcmViYXNlLnVwZGF0ZShcIi91c2VySW5mby9cIiArIHRva2VuLnVpZCwge2JyYW5kOiBjYy5icmFuZH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEV4aXN0cyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXJkRXhpc3QuZW1pdCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9hbGVydChcIkRldGFpbHMgVXBkYXRlZFwiKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy50aGVuKChyZXMpPT57dGhpcy5uYW1lPXJlcy52YWx1ZS5uYW1lfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIlRyb3VibGUgaW4gcGFyYWRpc2U6IFwiICsgZXJyb3IpKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eUluZGljYXRvci5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIkVycm9yXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiUGxlYXNlIGNoZWNrIHRoZSBjYXJkIGRldGFpbHMuXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rQnV0dG9uVGV4dDogXCJPa1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eUluZGljYXRvci5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlhbG9ncy5hbGVydCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiBcIlN1Y2Nlc3NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogXCJEZXRhaWxzIHN1Y2Nlc3NmdWxseSBVcGRhdGVkLiBQcmVzcyBPayB0byBuYXZpZ2F0ZSB0byBIb21lLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJcIl0sIHtjbGVhckhpc3Rvcnk6IHRydWV9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvL3ZhciByZXNwb25zZSA9IEpTT04ucGFyc2UodGV4dFN0cmluZyk7XG5cbiAgICAgICAgICAgICAgICAvKmh0dHBNb2R1bGUucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgIHVybDogRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICBcInRva2VuXCI6IFwidG9rX3Zpc2FcIixcbiAgICAgICAgICAgICAgICAgXCJjaGFyZ2VcIiA6IHtcbiAgICAgICAgICAgICAgICAgXCJhbW91bnRcIjogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgXCJjdXJyZW5jeVwiOiBcIkFVRFwiXG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgLy9jb25zdCByZXN1bHQgPSByZXNwb25zZS5ib2R5XG4gICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBpcyBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcInRoZSByZXN1bHQgaXMgXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IG1lc3NhZ2UgaXMgXCIgKyByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwiZXJyb3IgaXMgXCIgKyBlKTtcbiAgICAgICAgICAgICAgICAgfSk7Ki9cblxuICAgICAgICAgICAgICAgIC8qYWN0aXZpdHlJbmRpY2F0b3IuYnVzeSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGRpYWxvZ3MuYWxlcnQoe1xuICAgICAgICAgICAgICAgICAgICB0aXRsZTogXCJTdWNjZXNzXCIsXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IFwiRGV0YWlscyBzdWNjZXNzZnVsbHkgVXBkYXRlZFwiLFxuICAgICAgICAgICAgICAgICAgICBva0J1dHRvblRleHQ6IFwiT2tcIlxuICAgICAgICAgICAgICAgIH0pLnRoZW4ociA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbXCJcIl0sIHtjbGVhckhpc3Rvcnk6IHRydWV9KTtcbiAgICAgICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJPcmRlciBDb25maXJtZWRcIik7XG4gICAgICAgICAgICAgICAgLy9Ub2FzdC5tYWtlVGV4dChcIlBsZWFzZSBsb2dpbiB0byBjb25maXJtIG9yZGVyXCIpLnNob3coKTtcblxuICAgICAgICAgICAgICAgIGFsZXJ0KGVycm9yLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0aGUgdG9rZW4gZXJyb3IgaXMgXCIgKyBlcnJvcik7XG5cbiAgICAgICAgICAgICAgICBhY3Rpdml0eUluZGljYXRvci5idXN5ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGV4dCBzdHJpbmcgaXMgXCIgKyB0aGlzLmN1c3RvbWVyVG9rZW4pO1xuICAgIH1cblxuICAgIG9uQ2FuY2VsTmF2KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW4gY2FuY2VsIG5hdmlnYXRpb25cIik7XG4gICAgICAgIC8vdGhpcy5yb3V0ZXJleHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG5cbn1cbiJdfQ==