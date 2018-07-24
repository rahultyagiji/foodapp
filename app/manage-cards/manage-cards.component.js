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
//const stripe = new Stripe('pk_test_c8UTm5ruajI8YOPQo75bTPKx');
var stripe = new nativescript_stripe_1.Stripe('sk_test_MyvDHIg7s2YVcundVR8qjMcE');
//const FIREBASE_FUNCTION = 'https://[YOUR_FIREBASE_PROJECT].cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
var FIREBASE_FUNCTION = 'https://us-central1-dekyou-cafe.cloudfunctions.net/customer/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
var FIREBASE_FUNCTION_TEST = 'https://us-central1-dekyou-cafe.cloudfunctions.net/testfunction/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
var httpModule = require("http");
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
        this.checkCard();
    }
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
        console.log("In Card Register");
        //this.ccView = this.cardRef.nativeElement;
        var ccView = this.cardRef.nativeElement;
        var cc = ccView.card;
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
                //console.log("the token is " + token.tokenId);
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
                    body: { "function": "customer", "token": "tok_visa", "charge": { "amount": "100", "currency": "AUD" } },
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
                console.log(error);
            }
        });
        console.log("Text string is " + this.customerToken);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWNhcmRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZS1jYXJkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FDOEg7QUFDOUgsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBQy9ELDJEQUFrRTtBQUNsRSx1REFBMEQ7QUFDMUQseURBQXFEO0FBQ3JELGlDQUFpQztBQUVqQyxnRUFBZ0U7QUFDaEUsSUFBTSxNQUFNLEdBQUcsSUFBSSw0QkFBTSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7QUFDOUQsdUlBQXVJO0FBQ3ZJLElBQU0saUJBQWlCLEdBQUcsOERBQThELENBQUMsQ0FBQyw2Q0FBNkM7QUFDdkksSUFBTSxzQkFBc0IsR0FBRyxrRUFBa0UsQ0FBQyxDQUFDLDZDQUE2QztBQUNoSixJQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFVbkM7SUFlSSw4QkFDWSxLQUFxQixFQUNyQixLQUF1QixFQUN2QixnQkFBa0MsRUFDbEMsSUFBaUIsRUFDakIsR0FBc0IsRUFDdEIsSUFBZ0I7UUFMaEIsVUFBSyxHQUFMLEtBQUssQ0FBZ0I7UUFDckIsVUFBSyxHQUFMLEtBQUssQ0FBa0I7UUFDdkIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQ2pCLFFBQUcsR0FBSCxHQUFHLENBQW1CO1FBQ3RCLFNBQUksR0FBSixJQUFJLENBQVk7UUFsQmxCLGNBQVMsR0FBMEIsSUFBSSxtQkFBWSxFQUFFLENBQUM7UUFDaEUsb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsV0FBVztRQUVYLDZCQUE2QjtRQUVyQixjQUFTLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLGtCQUFhLEdBQVUsRUFBRSxDQUFDO1FBQzFCLGVBQVUsR0FBVyxLQUFLLENBQUM7UUFVM0Is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QUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3ZCLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRCwwQ0FBVyxHQUFYO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1FBQ3BDLCtCQUErQjtJQUNuQyxDQUFDO0lBek5zQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVSxpQkFBVTt5REFBQztJQUNqQztRQUFULGFBQU0sRUFBRTtrQ0FBWSxtQkFBWTsyREFBK0I7SUFIdkQsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzlDLENBQUM7UUFDRCxpQkFBVSxFQUFFO3lDQWlCVSx1QkFBYztZQUNkLHVCQUFnQjtZQUNMLHlCQUFnQjtZQUM1QiwwQkFBVztZQUNaLHdCQUFpQjtZQUNoQixpQkFBVTtPQXJCbkIsb0JBQW9CLENBNk5oQztJQUFELDJCQUFDO0NBQUEsQUE3TkQsSUE2TkM7QUE3Tlksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE9uQ2hhbmdlcywgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgICBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYsIFZpZXdDb250YWluZXJSZWYsIE9uRGVzdHJveSwgQ2hhbmdlRGV0ZWN0b3JSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIGFzIFJ4T2JzZXJ2YWJsZSB9IGZyb20gXCJyeGpzXCI7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycywgSHR0cFJlc3BvbnNlIH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3RyaXBlLCBDYXJkLCBDcmVkaXRDYXJkVmlld30gZnJvbSAnbmF0aXZlc2NyaXB0LXN0cmlwZSc7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbi8vaW1wb3J0IHsgUGFnZSB9IGZyb20gJ3VpL3BhZ2UnO1xuXG4vL2NvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUoJ3BrX3Rlc3RfYzhVVG01cnVhakk4WU9QUW83NWJUUEt4Jyk7XG5jb25zdCBzdHJpcGUgPSBuZXcgU3RyaXBlKCdza190ZXN0X015dkRISWc3czJZVmN1bmRWUjhxak1jRScpO1xuLy9jb25zdCBGSVJFQkFTRV9GVU5DVElPTiA9ICdodHRwczovL1tZT1VSX0ZJUkVCQVNFX1BST0pFQ1RdLmNsb3VkZnVuY3Rpb25zLm5ldC9jaGFyZ2UvJzsgLy8gVE9ETzogUFVUIFlPVVIgRklSRUJBU0UgRlVOQ1RJT05TIFVSTCBIRVJFXG5jb25zdCBGSVJFQkFTRV9GVU5DVElPTiA9ICdodHRwczovL3VzLWNlbnRyYWwxLWRla3lvdS1jYWZlLmNsb3VkZnVuY3Rpb25zLm5ldC9jdXN0b21lci8nOyAvLyBUT0RPOiBQVVQgWU9VUiBGSVJFQkFTRSBGVU5DVElPTlMgVVJMIEhFUkVcbmNvbnN0IEZJUkVCQVNFX0ZVTkNUSU9OX1RFU1QgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1kZWt5b3UtY2FmZS5jbG91ZGZ1bmN0aW9ucy5uZXQvdGVzdGZ1bmN0aW9uLyc7IC8vIFRPRE86IFBVVCBZT1VSIEZJUkVCQVNFIEZVTkNUSU9OUyBVUkwgSEVSRVxuY29uc3QgaHR0cE1vZHVsZSA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICducy1tYW5hZ2UtY2FyZHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtY2FyZHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21hbmFnZS1jYXJkcy5jb21wb25lbnQuY3NzJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFuYWdlQ2FyZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgRG9DaGVjaywgQWZ0ZXJWaWV3SW5pdCwgQWZ0ZXJWaWV3Q2hlY2tlZCB7XG5cbiAgICBAVmlld0NoaWxkKCdjYXJkVmlldycpIGNhcmRSZWY6IEVsZW1lbnRSZWY7XG4gICAgQE91dHB1dCgpIGNhcmRFeGlzdDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAgIC8vY2FyZDogQ2FyZERldGFpbHM7XG4gICAgLy9jYXJkVG9rZW46c3RyaW5nID0gXCJcIjtcbiAgICAvL2NjVmlldzpDcmVkaXRDYXJkVmlldztcbiAgICAvL2NjOiBDYXJkO1xuXG4gICAgLy9jYzpDYXJkID0gdGhpcy5jY1ZpZXcuY2FyZDtcblxuICAgIHByaXZhdGUgaXNMb2FkaW5nID0gdHJ1ZTtcbiAgICBwcml2YXRlIGN1c3RvbWVyVG9rZW46c3RyaW5nID0gXCJcIjtcbiAgICBwcml2YXRlIGNhcmRFeGlzdHM6Ym9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIHJvdXRlcmV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgIHByaXZhdGUgYXV0aDogQXV0aFNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICAgICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50XG4gICAgKSB7XG4gICAgICAgICAgICB0aGlzLmNoZWNrQ2FyZCgpO1xuICAgIH1cbiAgICBcbiAgICBjaGVja0NhcmQoKSB7XG4gICAgICAgIGZpcmViYXNlLmdldEN1cnJlbnRVc2VyKClcbiAgICAgICAgICAgIC50aGVuKCh0b2tlbik9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codG9rZW4pO1xuICAgICAgICAgICAgICAgIC8vdGhpcy51aWQgPSB0b2tlbi51aWQ7XG4gICAgICAgICAgICAgICAgLy9pZih0b2tlbi5lbWFpbFZlcmlmaWVkKXt0aGlzLmlzVmVyaWZpZWQ9dHJ1ZTt9XG5cbiAgICAgICAgICAgICAgICBmaXJlYmFzZS5nZXRWYWx1ZShcIi91c2VySW5mby9cIit0b2tlbi51aWQpXG4gICAgICAgICAgICAgICAgICAgIC50aGVuKChyZXMpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlcy52YWx1ZS5jSUQuaXNFbXB0eSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEV4aXN0cz10cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiY3VzdG9tZXIgaWQgaXMgXCIgKyByZXMudmFsdWUuY0lEKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvLy50aGVuKChyZXMpPT57dGhpcy5uYW1lPXJlcy52YWx1ZS5uYW1lfSlcbiAgICAgICAgICAgIH0pLmNhdGNoKGVycm9yID0+IGNvbnNvbGUubG9nKFwiVHJvdWJsZSBpbiBwYXJhZGlzZTogXCIgKyBlcnJvcikpO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBcbiAgICAgICAgdGhpcy5jaGVja0NhcmQoKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyAoXCJjYXJkIHJlZiBcIiArIHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50LmNhcmQubnVtYmVyKTtcbiAgICB9XG4gICAgXG4gICAgbmdPbkNoYW5nZXMoKSB7XG4gICAgICAgIHRoaXMuY2hlY2tDYXJkKCk7XG4gICAgfVxuXG4gICAgbmdEb0NoZWNrKCl7XG4gICAgICAgIFxuICAgIH1cbiAgICBcbiAgICBuZ0FmdGVyVmlld0luaXQoKXtcbiAgICAgICAgdGhpcy5jaGVja0NhcmQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0NoZWNrZWQoKXtcbiAgICB9XG5cbiAgICBvbkNhcmRSZWdpc3RlciAoYXJncyl7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBDYXJkIFJlZ2lzdGVyXCIpO1xuXG4gICAgICAgIC8vdGhpcy5jY1ZpZXcgPSB0aGlzLmNhcmRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IGNjVmlldzpDcmVkaXRDYXJkVmlldyA9IHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY2M6Q2FyZCA9IGNjVmlldy5jYXJkO1xuICAgICAgICAvL3ZhciBjYXJkVG9rZW46c3RyaW5nO1xuXG4gICAgICAgIC8vdGhpcy5jYyA9IGNjVmlldy5jYXJkO1xuXG4gICAgICAgIC8vbGV0IHBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgLy9jb25zdCBjY1ZpZXc6Q3JlZGl0Q2FyZFZpZXcgPSBwYWdlLmdldFZpZXdCeUlkKFwiY2FyZFwiKTtcbiAgICAgICAgLy9jYy5uYW1lID0gXCJLdXNoYWdyYSBNZWhyYVwiO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGVDYXJkIFwiICsgY2MubmFtZSk7XG5cbiAgICAgICAgdmFyIG9iajtcblxuICAgICAgICBzdHJpcGUuY3JlYXRlVG9rZW4oY2MuY2FyZCwoZXJyb3IsdG9rZW4pPT57XG4gICAgICAgICAgICBpZighZXJyb3Ipe1xuICAgICAgICAgICAgICAgIC8vRG8gc29tZXRoaW5nIHdpdGggeW91ciB0b2tlbjtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhlIHRva2VuIGlzIFwiICsgdG9rZW4udG9rZW5JZCk7XG4gICAgICAgICAgICAgICAgLy90aGlzLmNhcmRUb2tlbiA9IHRva2VuLnRva2VuSWQ7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoZSB0b2tlbiBvZiB0aGUgY2FyZCBpcyAxMTExIFwiICsgdG9rZW4udG9rZW5JZCk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyAoXCJ0aGUgdG9rZW4ganNvbiBzdHJpbmdpZnkgaXMgXCIgKyBKU09OLnN0cmluZ2lmeSh0b2tlbikpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwidGhlIHRva2VuIGpzb24gc3RyaW5naWZ5IGFuZCBwYXJzZWQgaXMgXCIgKyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRva2VuKSkpO1xuXG5cbiAgICAgICAgICAgICAgICAvKmNvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLnRva2VuSWQsXG4gICAgICAgICAgICAgICAgICAgIGNoYXJnZSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogMTAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IFwiQVVEXCIsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KSk7Ki9cblxuICAgICAgICAgICAgICAgIC8qdmFyIHRleHRTdHJpbmcgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbi50b2tlbklkLFxuICAgICAgICAgICAgICAgICAgICBjaGFyZ2UgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogXCJBVURcIixcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pOyo/XG5cbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKFwidGhlIHRleHQgc3RyaW5nIGlzIFwiICsgdGV4dFN0cmluZyk7XG5cblxuICAgICAgICAgICAgICAgIC8qdGhpcy5odHRwLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IEZJUkVCQVNFX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogdG9rZW4udG9rZW5JZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoYXJnZSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVuY3k6IFwiQVVEXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuYm9keVxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nIChcInRoZSByZXN1bHQgaXMgXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IGlzIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBtZXNzYWdlIGlzIFwiICsgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwiZXJyb3IgaXMgXCIgKyBlKTtcbiAgICAgICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICAgICAgdmFyIHRleHRTdHJpbmcgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgIC8qdGhpcy5odHRwLnJlcXVlc3QoXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBGSVJFQkFTRV9GVU5DVElPTixcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7XCJ0b2tlblwiOiBcInRva192aXNhXCIsIFwiY2hhcmdlXCI6IHtcImFtb3VudFwiOiBcIjEwMFwiLCBcImN1cnJlbmN5XCI6IFwiQVVEXCJ9fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5zdWJzY3JpYmUocmVzID0+IGNvbnNvbGUubG9nKHJlcy4pKTsqL1xuICAgICAgICAgICAgICAgICAgICAvL3tcbiAgICAgICAgICAgICAgICAgICAgLy99KTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcIlRleHQgc3RyaW5nIGlzIFwiICsgdGV4dFN0cmluZyk7XG5cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucmVxdWVzdChcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEZJUkVCQVNFX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcImZ1bmN0aW9uXCI6IFwiY3VzdG9tZXJcIiwgXCJ0b2tlblwiOiBcInRva192aXNhXCIsIFwiY2hhcmdlXCI6IHtcImFtb3VudFwiOiBcIjEwMFwiLCBcImN1cnJlbmN5XCI6IFwiQVVEXCJ9fSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KS5zdWJzY3JpYmUocmVzID0+IHtcblxuICAgICAgICAgICAgICAgICAgICAgICAgb2JqID0gcmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cob2JqLmJvZHkuY3VzdG9tZXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXN0b21lclRva2VuID0gb2JqLmJvZHkuY3VzdG9tZXIuaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSBjdXN0b21lciB0b2tlbiBpcyBcIiArIHRoaXMuY3VzdG9tZXJUb2tlbik7XG5cblxuICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKCh0b2tlbik9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy90aGlzLnVpZCA9IHRva2VuLnVpZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9pZih0b2tlbi5lbWFpbFZlcmlmaWVkKXt0aGlzLmlzVmVyaWZpZWQ9dHJ1ZTt9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlyZWJhc2UudXBkYXRlKFwiL3VzZXJJbmZvL1wiICsgdG9rZW4udWlkLCB7Y0lEOiB0aGlzLmN1c3RvbWVyVG9rZW59KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNhcmRFeGlzdHMgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2FyZEV4aXN0LmVtaXQodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiRGV0YWlscyBVcGRhdGVkXCIpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLy50aGVuKChyZXMpPT57dGhpcy5uYW1lPXJlcy52YWx1ZS5uYW1lfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5jYXRjaChlcnJvciA9PiBjb25zb2xlLmxvZyhcIlRyb3VibGUgaW4gcGFyYWRpc2U6IFwiICsgZXJyb3IpKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLypmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4odXNlciA9PiBjb25zb2xlLmxvZyhcIlVzZXIgdWlkOiBcIiArIHVzZXIudWlkKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5sb2coXCJUcm91YmxlIGluIHBhcmFkaXNlOiBcIiArIGVycm9yKSk7Ki9cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy90ZXh0U3RyaW5nID0gSlNPTi5zdHJpbmdpZnkocmVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJyZXMgaXMgXCIgKyB0ZXh0U3RyaW5nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vdGV4dFN0cmluZyA9ICg8YW55PnJlcykuanNvbjtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAvL3ZhciByZXNwb25zZSA9IEpTT04ucGFyc2UodGV4dFN0cmluZyk7XG5cbiAgICAgICAgICAgICAgICAvKmh0dHBNb2R1bGUucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgICAgIHVybDogRklSRUJBU0VfRlVOQ1RJT04sXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b2tlblwiOiBcInRva192aXNhXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNoYXJnZVwiIDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiYW1vdW50XCI6IFwiMTAwXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJjdXJyZW5jeVwiOiBcIkFVRFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfSkudGhlbigocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zdCByZXN1bHQgPSByZXNwb25zZS5ib2R5XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBpcyBcIiArIHJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcInRoZSByZXN1bHQgaXMgXCIgKyBKU09OLnN0cmluZ2lmeShyZXNwb25zZSkpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IG1lc3NhZ2UgaXMgXCIgKyByZXNwb25zZS5ib2R5KTtcbiAgICAgICAgICAgICAgICB9LCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJlcnJvciBpcyBcIiArIGUpO1xuICAgICAgICAgICAgICAgIH0pOyovXG5cbiAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgIC8vYWxlcnQoXCJPcmRlciBDb25maXJtZWRcIik7XG4gICAgICAgICAgICAgICAgLy9Ub2FzdC5tYWtlVGV4dChcIlBsZWFzZSBsb2dpbiB0byBjb25maXJtIG9yZGVyXCIpLnNob3coKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGV4dCBzdHJpbmcgaXMgXCIgKyB0aGlzLmN1c3RvbWVyVG9rZW4pO1xuICAgIH1cblxuICAgIG9uQ2FuY2VsTmF2KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW4gY2FuY2VsIG5hdmlnYXRpb25cIik7XG4gICAgICAgIC8vdGhpcy5yb3V0ZXJleHRlbnNpb25zLmJhY2soKTtcbiAgICB9XG5cbn1cbiJdfQ==