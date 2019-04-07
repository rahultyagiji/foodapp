"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../services/item.service");
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
// import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
var nativescript_angular_1 = require("nativescript-angular");
var observable_array_1 = require("data/observable-array");
var auth_service_1 = require("../services/auth.service");
var order_service_1 = require("../services/order.service");
var firebase = require("nativescript-plugin-firebase");
//trying location
var nativescript_geolocation_1 = require("nativescript-geolocation");
var color_1 = require("tns-core-modules/color");
var page_1 = require("tns-core-modules/ui/page");
// import {and} from "../../platforms/ios/DQCafev02/app/tns_modules/@angular/router/src/utils/collection";
// var Vibrate = require("nativescript-vibrate").Vibrate;
// let vibrator = new Vibrate();
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(itemService, router, route, routerextensions, auth, orderservice, _page) {
        this.itemService = itemService;
        this.router = router;
        this.route = route;
        this.routerextensions = routerextensions;
        this.auth = auth;
        this.orderservice = orderservice;
        this._page = _page;
        this.tabSelected = 0;
        this.items = [];
        this.myItems = [];
        this.orderList = [];
        this._orderList = new observable_array_1.ObservableArray([]);
        this._items = new observable_array_1.ObservableArray([]);
        this.orderComplexLocal = [];
        this.orderComplexLocalFilter = [];
        this.orderDisplay = { "key": "", "uid": "", "status": "", "order": null,
            "cafeOwner": "", "location": "", "orderNo2": "", "imgSrc": "", "total": "" };
        this._order = new observable_array_1.ObservableArray([]);
        this.frequentCafes = [];
        this.startLocation = new nativescript_geolocation_1.Location();
        this.username = "";
        if (this.route.snapshot.params["tabId"] != null && this.route.snapshot.params["tabId"] == 1) {
            this.tabSelectedIndex = 1;
        }
        else {
            this.tabSelectedIndex = 0;
        }
    }
    ItemsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._page.actionBarHidden = true;
        if (this.items != []) {
            this.itemService.load()
                .subscribe(function (items) {
                _this._items = new observable_array_1.ObservableArray(items);
                _this.items = [];
                _this._items.forEach(function (x) {
                    _this.items.push(x);
                });
                _this.myItems.length = 0;
                _this.filterByLocation();
            });
        }
        else {
            console.log("not loading again");
        }
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
                });
                _this.orderList.forEach(function (x) {
                    //get Cafe details
                    _this.orderservice.getOrderDetails(x.cafe, x.orderNo)
                        .then(function (result) {
                        _this.orderDisplay.cafeOwner = _this.itemService.getCafeInfo(x.cafe).name;
                        _this.orderDisplay.imgSrc = _this.itemService.getCafeInfo(x.cafe).imgSrc;
                        _this.orderDisplay.key = result.value.key;
                        _this.orderDisplay.uid = result.value.uid;
                        _this.orderDisplay.status = result.value.status;
                        _this.orderDisplay.orderNo2 = result.value.orderNo2;
                        _this.orderDisplay.order = result.value.order;
                        _this.orderDisplay.total = _this.totalPrice(_this.orderDisplay.order);
                        _this.orderComplexLocal.push(_this.orderDisplay);
                        _this.onTapCurrentOrder();
                        _this.orderDisplay = { "key": "", "uid": "", "status": "", "order": null,
                            "cafeOwner": "", "location": "", "orderNo2": "", "imgSrc": "", "total": "" };
                    });
                });
            });
            _this.ontapListofFrequent(token.uid);
        });
    };
    //Frequently visited - to be completed ....
    ItemsComponent.prototype.ontapListofFrequent = function (token) {
        var _this = this;
        var counts;
        this.orderservice.frequentCafe(token)
            .then(function (res) {
            Object.keys(res.value).forEach(function (x) {
                _this.frequentCafes.push(res.value[x].cafe);
            });
        })
            .catch();
    };
    //Navitage to next screen
    ItemsComponent.prototype.jumptoMenu = function (cafeId, args) {
        var page = args.object;
        var view = page.getViewById("cafename");
        view.backgroundColor = new color_1.Color("#f0f0f0");
        view.animate({ backgroundColor: new color_1.Color("white"), duration: 200 });
        this.routerextensions.navigate(["/cafe", cafeId]);
    };
    // search bar
    ItemsComponent.prototype.onTextChanged = function (args) {
        var searchBar = args.object;
        if (searchBar.text != "") {
            var searchValue_1 = searchBar.text.toLowerCase();
            if (searchBar.text != "") {
                this.myItems = this.items.filter(function (item) {
                    return (item.name + " " + item.name).toLowerCase().indexOf(searchValue_1.toLowerCase()) > -1;
                });
            }
            else {
                setTimeout(function () {
                    searchBar.dismissSoftInput();
                }, 300);
            }
        }
        else {
            // this.myItems.length=0;
            // this.filterByLocation();
        }
    };
    ItemsComponent.prototype.searchLoaded = function (event) {
        this.searchPhrase = "";
        event.object.android.setFocusable(false);
    };
    ItemsComponent.prototype.onSubmit = function (args) {
        var searchbar = args.object;
        searchbar.dismissSoftInput();
    };
    ItemsComponent.prototype.onClear = function (args) {
        var searchbar = args.object;
        searchbar.dismissSoftInput();
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
        this.orderservice.frequentCafe(this.auth.authUid());
    };
    ItemsComponent.prototype.onTapCurrentOrder = function () {
        this.orderComplexLocalFilter = this.orderComplexLocal.filter(function (x) {
            return x.status != "collected";
        });
    };
    ItemsComponent.prototype.onTapPastOrders = function () {
        this.orderComplexLocalFilter = this.orderComplexLocal.filter(function (x) {
            return x.status === "collected";
        });
    };
    ItemsComponent.prototype.totalPrice = function (order) {
        var total = "0";
        order.forEach(function (x) {
            //for total
            total = (Math.round((parseFloat(total) + parseFloat(x.priceQuantity)) * 100) / 100).toString();
        });
        return total;
    };
    ItemsComponent.prototype.filterByLocation = function () {
        var _this = this;
        var date = new Date();
        this.items.forEach(function (x) {
            _this.myItems.length = 0;
            var that = _this;
            nativescript_geolocation_1.getCurrentLocation({ desiredAccuracy: 1, updateDistance: 10, maximumAge: 20000, timeout: 5000 }).
                then(function (loc) {
                if (loc) {
                    var a = nativescript_geolocation_1.distance(loc, { "latitude": x.lat, "longitude": x.lng, "direction": 0, "horizontalAccuracy": 14,
                        "verticalAccuracy": 14, "speed": 0, "altitude": 89, "timestamp": date });
                    if (a < 35000) {
                        that.myItems.push(x);
                    }
                    else {
                        //remove this when we need filtering by location
                        that.myItems.push(x);
                    }
                }
            }, function (e) {
                //push anyway
                that.myItems.push(x);
            });
        });
    };
    ItemsComponent.prototype.tabSelectedFunction = function (a) {
        this.tabSelected = a;
    };
    ItemsComponent.prototype.onClickmanagecard = function () {
        this.routerextensions.navigate(['cards']);
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
            styleUrls: ["./items.component.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService,
            router_2.Router,
            router_1.ActivatedRoute,
            nativescript_angular_1.RouterExtensions,
            auth_service_1.AuthService,
            order_service_1.OrderService,
            page_1.Page])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdEO0FBRWhELHlEQUF1RDtBQUN2RCwwQ0FBK0M7QUFDL0MsMENBQXdDO0FBQ3hDLG1GQUFtRjtBQUNuRiw2REFBc0Q7QUFDdEQsMERBQXNEO0FBRXRELHlEQUFxRDtBQUVyRCwyREFBdUQ7QUFFdkQsdURBQTBEO0FBRTFELGlCQUFpQjtBQUNqQixxRUFBOEk7QUFHOUksZ0RBQTZDO0FBQzdDLGlEQUE4QztBQUM5QywwR0FBMEc7QUFDMUcseURBQXlEO0FBQ3pELGdDQUFnQztBQVVoQztJQXVCSSx3QkFBb0IsV0FBd0IsRUFDeEIsTUFBYSxFQUNiLEtBQW9CLEVBQ3BCLGdCQUFpQyxFQUNqQyxJQUFnQixFQUNoQixZQUF5QixFQUN6QixLQUFXO1FBTlgsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUNiLFVBQUssR0FBTCxLQUFLLENBQWU7UUFDcEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBQ3pCLFVBQUssR0FBTCxLQUFLLENBQU07UUE1Qi9CLGdCQUFXLEdBQVEsQ0FBQyxDQUFDO1FBRXJCLFVBQUssR0FBUyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixjQUFTLEdBQW9ELEVBQUUsQ0FBQztRQUNoRSxlQUFVLEdBQXFFLElBQUksa0NBQWUsQ0FBbUQsRUFBRSxDQUFDLENBQUM7UUFDekosV0FBTSxHQUF5QixJQUFJLGtDQUFlLENBQU8sRUFBRSxDQUFDLENBQUM7UUFDN0Qsc0JBQWlCLEdBQWdCLEVBQUUsQ0FBQztRQUNwQyw0QkFBdUIsR0FBZ0IsRUFBRSxDQUFDO1FBQzFDLGlCQUFZLEdBQWMsRUFBQyxLQUFLLEVBQUMsRUFBRSxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsUUFBUSxFQUFDLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSTtZQUNsRSxXQUFXLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsQ0FBQTtRQUN0RSxXQUFNLEdBQWlDLElBQUksa0NBQWUsQ0FBZSxFQUFFLENBQUMsQ0FBQztRQUM3RSxrQkFBYSxHQUFVLEVBQUUsQ0FBQztRQUcxQixrQkFBYSxHQUFVLElBQUksbUNBQVEsRUFBRSxDQUFDO1FBSXRDLGFBQVEsR0FBUSxFQUFFLENBQUM7UUFXZixFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pGLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO0lBQ0wsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkFzREM7UUFyREcsSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDO1FBRWxDLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUUsRUFBRSxDQUFDLENBQUEsQ0FBQztZQUNmLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2lCQUNsQixTQUFTLENBQUMsVUFBQyxLQUFrQjtnQkFDMUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3pDLEtBQUksQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDO2dCQUNkLEtBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztvQkFDbEIsS0FBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQyxDQUFDO2dCQUNILEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztnQkFDdEIsS0FBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7UUFDWCxDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDcEMsQ0FBQztRQUdULDJCQUEyQjtRQUNuQixRQUFRLENBQUMsY0FBYyxFQUFFO2FBQ3BCLElBQUksQ0FBQyxVQUFDLEtBQUs7WUFDUixLQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2lCQUNqQyxTQUFTLENBQUMsVUFBQyxTQUFrRTtnQkFDMUUsS0FBSSxDQUFDLGlCQUFpQixHQUFDLEVBQUUsQ0FBQztnQkFDMUIsS0FBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLGtDQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ2pELEtBQUksQ0FBQyxTQUFTLEdBQUMsRUFBRSxDQUFDO2dCQUNsQixLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7b0JBQ3RCLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQztnQkFFSCxLQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQUM7b0JBQ2pELGtCQUFrQjtvQkFDVSxLQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7eUJBQzlDLElBQUksQ0FBQyxVQUFDLE1BQU07d0JBQ1QsS0FBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUMsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDdEUsS0FBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEdBQUcsS0FBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQzt3QkFDdkUsS0FBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7d0JBQ3pDLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO3dCQUN6QyxLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQzt3QkFDL0MsS0FBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7d0JBQ25ELEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxHQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUMzQyxLQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssR0FBQyxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUE7d0JBQ2hFLEtBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3dCQUMvQyxLQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzt3QkFDekIsS0FBSSxDQUFDLFlBQVksR0FBRSxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJOzRCQUMzRCxXQUFXLEVBQUMsRUFBRSxFQUFDLFVBQVUsRUFBQyxFQUFFLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUMsQ0FBQztvQkFDM0UsQ0FBQyxDQUFDLENBQUE7Z0JBQ1YsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUMsQ0FBQztZQUNQLEtBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDeEMsQ0FBQyxDQUFDLENBQUM7SUFFWCxDQUFDO0lBRUwsMkNBQTJDO0lBQ3ZDLDRDQUFtQixHQUFuQixVQUFvQixLQUFLO1FBQXpCLGlCQVVDO1FBVEcsSUFBSSxNQUFZLENBQUM7UUFDakIsSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDO2FBQ2hDLElBQUksQ0FDRCxVQUFDLEdBQUc7WUFDQSxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUM3QixLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDO2FBQ0wsS0FBSyxFQUFFLENBQUM7SUFDakIsQ0FBQztJQUVMLHlCQUF5QjtJQUNyQixtQ0FBVSxHQUFWLFVBQVcsTUFBTSxFQUFDLElBQUk7UUFDbEIsSUFBSSxJQUFJLEdBQWdCLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDcEMsSUFBSSxJQUFJLEdBQWdCLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGFBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLElBQUksYUFBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1FBRXJFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUwsYUFBYTtJQUVGLHNDQUFhLEdBQXBCLFVBQXFCLElBQUk7UUFFckIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFFLEVBQUUsQ0FBQyxDQUFBLENBQUM7WUFDcEIsSUFBSSxhQUFXLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMvQyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFBLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUUsVUFBQSxJQUFJO29CQUNsQyxNQUFNLENBQUMsQ0FBRyxJQUFJLENBQUMsSUFBSSxTQUFJLElBQUksQ0FBQyxJQUFNLENBQUEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxPQUFPLENBQUMsYUFBVyxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQzdGLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQztZQUNELElBQUksQ0FBQyxDQUFDO2dCQUNGLFVBQVUsQ0FBQztvQkFDUCxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztnQkFDakMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1osQ0FBQztRQUNMLENBQUM7UUFDRCxJQUFJLENBQUEsQ0FBQztZQUNELHlCQUF5QjtZQUN6QiwyQkFBMkI7UUFDL0IsQ0FBQztJQUNMLENBQUM7SUFFRCxxQ0FBWSxHQUFaLFVBQWEsS0FBSztRQUNkLElBQUksQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDO1FBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QyxDQUFDO0lBRU0saUNBQVEsR0FBZixVQUFnQixJQUFJO1FBQ2hCLElBQUksU0FBUyxHQUFjLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDdkMsU0FBUyxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUdNLGdDQUFPLEdBQWQsVUFBZSxJQUFJO1FBQ2YsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUN2QyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUNqQyxDQUFDO0lBR0QsbUNBQVUsR0FBVjtRQUVJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO0lBRWpELENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBRUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFFL0MsQ0FBQztJQUVELGtDQUFTLEdBQVQ7UUFFSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFHTCxtQkFBbUI7SUFDZixzQ0FBYSxHQUFiO1FBRUksSUFBSSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRXhELENBQUM7SUFHRCwwQ0FBaUIsR0FBakI7UUFDSSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUM7WUFDcEUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUksV0FBVyxDQUFBO1FBRWxDLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUdELHdDQUFlLEdBQWY7UUFDSSxJQUFJLENBQUMsdUJBQXVCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxVQUFTLENBQUM7WUFDbkUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssV0FBVyxDQUFBO1FBQ25DLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxLQUFhO1FBQ3BCLElBQUksS0FBSyxHQUFDLEdBQUcsQ0FBQztRQUNkLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO1lBQ1osV0FBVztZQUNYLEtBQUssR0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxHQUFDLEdBQUcsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzVGLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQseUNBQWdCLEdBQWhCO1FBQUEsaUJBMEJDO1FBekJHLElBQU0sSUFBSSxHQUFTLElBQUksSUFBSSxFQUFFLENBQUM7UUFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO1lBRWpCLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFDLENBQUMsQ0FBQztZQUN0QixJQUFJLElBQUksR0FBRyxLQUFJLENBQUM7WUFFaEIsNkNBQWtCLENBQUMsRUFBQyxlQUFlLEVBQUUsQ0FBQyxFQUFFLGNBQWMsRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7Z0JBQzlGLElBQUksQ0FBQyxVQUFTLEdBQUc7Z0JBQ2IsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFDTixJQUFJLENBQUMsR0FBRyxtQ0FBUSxDQUFDLEdBQUcsRUFBQyxFQUFDLFVBQVUsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFDLFdBQVcsRUFBQyxDQUFDLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBQyxDQUFDLEVBQUUsb0JBQW9CLEVBQUMsRUFBRTt3QkFDNUYsa0JBQWtCLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBQyxDQUFDLEVBQUMsVUFBVSxFQUFDLEVBQUUsRUFBQyxXQUFXLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFDckUsRUFBRSxDQUFBLENBQUMsQ0FBQyxHQUFDLEtBQUssQ0FBQyxDQUFBLENBQUM7d0JBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLENBQUM7b0JBQ0QsSUFBSSxDQUFBLENBQUM7d0JBQ0QsZ0RBQWdEO3dCQUNoRCxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDekIsQ0FBQztnQkFDTCxDQUFDO1lBQ0wsQ0FBQyxFQUFFLFVBQVMsQ0FBQztnQkFDVCxhQUFhO2dCQUNiLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBRVAsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsNENBQW1CLEdBQW5CLFVBQW9CLENBQVE7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUM7SUFDdkIsQ0FBQztJQUVELDBDQUFpQixHQUFqQjtRQUNJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBRTlDLENBQUM7SUFsUFEsY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFDLENBQUMsdUJBQXVCLENBQUM7U0FDdEMsQ0FBQzt5Q0F5Qm1DLDBCQUFXO1lBQ2pCLGVBQU07WUFDUCx1QkFBYztZQUNILHVDQUFnQjtZQUM1QiwwQkFBVztZQUNILDRCQUFZO1lBQ2xCLFdBQUk7T0E3QnRCLGNBQWMsQ0FvUDFCO0lBQUQscUJBQUM7Q0FBQSxBQXBQRCxJQW9QQztBQXBQWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q29tcG9uZW50LCBPbkluaXR9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7QWN0aXZhdGVkUm91dGV9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuLy8gaW1wb3J0IHsgTWFwYm94Vmlld0FwaSwgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4uL2RhdGF0eXBlcy9vcmRlclwiO1xuaW1wb3J0IHtPcmRlclNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9vcmRlci5zZXJ2aWNlXCI7XG5pbXBvcnQge09yZGVyRGlzcGxheX0gZnJvbSBcIi4uL2RhdGF0eXBlcy9vcmRlci5kaXNwbGF5XCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuLy90cnlpbmcgbG9jYXRpb25cbmltcG9ydCB7TG9jYXRpb24sIGlzRW5hYmxlZCwgZW5hYmxlTG9jYXRpb25SZXF1ZXN0LCBnZXRDdXJyZW50TG9jYXRpb24sIHdhdGNoTG9jYXRpb24sIGRpc3RhbmNlLCBjbGVhcldhdGNoIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1nZW9sb2NhdGlvblwiO1xuaW1wb3J0IHtBY2N1cmFjeX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvZW51bXMvZW51bXNcIjtcbmltcG9ydCB7U3RhY2tMYXlvdXR9IGZyb20gXCJ1aS9sYXlvdXRzL3N0YWNrLWxheW91dFwiO1xuaW1wb3J0IHtDb2xvcn0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvY29sb3JcIjtcbmltcG9ydCB7UGFnZX0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvdWkvcGFnZVwiO1xuLy8gaW1wb3J0IHthbmR9IGZyb20gXCIuLi8uLi9wbGF0Zm9ybXMvaW9zL0RRQ2FmZXYwMi9hcHAvdG5zX21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyL3NyYy91dGlscy9jb2xsZWN0aW9uXCI7XG4vLyB2YXIgVmlicmF0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdmlicmF0ZVwiKS5WaWJyYXRlO1xuLy8gbGV0IHZpYnJhdG9yID0gbmV3IFZpYnJhdGUoKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczpbXCIuL2l0ZW1zLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICB0YWJTZWxlY3RlZDpOdW1iZXI9MDtcbiAgICBidXNpbmVzc05hbWU6IFN0cmluZ1tdO1xuICAgIGl0ZW1zOiBJdGVtW109W107XG4gICAgbXlJdGVtczpJdGVtW109W107XG4gICAgb3JkZXJMaXN0OntcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfVtdPVtdO1xuICAgIF9vcmRlckxpc3Q6T2JzZXJ2YWJsZUFycmF5PHtcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PHtcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfT4oW10pO1xuICAgIF9pdGVtczpPYnNlcnZhYmxlQXJyYXk8SXRlbT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KFtdKTtcbiAgICBvcmRlckNvbXBsZXhMb2NhbDpPcmRlckRpc3BsYXlbXT1bXTtcbiAgICBvcmRlckNvbXBsZXhMb2NhbEZpbHRlcjpPcmRlckRpc3BsYXlbXT1bXTtcbiAgICBvcmRlckRpc3BsYXk6T3JkZXJEaXNwbGF5PXtcImtleVwiOlwiXCIsXCJ1aWRcIjpcIlwiLFwic3RhdHVzXCI6XCJcIixcIm9yZGVyXCI6IG51bGwsXG4gICAgICAgIFwiY2FmZU93bmVyXCI6XCJcIixcImxvY2F0aW9uXCI6XCJcIixcIm9yZGVyTm8yXCI6XCJcIixcImltZ1NyY1wiOlwiXCIsXCJ0b3RhbFwiOlwiXCJ9XG4gICAgX29yZGVyOk9ic2VydmFibGVBcnJheTxPcmRlckRpc3BsYXk+ID0gbmV3IE9ic2VydmFibGVBcnJheTxPcmRlckRpc3BsYXk+KFtdKTtcbiAgICBmcmVxdWVudENhZmVzOnN0cmluZ1tdPVtdO1xuXG5cbiAgICBzdGFydExvY2F0aW9uOkxvY2F0aW9uPW5ldyBMb2NhdGlvbigpO1xuXG4gICAgcHVibGljIHRhYlNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6c3RyaW5nPVwiXCI7XG4gICAgcHJpdmF0ZSBfY3VycmVudE5vdGlmaWNhdGlvbjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6Um91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6QWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJleHRlbnNpb25zOlJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3JkZXJzZXJ2aWNlOk9yZGVyU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIF9wYWdlOiBQYWdlKSB7XG5cbiAgICAgICAgaWYodGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJ0YWJJZFwiXSAhPSBudWxsICYmIHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1widGFiSWRcIl0gPT0gMSkge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fcGFnZS5hY3Rpb25CYXJIaWRkZW4gPSB0cnVlO1xuXG4gICAgICAgIGlmKHRoaXMuaXRlbXMhPVtdKXtcbiAgICAgICAgICAgIHRoaXMuaXRlbVNlcnZpY2UubG9hZCgpXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoaXRlbXM6IEFycmF5PEl0ZW0+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheShpdGVtcyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXM9W107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKHgpPT57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMubGVuZ3RoPTA7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyQnlMb2NhdGlvbigpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGVsc2V7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIm5vdCBsb2FkaW5nIGFnYWluXCIpXG4gICAgICAgIH1cblxuXG4vL29yZGVyIGxvYWQgZm9yIHlvdXIgcGlja3NcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgLnRoZW4oKHRva2VuKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyc2VydmljZS5sb2FkT3JkZXIodG9rZW4udWlkKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChvcmRlcmxpc3Q6IEFycmF5PHtcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDb21wbGV4TG9jYWw9W107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcmRlckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KG9yZGVybGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyTGlzdD1bXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyTGlzdC5mb3JFYWNoKCh4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJMaXN0LnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckxpc3QuZm9yRWFjaCgoeCk9Pntcbi8vZ2V0IENhZmUgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJzZXJ2aWNlLmdldE9yZGVyRGV0YWlscyh4LmNhZmUseC5vcmRlck5vKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkuY2FmZU93bmVyPXRoaXMuaXRlbVNlcnZpY2UuZ2V0Q2FmZUluZm8oeC5jYWZlKS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkuaW1nU3JjID0gdGhpcy5pdGVtU2VydmljZS5nZXRDYWZlSW5mbyh4LmNhZmUpLmltZ1NyYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJEaXNwbGF5LmtleSA9IHJlc3VsdC52YWx1ZS5rZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyRGlzcGxheS51aWQgPSByZXN1bHQudmFsdWUudWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkuc3RhdHVzID0gcmVzdWx0LnZhbHVlLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJEaXNwbGF5Lm9yZGVyTm8yID0gcmVzdWx0LnZhbHVlLm9yZGVyTm8yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkub3JkZXI9cmVzdWx0LnZhbHVlLm9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkudG90YWw9dGhpcy50b3RhbFByaWNlKHRoaXMub3JkZXJEaXNwbGF5Lm9yZGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckNvbXBsZXhMb2NhbC5wdXNoKHRoaXMub3JkZXJEaXNwbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UYXBDdXJyZW50T3JkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJEaXNwbGF5PSB7XCJrZXlcIjpcIlwiLFwidWlkXCI6XCJcIixcInN0YXR1c1wiOlwiXCIsXCJvcmRlclwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FmZU93bmVyXCI6XCJcIixcImxvY2F0aW9uXCI6XCJcIixcIm9yZGVyTm8yXCI6XCJcIixcImltZ1NyY1wiOlwiXCIsXCJ0b3RhbFwiOlwiXCJ9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub250YXBMaXN0b2ZGcmVxdWVudCh0b2tlbi51aWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbi8vRnJlcXVlbnRseSB2aXNpdGVkIC0gdG8gYmUgY29tcGxldGVkIC4uLi5cbiAgICBvbnRhcExpc3RvZkZyZXF1ZW50KHRva2VuKXtcbiAgICAgICAgdmFyIGNvdW50czoge31bXTtcbiAgICAgICAgdGhpcy5vcmRlcnNlcnZpY2UuZnJlcXVlbnRDYWZlKHRva2VuKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZXMudmFsdWUpLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlcXVlbnRDYWZlcy5wdXNoKHJlcy52YWx1ZVt4XS5jYWZlKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCk7XG4gICAgfVxuXG4vL05hdml0YWdlIHRvIG5leHQgc2NyZWVuXG4gICAganVtcHRvTWVudShjYWZlSWQsYXJncykge1xuICAgICAgICBsZXQgcGFnZSA9IDxTdGFja0xheW91dD5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHZpZXcgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcImNhZmVuYW1lXCIpO1xuICAgICAgICB2aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNmMGYwZjBcIik7XG4gICAgICAgIHZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKFwid2hpdGVcIiksIGR1cmF0aW9uOiAyMDAgfSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYWZlXCIsIGNhZmVJZF0pO1xuICAgIH1cblxuLy8gc2VhcmNoIGJhclxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBpZiAoc2VhcmNoQmFyLnRleHQhPVwiXCIpe1xuICAgICAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hCYXIudGV4dCAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlciggaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtpdGVtLm5hbWV9ICR7aXRlbS5uYW1lfWAudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hCYXIuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vIHRoaXMubXlJdGVtcy5sZW5ndGg9MDtcbiAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyQnlMb2NhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoTG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUGhyYXNlID0gXCJcIjtcbiAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdWJtaXQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoYmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgc2VhcmNoYmFyLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaGJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHNlYXJjaGJhci5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgfVxuXG5cbiAgICBvblJlZ2lzdGVyKCl7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFsncmVnaXN0ZXInXSk7XG5cbiAgICB9XG5cbiAgICBvblNpZ25pbigpe1xuXG4gICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJ3NpZ25pbiddKTtcblxuICAgIH1cblxuICAgIG9uU2lnbm91dCgpe1xuXG4gICAgICAgIHRoaXMuYXV0aC5zaWdub3V0KCk7XG4gICAgfVxuXG5cbi8vRm9yIHlvdXIgcGlja3MuLi5cbiAgICB0b3BUaHJlZUNhZmVzKCl7XG5cbiAgICAgICAgdGhpcy5vcmRlcnNlcnZpY2UuZnJlcXVlbnRDYWZlKHRoaXMuYXV0aC5hdXRoVWlkKCkpO1xuXG4gICAgfVxuXG5cbiAgICBvblRhcEN1cnJlbnRPcmRlcigpe1xuICAgICAgICB0aGlzLm9yZGVyQ29tcGxleExvY2FsRmlsdGVyID0gdGhpcy5vcmRlckNvbXBsZXhMb2NhbC5maWx0ZXIoZnVuY3Rpb24gKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4LnN0YXR1cyAhPSBcImNvbGxlY3RlZFwiXG5cbiAgICAgICAgfSlcbiAgICB9XG5cblxuICAgIG9uVGFwUGFzdE9yZGVycygpe1xuICAgICAgICB0aGlzLm9yZGVyQ29tcGxleExvY2FsRmlsdGVyID0gdGhpcy5vcmRlckNvbXBsZXhMb2NhbC5maWx0ZXIoZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIHguc3RhdHVzID09PSBcImNvbGxlY3RlZFwiXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdG90YWxQcmljZShvcmRlcjpPcmRlcltdKXtcbiAgICAgICAgdmFyIHRvdGFsPVwiMFwiO1xuICAgICAgICBvcmRlci5mb3JFYWNoKCh4KT0+e1xuICAgICAgICAgICAgLy9mb3IgdG90YWxcbiAgICAgICAgICAgIHRvdGFsPShNYXRoLnJvdW5kKChwYXJzZUZsb2F0KHRvdGFsKSsgcGFyc2VGbG9hdCh4LnByaWNlUXVhbnRpdHkpKSoxMDApLzEwMCkudG9TdHJpbmcoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0b3RhbDtcbiAgICB9XG5cbiAgICBmaWx0ZXJCeUxvY2F0aW9uKCl7XG4gICAgICAgIGNvbnN0IGRhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2goKHgpPT57XG5cbiAgICAgICAgICAgIHRoaXMubXlJdGVtcy5sZW5ndGg9MDtcbiAgICAgICAgICAgIGxldCB0aGF0ID0gdGhpcztcblxuICAgICAgICAgICAgZ2V0Q3VycmVudExvY2F0aW9uKHtkZXNpcmVkQWNjdXJhY3k6IDEsIHVwZGF0ZURpc3RhbmNlOiAxMCwgbWF4aW11bUFnZTogMjAwMDAsIHRpbWVvdXQ6IDUwMDB9KS5cbiAgICAgICAgICAgIHRoZW4oZnVuY3Rpb24obG9jKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxvYykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYSA9IGRpc3RhbmNlKGxvYyx7XCJsYXRpdHVkZVwiOngubGF0LFwibG9uZ2l0dWRlXCI6eC5sbmcsIFwiZGlyZWN0aW9uXCI6MCwgXCJob3Jpem9udGFsQWNjdXJhY3lcIjoxNCxcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidmVydGljYWxBY2N1cmFjeVwiOjE0LFwic3BlZWRcIjowLFwiYWx0aXR1ZGVcIjo4OSxcInRpbWVzdGFtcFwiOmRhdGV9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYoYTwzNTAwMCl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm15SXRlbXMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9yZW1vdmUgdGhpcyB3aGVuIHdlIG5lZWQgZmlsdGVyaW5nIGJ5IGxvY2F0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGF0Lm15SXRlbXMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGUpe1xuICAgICAgICAgICAgICAgIC8vcHVzaCBhbnl3YXlcbiAgICAgICAgICAgICAgICB0aGF0Lm15SXRlbXMucHVzaCh4KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgdGFiU2VsZWN0ZWRGdW5jdGlvbihhOk51bWJlcil7XG4gICAgICAgIHRoaXMudGFiU2VsZWN0ZWQ9YTtcbiAgICB9XG5cbiAgICBvbkNsaWNrbWFuYWdlY2FyZCgpe1xuICAgICAgICB0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoWydjYXJkcyddKTtcblxuICAgIH1cblxufVxuIl19