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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlLWNhcmRzLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1hbmFnZS1jYXJkcy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBc0c7QUFDdEcsMENBQWlEO0FBQ2pELHNEQUErRDtBQUMvRCwyREFBa0U7QUFFbEUsaUNBQWlDO0FBRWpDLElBQU0sTUFBTSxHQUFHLElBQUksNEJBQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBUTlEO0lBV0ksOEJBQ1ksS0FBcUIsRUFDckIsS0FBdUIsRUFDdkIsZ0JBQWtDO1FBRmxDLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBQ3JCLFVBQUssR0FBTCxLQUFLLENBQWtCO1FBQ3ZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFWOUMsd0JBQXdCO1FBQ3hCLFdBQVc7UUFFWCw2QkFBNkI7UUFFckIsY0FBUyxHQUFHLElBQUksQ0FBQztJQU1yQixDQUFDO0lBRUwsdUNBQVEsR0FBUjtRQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUUsK0JBQStCLENBQUMsQ0FBQztRQUM5QyxxRUFBcUU7SUFFekUsQ0FBQztJQUVELDZDQUFjLEdBQWQsVUFBZ0IsSUFBSTtRQUVoQixPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFFaEMsMkNBQTJDO1FBQzNDLElBQUksTUFBTSxHQUFrQixJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQztRQUN2RCxJQUFJLEVBQUUsR0FBUSxNQUFNLENBQUMsSUFBSSxDQUFDO1FBRTFCLHdCQUF3QjtRQUV4Qix5QkFBeUI7UUFDekIseURBQXlEO1FBRXpELEVBQUUsQ0FBQyxJQUFJLEdBQUcsZUFBZSxDQUFDO1FBRTFCLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVsQzs7Ozs7Ozs7OzthQVVLO0lBQ1QsQ0FBQztJQUVELDBDQUFXLEdBQVg7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLCtCQUErQjtJQUNuQyxDQUFDO0lBdkRzQjtRQUF0QixnQkFBUyxDQUFDLFVBQVUsQ0FBQztrQ0FBVSxpQkFBVTt5REFBQztJQUZsQyxvQkFBb0I7UUFOaEMsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFdBQVcsRUFBRSwrQkFBK0I7WUFDNUMsU0FBUyxFQUFFLENBQUMsOEJBQThCLENBQUM7U0FDOUMsQ0FBQzt5Q0FhcUIsdUJBQWM7WUFDZCx1QkFBZ0I7WUFDTCx5QkFBZ0I7T0FkckMsb0JBQW9CLENBMkRoQztJQUFELDJCQUFDO0NBQUEsQUEzREQsSUEyREM7QUEzRFksb0RBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiwgVmlld0NvbnRhaW5lclJlZiwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlckV4dGVuc2lvbnMgfSBmcm9tICduYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgU3RyaXBlLCBDYXJkLCBDcmVkaXRDYXJkVmlld30gZnJvbSAnbmF0aXZlc2NyaXB0LXN0cmlwZSc7XG5pbXBvcnQgeyBDYXJkRGV0YWlscyB9IGZyb20gXCIuLi9kYXRhdHlwZXMvY2FyZFwiO1xuLy9pbXBvcnQgeyBQYWdlIH0gZnJvbSAndWkvcGFnZSc7XG5cbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUoJ3BrX3Rlc3RfYzhVVG01cnVhakk4WU9QUW83NWJUUEt4Jyk7XG5cbkBDb21wb25lbnQoe1xuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgc2VsZWN0b3I6ICducy1tYW5hZ2UtY2FyZHMnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYW5hZ2UtY2FyZHMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHN0eWxlVXJsczogWycuL21hbmFnZS1jYXJkcy5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWFuYWdlQ2FyZHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gICAgQFZpZXdDaGlsZCgnY2FyZFZpZXcnKSBjYXJkUmVmOiBFbGVtZW50UmVmO1xuICAgIGNhcmQ6IENhcmREZXRhaWxzO1xuICAgIC8vY2NWaWV3OkNyZWRpdENhcmRWaWV3O1xuICAgIC8vY2M6IENhcmQ7XG5cbiAgICAvL2NjOkNhcmQgPSB0aGlzLmNjVmlldy5jYXJkO1xuXG4gICAgcHJpdmF0ZSBpc0xvYWRpbmcgPSB0cnVlO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlLFxuICAgICAgICBwcml2YXRlIHZjUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgICAgICBwcml2YXRlIHJvdXRlcmV4dGVuc2lvbnM6IFJvdXRlckV4dGVuc2lvbnNcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2cgKFwiaW4gbmdPbiBpbml0IGZvciBtYW5hZ2UgY2FyZHNcIik7XG4gICAgICAgIC8vY29uc29sZS5sb2cgKFwiY2FyZCByZWYgXCIgKyB0aGlzLmNhcmRSZWYubmF0aXZlRWxlbWVudC5jYXJkLm51bWJlcik7XG5cbiAgICB9XG4gICAgXG4gICAgb25DYXJkUmVnaXN0ZXIgKGFyZ3Mpe1xuICAgICAgICBcbiAgICAgICAgY29uc29sZS5sb2coXCJpbiBjYXJkIHJlZ2lzdGVyXCIpO1xuXG4gICAgICAgIC8vdGhpcy5jY1ZpZXcgPSB0aGlzLmNhcmRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IGNjVmlldzpDcmVkaXRDYXJkVmlldyA9IHRoaXMuY2FyZFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgY2M6Q2FyZCA9IGNjVmlldy5jYXJkO1xuXG4gICAgICAgIC8vdGhpcy5jYyA9IGNjVmlldy5jYXJkO1xuXG4gICAgICAgIC8vbGV0IHBhZ2UgPSBhcmdzLm9iamVjdDtcbiAgICAgICAgLy9jb25zdCBjY1ZpZXc6Q3JlZGl0Q2FyZFZpZXcgPSBwYWdlLmdldFZpZXdCeUlkKFwiY2FyZFwiKTtcblxuICAgICAgICBjYy5uYW1lID0gXCJ0ZXN0IGN1c3RvbWVyXCI7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJ0aGVDYXJkIFwiICsgY2MubmFtZSk7XG5cbiAgICAgICAgLypzdHJpcGUuY3JlYXRlVG9rZW4oY2MuY2FyZCwoZXJyb3IsdG9rZW4pPT57XG4gICAgICAgICAgICBpZighZXJyb3Ipe1xuICAgICAgICAgICAgICAgIC8vRG8gc29tZXRoaW5nIHdpdGggeW91ciB0b2tlbjtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInRoZSB0b2tlbiBpcyBcIiArIHRva2VuLnRva2VuSWQpO1xuXG4gICAgICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgICAgICAvL2FsZXJ0KFwiT3JkZXIgQ29uZmlybWVkXCIpO1xuICAgICAgICAgICAgICAgIC8vVG9hc3QubWFrZVRleHQoXCJQbGVhc2UgbG9naW4gdG8gY29uZmlybSBvcmRlclwiKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTsqL1xuICAgIH1cblxuICAgIG9uQ2FuY2VsTmF2KCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiaW4gY2FuY2VsIG5hdlwiKTtcbiAgICAgICAgLy90aGlzLnJvdXRlcmV4dGVuc2lvbnMuYmFjaygpO1xuICAgIH1cbiAgICBcbn1cbiJdfQ==