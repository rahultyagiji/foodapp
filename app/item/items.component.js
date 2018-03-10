"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../services/item.service");
var router_1 = require("@angular/router");
// import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
var nativescript_angular_1 = require("nativescript-angular");
var observable_array_1 = require("data/observable-array");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
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
    function ItemsComponent(itemService, router, routerextensions, _changeDetectionRef, auth, orderservice) {
        this.itemService = itemService;
        this.router = router;
        this.routerextensions = routerextensions;
        this._changeDetectionRef = _changeDetectionRef;
        this.auth = auth;
        this.orderservice = orderservice;
        this.items = [];
        this.myItems = [];
        this.order = [];
        this._items = new observable_array_1.ObservableArray([]);
        this.tabSelectedIndex = 0;
    }
    ItemsComponent.prototype.ngOnInit = function () {
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
            _this.order = _this.orderservice.fetchOrder(res.uid);
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
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    };
    ItemsComponent.prototype.openDrawer = function () {
        this.drawer.showDrawer();
    };
    ItemsComponent.prototype.onDrawerOpened = function (args) {
        this._currentNotification = "Drawer opened";
    };
    ItemsComponent.prototype.onCloseDrawerTap = function () {
        this.drawer.closeDrawer();
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
    __decorate([
        core_1.ViewChild(angular_1.RadSideDrawerComponent),
        __metadata("design:type", angular_1.RadSideDrawerComponent)
    ], ItemsComponent.prototype, "drawerComponent", void 0);
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
            core_1.ChangeDetectorRef,
            auth_service_1.AuthService,
            order_service_1.OrderService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdHO0FBRWhHLHlEQUF1RDtBQUN2RCwwQ0FBd0M7QUFDeEMsbUZBQW1GO0FBQ25GLDZEQUFzRDtBQUN0RCwwREFBc0Q7QUFJdEQsa0VBQWdHO0FBRWhHLHlEQUFxRDtBQUVyRCwyREFBdUQ7QUFVdkQ7SUFXSSw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLHlIQUF5SDtJQUN6SCw4QkFBOEI7SUFDOUIsK0JBQStCO0lBQy9CLCtCQUErQjtJQUMvQix5QkFBeUI7SUFDekIsTUFBTTtJQUVOLHdCQUFvQixXQUF3QixFQUN4QixNQUFhLEVBQ2IsZ0JBQWlDLEVBQ2pDLG1CQUFzQyxFQUN0QyxJQUFnQixFQUNoQixZQUF5QjtRQUx6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQW1CO1FBQ3RDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWE7UUF2QjdDLFVBQUssR0FBUyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQXNDLEVBQUUsQ0FBQztRQUM5QyxXQUFNLEdBQXlCLElBQUksa0NBQWUsQ0FBTyxFQUFFLENBQUMsQ0FBQztRQXFCekQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBS0QsaUNBQVEsR0FBUjtRQUFBLGlCQWtCQztRQWhCRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTthQUNsQixTQUFTLENBQUMsVUFBQyxLQUFrQjtZQUMxQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0NBQWUsQ0FBQyxLQUFL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Z0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUU3QyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRS9DLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBdkprQztRQUFsQyxnQkFBUyxDQUFDLGdDQUFzQixDQUFDO2tDQUF5QixnQ0FBc0I7MkRBQUM7SUE3QnpFLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBQyxDQUFDLHVCQUF1QixDQUFDO1NBQ3RDLENBQUM7eUNBc0JtQywwQkFBVztZQUNqQixlQUFNO1lBQ0ksdUNBQWdCO1lBQ1osd0JBQWlCO1lBQ2pDLDBCQUFXO1lBQ0gsNEJBQVk7T0F6QnBDLGNBQWMsQ0FxTDFCO0lBQUQscUJBQUM7Q0FBQSxBQXJMRCxJQXFMQztBQXJMWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuLy8gaW1wb3J0IHsgTWFwYm94Vmlld0FwaSwgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHtpc0FuZHJvaWR9IGZyb20gXCJwbGF0Zm9ybVwiXG5cbmltcG9ydCB7IFJhZFNpZGVEcmF3ZXJDb21wb25lbnQsIFNpZGVEcmF3ZXJUeXBlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQge0RyYXdlclN0YXRlQ2hhbmdlZEV2ZW50QXJncywgUmFkU2lkZURyYXdlcn0gZnJvbSAnbmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyJztcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7T3JkZXJ9IGZyb20gXCIuLi9kYXRhdHlwZXMvb3JkZXJcIjtcbmltcG9ydCB7T3JkZXJTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvb3JkZXIuc2VydmljZVwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCIsXG4gICAgc3R5bGVVcmxzOltcIi4vaXRlbXMuY29tcG9uZW50LmNzc1wiXVxufSlcblxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0e1xuICAgIGJ1c2luZXNzTmFtZTogU3RyaW5nW107XG4gICAgaXRlbXM6IEl0ZW1bXT1bXTtcbiAgICBteUl0ZW1zOkl0ZW1bXT1bXTtcbiAgICBvcmRlcjp7XCJvcmRlck5vXCI6c3RyaW5nLFwic3RhdHVzXCI6c3RyaW5nfVtdPVtdO1xuICAgIF9pdGVtczpPYnNlcnZhYmxlQXJyYXk8SXRlbT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KFtdKTtcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcblxuICAgIHByaXZhdGUgX2N1cnJlbnROb3RpZmljYXRpb246IHN0cmluZztcblxuICAgIC8vIHByaXZhdGUgbWFwOiBNYXBib3hWaWV3QXBpO1xuICAgIC8vIC8vbWFwIHBhcmFtZXRlcnNcbiAgICAvLyBhY2Nlc3NfdG9rZW46c3RyaW5nPVwicGsuZXlKMUlqb2ljbUZvZFd4MGVXRm5hV3BwSWl3aVlTSTZJbU5xWkdkMVpUZG9aakJ3Y3preWNYSnNjM00zTkd0aGFYQWlmUS44WXVEcWc3aU84SHJBUVhGOXcxal93XCJcbiAgICAvLyBtYXBfc3R5bGU6c3RyaW5nPVwic3RyZWV0c1wiO1xuICAgIC8vIGxhdGl0dWRlOnN0cmluZyA9XCItMzcuODEzNlwiO1xuICAgIC8vIGxvbmdpdHVkZTpzdHJpbmc9XCIxNDQuOTYzMVwiO1xuICAgIC8vIHpvb21sZXZlbDpzdHJpbmc9XCIxNVwiO1xuICAgIC8vIC8vL1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6Um91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyZXh0ZW5zaW9uczpSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3JkZXJzZXJ2aWNlOk9yZGVyU2VydmljZSkge1xuICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgIH1cblxuICAgIEBWaWV3Q2hpbGQoUmFkU2lkZURyYXdlckNvbXBvbmVudCkgcHVibGljIGRyYXdlckNvbXBvbmVudDogUmFkU2lkZURyYXdlckNvbXBvbmVudDtcbiAgICBwcml2YXRlIGRyYXdlcjogUmFkU2lkZURyYXdlcjtcblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuaXRlbVNlcnZpY2UubG9hZCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChpdGVtczogQXJyYXk8SXRlbT4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoaXRlbXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXM9W107XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5teUl0ZW1zPXRoaXMuaXRlbXM7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgLy9Mb2FkIG9yZGVyc1xuICAgICAgICB0aGlzLmF1dGguYXV0aFVpZCgpLnRoZW4oKHJlcyk9PntcbiAgICAgICAgICAgIHRoaXMub3JkZXIgPSB0aGlzLm9yZGVyc2VydmljZS5mZXRjaE9yZGVyKHJlcy51aWQpO1xuICAgICAgICB9KVxuXG4gICAgfVxuXG4vLyAvL01hcFZpZXdcbi8vICAgICBvbk1hcFJlYWR5KGFyZ3MpOiB2b2lkIHtcbi8vICAgICAgICAgdGhpcy5tYXAgPSBhcmdzLm1hcDtcbi8vXG4vLyAvL3RoaXMgaXMgaGFyZCBjb2RlZCB0aGlzIG5lZWRzIHRvIGJlIG1hZGUgZHluYW1pY1xuLy8gICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VycyhbXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAxLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODEzNixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2MzEsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NhZmUxJyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1YnRpdGxlOiAnQ2hlY2sgb3V0IENhZmUxJyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FsbG91dFRhcDogKCk9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMScpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODExOTg5LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiAxNDQuOTY1ODQ1LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDYWZlMicsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0aXRsZTogJ0NoZWNrIG91dCBDYWZlMScsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBvbkNhbGxvdXRUYXA6ICgpPT4ge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHRvTWVudSgnY2FmZTInKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgICAgICB9LFxuLy8gICAgICAgICAgICAgICAgICAgICB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBpZDogMyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogLTM3LjgxMTA0MCxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2NTgwMixcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTMnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTMnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKSA9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMycpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICBdXG4vLyAgICAgICAgICAgICApXG4vL1xuLy9cbi8vICAgICAgICAgICAgIH1cblxuLy9OYXZpdGFnZSB0byBuZXh0IHNjcmVlblxuICAgICAgICAgICAganVtcHRvTWVudShjYWZlSWQpIHtcbiAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57dGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYWZlXCIsIGNhZmVJZF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSwxMDB9KTtcbiAgICAgICAgICAgIH1cbi8vXG4vLyAvL1RhYlZpZXcgY29udHJvbHNcbiAgICBjaGFuZ2VUYWIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJTZWxlY3RlZEluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuLy8gc2VhcmNoIGJhclxuXG4gICAgcHVibGljIG9uVGV4dENoYW5nZWQoYXJncykge1xuICAgICAgICBsZXQgc2VhcmNoQmFyID0gPFNlYXJjaEJhcj5hcmdzLm9iamVjdDtcbiAgICAgICAgbGV0IHNlYXJjaFZhbHVlID0gc2VhcmNoQmFyLnRleHQudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICB0aGlzLm15SXRlbXMgPSB0aGlzLml0ZW1zLmZpbHRlciggaXRlbSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gYCR7aXRlbS5uYW1lfSAke2l0ZW0ubmFtZX1gLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2hWYWx1ZS50b0xvd2VyQ2FzZSgpKSA+IC0xO1xuICAgICAgICB9KTtcblxuXG4gICAgfVxuXG4gICAgc2VhcmNoTG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuY2xlYXJGb2N1cygpO1xuICAgICAgICB9XG5cbiAgICB9XG5cbiAgICBvblNlYXJjaExheW91dExvYWRlZChldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQub2JqZWN0LmFuZHJvaWQpIHtcbiAgICAgICAgICAgIGV2ZW50Lm9iamVjdC5hbmRyb2lkLnNldEZvY3VzYWJsZUluVG91Y2hNb2RlKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyID0gdGhpcy5kcmF3ZXJDb21wb25lbnQuc2lkZURyYXdlcjtcbiAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cblxuICAgIG9wZW5EcmF3ZXIoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICB9XG5cbm9uRHJhd2VyT3BlbmVkKGFyZ3M6IERyYXdlclN0YXRlQ2hhbmdlZEV2ZW50QXJncykge1xuICAgICAgICB0aGlzLl9jdXJyZW50Tm90aWZpY2F0aW9uID0gXCJEcmF3ZXIgb3BlbmVkXCI7XG4gICAgfVxuXG5cbiAgICBvbkNsb3NlRHJhd2VyVGFwKCkge1xuICAgICAgICB0aGlzLmRyYXdlci5jbG9zZURyYXdlcigpO1xuICAgIH1cblxuXG4gICAgb25SZWdpc3Rlcigpe1xuXG4gICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFsncmVnaXN0ZXInXSk7XG5cbiAgICB9XG5cbiAgICBvblNpZ25pbigpe1xuXG4gICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJ3NpZ25pbiddKTtcblxuICAgIH1cblxuICAgIG9uU2lnbm91dCgpe1xuXG4gICAgICAgIHRoaXMuYXV0aC5zaWdub3V0KCk7XG4gICAgfVxufVxuIl19