"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var router_2 = require("nativescript-angular/router");
var nativescript_stripe_1 = require("nativescript-stripe");
//import { Page } from 'ui/page';
var stripe = new nativescript_stripe_1.Stripe('pk_test_c8UTm5ruajI8YOPQo75bTPKx');
var ManageCardsComponent = /** @class */ (function () {
    function ManageCardsComponent(route, vcRef, routerextensions) {
        this.route = route;
        this.vcRef = vcRef;
        this.routerextensions = routerextensions;
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
        console.log("in card register");
        //this.ccView = this.cardRef.nativeElement;
        var ccView = this.cardRef.nativeElement;
        var cc = ccView.card;
        //this.cc = ccView.card;
        //let page = args.object;
        //const ccView:CreditCardView = page.getViewById("card");
        cc.name = "test customer";
        console.log("theCard " + cc.name);
        /*stripe.createToken(cc.card,(error,token)=>{
            if(!error){
                //Do something with your token;
                console.log("the token is " + token.tokenId);

            }else{
                //alert("Order Confirmed");
                //Toast.makeText("Please login to confirm order").show();
                console.log(error);
            }
        });*/
    };
    ManageCardsComponent.prototype.onCancelNav = function () {
        console.log("in cancel nav");
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
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            core_1.ViewContainerRef,
            router_2.RouterExtensions])
    ], ManageCardsComponent);
    return ManageCardsComponent;
}());
exports.ManageCardsComponent = ManageCardsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWNhcmRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZS1jYXJkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0c7QUFDdEcsMENBQWlEO0FBQ2pELHNEQUErRDtBQUMvRCwyREFBa0U7QUFDbEUsaUNBQWlDO0FBRWpDLElBQU0sTUFBTSxHQUFHLElBQUksNEJBQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBUTlEO0lBVUksOEJBQ1ksS0FBcUIsRUFDckIsS0FBdUIsRUFDdkIsZ0JBQWtDO1FBRmxDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFWOUMsd0JBQXdCO1FBQ3hCLFdBQVc7UUFFWCw2QkFBNkI7UUFFckIsY0FBUyxHQUFHLElBQUksQ0FBQztJQU1yQixDQUFDO0lBRUwsdUNBQVEsR0FBUjtRQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUUsK0JBQStCLENBQUMsQ0FBQztRQUM5QyxxRUFBcUU7SUFFekUsQ0FBQztJQUVELDZDQUFjLEdBQWQsVUFBZ0IsSUFBSTtRQUVoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFaEMsMkNBQTJDO1FBQzNDLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUN2RCxJQUFJLEVBQUUsR0FBUSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRTFCLHdCQUF3QjtRQUV4Qix5QkFBeUI7UUFDekIseURBQXlEO1FBQ3pELEVBQUUsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQzs7Ozs7Ozs7OzthQVVLO0lBQ1QsQ0FBQztJQUVELDBDQUFXLEdBQVg7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLCtCQUErQjtJQUNuQyxDQUFDO0lBckRzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVSxpQkFBVTt5REFBQztJQUZsQyxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FZcUIsdUJBQWM7WUFDZCx1QkFBZ0I7WUFDTCx5QkFBZ0I7T0FickMsb0JBQW9CLENBeURoQztJQUFELDJCQUFDO0NBQUEsQUF6REQsSUF5REM7QUF6RFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3RyaXBlLCBDYXJkLCBDcmVkaXRDYXJkVmlld30gZnJvbSAnbmF0aXZlc2NyaXB0LXN0cmlwZSc7XG4vL2ltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcblxuY29uc3Qgc3RyaXBlID0gbmV3IFN0cmlwZSgncGtfdGVzdF9jOFVUbTVydWFqSThZT1BRbzc1YlRQS3gnKTtcblxuQENvbXBvbmVudCh7XG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICBzZWxlY3RvcjogJ25zLW1hbmFnZS1jYXJkcycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21hbmFnZS1jYXJkcy5jb21wb25lbnQuaHRtbCcsXG4gICAgc3R5bGVVcmxzOiBbJy4vbWFuYWdlLWNhcmRzLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYW5hZ2VDYXJkc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBAVmlld0NoaWxkKCdjYXJkVmlldycpIGNhcmRSZWY6IEVsZW1lbnRSZWY7XG4gICAgLy9jY1ZpZXc6Q3JlZGl0Q2FyZFZpZXc7XG4gICAgLy9jYzogQ2FyZDtcblxuICAgIC8vY2M6Q2FyZCA9IHRoaXMuY2NWaWV3LmNhcmQ7XG5cbiAgICBwcml2YXRlIGlzTG9hZGluZyA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGUsXG4gICAgICAgIHByaXZhdGUgdmNSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgICAgIHByaXZhdGUgcm91dGVyZXh0ZW5zaW9uczogUm91dGVyRXh0ZW5zaW9uc1xuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyAoXCJpbiBuZ09uIGluaXQgZm9yIG1hbmFnZSBjYXJkc1wiKTtcbiAgICAgICAgLy9jb25zb2xlLmxvZyAoXCJjYXJkIHJlZiBcIiArIHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50LmNhcmQubnVtYmVyKTtcblxuICAgIH1cbiAgICBcbiAgICBvbkNhcmRSZWdpc3RlciAoYXJncyl7XG4gICAgICAgIFxuICAgICAgICBjb25zb2xlLmxvZyhcImluIGNhcmQgcmVnaXN0ZXJcIik7XG5cbiAgICAgICAgLy90aGlzLmNjVmlldyA9IHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY2NWaWV3OkNyZWRpdENhcmRWaWV3ID0gdGhpcy5jYXJkUmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCBjYzpDYXJkID0gY2NWaWV3LmNhcmQ7XG5cbiAgICAgICAgLy90aGlzLmNjID0gY2NWaWV3LmNhcmQ7XG5cbiAgICAgICAgLy9sZXQgcGFnZSA9IGFyZ3Mub2JqZWN0O1xuICAgICAgICAvL2NvbnN0IGNjVmlldzpDcmVkaXRDYXJkVmlldyA9IHBhZ2UuZ2V0Vmlld0J5SWQoXCJjYXJkXCIpO1xuICAgICAgICBjYy5uYW1lID0gXCJ0ZXN0IGN1c3RvbWVyXCI7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGVDYXJkIFwiICsgY2MubmFtZSk7XG5cbiAgICAgICAgLypzdHJpcGUuY3JlYXRlVG9rZW4oY2MuY2FyZCwoZXJyb3IsdG9rZW4pPT57XG4gICAgICAgICAgICBpZighZXJyb3Ipe1xuICAgICAgICAgICAgICAgIC8vRG8gc29tZXRoaW5nIHdpdGggeW91ciB0b2tlbjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSB0b2tlbiBpcyBcIiArIHRva2VuLnRva2VuSWQpO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiT3JkZXIgQ29uZmlybWVkXCIpO1xuICAgICAgICAgICAgICAgIC8vVG9hc3QubWFrZVRleHQoXCJQbGVhc2UgbG9naW4gdG8gY29uZmlybSBvcmRlclwiKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsqL1xuICAgIH1cblxuICAgIG9uQ2FuY2VsTmF2KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW4gY2FuY2VsIG5hdlwiKTtcbiAgICAgICAgLy90aGlzLnJvdXRlcmV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbiAgICBcbn1cbiJdfQ==