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
        //Load orders
        this.auth.authUid().then(function (res) {
            _this.username = res.uid;
            _this.order = _this.orderservice.fetchOrder(res.uid);
            console.log(res.uid);
        }).catch(function () { return console.log("not logged in...."); });
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
        var _this = this;
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
        //Load orders
        this.auth.authUid().then(function (res) {
            _this.username = res.uid;
            _this.order = _this.orderservice.fetchOrder(res.uid);
            console.log(res.uid);
        }).catch(function () { return console.log("not logged in...."); });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdEO0FBRWhELHlEQUF1RDtBQUN2RCwwQ0FBd0M7QUFDeEMsbUZBQW1GO0FBQ25GLDZEQUFzRDtBQUN0RCwwREFBc0Q7QUFLdEQseURBQXFEO0FBRXJELDJEQUF1RDtBQVN2RDtJQVdJLDhCQUE4QjtJQUM5QixtQkFBbUI7SUFDbkIseUhBQXlIO0lBQ3pILDhCQUE4QjtJQUM5QiwrQkFBK0I7SUFDL0IsK0JBQStCO0lBQy9CLHlCQUF5QjtJQUN6QixNQUFNO0lBRU4sd0JBQW9CLFdBQXdCLEVBQ3hCLE1BQWEsRUFDYixnQkFBaUMsRUFDakMsSUFBZ0IsRUFDaEIsWUFBeUI7UUFKekIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUNiLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBYTtRQXRCN0MsVUFBSyxHQUFTLEVBQUUsQ0FBQztRQUNqQixZQUFPLEdBQVEsRUFBRSxDQUFDO1FBQ2xCLFVBQUssR0FBc0MsRUFBRSxDQUFDO1FBQzlDLFdBQU0sR0FBeUIsSUFBSSxrQ0FBZSxDQUFPLEVBQUUsQ0FBQyxDQUFDO1FBRzdELGFBQVEsR0FBUSxFQUFFLENBQUM7UUFpQmYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVJLDBCQUEwQjtRQUY5QixpQkFzQkM7UUFsQkcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7YUFDbEIsU0FBUyxDQUFDLFVBQUMsS0FBa0I7WUFDMUIsS0FBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGtDQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDekMsS0FB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IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuLy8gaW1wb3J0IHsgTWFwYm94Vmlld0FwaSwgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuXG5cblxuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtPcmRlcn0gZnJvbSBcIi4uL2RhdGF0eXBlcy9vcmRlclwiO1xuaW1wb3J0IHtPcmRlclNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9vcmRlci5zZXJ2aWNlXCI7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOltcIi4vaXRlbXMuY29tcG9uZW50LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIGJ1c2luZXNzTmFtZTogU3RyaW5nW107XG4gICAgaXRlbXM6IEl0ZW1bXT1bXTtcbiAgICBteUl0ZW1zOkl0ZW1bXT1bXTtcbiAgICBvcmRlcjp7XCJvcmRlck5vXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfVtdPVtdO1xuICAgIF9pdGVtczpPYnNlcnZhYmxlQXJyYXk8SXRlbT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KFtdKTtcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcbiAgICB1c2VybmFtZTpzdHJpbmc9XCJcIjtcbiAgICBwcml2YXRlIF9jdXJyZW50Tm90aWZpY2F0aW9uOiBzdHJpbmc7XG5cbiAgICAvLyBwcml2YXRlIG1hcDogTWFwYm94Vmlld0FwaTtcbiAgICAvLyAvL21hcCBwYXJhbWV0ZXJzXG4gICAgLy8gYWNjZXNzX3Rva2VuOnN0cmluZz1cInBrLmV5SjFJam9pY21Gb2RXeDBlV0ZuYVdwcElpd2lZU0k2SW1OcVpHZDFaVGRvWmpCd2N6a3ljWEpzYzNNM05HdGhhWEFpZlEuOFl1RHFnN2lPOEhyQVFYRjl3MWpfd1wiXG4gICAgLy8gbWFwX3N0eWxlOnN0cmluZz1cInN0cmVldHNcIjtcbiAgICAvLyBsYXRpdHVkZTpzdHJpbmcgPVwiLTM3LjgxMzZcIjtcbiAgICAvLyBsb25naXR1ZGU6c3RyaW5nPVwiMTQ0Ljk2MzFcIjtcbiAgICAvLyB6b29tbGV2ZWw6c3RyaW5nPVwiMTVcIjtcbiAgICAvLyAvLy9cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyOlJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcmV4dGVuc2lvbnM6Um91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICBwcml2YXRlIGF1dGg6QXV0aFNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBvcmRlcnNlcnZpY2U6T3JkZXJTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDA7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gdmlicmF0b3IudmlicmF0ZSgyMDAwKTtcblxuICAgICAgICB0aGlzLml0ZW1TZXJ2aWNlLmxvYWQoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoaXRlbXM6IEFycmF5PEl0ZW0+KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KGl0ZW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zPVtdO1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKHgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcz10aGlzLml0ZW1zO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgIC8vTG9hZCBvcmRlcnNcbiAgICAgICAgdGhpcy5hdXRoLmF1dGhVaWQoKS50aGVuKChyZXMpPT57XG4gICAgICAgICAgICB0aGlzLnVzZXJuYW1lPXJlcy51aWQ7XG4gICAgICAgICAgICB0aGlzLm9yZGVyID0gdGhpcy5vcmRlcnNlcnZpY2UuZmV0Y2hPcmRlcihyZXMudWlkKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcy51aWQpXG4gICAgICAgIH0pLmNhdGNoKCgpPT5jb25zb2xlLmxvZyhcIm5vdCBsb2dnZWQgaW4uLi4uXCIpKVxuXG4gICAgfVxuXG4vLyAvL01hcFZpZXdcbi8vICAgICBvbk1hcFJlYWR5KGFyZ3MpOiB2b2lkIHtcbi8vICAgICAgICAgdGhpcy5tYXAgPSBhcmdzLm1hcDtcbi8vXG4vLyAvL3RoaXMgaXMgaGFyZCBjb2RlZCB0aGlzIG5lZWRzIHRvIGJlIG1hZGUgZHluYW1pY1xuLy8gICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VycyhbXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAxLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODEzNixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2MzEsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NhZmUxJyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1YnRpdGxlOiAnQ2hlY2sgb3V0IENhZmUxJyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FsbG91dFRhcDogKCk9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMScpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODExOTg5LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiAxNDQuOTY1ODQ1LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDYWZlMicsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0aXRsZTogJ0NoZWNrIG91dCBDYWZlMScsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBvbkNhbGxvdXRUYXA6ICgpPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHRvTWVudSgnY2FmZTInKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogLTM3LjgxMTA0MCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2NTgwMixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTMnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTMnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMycpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBdXG4vLyAgICAgICAgICAgICApXG4vL1xuLy9cbi8vICAgICAgICAgICAgIH1cblxuLy9OYXZpdGFnZSB0byBuZXh0IHNjcmVlblxuICAgICAgICAgICAganVtcHRvTWVudShjYWZlSWQpIHtcbiAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57dGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYWZlXCIsIGNhZmVJZF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSwxMDB9KTtcbiAgICAgICAgICAgIH1cbi8vXG4vLyAvL1RhYlZpZXcgY29udHJvbHNcbiAgICBjaGFuZ2VUYWIoKSB7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJvcmRlciByZWZyZXNoZWRcIilcbiAgICAgICAgaWYgKHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJTZWxlY3RlZEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9Mb2FkIG9yZGVyc1xuICAgICAgICB0aGlzLmF1dGguYXV0aFVpZCgpLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMudXNlcm5hbWU9cmVzLnVpZDtcbiAgICAgICAgICAgIHRoaXMub3JkZXIgPSB0aGlzLm9yZGVyc2VydmljZS5mZXRjaE9yZGVyKHJlcy51aWQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzLnVpZClcbiAgICAgICAgfSkuY2F0Y2goKCk9PmNvbnNvbGUubG9nKFwibm90IGxvZ2dlZCBpbi4uLi5cIikpXG5cbiAgICB9XG5cbi8vIHNlYXJjaCBiYXJcblxuICAgIHB1YmxpYyBvblRleHRDaGFuZ2VkKGFyZ3MpIHtcbiAgICAgICAgbGV0IHNlYXJjaEJhciA9IDxTZWFyY2hCYXI+YXJncy5vYmplY3Q7XG4gICAgICAgIGxldCBzZWFyY2hWYWx1ZSA9IHNlYXJjaEJhci50ZXh0LnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgICAgdGhpcy5teUl0ZW1zID0gdGhpcy5pdGVtcy5maWx0ZXIoIGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGAke2l0ZW0ubmFtZX0gJHtpdGVtLm5hbWV9YC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoVmFsdWUudG9Mb3dlckNhc2UoKSkgPiAtMTtcbiAgICAgICAgfSk7XG5cblxuICAgIH1cblxuICAgIHNlYXJjaExvYWRlZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGV2ZW50Lm9iamVjdC5hbmRyb2lkLmNsZWFyRm9jdXMoKTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgb25TZWFyY2hMYXlvdXRMb2FkZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5zZXRGb2N1c2FibGVJblRvdWNoTW9kZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIH1cblxuXG4gICAgb25SZWdpc3Rlcigpe1xuXG4gICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFsncmVnaXN0ZXInXSk7XG5cbiAgICB9XG5cbiAgICBvblNpZ25pbigpe1xuXG4gICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJ3NpZ25pbiddKTtcblxuICAgIH1cblxuICAgIG9uU2lnbm91dCgpe1xuXG4gICAgICAgIHRoaXMuYXV0aC5zaWdub3V0KCk7XG4gICAgfVxuXG5cbi8vRm9yIHlvdXIgcGlja3MuLi5cbiAgICAgICAgdG9wVGhyZWVDYWZlcygpe1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcImZyZXF1ZW50IGZpcmVkXCIpXG4gICAgICAgICAgICB0aGlzLm9yZGVyc2VydmljZS5mcmVxdWVudENhZmUoXCJDQk5VbHVBNkZvZ1ZJa09TbEQ0V0tPRnZNamYxXCIpO1xuXG4gICAgICAgIH1cblxufVxuIl19