"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../services/item.service");
// import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
var nativescript_angular_1 = require("nativescript-angular");
var observable_array_1 = require("data/observable-array");
//import { RadSideDrawerComponent, SideDrawerType } from "nativescript-pro-ui/sidedrawer/angular";
//import {DrawerStateChangedEventArgs, RadSideDrawer} from 'nativescript-pro-ui/sidedrawer';
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
    function ItemsComponent(itemService, 
        //private router:Router,
        routerextensions, 
        //private _changeDetectionRef: ChangeDetectorRef,
        auth, orderservice) {
        this.itemService = itemService;
        this.routerextensions = routerextensions;
        this.auth = auth;
        this.orderservice = orderservice;
        this.items = [];
        this.myItems = [];
        this.order = [];
        this._items = new observable_array_1.ObservableArray([]);
        this.tabSelectedIndex = 0;
    }
    //@ViewChild(RadSideDrawerComponent) public drawerComponent: RadSideDrawerComponent;
    //private drawer: RadSideDrawer;
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
        //this.drawer = this.drawerComponent.sideDrawer;
        //this._changeDetectionRef.detectChanges();
    };
    /*    openDrawer() {
     this.drawer.showDrawer();
     }

     onDrawerOpened(args: DrawerStateChangedEventArgs) {
     this._currentNotification = "Drawer opened";
     }


     onCloseDrawerTap() {
     this.drawer.closeDrawer();
     }*/
    ItemsComponent.prototype.onRegister = function () {
        this.routerextensions.navigate(['register']);
    };
    ItemsComponent.prototype.onSignin = function () {
        this.routerextensions.navigate(['signin']);
    };
    ItemsComponent.prototype.onSignout = function () {
        this.auth.signout();
    };
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html",
            styleUrls: ["./items.component.css"]
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService,
            nativescript_angular_1.RouterExtensions,
            auth_service_1.AuthService,
            order_service_1.OrderService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdHO0FBRWhHLHlEQUF1RDtBQUV2RCxtRkFBbUY7QUFDbkYsNkRBQXNEO0FBQ3RELDBEQUFzRDtBQUl0RCxrR0FBa0c7QUFDbEcsNEZBQTRGO0FBQzVGLHlEQUFxRDtBQUVyRCwyREFBdUQ7QUFXdkQ7SUFXSSw4QkFBOEI7SUFDOUIsbUJBQW1CO0lBQ25CLHlIQUF5SDtJQUN6SCw4QkFBOEI7SUFDOUIsK0JBQStCO0lBQy9CLCtCQUErQjtJQUMvQix5QkFBeUI7SUFDekIsTUFBTTtJQUVOLHdCQUFvQixXQUF3QjtRQUNoQyx3QkFBd0I7UUFDaEIsZ0JBQWlDO1FBQ3pDLGlEQUFpRDtRQUN6QyxJQUFnQixFQUNoQixZQUF5QjtRQUx6QixnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUV4QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBRWpDLFNBQUksR0FBSixJQUFJLENBQVk7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQWE7UUF2QjdDLFVBQUssR0FBUyxFQUFFLENBQUM7UUFDakIsWUFBTyxHQUFRLEVBQUUsQ0FBQztRQUNsQixVQUFLLEdBQXNDLEVBQUUsQ0FBQztRQUM5QyxXQUFNLEdBQXlCLElBQUksa0NBQWUsQ0FBTyxFQUFFLENBQUMsQ0FBQztRQXFCekQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsb0ZBQW9GO0lBQ3BGLGdDQUFnQztJQUVoQyxpQ0FBUSxHQUFSO1FBQUEsaUJBa0JDO1FBaEJHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2FBQ2xCLFNBQVMsQ0FBQyxVQUFDLEtBQWtCO1lBQzFCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxL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O1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7WUFDckMsU0FBUyxFQUFDLENBQUMsdUJBQXVCLENBQUM7U0FDdEMsQ0FBQzt5Q0FzQm1DLDBCQUFXO1lBRVAsdUNBQWdCO1lBRTVCLDBCQUFXO1lBQ0gsNEJBQVk7T0F6QnBDLGNBQWMsQ0FxTDFCO0lBQUQscUJBQUM7Q0FBQSxBQXJMRCxJQXFMQztBQXJMWSx3Q0FBYyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIFZpZXdDb250YWluZXJSZWZ9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuLy8gaW1wb3J0IHsgTWFwYm94Vmlld0FwaSwgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuaW1wb3J0IHtpc0FuZHJvaWR9IGZyb20gXCJwbGF0Zm9ybVwiXG5cbi8vaW1wb3J0IHsgUmFkU2lkZURyYXdlckNvbXBvbmVudCwgU2lkZURyYXdlclR5cGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LXByby11aS9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbi8vaW1wb3J0IHtEcmF3ZXJTdGF0ZUNoYW5nZWRFdmVudEFyZ3MsIFJhZFNpZGVEcmF3ZXJ9IGZyb20gJ25hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlcic7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge09yZGVyfSBmcm9tIFwiLi4vZGF0YXR5cGVzL29yZGVyXCI7XG5pbXBvcnQge09yZGVyU2VydmljZX0gZnJvbSBcIi4uL3NlcnZpY2VzL29yZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7IFNpZGVEcmF3ZXJQYWdlQ29tcG9uZW50IH0gZnJvbSAnLi4vbW9kdWxlcy9zaGFyZWQvc2lkZS1kcmF3ZXItcGFnZSc7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6W1wiLi9pdGVtcy5jb21wb25lbnQuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgYnVzaW5lc3NOYW1lOiBTdHJpbmdbXTtcbiAgICBpdGVtczogSXRlbVtdPVtdO1xuICAgIG15SXRlbXM6SXRlbVtdPVtdO1xuICAgIG9yZGVyOntcIm9yZGVyTm9cIjpzdHJpbmcsXCJzdGF0dXNcIjpzdHJpbmd9W109W107XG4gICAgX2l0ZW1zOk9ic2VydmFibGVBcnJheTxJdGVtPiA9IG5ldyBPYnNlcnZhYmxlQXJyYXk8SXRlbT4oW10pO1xuICAgIHB1YmxpYyB0YWJTZWxlY3RlZEluZGV4OiBudW1iZXI7XG4gICAgcHVibGljIHNlYXJjaFBocmFzZTogc3RyaW5nO1xuXG4gICAgcHJpdmF0ZSBfY3VycmVudE5vdGlmaWNhdGlvbjogc3RyaW5nO1xuXG4gICAgLy8gcHJpdmF0ZSBtYXA6IE1hcGJveFZpZXdBcGk7XG4gICAgLy8gLy9tYXAgcGFyYW1ldGVyc1xuICAgIC8vIGFjY2Vzc190b2tlbjpzdHJpbmc9XCJway5leUoxSWpvaWNtRm9kV3gwZVdGbmFXcHBJaXdpWVNJNkltTnFaR2QxWlRkb1pqQndjemt5Y1hKc2MzTTNOR3RoYVhBaWZRLjhZdURxZzdpTzhIckFRWEY5dzFqX3dcIlxuICAgIC8vIG1hcF9zdHlsZTpzdHJpbmc9XCJzdHJlZXRzXCI7XG4gICAgLy8gbGF0aXR1ZGU6c3RyaW5nID1cIi0zNy44MTM2XCI7XG4gICAgLy8gbG9uZ2l0dWRlOnN0cmluZz1cIjE0NC45NjMxXCI7XG4gICAgLy8gem9vbWxldmVsOnN0cmluZz1cIjE1XCI7XG4gICAgLy8gLy8vXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSxcbiAgICAgICAgICAgICAgICAvL3ByaXZhdGUgcm91dGVyOlJvdXRlcixcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcmV4dGVuc2lvbnM6Um91dGVyRXh0ZW5zaW9ucyxcbiAgICAgICAgICAgICAgICAvL3ByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgb3JkZXJzZXJ2aWNlOk9yZGVyU2VydmljZSkge1xuICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgIH1cblxuICAgIC8vQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAgIC8vcHJpdmF0ZSBkcmF3ZXI6IFJhZFNpZGVEcmF3ZXI7XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLml0ZW1TZXJ2aWNlLmxvYWQoKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoaXRlbXM6IEFycmF5PEl0ZW0+KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMgPSBuZXcgT2JzZXJ2YWJsZUFycmF5KGl0ZW1zKTtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zPVtdO1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zLmZvckVhY2goKHgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaCh4KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRoaXMubXlJdGVtcz10aGlzLml0ZW1zO1xuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAvL0xvYWQgb3JkZXJzXG4gICAgICAgIHRoaXMuYXV0aC5hdXRoVWlkKCkudGhlbigocmVzKT0+e1xuICAgICAgICAgICAgdGhpcy5vcmRlciA9IHRoaXMub3JkZXJzZXJ2aWNlLmZldGNoT3JkZXIocmVzLnVpZCk7XG4gICAgICAgIH0pXG5cbiAgICB9XG5cbi8vIC8vTWFwVmlld1xuLy8gICAgIG9uTWFwUmVhZHkoYXJncyk6IHZvaWQge1xuLy8gICAgICAgICB0aGlzLm1hcCA9IGFyZ3MubWFwO1xuLy9cbi8vIC8vdGhpcyBpcyBoYXJkIGNvZGVkIHRoaXMgbmVlZHMgdG8gYmUgbWFkZSBkeW5hbWljXG4vLyAgICAgICAgICAgICB0aGlzLm1hcC5hZGRNYXJrZXJzKFtcbi8vICAgICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDEsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IC0zNy44MTM2LFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiAxNDQuOTYzMSxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTEnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTEnLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKT0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmp1bXB0b01lbnUoJ2NhZmUxJylcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfSxcbi8vICAgICAgICAgICAgICAgICAgICAge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDIsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsYXQ6IC0zNy44MTE5ODksXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsbmc6IDE0NC45NjU4NDUsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NhZmUyJyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1YnRpdGxlOiAnQ2hlY2sgb3V0IENhZmUxJyxcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FsbG91dFRhcDogKCk9PiB7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMicpXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICAgICAgICAgIH0sXG4vLyAgICAgICAgICAgICAgICAgICAgIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAzLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODExMDQwLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiAxNDQuOTY1ODAyLFxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDYWZlMycsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0aXRsZTogJ0NoZWNrIG91dCBDYWZlMycsXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBvbkNhbGxvdXRUYXA6ICgpID0+IHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmp1bXB0b01lbnUoJ2NhZmUzJylcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIF1cbi8vICAgICAgICAgICAgIClcbi8vXG4vL1xuLy8gICAgICAgICAgICAgfVxuXG4vL05hdml0YWdlIHRvIG5leHQgc2NyZWVuXG4gICAganVtcHRvTWVudShjYWZlSWQpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9Pnt0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhZmVcIiwgY2FmZUlkXSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhbmltYXRlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICAgICAgZHVyYXRpb246IDIwMCxcbiAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSksMTAwfSk7XG4gICAgfVxuLy9cbi8vIC8vVGFiVmlldyBjb250cm9sc1xuICAgIGNoYW5nZVRhYigpIHtcbiAgICAgICAgaWYgKHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJTZWxlY3RlZEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4vLyBzZWFyY2ggYmFyXG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHRoaXMubXlJdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKCBpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHtpdGVtLm5hbWV9ICR7aXRlbS5uYW1lfWAudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBzZWFyY2hMb2FkZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9uU2VhcmNoTGF5b3V0TG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlSW5Ub3VjaE1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgLy90aGlzLmRyYXdlciA9IHRoaXMuZHJhd2VyQ29tcG9uZW50LnNpZGVEcmF3ZXI7XG4gICAgICAgIC8vdGhpcy5fY2hhbmdlRGV0ZWN0aW9uUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG5cblxuICAgIC8qICAgIG9wZW5EcmF3ZXIoKSB7XG4gICAgIHRoaXMuZHJhd2VyLnNob3dEcmF3ZXIoKTtcbiAgICAgfVxuXG4gICAgIG9uRHJhd2VyT3BlbmVkKGFyZ3M6IERyYXdlclN0YXRlQ2hhbmdlZEV2ZW50QXJncykge1xuICAgICB0aGlzLl9jdXJyZW50Tm90aWZpY2F0aW9uID0gXCJEcmF3ZXIgb3BlbmVkXCI7XG4gICAgIH1cblxuXG4gICAgIG9uQ2xvc2VEcmF3ZXJUYXAoKSB7XG4gICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgIH0qL1xuXG5cbiAgICBvblJlZ2lzdGVyKCl7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFsncmVnaXN0ZXInXSk7XG5cbiAgICB9XG5cbiAgICBvblNpZ25pbigpe1xuXG4gICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9ucy5uYXZpZ2F0ZShbJ3NpZ25pbiddKTtcblxuICAgIH1cblxuICAgIG9uU2lnbm91dCgpe1xuXG4gICAgICAgIHRoaXMuYXV0aC5zaWdub3V0KCk7XG4gICAgfVxufVxuIl19