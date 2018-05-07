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
        this.order = [];
        this._items = new observable_array_1.ObservableArray([]);
        this.orderComplex = [];
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
                .subscribe(function (order) {
                _this._order = new observable_array_1.ObservableArray(order);
                _this.orderComplex = [];
                _this._order.forEach(function (x) {
                    console.log(JSON.stringify(x));
                });
            });
        });
    };
    // //MapView
    //     onMapReady(args): void {
    //         this.map = args.map;
    //
    // //this is hard coded this needs to be made dynamic
    //             this.map.addMarkers([
    //                     {
    //                         id: 1,
    //                         lat: -37.8136,
    //                         lng: 144.9631,
    //                         title: 'Cafe1',
    //                         // subtitle: 'Check out Cafe1',
    //                         onCalloutTap: ()=> {
    //                             this.jumptoMenu('cafe1')
    //                         }
    //                     },
    //                     {
    //                         id: 2,
    //                         lat: -37.811989,
    //                         lng: 144.965845,
    //                         title: 'Cafe2',
    //                         // subtitle: 'Check out Cafe1',
    //                         onCalloutTap: ()=> {
    //                             this.jumptoMenu('cafe2')
    //                         }
    //                     },
    //                     {
    //                         id: 3,
    //                         lat: -37.811040,
    //                         lng: 144.965802,
    //                         title: 'Cafe3',
    //                         // subtitle: 'Check out Cafe3',
    //                         onCalloutTap: () => {
    //                             this.jumptoMenu('cafe3')
    //                         }
    //                     }
    //                 ]
    //             )
    //
    //
    //             }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdEO0FBRWhELHlEQUF1RDtBQUN2RCwwQ0FBd0M7QUFDeEMsbUZBQW1GO0FBQ25GLDZEQUFzRDtBQUN0RCwwREFBc0Q7QUFLdEQseURBQXFEO0FBRXJELDJEQUF1RDtBQUV2RCx1REFBMEQ7QUFVMUQ7SUFjSSw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLHlIQUF5SDtJQUN6SCw4QkFBOEI7SUFDOUIsK0JBQStCO0lBQy9CLCtCQUErQjtJQUMvQix5QkFBeUI7SUFDekIsTUFBTTtJQUVOLHdCQUFvQixXQUF3QixFQUN4QixNQUFhLEVBQ2IsZ0JBQWlDLEVBQ2pDLElBQWdCLEVBQ2hCLFlBQXlCO1FBSnpCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQU87UUFDYixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBQ2pDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWE7UUF6QjdDLFVBQUssR0FBUyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQXNDLEVBQUUsQ0FBQztRQUM5QyxXQUFNLEdBQXlCLElBQUksa0NBQWUsQ0FBTyxFQUFFLENBQUMsQ0FBQztRQUM3RCxpQkFBWSxHQUFnQixFQUFFLENBQUM7UUFDL0IsV0FBTSxHQUFpQyxJQUFJLGtDQUFlLENBQWUsRUFBRSxDQUFDLENBQUM7UUFJN0UsYUFBUSxHQUFRLEVBQUUsQ0FBQztRQWlCZixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBRUksMEJBQTBCO1FBRjlCLGlCQTJCQztRQXZCRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTthQUNs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ZSxHQUFmO0lBQ0EsQ0FBQztJQUdELG1DQUFVLEdBQVY7UUFFQSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUU3QyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRS9DLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBR0wsbUJBQW1CO0lBQ1gsc0NBQWEsR0FBYjtRQUVJLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUM3QixJQUFJLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBRW5FLENBQUM7SUF6TEksY0FBYztRQVAxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFDLENBQUMsdUJBQXVCLENBQUM7U0FDdEMsQ0FBQzt5Q0F5Qm1DLDBCQUFXO1lBQ2pCLGVBQU07WUFDSSx1Q0FBZ0I7WUFDNUIsMEJBQVc7WUFDSCw0QkFBWTtPQTNCcEMsY0FBYyxDQTJMMUI7SUFBRCxxQkFBQztDQUFBLEFBM0xELElBMkxDO0FBM0xZLHdDQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIE9uSW5pdH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vZGF0YXR5cGVzL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgUm91dGVyfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG4vLyBpbXBvcnQgeyBNYXBib3hWaWV3QXBpLCBWaWV3cG9ydCBhcyBNYXBib3hWaWV3cG9ydCB9IGZyb20gXCJuYXRpdmVzY3JpcHQtbWFwYm94XCI7XG5pbXBvcnQge1JvdXRlckV4dGVuc2lvbnN9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhclwiO1xuaW1wb3J0IHtPYnNlcnZhYmxlQXJyYXl9IGZyb20gXCJkYXRhL29ic2VydmFibGUtYXJyYXlcIjtcbmltcG9ydCB7IFNlYXJjaEJhciB9IGZyb20gXCJ1aS9zZWFyY2gtYmFyXCI7XG5cblxuXG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vZGF0YXR5cGVzL29yZGVyXCI7XG5pbXBvcnQge09yZGVyU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL29yZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7T3JkZXJDb21wbGV4fSBmcm9tIFwiLi4vZGF0YXR5cGVzL29yZGVyLmNvbXBsZXhcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOltcIi4vaXRlbXMuY29tcG9uZW50LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIGJ1c2luZXNzTmFtZTogU3RyaW5nW107XG4gICAgaXRlbXM6IEl0ZW1bXT1bXTtcbiAgICBteUl0ZW1zOkl0ZW1bXT1bXTtcbiAgICBvcmRlcjp7XCJvcmRlck5vXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfVtdPVtdO1xuICAgIF9pdGVtczpPYnNlcnZhYmxlQXJyYXk8SXRlbT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KFtdKTtcbiAgICBvcmRlckNvbXBsZXg6T3JkZXJDb21wbGV4W109W107XG4gICAgX29yZGVyOk9ic2VydmFibGVBcnJheTxPcmRlckNvbXBsZXg+ID0gbmV3IE9ic2VydmFibGVBcnJheTxPcmRlckNvbXBsZXg+KFtdKTtcblxuICAgIHB1YmxpYyB0YWJTZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gICAgcHVibGljIHNlYXJjaFBocmFzZTogc3RyaW5nO1xuICAgIHVzZXJuYW1lOnN0cmluZz1cIlwiO1xuICAgIHByaXZhdGUgX2N1cnJlbnROb3RpZmljYXRpb246IHN0cmluZztcblxuICAgIC8vIHByaXZhdGUgbWFwOiBNYXBib3hWaWV3QXBpO1xuICAgIC8vIC8vbWFwIHBhcmFtZXRlcnNcbiAgICAvLyBhY2Nlc3NfdG9rZW46c3RyaW5nPVwicGsuZXlKMUlqb2ljbUZvZFd4MGVXRm5hV3BwSWl3aVlTSTZJbU5xWkdkMVpUZG9aakJ3Y3preWNYSnNjM00zTkd0aGFYQWlmUS44WXVEcWc3aU84SHJBUVhGOXcxal93XCJcbiAgICAvLyBtYXBfc3R5bGU6c3RyaW5nPVwic3RyZWV0c1wiO1xuICAgIC8vIGxhdGl0dWRlOnN0cmluZyA9XCItMzcuODEzNlwiO1xuICAgIC8vIGxvbmdpdHVkZTpzdHJpbmc9XCIxNDQuOTYzMVwiO1xuICAgIC8vIHpvb21sZXZlbDpzdHJpbmc9XCIxNVwiO1xuICAgIC8vIC8vL1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6Um91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyZXh0ZW5zaW9uczpSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgYXV0aDpBdXRoU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIG9yZGVyc2VydmljZTpPcmRlclNlcnZpY2UpIHtcbiAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyB2aWJyYXRvci52aWJyYXRlKDIwMDApO1xuXG4gICAgICAgIHRoaXMuaXRlbVNlcnZpY2UubG9hZCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChpdGVtczogQXJyYXk8SXRlbT4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoaXRlbXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXM9W107XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5teUl0ZW1zPXRoaXMuaXRlbXM7XG4gICAgICAgICAgICB9KTtcblxuXG4vL29yZGVyIGxvYWQgZm9yIHlvdXIgcGlja3NcbiAgICAgICAgZmlyZWJhc2UuZ2V0Q3VycmVudFVzZXIoKVxuICAgICAgICAgICAgLnRoZW4oKHRva2VuKT0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9yZGVyc2VydmljZS5sb2FkT3JkZXIodG9rZW4udWlkKVxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChvcmRlcjogQXJyYXk8T3JkZXJDb21wbGV4PikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JkZXIgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KG9yZGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3JkZXJDb21wbGV4PVtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JkZXIuZm9yRWFjaCgoeCk9PntcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh4KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KX0gKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICB9XG5cbi8vIC8vTWFwVmlld1xuLy8gICAgIG9uTWFwUmVhZHkoYXJncyk6IHZvaWQge1xuLy8gICAgICAgICB0aGlzLm1hcCA9IGFyZ3MubWFwO1xuLy9cbi8vIC8vdGhpcyBpcyBoYXJkIGNvZGVkIHRoaXMgbmVlZHMgdG8gYmUgbWFkZSBkeW5hbWljXG4vLyAgICAgICAgICAgICB0aGlzLm1hcC5hZGRNYXJrZXJzKFtcbi8vICAgICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDEsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IC0zNy44MTM2LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiAxNDQuOTYzMSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTEnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTEnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKT0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmp1bXB0b01lbnUoJ2NhZmUxJylcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IC0zNy44MTE5ODksXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsbmc6IDE0NC45NjU4NDUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NhZmUyJyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1YnRpdGxlOiAnQ2hlY2sgb3V0IENhZmUxJyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FsbG91dFRhcDogKCk9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMicpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAzLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODExMDQwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiAxNDQuOTY1ODAyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDYWZlMycsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0aXRsZTogJ0NoZWNrIG91dCBDYWZlMycsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBvbkNhbGxvdXRUYXA6ICgpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmp1bXB0b01lbnUoJ2NhZmUzJylcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIF1cbi8vICAgICAgICAgICAgIClcbi8vXG4vL1xuLy8gICAgICAgICAgICAgfVxuXG4vL05hdml0YWdlIHRvIG5leHQgc2NyZWVuXG4gICAgICAgICAgICBqdW1wdG9NZW51KGNhZmVJZCkge1xuICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9Pnt0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhZmVcIiwgY2FmZUlkXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLDEwMH0pO1xuICAgICAgICAgICAgfVxuLy9cbi8vIC8vVGFiVmlldyBjb250cm9sc1xuICAgIGNoYW5nZVRhYigpIHtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIm9yZGVyIHJlZnJlc2hlZFwiKVxuICAgICAgICBpZiAodGhpcy50YWJTZWxlY3RlZEluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAxO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9PT0gMSkge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDIpIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgICAgIH1cblxuXG4gICAgfVxuXG4vLyBzZWFyY2ggYmFyXG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHRoaXMubXlJdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKCBpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHtpdGVtLm5hbWV9ICR7aXRlbS5uYW1lfWAudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBzZWFyY2hMb2FkZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9uU2VhcmNoTGF5b3V0TG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlSW5Ub3VjaE1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB9XG5cblxuICAgIG9uUmVnaXN0ZXIoKXtcblxuICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJ3JlZ2lzdGVyJ10pO1xuXG4gICAgfVxuXG4gICAgb25TaWduaW4oKXtcblxuICAgICAgICB0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoWydzaWduaW4nXSk7XG5cbiAgICB9XG5cbiAgICBvblNpZ25vdXQoKXtcblxuICAgICAgICB0aGlzLmF1dGguc2lnbm91dCgpO1xuICAgIH1cblxuXG4vL0ZvciB5b3VyIHBpY2tzLi4uXG4gICAgICAgIHRvcFRocmVlQ2FmZXMoKXtcblxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJmcmVxdWVudCBmaXJlZFwiKVxuICAgICAgICAgICAgdGhpcy5vcmRlcnNlcnZpY2UuZnJlcXVlbnRDYWZlKFwiQ0JOVWx1QTZGb2dWSWtPU2xENFdLT0Z2TWpmMVwiKTtcblxuICAgICAgICB9XG5cbn1cbiJdfQ==