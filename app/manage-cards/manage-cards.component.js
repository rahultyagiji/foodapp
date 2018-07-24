"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var core_2 = require("@angular/core");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var nativescript_stripe_1 = require("nativescript-stripe");
//import { Page } from 'ui/page';
//const stripe = new Stripe('pk_test_c8UTm5ruajI8YOPQo75bTPKx');
var stripe = new nativescript_stripe_1.Stripe('pk_test_c8UTm5ruajl8YOPQo75bTPKx');
//const FIREBASE_FUNCTION = 'https://[YOUR_FIREBASE_PROJECT].cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
var FIREBASE_FUNCTION = 'https://us-central1-dekyou-cafe.cloudfunctions.net/customer/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
var httpModule = require("http");
var ManageCardsComponent = /** @class */ (function () {
    function ManageCardsComponent(route, vcRef, routerextensions, http) {
        this.route = route;
        this.vcRef = vcRef;
        this.routerextensions = routerextensions;
        this.http = http;
        //card: CardDetails;
        //cardToken:string = "";
        //ccView:CreditCardView;
        //cc: Card;
        //cc:Card = this.ccView.card;
        this.isLoading = true;
    }
    ManageCardsComponent.prototype.ngOnInit = function () {
        console.log("in ngOn init for manage cards");
        //console.log ("card ref " + this.cardRef.nativeElement.card.number);
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
                var textString = JSON.stringify({
                    token: token.tokenId,
                    charge: {
                        amount: "100",
                        currency: "AUD",
                    }
                });
                console.log("the text string is " + textString);
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
                _this.http.request("POST", FIREBASE_FUNCTION, {
                    body: { "token": "tok_visa", "charge": { "amount": "100", "currency": "AUD" } },
                    headers: { "Content-Type": "application/json" }
                }).subscribe(function (res) {
                    textString = res.json.body.token;
                });
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
    };
    ManageCardsComponent.prototype.onCancelNav = function () {
        console.log("in cancel navigation");
        //this.routerextensions.back();
    };
    __decorate([
        core_1.ViewChild('cardView'),
        __metadata("design:type", core_1.ElementRef)
    ], ManageCardsComponent.prototype, "cardRef", void 0);
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
            http_1.HttpClient])
    ], ManageCardsComponent);
    return ManageCardsComponent;
}());
exports.ManageCardsComponent = ManageCardsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWNhcmRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZS1jYXJkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0c7QUFDdEcsc0NBQTJDO0FBRTNDLDZDQUE2RTtBQUM3RSwwQ0FBaUQ7QUFDakQsc0RBQStEO0FBQy9ELDJEQUFrRTtBQUNsRSxpQ0FBaUM7QUFFakMsZ0VBQWdFO0FBQ2hFLElBQU0sTUFBTSxHQUFHLElBQUksNEJBQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBQzlELHVJQUF1STtBQUN2SSxJQUFNLGlCQUFpQixHQUFHLDhEQUE4RCxDQUFDLENBQUMsNkNBQTZDO0FBQ3ZJLElBQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQVVuQztJQVlJLDhCQUNZLEtBQXFCLEVBQ3JCLEtBQXVCLEVBQ3ZCLGdCQUFrQyxFQUNsQyxJQUFnQjtRQUhoQixVQUFLLEdBQUwsS0FBSyxDQUFnQjtRQUNyQixVQUFLLEdBQUwsS0FBSyxDQUFrQjtRQUN2QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLFNBQUksR0FBSixJQUFJLENBQVk7UUFiNUIsb0JBQW9CO1FBQ3BCLHdCQUF3QjtRQUN4Qix3QkFBd0I7UUFDeEIsV0FBVztRQUVYLDZCQUE2QjtRQUVyQixjQUFTLEdBQUcsSUFBSSxDQUFDO0lBT3JCLENBQUM7SUFFTCx1Q0FBUSxHQUFSO1FBRUksT0FBTyxDQUFDLEdBQUcsQ0FBRSwrQkFBK0IsQ0FBQyxDQUFDO1FBQzlDLHFFQUFxRTtJQUV6RSxDQUFDO0lBRUQsNkNBQWMsR0FBZCxVQUFnQixJQUFJO1FBQXBCLGlCQW1HQztRQWpHRyxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFaEMsMkNBQTJDO1FBQzNDLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUN2RCxJQUFJLEVBQUUsR0FBUSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQzFCLHVCQUF1QjtRQUV2Qix3QkFBd0I7UUFFeEIseUJBQXlCO1FBQ3pCLHlEQUF5RDtRQUN6RCw2QkFBNkI7UUFFN0Isb0NBQW9DO1FBRXBDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLElBQUksRUFBQyxVQUFDLEtBQUssRUFBQyxLQUFLO1lBQ25DLEVBQUUsQ0FBQSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQztnQkFDUCwrQkFBK0I7Z0JBQy9CLCtDQUErQztnQkFDL0MsaUNBQWlDO2dCQUNqQyxnRUFBZ0U7Z0JBQ2hFLHVFQUF1RTtnQkFDdkUsOEZBQThGO2dCQUc5Rjs7Ozs7O3NCQU1NO2dCQUVOLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQzVCLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTztvQkFDcEIsTUFBTSxFQUFHO3dCQUNMLE1BQU0sRUFBRSxLQUFLO3dCQUNiLFFBQVEsRUFBRSxLQUFLO3FCQUNsQjtpQkFDSixDQUFDLENBQUM7Z0JBRUgsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsR0FBRyxVQUFVLENBQUMsQ0FBQztnQkFHaEQ7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQWlCSztnQkFFRCxLQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQ3BCLGlCQUFpQixFQUNqQjtvQkFDSSxJQUFJLEVBQUUsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBQyxFQUFDO29CQUMzRSxPQUFPLEVBQUUsRUFBQyxjQUFjLEVBQUUsa0JBQWtCLEVBQUM7aUJBQ2hELENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxHQUFHO29CQUNoQixVQUFVLEdBQVMsR0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUFBLENBQUMsQ0FBQyxDQUFDO2dCQUVuRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O3FCQWtCSztZQUVULENBQUM7WUFBQSxJQUFJLENBQUEsQ0FBQztnQkFDRiwyQkFBMkI7Z0JBQzNCLHlEQUF5RDtnQkFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQsMENBQVcsR0FBWDtRQUNJLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLENBQUMsQ0FBQztRQUNwQywrQkFBK0I7SUFDbkMsQ0FBQztJQWhJc0I7UUFBdEIsZ0JBQVMsQ0FBQyxVQUFVLENBQUM7a0NBQVUsaUJBQVU7eURBQUM7SUFGbEMsb0JBQW9CO1FBUGhDLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsUUFBUSxFQUFFLGlCQUFpQjtZQUMzQixXQUFXLEVBQUUsK0JBQStCO1lBQzVDLFNBQVMsRUFBRSxDQUFDLDhCQUE4QixDQUFDO1NBQzlDLENBQUM7UUFDRCxpQkFBVSxFQUFFO3lDQWNVLHVCQUFjO1lBQ2QsdUJBQWdCO1lBQ0wseUJBQWdCO1lBQzVCLGlCQUFVO09BaEJuQixvQkFBb0IsQ0FvSWhDO0lBQUQsMkJBQUM7Q0FBQSxBQXBJRCxJQW9JQztBQXBJWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmLCBWaWV3Q29udGFpbmVyUmVmLCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSBhcyBSeE9ic2VydmFibGUgfSBmcm9tIFwicnhqc1wiO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cEhlYWRlcnMsIEh0dHBSZXNwb25zZSB9IGZyb20gXCJAYW5ndWxhci9jb21tb24vaHR0cFwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXJFeHRlbnNpb25zIH0gZnJvbSAnbmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IFN0cmlwZSwgQ2FyZCwgQ3JlZGl0Q2FyZFZpZXd9IGZyb20gJ25hdGl2ZXNjcmlwdC1zdHJpcGUnO1xuLy9pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5cbi8vY29uc3Qgc3RyaXBlID0gbmV3IFN0cmlwZSgncGtfdGVzdF9jOFVUbTVydWFqSThZT1BRbzc1YlRQS3gnKTtcbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUoJ3BrX3Rlc3RfYzhVVG01cnVhamw4WU9QUW83NWJUUEt4Jyk7XG4vL2NvbnN0IEZJUkVCQVNFX0ZVTkNUSU9OID0gJ2h0dHBzOi8vW1lPVVJfRklSRUJBU0VfUFJPSkVDVF0uY2xvdWRmdW5jdGlvbnMubmV0L2NoYXJnZS8nOyAvLyBUT0RPOiBQVVQgWU9VUiBGSVJFQkFTRSBGVU5DVElPTlMgVVJMIEhFUkVcbmNvbnN0IEZJUkVCQVNFX0ZVTkNUSU9OID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtZGVreW91LWNhZmUuY2xvdWRmdW5jdGlvbnMubmV0L2N1c3RvbWVyLyc7IC8vIFRPRE86IFBVVCBZT1VSIEZJUkVCQVNFIEZVTkNUSU9OUyBVUkwgSEVSRVxuY29uc3QgaHR0cE1vZHVsZSA9IHJlcXVpcmUoXCJodHRwXCIpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICducy1tYW5hZ2UtY2FyZHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtY2FyZHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21hbmFnZS1jYXJkcy5jb21wb25lbnQuY3NzJ11cbn0pXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWFuYWdlQ2FyZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQFZpZXdDaGlsZCgnY2FyZFZpZXcnKSBjYXJkUmVmOiBFbGVtZW50UmVmO1xuICAgIC8vY2FyZDogQ2FyZERldGFpbHM7XG4gICAgLy9jYXJkVG9rZW46c3RyaW5nID0gXCJcIjtcbiAgICAvL2NjVmlldzpDcmVkaXRDYXJkVmlldztcbiAgICAvL2NjOiBDYXJkO1xuXG4gICAgLy9jYzpDYXJkID0gdGhpcy5jY1ZpZXcuY2FyZDtcblxuICAgIHByaXZhdGUgaXNMb2FkaW5nID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZSxcbiAgICAgICAgcHJpdmF0ZSB2Y1JlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICAgICAgcHJpdmF0ZSByb3V0ZXJleHRlbnNpb25zOiBSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnRcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2cgKFwiaW4gbmdPbiBpbml0IGZvciBtYW5hZ2UgY2FyZHNcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2cgKFwiY2FyZCByZWYgXCIgKyB0aGlzLmNhcmRSZWYubmF0aXZlRWxlbWVudC5jYXJkLm51bWJlcik7XG5cbiAgICB9XG5cbiAgICBvbkNhcmRSZWdpc3RlciAoYXJncyl7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJJbiBDYXJkIFJlZ2lzdGVyXCIpO1xuXG4gICAgICAgIC8vdGhpcy5jY1ZpZXcgPSB0aGlzLmNhcmRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IGNjVmlldzpDcmVkaXRDYXJkVmlldyA9IHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY2M6Q2FyZCA9IGNjVmlldy5jYXJkO1xuICAgICAgICAvL3ZhciBjYXJkVG9rZW46c3RyaW5nO1xuXG4gICAgICAgIC8vdGhpcy5jYyA9IGNjVmlldy5jYXJkO1xuXG4gICAgICAgIC8vbGV0IHBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgLy9jb25zdCBjY1ZpZXc6Q3JlZGl0Q2FyZFZpZXcgPSBwYWdlLmdldFZpZXdCeUlkKFwiY2FyZFwiKTtcbiAgICAgICAgLy9jYy5uYW1lID0gXCJLdXNoYWdyYSBNZWhyYVwiO1xuXG4gICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGVDYXJkIFwiICsgY2MubmFtZSk7XG5cbiAgICAgICAgc3RyaXBlLmNyZWF0ZVRva2VuKGNjLmNhcmQsKGVycm9yLHRva2VuKT0+e1xuICAgICAgICAgICAgaWYoIWVycm9yKXtcbiAgICAgICAgICAgICAgICAvL0RvIHNvbWV0aGluZyB3aXRoIHlvdXIgdG9rZW47XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhcInRoZSB0b2tlbiBpcyBcIiArIHRva2VuLnRva2VuSWQpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5jYXJkVG9rZW4gPSB0b2tlbi50b2tlbklkO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJ0aGUgdG9rZW4gb2YgdGhlIGNhcmQgaXMgMTExMSBcIiArIHRva2VuLnRva2VuSWQpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cgKFwidGhlIHRva2VuIGpzb24gc3RyaW5naWZ5IGlzIFwiICsgSlNPTi5zdHJpbmdpZnkodG9rZW4pKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nIChcInRoZSB0b2tlbiBqc29uIHN0cmluZ2lmeSBhbmQgcGFyc2VkIGlzIFwiICsgSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0b2tlbikpKTtcblxuXG4gICAgICAgICAgICAgICAgLypjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiB0b2tlbi50b2tlbklkLFxuICAgICAgICAgICAgICAgICAgICBjaGFyZ2UgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbW91bnQ6IDEwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIkFVRFwiLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkpOyovXG5cbiAgICAgICAgICAgICAgICB2YXIgdGV4dFN0cmluZyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLnRva2VuSWQsXG4gICAgICAgICAgICAgICAgICAgIGNoYXJnZSA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFtb3VudDogXCIxMDBcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIkFVRFwiLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSB0ZXh0IHN0cmluZyBpcyBcIiArIHRleHRTdHJpbmcpO1xuXG5cbiAgICAgICAgICAgICAgICAvKnRoaXMuaHR0cC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgdXJsOiBGSVJFQkFTRV9GVU5DVElPTixcbiAgICAgICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IHRva2VuLnRva2VuSWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBjaGFyZ2UgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50OiBcIjEwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbmN5OiBcIkFVRFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSxoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH1cbiAgICAgICAgICAgICAgICB9KS50aGVuKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL2NvbnN0IHJlc3VsdCA9IHJlc3BvbnNlLmJvZHlcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IGlzIFwiICsgcmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBpcyBcIiArIEpTT04uc3RyaW5naWZ5KHJlc3BvbnNlKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcInRoZSByZXN1bHQgbWVzc2FnZSBpcyBcIiArIHJlc3BvbnNlLmJvZHkpO1xuICAgICAgICAgICAgICAgIH0sIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nIChcImVycm9yIGlzIFwiICsgZSk7XG4gICAgICAgICAgICAgICAgfSk7Ki9cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmh0dHAucmVxdWVzdChcIlBPU1RcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIEZJUkVCQVNFX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHtcInRva2VuXCI6IFwidG9rX3Zpc2FcIiwgXCJjaGFyZ2VcIjoge1wiYW1vdW50XCI6IFwiMTAwXCIsIFwiY3VycmVuY3lcIjogXCJBVURcIn19LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnN1YnNjcmliZShyZXMgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dFN0cmluZyA9ICg8YW55PnJlcykuanNvbi5ib2R5LnRva2VuO30pO1xuXG4gICAgICAgICAgICAgICAgLypodHRwTW9kdWxlLnJlcXVlc3Qoe1xuICAgICAgICAgICAgICAgICAgICB1cmw6IEZJUkVCQVNFX0ZVTkNUSU9OLFxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7IFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiIH0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG9rZW5cIjogXCJ0b2tfdmlzYVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjaGFyZ2VcIiA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImFtb3VudFwiOiBcIjEwMFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJBVURcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc3QgcmVzdWx0ID0gcmVzcG9uc2UuYm9keVxuICAgICAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nIChcInRoZSByZXN1bHQgaXMgXCIgKyByZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAoXCJ0aGUgcmVzdWx0IGlzIFwiICsgSlNPTi5zdHJpbmdpZnkocmVzcG9uc2UpKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwidGhlIHJlc3VsdCBtZXNzYWdlIGlzIFwiICsgcmVzcG9uc2UuYm9keSk7XG4gICAgICAgICAgICAgICAgfSwgKGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2cgKFwiZXJyb3IgaXMgXCIgKyBlKTtcbiAgICAgICAgICAgICAgICB9KTsqL1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiT3JkZXIgQ29uZmlybWVkXCIpO1xuICAgICAgICAgICAgICAgIC8vVG9hc3QubWFrZVRleHQoXCJQbGVhc2UgbG9naW4gdG8gY29uZmlybSBvcmRlclwiKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBvbkNhbmNlbE5hdigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImluIGNhbmNlbCBuYXZpZ2F0aW9uXCIpO1xuICAgICAgICAvL3RoaXMucm91dGVyZXh0ZW5zaW9ucy5iYWNrKCk7XG4gICAgfVxuXG59XG4iXX0=