"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../services/item.service");
var router_1 = require("@angular/router");
// import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
var nativescript_angular_1 = require("nativescript-angular");
var observable_array_1 = require("data/observable-array");
var auth_service_1 = require("../services/auth.service");
var order_service_1 = require("../services/order.service");
var firebase = require("nativescript-plugin-firebase");
var ItemsComponent = /** @class */ (function () {
    // private map: MapboxViewApi;
    // //map parameters
    // access_token:string="pk.eyJ1IjoicmFodWx0eWFnaWppIiwiYSI6ImNqZGd1ZTdoZjBwczkycXJsc3M3NGthaXAifQ.8YuDqg7iO8HrAQXF9w1j_w"
    // map_style:string="streets";
    // latitude:string ="-37.8136";
    // longitude:string="144.9631";
    // zoomlevel:string="15";
    // ///
    function ItemsComponent(itemService, router, routerextensions, auth, orderservice) {
        this.itemService = itemService;
        this.router = router;
        this.routerextensions = routerextensions;
        this.auth = auth;
        this.orderservice = orderservice;
        this.items = [];
        this.myItems = [];
        this.orderList = [];
        this._orderList = new observable_array_1.ObservableArray([]);
        this._items = new observable_array_1.ObservableArray([]);
        this.orderComplexLocal = [];
        this._order = new observable_array_1.ObservableArray([]);
        this.username = "";
        this.tabSelectedIndex = 0;
    }
    ItemsComponent.prototype.ngOnInit = function () {
        // vibrator.vibrate(2000);
        var _this = this;
        this.itemService.load()
            .subscribe(function (items) {
            _this._items = new observable_array_1.ObservableArray(items);
            _this.items = [];
            _this._items.forEach(function (x) {
                _this.items.push(x);
            });
            _this.myItems = _this.items;
        });
        //order load for your picks
        firebase.getCurrentUser()
            .then(function (token) {
            _this.orderservice.loadOrder(token.uid)
                .subscribe(function (orderlist) {
                _this.orderComplexLocal = [];
                _this._orderList = new observable_array_1.ObservableArray(orderlist);
                _this.orderList = [];
                _this._orderList.forEach(function (x) {
                    _this.orderList.push(x);
                    _this.orderservice.getOrderDetails(x.cafe, x.orderNo)
                        .then(function (result) {
                        _this.orderComplexLocal.push(result.value);
                    });
                });
            });
        });
    };
    //Navitage to next screen
    ItemsComponent.prototype.jumptoMenu = function (cafeId) {
        var _this = this;
        setTimeout(function () {
            _this.routerextensions.navigate(["/cafe", cafeId], {
                animated: true,
                transition: {
                    name: "slide",
                    duration: 200,
                    curve: "ease"
                }
            }), 100;
        });
    };
    //
    // //TabView controls
    ItemsComponent.prototype.changeTab = function () {
        console.log("order refreshed");
        if (this.tabSelectedIndex === 0) {
            this.tabSelectedIndex = 1;
        }
        else if (this.tabSelectedIndex === 1) {
            this.tabSelectedIndex = 2;
        }
        else if (this.tabSelectedIndex === 2) {
            this.tabSelectedIndex = 0;
        }
    };
    // search bar
    ItemsComponent.prototype.onTextChanged = function (args) {
        var searchBar = args.object;
        var searchValue = searchBar.text.toLowerCase();
        this.myItems = this.items.filter(function (item) {
            return (item.name + " " + item.name).toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
        });
    };
    ItemsComponent.prototype.searchLoaded = function (event) {
        if (event.object.android) {
            event.object.android.clearFocus();
        }
    };
    ItemsComponent.prototype.onSearchLayoutLoaded = function (event) {
        if (event.object.android) {
            event.object.android.setFocusableInTouchMode(true);
        }
    };
    ItemsComponent.prototype.ngAfterViewInit = function () {
    };
    ItemsComponent.prototype.onRegister = function () {
        this.routerextensions.navigate(['register']);
    };
    ItemsComponent.prototype.onSignin = function () {
        this.routerextensions.navigate(['signin']);
    };
    ItemsComponent.prototype.onSignout = function () {
        this.auth.signout();
    };
    //For your picks...
    ItemsComponent.prototype.topThreeCafes = function () {
        console.log("frequent fired");
        this.orderservice.frequentCafe("CBNUluA6FogVIkOSlD4WKOFvMjf1");
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
            styleUrls: ["./items.component.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService,
            router_1.Router,
            nativescript_angular_1.RouterExtensions,
            auth_service_1.AuthService,
            order_service_1.OrderService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdEO0FBRWhELHlEQUF1RDtBQUN2RCwwQ0FBd0M7QUFDeEMsbUZBQW1GO0FBQ25GLDZEQUFzRDtBQUN0RCwwREFBc0Q7QUFLdEQseURBQXFEO0FBRXJELDJEQUF1RDtBQUV2RCx1REFBMEQ7QUFVMUQ7SUFlSSw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLHlIQUF5SDtJQUN6SCw4QkFBOEI7SUFDOUIsK0JBQStCO0lBQy9CLCtCQUErQjtJQUMvQix5QkFBeUI7SUFDekIsTUFBTTtJQUVOLHdCQUFvQixXQUF3QixFQUN4QixNQUFhLEVBQ2IsZ0JBQWlDLEVBQ2pDLElBQWdCLEVBQ2hCLFlBQXlCO1FBSnpCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQU87UUFDYixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWE7UUExQjdDLFVBQUssR0FBUyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixjQUFTLEdBQW9ELEVBQUUsQ0FBQztRQUNoRSxlQUFVLEdBQXFFLElBQUksa0NBQWUsQ0FBbUQsRUFBRSxDQUFDLENBQUM7UUFDekosV0FBTSxHQUF5QixJQUFJLGtDQUFlLENBQU8sRUFBRSxDQUFDLENBQUM7UUFDN0Qsc0JBQWlCLEdBQWdCLEVBQUUsQ0FBQztRQUNwQyxXQUFNLEdBQWlDLElBQUksa0NBQWUsQ0FBZSxFQUFFLENBQUMsQ0FBQztRQUk3RSxhQUFRLEdBQVEsRUFBRSxDQUFDO1FBaUJmLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFFSSwwQkFBMEI7UUFG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QztJQUdMLG1CQUFtQjtJQUNYLHNDQUFhLEdBQWI7UUFFSSxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDN0IsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUVuRSxDQUFDO0lBckpJLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBQyxDQUFDLHVCQUF1QixDQUFDO1NBQ3RDLENBQUM7eUNBMEJtQywwQkFBVztZQUNqQixlQUFNO1lBQ0ksdUNBQWdCO1lBQzVCLDBCQUFXO1lBQ0gsNEJBQVk7T0E1QnBDLGNBQWMsQ0F1SjFCO0lBQUQscUJBQUM7Q0FBQSxBQXZKRCxJQXVKQztBQXZKWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuLy8gaW1wb3J0IHsgTWFwYm94Vmlld0FwaSwgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuXG5cblxuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4uL2RhdGF0eXBlcy9vcmRlclwiO1xuaW1wb3J0IHtPcmRlclNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9vcmRlci5zZXJ2aWNlXCI7XG5pbXBvcnQge09yZGVyQ29tcGxleH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9vcmRlci5jb21wbGV4XCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczpbXCIuL2l0ZW1zLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBidXNpbmVzc05hbWU6IFN0cmluZ1tdO1xuICAgIGl0ZW1zOiBJdGVtW109W107XG4gICAgbXlJdGVtczpJdGVtW109W107XG4gICAgb3JkZXJMaXN0OntcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfVtdPVtdO1xuICAgIF9vcmRlckxpc3Q6T2JzZXJ2YWJsZUFycmF5PHtcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PHtcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfT4oW10pO1xuICAgIF9pdGVtczpPYnNlcnZhYmxlQXJyYXk8SXRlbT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KFtdKTtcbiAgICBvcmRlckNvbXBsZXhMb2NhbDpPcmRlckNvbXBsZXhbXT1bXTtcbiAgICBfb3JkZXI6T2JzZXJ2YWJsZUFycmF5PE9yZGVyQ29tcGxleD4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PE9yZGVyQ29tcGxleD4oW10pO1xuXG4gICAgcHVibGljIHRhYlNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6c3RyaW5nPVwiXCI7XG4gICAgcHJpdmF0ZSBfY3VycmVudE5vdGlmaWNhdGlvbjogc3RyaW5nO1xuXG4gICAgLy8gcHJpdmF0ZSBtYXA6IE1hcGJveFZpZXdBcGk7XG4gICAgLy8gLy9tYXAgcGFyYW1ldGVyc1xuICAgIC8vIGFjY2Vzc190b2tlbjpzdHJpbmc9XCJway5leUoxSWpvaWNtRm9kV3gwZVdGbmFXcHBJaXdpWVNJNkltTnFaR2QxWlRkb1pqQndjemt5Y1hKc2MzTTNOR3RoYVhBaWZRLjhZdURxZzdpTzhIckFRWEY5dzFqX3dcIlxuICAgIC8vIG1hcF9zdHlsZTpzdHJpbmc9XCJzdHJlZXRzXCI7XG4gICAgLy8gbGF0aXR1ZGU6c3RyaW5nID1cIi0zNy44MTM2XCI7XG4gICAgLy8gbG9uZ2l0dWRlOnN0cmluZz1cIjE0NC45NjMxXCI7XG4gICAgLy8gem9vbWxldmVsOnN0cmluZz1cIjE1XCI7XG4gICAgLy8gLy8vXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjpSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJleHRlbnNpb25zOlJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3JkZXJzZXJ2aWNlOk9yZGVyU2VydmljZSkge1xuICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIHZpYnJhdG9yLnZpYnJhdGUoMjAwMCk7XG5cbiAgICAgICAgdGhpcy5pdGVtU2VydmljZS5sb2FkKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGl0ZW1zOiBBcnJheTxJdGVtPikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheShpdGVtcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcz1bXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKCh4KT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXM9dGhpcy5pdGVtcztcbiAgICAgICAgICAgIH0pO1xuXG5cbi8vb3JkZXIgbG9hZCBmb3IgeW91ciBwaWNrc1xuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAudGhlbigodG9rZW4pPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMub3JkZXJzZXJ2aWNlLmxvYWRPcmRlcih0b2tlbi51aWQpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKG9yZGVybGlzdDogQXJyYXk8e1wib3JkZXJOb1wiOnN0cmluZyxcImNhZmVcIjpzdHJpbmcsXCJzdGF0dXNcIjpzdHJpbmd9PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckNvbXBsZXhMb2NhbD1bXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyTGlzdCA9IG5ldyBPYnNlcnZhYmxlQXJyYXkob3JkZXJsaXN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJMaXN0PVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJMaXN0LmZvckVhY2goKHgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckxpc3QucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyc2VydmljZS5nZXRPcmRlckRldGFpbHMoeC5jYWZlLHgub3JkZXJObylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oKHJlc3VsdCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDb21wbGV4TG9jYWwucHVzaChyZXN1bHQudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuLy9OYXZpdGFnZSB0byBuZXh0IHNjcmVlblxuICAgICAgICAgICAganVtcHRvTWVudShjYWZlSWQpIHtcbiAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57dGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYWZlXCIsIGNhZmVJZF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSwxMDB9KTtcbiAgICAgICAgICAgIH1cbi8vXG4vLyAvL1RhYlZpZXcgY29udHJvbHNcbiAgICBjaGFuZ2VUYWIoKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJvcmRlciByZWZyZXNoZWRcIilcbiAgICAgICAgaWYgKHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJTZWxlY3RlZEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuLy8gc2VhcmNoIGJhclxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICB0aGlzLm15SXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlciggaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7aXRlbS5uYW1lfSAke2l0ZW0ubmFtZX1gLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgc2VhcmNoTG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvblNlYXJjaExheW91dExvYWRlZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGV2ZW50Lm9iamVjdC5hbmRyb2lkLnNldEZvY3VzYWJsZUluVG91Y2hNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgfVxuXG5cbiAgICBvblJlZ2lzdGVyKCl7XG5cbiAgICB0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoWydyZWdpc3RlciddKTtcblxuICAgIH1cblxuICAgIG9uU2lnbmluKCl7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFsnc2lnbmluJ10pO1xuXG4gICAgfVxuXG4gICAgb25TaWdub3V0KCl7XG5cbiAgICAgICAgdGhpcy5hdXRoLnNpZ25vdXQoKTtcbiAgICB9XG5cblxuLy9Gb3IgeW91ciBwaWNrcy4uLlxuICAgICAgICB0b3BUaHJlZUNhZmVzKCl7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZnJlcXVlbnQgZmlyZWRcIilcbiAgICAgICAgICAgIHRoaXMub3JkZXJzZXJ2aWNlLmZyZXF1ZW50Q2FmZShcIkNCTlVsdUE2Rm9nVklrT1NsRDRXS09Gdk1qZjFcIik7XG5cbiAgICAgICAgfVxuXG59XG4iXX0=