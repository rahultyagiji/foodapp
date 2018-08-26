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
// import {and} from "../../platforms/ios/DQCafev02/app/tns_modules/@angular/router/src/utils/collection";
// var Vibrate = require("nativescript-vibrate").Vibrate;
// let vibrator = new Vibrate();
var ItemsComponent = /** @class */ (function () {
    function ItemsComponent(itemService, router, route, routerextensions, auth, orderservice) {
        this.itemService = itemService;
        this.router = router;
        this.route = route;
        this.routerextensions = routerextensions;
        this.auth = auth;
        this.orderservice = orderservice;
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
            console.log(token);
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
    //
    // //TabView controls
    ItemsComponent.prototype.changeTab = function () {
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
        console.log("search loaded triggered");
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
        this.orderservice.frequentCafe("CBNUluA6FogVIkOSlD4WKOFvMjf1");
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
            total = (Math.round((parseFloat(total) + parseFloat(x.price)) * 100) / 100).toString();
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
                    if (a < 25000) {
                        that.myItems.push(x);
                    }
                    else {
                        //remove this when we need filtering by location
                        // that.myItems.push(x);
                    }
                }
            }, function (e) {
                //push anyway
                that.myItems.push(x);
            });
        });
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
            order_service_1.OrderService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdEO0FBRWhELHlEQUF1RDtBQUN2RCwwQ0FBK0M7QUFDL0MsMENBQXdDO0FBQ3hDLG1GQUFtRjtBQUNuRiw2REFBc0Q7QUFDdEQsMERBQXNEO0FBRXRELHlEQUFxRDtBQUVyRCwyREFBdUQ7QUFFdkQsdURBQTBEO0FBRTFELGlCQUFpQjtBQUNqQixxRUFBOEk7QUFHOUksZ0RBQTZDO0FBQzdDLDBHQUEwRztBQUMxRyx5REFBeUQ7QUFDekQsZ0NBQWdDO0FBVWhDO0lBc0JJLHdCQUFvQixXQUF3QixFQUN4QixNQUFhLEVBQ2IsS0FBb0IsRUFDcEIsZ0JBQWlDLEVBQ2pDLElBQWdCLEVBQ2hCLFlBQXlCO1FBTHpCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQU87UUFDYixVQUFLLEdBQUwsS0FBSyxDQUFlO1FBQ3BCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQXpCN0MsVUFBSyxHQUFTLEVBQUUsQ0FBQztRQUNqQixZQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLGNBQVMsR0FBb0QsRUFBRSxDQUFDO1FBQ2hFLGVBQVUsR0FBcUUsSUFBSSxrQ0FBZSxDQUFtRCxFQUFFLENBQUMsQ0FBQztRQUN6SixXQUFNLEdBQXlCLElBQUksa0NBQWUsQ0FBTyxFQUFFLENBQUMsQ0FBQztRQUM3RCxzQkFBaUIsR0FBZ0IsRUFBRSxDQUFDO1FBQ3BDLDRCQUF1QixHQUFnQixFQUFFLENBQUM7UUFDMUMsaUJBQVksR0FBYyxFQUFDLEtBQUssRUFBQyxFQUFFLEVBQUMsS0FBSyxFQUFDLEVBQUUsRUFBQyxRQUFRLEVBQUMsRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJ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d1BDO0FBeFBZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vZGF0YXR5cGVzL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHtBY3RpdmF0ZWRSb3V0ZX0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG4vLyBpbXBvcnQgeyBNYXBib3hWaWV3QXBpLCBWaWV3cG9ydCBhcyBNYXBib3hWaWV3cG9ydCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWFwYm94XCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vZGF0YXR5cGVzL29yZGVyXCI7XG5pbXBvcnQge09yZGVyU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL29yZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7T3JkZXJEaXNwbGF5fSBmcm9tIFwiLi4vZGF0YXR5cGVzL29yZGVyLmRpc3BsYXlcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG4vL3RyeWluZyBsb2NhdGlvblxuaW1wb3J0IHtMb2NhdGlvbiwgaXNFbmFibGVkLCBlbmFibGVMb2NhdGlvblJlcXVlc3QsIGdldEN1cnJlbnRMb2NhdGlvbiwgd2F0Y2hMb2NhdGlvbiwgZGlzdGFuY2UsIGNsZWFyV2F0Y2ggfSBmcm9tIFwibmF0aXZlc2NyaXB0LWdlb2xvY2F0aW9uXCI7XG5pbXBvcnQge0FjY3VyYWN5fSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy91aS9lbnVtcy9lbnVtc1wiO1xuaW1wb3J0IHtTdGFja0xheW91dH0gZnJvbSBcInVpL2xheW91dHMvc3RhY2stbGF5b3V0XCI7XG5pbXBvcnQge0NvbG9yfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xuLy8gaW1wb3J0IHthbmR9IGZyb20gXCIuLi8uLi9wbGF0Zm9ybXMvaW9zL0RRQ2FmZXYwMi9hcHAvdG5zX21vZHVsZXMvQGFuZ3VsYXIvcm91dGVyL3NyYy91dGlscy9jb2xsZWN0aW9uXCI7XG4vLyB2YXIgVmlicmF0ZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtdmlicmF0ZVwiKS5WaWJyYXRlO1xuLy8gbGV0IHZpYnJhdG9yID0gbmV3IFZpYnJhdGUoKTtcblxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1pdGVtc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtcy5jb21wb25lbnQuaHRtbFwiLFxuICAgIHN0eWxlVXJsczpbXCIuL2l0ZW1zLmNvbXBvbmVudC5jc3NcIl1cbn0pXG5cbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBidXNpbmVzc05hbWU6IFN0cmluZ1tdO1xuICAgIGl0ZW1zOiBJdGVtW109W107XG4gICAgbXlJdGVtczpJdGVtW109W107XG4gICAgb3JkZXJMaXN0OntcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfVtdPVtdO1xuICAgIF9vcmRlckxpc3Q6T2JzZXJ2YWJsZUFycmF5PHtcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PHtcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfT4oW10pO1xuICAgIF9pdGVtczpPYnNlcnZhYmxlQXJyYXk8SXRlbT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KFtdKTtcbiAgICBvcmRlckNvbXBsZXhMb2NhbDpPcmRlckRpc3BsYXlbXT1bXTtcbiAgICBvcmRlckNvbXBsZXhMb2NhbEZpbHRlcjpPcmRlckRpc3BsYXlbXT1bXTtcbiAgICBvcmRlckRpc3BsYXk6T3JkZXJEaXNwbGF5PXtcImtleVwiOlwiXCIsXCJ1aWRcIjpcIlwiLFwic3RhdHVzXCI6XCJcIixcIm9yZGVyXCI6IG51bGwsXG4gICAgICAgIFwiY2FmZU93bmVyXCI6XCJcIixcImxvY2F0aW9uXCI6XCJcIixcIm9yZGVyTm8yXCI6XCJcIixcImltZ1NyY1wiOlwiXCIsXCJ0b3RhbFwiOlwiXCJ9XG4gICAgX29yZGVyOk9ic2VydmFibGVBcnJheTxPcmRlckRpc3BsYXk+ID0gbmV3IE9ic2VydmFibGVBcnJheTxPcmRlckRpc3BsYXk+KFtdKTtcbiAgICBmcmVxdWVudENhZmVzOnN0cmluZ1tdPVtdO1xuXG5cbiAgICBzdGFydExvY2F0aW9uOkxvY2F0aW9uPW5ldyBMb2NhdGlvbigpO1xuXG4gICAgcHVibGljIHRhYlNlbGVjdGVkSW5kZXg6IG51bWJlcjtcbiAgICBwdWJsaWMgc2VhcmNoUGhyYXNlOiBzdHJpbmc7XG4gICAgdXNlcm5hbWU6c3RyaW5nPVwiXCI7XG4gICAgcHJpdmF0ZSBfY3VycmVudE5vdGlmaWNhdGlvbjogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6Um91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGU6QWN0aXZhdGVkUm91dGUsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJleHRlbnNpb25zOlJvdXRlckV4dGVuc2lvbnMsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3JkZXJzZXJ2aWNlOk9yZGVyU2VydmljZSkge1xuXG4gICAgICAgIGlmKHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1widGFiSWRcIl0gIT0gbnVsbCAmJiB0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcInRhYklkXCJdID09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgaWYodGhpcy5pdGVtcyE9W10pe1xuICAgICAgICAgICAgdGhpcy5pdGVtU2VydmljZS5sb2FkKClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChpdGVtczogQXJyYXk8SXRlbT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KGl0ZW1zKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcz1bXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoeCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcy5sZW5ndGg9MDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJCeUxvY2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibm90IGxvYWRpbmcgYWdhaW5cIilcbiAgICAgICAgfVxuXG5cbi8vb3JkZXIgbG9hZCBmb3IgeW91ciBwaWNrc1xuICAgICAgICBmaXJlYmFzZS5nZXRDdXJyZW50VXNlcigpXG4gICAgICAgICAgICAudGhlbigodG9rZW4pPT4ge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRva2VuKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyc2VydmljZS5sb2FkT3JkZXIodG9rZW4udWlkKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChvcmRlcmxpc3Q6IEFycmF5PHtcIm9yZGVyTm9cIjpzdHJpbmcsXCJjYWZlXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfT4pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDb21wbGV4TG9jYWw9W107XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9vcmRlckxpc3QgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KG9yZGVybGlzdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyTGlzdD1bXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyTGlzdC5mb3JFYWNoKCh4KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJMaXN0LnB1c2goeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckxpc3QuZm9yRWFjaCgoeCk9Pntcbi8vZ2V0IENhZmUgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJzZXJ2aWNlLmdldE9yZGVyRGV0YWlscyh4LmNhZmUseC5vcmRlck5vKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigocmVzdWx0KT0+e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkuY2FmZU93bmVyPXRoaXMuaXRlbVNlcnZpY2UuZ2V0Q2FmZUluZm8oeC5jYWZlKS5uYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkuaW1nU3JjID0gdGhpcy5pdGVtU2VydmljZS5nZXRDYWZlSW5mbyh4LmNhZmUpLmltZ1NyYztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJEaXNwbGF5LmtleSA9IHJlc3VsdC52YWx1ZS5rZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9yZGVyRGlzcGxheS51aWQgPSByZXN1bHQudmFsdWUudWlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkuc3RhdHVzID0gcmVzdWx0LnZhbHVlLnN0YXR1cztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJEaXNwbGF5Lm9yZGVyTm8yID0gcmVzdWx0LnZhbHVlLm9yZGVyTm8yO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkub3JkZXI9cmVzdWx0LnZhbHVlLm9yZGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckRpc3BsYXkudG90YWw9dGhpcy50b3RhbFByaWNlKHRoaXMub3JkZXJEaXNwbGF5Lm9yZGVyKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vcmRlckNvbXBsZXhMb2NhbC5wdXNoKHRoaXMub3JkZXJEaXNwbGF5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25UYXBDdXJyZW50T3JkZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJEaXNwbGF5PSB7XCJrZXlcIjpcIlwiLFwidWlkXCI6XCJcIixcInN0YXR1c1wiOlwiXCIsXCJvcmRlclwiOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FmZU93bmVyXCI6XCJcIixcImxvY2F0aW9uXCI6XCJcIixcIm9yZGVyTm8yXCI6XCJcIixcImltZ1NyY1wiOlwiXCIsXCJ0b3RhbFwiOlwiXCJ9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRoaXMub250YXBMaXN0b2ZGcmVxdWVudCh0b2tlbi51aWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICB9XG5cbi8vRnJlcXVlbnRseSB2aXNpdGVkIC0gdG8gYmUgY29tcGxldGVkIC4uLi5cbiAgICBvbnRhcExpc3RvZkZyZXF1ZW50KHRva2VuKXtcbiAgICAgICAgdmFyIGNvdW50czoge31bXTtcbiAgICAgICAgdGhpcy5vcmRlcnNlcnZpY2UuZnJlcXVlbnRDYWZlKHRva2VuKVxuICAgICAgICAgICAgLnRoZW4oXG4gICAgICAgICAgICAgICAgKHJlcykgPT4ge1xuICAgICAgICAgICAgICAgICAgICBPYmplY3Qua2V5cyhyZXMudmFsdWUpLmZvckVhY2goKHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZnJlcXVlbnRDYWZlcy5wdXNoKHJlcy52YWx1ZVt4XS5jYWZlKTtcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhdGNoKCk7XG4gICAgfVxuXG4vL05hdml0YWdlIHRvIG5leHQgc2NyZWVuXG4gICAganVtcHRvTWVudShjYWZlSWQsYXJncykge1xuICAgICAgICBsZXQgcGFnZSA9IDxTdGFja0xheW91dD5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHZpZXcgPSA8U3RhY2tMYXlvdXQ+cGFnZS5nZXRWaWV3QnlJZChcImNhZmVuYW1lXCIpO1xuICAgICAgICB2aWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcihcIiNmMGYwZjBcIik7XG4gICAgICAgIHZpZXcuYW5pbWF0ZSh7IGJhY2tncm91bmRDb2xvcjogbmV3IENvbG9yKFwid2hpdGVcIiksIGR1cmF0aW9uOiAyMDAgfSk7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYWZlXCIsIGNhZmVJZF0pO1xuICAgIH1cbi8vXG4vLyAvL1RhYlZpZXcgY29udHJvbHNcbiAgICBjaGFuZ2VUYWIoKSB7XG5cbiAgICAgICAgaWYgKHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJTZWxlY3RlZEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB9XG5cblxuICAgIH1cblxuLy8gc2VhcmNoIGJhclxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuXG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBpZiAoc2VhcmNoQmFyLnRleHQhPVwiXCIpe1xuICAgICAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2hCYXIudGV4dCAhPSBcIlwiKXtcbiAgICAgICAgICAgICAgICB0aGlzLm15SXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlciggaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgJHtpdGVtLm5hbWV9ICR7aXRlbS5uYW1lfWAudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBzZWFyY2hCYXIuZGlzbWlzc1NvZnRJbnB1dCgpO1xuICAgICAgICAgICAgICAgIH0sIDMwMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIC8vIHRoaXMubXlJdGVtcy5sZW5ndGg9MDtcbiAgICAgICAgICAgIC8vIHRoaXMuZmlsdGVyQnlMb2NhdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2VhcmNoTG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwic2VhcmNoIGxvYWRlZCB0cmlnZ2VyZWRcIik7XG4gICAgICAgIHRoaXMuc2VhcmNoUGhyYXNlID0gXCJcIjtcbiAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlKGZhbHNlKTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25TdWJtaXQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoYmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgc2VhcmNoYmFyLmRpc21pc3NTb2Z0SW5wdXQoKTtcbiAgICB9XG5cblxuICAgIHB1YmxpYyBvbkNsZWFyKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaGJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIHNlYXJjaGJhci5kaXNtaXNzU29mdElucHV0KCk7XG4gICAgfVxuXG5cbiAgICBvblJlZ2lzdGVyKCl7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFsncmVnaXN0ZXInXSk7XG5cbiAgICB9XG5cbiAgICBvblNpZ25pbigpe1xuXG4gICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJ3NpZ25pbiddKTtcblxuICAgIH1cblxuICAgIG9uU2lnbm91dCgpe1xuXG4gICAgICAgIHRoaXMuYXV0aC5zaWdub3V0KCk7XG4gICAgfVxuXG5cbi8vRm9yIHlvdXIgcGlja3MuLi5cbiAgICB0b3BUaHJlZUNhZmVzKCl7XG5cbiAgICAgICAgdGhpcy5vcmRlcnNlcnZpY2UuZnJlcXVlbnRDYWZlKFwiQ0JOVWx1QTZGb2dWSWtPU2xENFdLT0Z2TWpmMVwiKTtcblxuICAgIH1cblxuXG4gICAgb25UYXBDdXJyZW50T3JkZXIoKXtcbiAgICAgICAgdGhpcy5vcmRlckNvbXBsZXhMb2NhbEZpbHRlciA9IHRoaXMub3JkZXJDb21wbGV4TG9jYWwuZmlsdGVyKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4geC5zdGF0dXMgIT0gXCJjb2xsZWN0ZWRcIlxuXG4gICAgICAgIH0pXG4gICAgfVxuXG5cbiAgICBvblRhcFBhc3RPcmRlcnMoKXtcbiAgICAgICAgdGhpcy5vcmRlckNvbXBsZXhMb2NhbEZpbHRlciA9IHRoaXMub3JkZXJDb21wbGV4TG9jYWwuZmlsdGVyKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4LnN0YXR1cyA9PT0gXCJjb2xsZWN0ZWRcIlxuICAgICAgICB9KVxuICAgIH1cblxuICAgIHRvdGFsUHJpY2Uob3JkZXI6T3JkZXJbXSl7XG4gICAgICAgIHZhciB0b3RhbD1cIjBcIjtcbiAgICAgICAgb3JkZXIuZm9yRWFjaCgoeCk9PntcbiAgICAgICAgICAgIC8vZm9yIHRvdGFsXG4gICAgICAgICAgICB0b3RhbD0oTWF0aC5yb3VuZCgocGFyc2VGbG9hdCh0b3RhbCkrIHBhcnNlRmxvYXQoeC5wcmljZSkpKjEwMCkvMTAwKS50b1N0cmluZygpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRvdGFsO1xuICAgIH1cblxuICAgIGZpbHRlckJ5TG9jYXRpb24oKXtcbiAgICAgICAgY29uc3QgZGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaCgoeCk9PntcblxuICAgICAgICAgICAgdGhpcy5teUl0ZW1zLmxlbmd0aD0wO1xuICAgICAgICAgICAgbGV0IHRoYXQgPSB0aGlzO1xuXG4gICAgICAgICAgICBnZXRDdXJyZW50TG9jYXRpb24oe2Rlc2lyZWRBY2N1cmFjeTogMSwgdXBkYXRlRGlzdGFuY2U6IDEwLCBtYXhpbXVtQWdlOiAyMDAwMCwgdGltZW91dDogNTAwMH0pLlxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbihsb2MpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9jKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhID0gZGlzdGFuY2UobG9jLHtcImxhdGl0dWRlXCI6eC5sYXQsXCJsb25naXR1ZGVcIjp4LmxuZywgXCJkaXJlY3Rpb25cIjowLCBcImhvcml6b250YWxBY2N1cmFjeVwiOjE0LFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbEFjY3VyYWN5XCI6MTQsXCJzcGVlZFwiOjAsXCJhbHRpdHVkZVwiOjg5LFwidGltZXN0YW1wXCI6ZGF0ZX0pO1xuICAgICAgICAgICAgICAgICAgICBpZihhPDI1MDAwKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQubXlJdGVtcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3JlbW92ZSB0aGlzIHdoZW4gd2UgbmVlZCBmaWx0ZXJpbmcgYnkgbG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHRoYXQubXlJdGVtcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZSl7XG4gICAgICAgICAgICAgICAgLy9wdXNoIGFueXdheVxuICAgICAgICAgICAgICAgIHRoYXQubXlJdGVtcy5wdXNoKHgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSlcbiAgICB9XG5cbn1cbiJdfQ==