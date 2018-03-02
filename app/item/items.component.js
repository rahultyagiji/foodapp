"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../services/item.service");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var observable_array_1 = require("data/observable-array");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var auth_service_1 = require("../services/auth.service");
var ItemsComponent = /** @class */ (function () {
    ///
    function ItemsComponent(itemService, router, routerextensions, _changeDetectionRef, auth) {
        this.itemService = itemService;
        this.router = router;
        this.routerextensions = routerextensions;
        this._changeDetectionRef = _changeDetectionRef;
        this.auth = auth;
        this.items = [];
        this.myItems = [];
        this._items = new observable_array_1.ObservableArray([]);
        //map parameters
        this.access_token = "pk.eyJ1IjoicmFodWx0eWFnaWppIiwiYSI6ImNqZGd1ZTdoZjBwczkycXJsc3M3NGthaXAifQ.8YuDqg7iO8HrAQXF9w1j_w";
        this.map_style = "streets";
        this.latitude = "-37.8136";
        this.longitude = "144.9631";
        this.zoomlevel = "15";
        this.tabSelectedIndex = 1;
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
    };
    //MapView
    ItemsComponent.prototype.onMapReady = function (args) {
        var _this = this;
        this.map = args.map;
        //this is hard coded this needs to be made dynamic
        this.map.addMarkers([
            {
                id: 1,
                lat: -37.8136,
                lng: 144.9631,
                title: 'Cafe1',
                // subtitle: 'Check out Cafe1',
                onCalloutTap: function () {
                    _this.jumptoMenu('cafe1');
                }
            },
            {
                id: 2,
                lat: -37.811989,
                lng: 144.965845,
                title: 'Cafe2',
                // subtitle: 'Check out Cafe1',
                onCalloutTap: function () {
                    _this.jumptoMenu('cafe2');
                }
            },
            {
                id: 3,
                lat: -37.811040,
                lng: 144.965802,
                title: 'Cafe3',
                // subtitle: 'Check out Cafe3',
                onCalloutTap: function () {
                    _this.jumptoMenu('cafe3');
                }
            }
        ]);
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
            auth_service_1.AuthService])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWdHO0FBRWhHLHlEQUF1RDtBQUN2RCwwQ0FBd0M7QUFFeEMsNkRBQXNEO0FBQ3RELDBEQUFzRDtBQUl0RCxrRUFBZ0c7QUFFaEcseURBQXFEO0FBVXJEO0lBaUJJLEdBQUc7SUFFSCx3QkFBb0IsV0FBd0IsRUFDeEIsTUFBYSxFQUNiLGdCQUFpQyxFQUNqQyxtQkFBc0MsRUFDdEMsSUFBZ0I7UUFKaEIsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUNiLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBaUI7UUFDakMsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFtQjtRQUN0QyxTQUFJLEdBQUosSUFBSSxDQUFZO1FBckJwQyxVQUFLLEdBQVMsRUFBRSxDQUFDO1FBQ2pCLFlBQU8sR0FBUSxFQUFFLENBQUM7UUFDbEIsV0FBTSxHQUF5QixJQUFJLGtDQUFlLENBQU8sRUFBRSxDQUFDLENBQUM7UUFPN0QsZ0JBQWdCO1FBQ2hCLGlCQUFZLEdBQVEsa0dBQWtHLENBQUE7UUFDdEgsY0FBUyxHQUFRLFNBQVMsQ0FBQztRQUMzQixhQUFRLEdBQVMsVUFBVSxDQUFDO1FBQzVCLGNBQVMsR0FBUSxVQUFVLENBQUM7UUFDNUIsY0FBUyxHQUFRLElBQUksQ0FBQztRQVFsQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFLRCxpQ0FBUSxHQUFSO1FBQUEsaUJBVUM7UUFURyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTthQUNsQixTQUFTLENBQUMsVUFBQyxLQUFrQjtZQUMxQixLQUFJLENBQUMsTUFBTSxHQUFHLElBQUksa0NBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN6QyxLQUFJLENBQUMsS0FBSyxHQUFDLEVB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QUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztJQUU3QyxDQUFDO0lBRUQsaUNBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBRS9DLENBQUM7SUFFRCxrQ0FBUyxHQUFUO1FBRUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBL0lrQztRQUFsQyxnQkFBUyxDQUFDLGdDQUFzQixDQUFDO2tDQUF5QixnQ0FBc0I7MkRBQUM7SUEzQnpFLGNBQWM7UUFQMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1lBQ3JDLFNBQVMsRUFBQyxDQUFDLHVCQUF1QixDQUFDO1NBQ3RDLENBQUM7eUNBcUJtQywwQkFBVztZQUNqQixlQUFNO1lBQ0ksdUNBQWdCO1lBQ1osd0JBQWlCO1lBQ2pDLDBCQUFXO09BdkIzQixjQUFjLENBMksxQjtJQUFELHFCQUFDO0NBQUEsQUEzS0QsSUEyS0M7QUEzS1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBWaWV3Q29udGFpbmVyUmVmfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi9kYXRhdHlwZXMvaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBSb3V0ZXJ9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IE1hcGJveFZpZXdBcGksIFZpZXdwb3J0IGFzIE1hcGJveFZpZXdwb3J0IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1tYXBib3hcIjtcbmltcG9ydCB7Um91dGVyRXh0ZW5zaW9uc30gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyXCI7XG5pbXBvcnQge09ic2VydmFibGVBcnJheX0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0IHsgU2VhcmNoQmFyIH0gZnJvbSBcInVpL3NlYXJjaC1iYXJcIjtcbmltcG9ydCB7aXNBbmRyb2lkfSBmcm9tIFwicGxhdGZvcm1cIlxuXG5pbXBvcnQgeyBSYWRTaWRlRHJhd2VyQ29tcG9uZW50LCBTaWRlRHJhd2VyVHlwZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL3NpZGVkcmF3ZXIvYW5ndWxhclwiO1xuaW1wb3J0IHtEcmF3ZXJTdGF0ZUNoYW5nZWRFdmVudEFyZ3MsIFJhZFNpZGVEcmF3ZXJ9IGZyb20gJ25hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlcic7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIixcbiAgICBzdHlsZVVybHM6W1wiLi9pdGVtcy5jb21wb25lbnQuY3NzXCJdXG59KVxuXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgYnVzaW5lc3NOYW1lOiBTdHJpbmdbXTtcbiAgICBpdGVtczogSXRlbVtdPVtdO1xuICAgIG15SXRlbXM6SXRlbVtdPVtdO1xuICAgIF9pdGVtczpPYnNlcnZhYmxlQXJyYXk8SXRlbT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KFtdKTtcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcblxuICAgIHByaXZhdGUgX2N1cnJlbnROb3RpZmljYXRpb246IHN0cmluZztcblxuICAgIHByaXZhdGUgbWFwOiBNYXBib3hWaWV3QXBpO1xuICAgIC8vbWFwIHBhcmFtZXRlcnNcbiAgICBhY2Nlc3NfdG9rZW46c3RyaW5nPVwicGsuZXlKMUlqb2ljbUZvZFd4MGVXRm5hV3BwSWl3aVlTSTZJbU5xWkdkMVpUZG9aakJ3Y3preWNYSnNjM00zTkd0aGFYQWlmUS44WXVEcWc3aU84SHJBUVhGOXcxal93XCJcbiAgICBtYXBfc3R5bGU6c3RyaW5nPVwic3RyZWV0c1wiO1xuICAgIGxhdGl0dWRlOnN0cmluZyA9XCItMzcuODEzNlwiO1xuICAgIGxvbmdpdHVkZTpzdHJpbmc9XCIxNDQuOTYzMVwiO1xuICAgIHpvb21sZXZlbDpzdHJpbmc9XCIxNVwiO1xuICAgIC8vL1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6Um91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyZXh0ZW5zaW9uczpSb3V0ZXJFeHRlbnNpb25zLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgX2NoYW5nZURldGVjdGlvblJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSBhdXRoOkF1dGhTZXJ2aWNlKSB7XG4gICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDE7XG4gICAgfVxuXG4gICAgQFZpZXdDaGlsZChSYWRTaWRlRHJhd2VyQ29tcG9uZW50KSBwdWJsaWMgZHJhd2VyQ29tcG9uZW50OiBSYWRTaWRlRHJhd2VyQ29tcG9uZW50O1xuICAgIHByaXZhdGUgZHJhd2VyOiBSYWRTaWRlRHJhd2VyO1xuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXRlbVNlcnZpY2UubG9hZCgpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChpdGVtczogQXJyYXk8SXRlbT4pID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcyA9IG5ldyBPYnNlcnZhYmxlQXJyYXkoaXRlbXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXM9W107XG4gICAgICAgICAgICAgICAgdGhpcy5faXRlbXMuZm9yRWFjaCgoeCk9PntcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGhpcy5teUl0ZW1zPXRoaXMuaXRlbXM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbi8vTWFwVmlld1xuICAgIG9uTWFwUmVhZHkoYXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcCA9IGFyZ3MubWFwO1xuXG4vL3RoaXMgaXMgaGFyZCBjb2RlZCB0aGlzIG5lZWRzIHRvIGJlIG1hZGUgZHluYW1pY1xuICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VycyhbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODEzNixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2MzEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NhZmUxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1YnRpdGxlOiAnQ2hlY2sgb3V0IENhZmUxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FsbG91dFRhcDogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODExOTg5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiAxNDQuOTY1ODQ1LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDYWZlMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0aXRsZTogJ0NoZWNrIG91dCBDYWZlMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbGxvdXRUYXA6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHRvTWVudSgnY2FmZTInKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogLTM3LjgxMTA0MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2NTgwMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMycpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG5cblxuICAgICAgICAgICAgfVxuXG4vL05hdml0YWdlIHRvIG5leHQgc2NyZWVuXG4gICAgICAgICAgICBqdW1wdG9NZW51KGNhZmVJZCkge1xuICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9Pnt0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhZmVcIiwgY2FmZUlkXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLDEwMH0pO1xuICAgICAgICAgICAgfVxuLy9cbi8vIC8vVGFiVmlldyBjb250cm9sc1xuICAgIGNoYW5nZVRhYigpIHtcbiAgICAgICAgaWYgKHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDEpIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDI7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJTZWxlY3RlZEluZGV4ID09PSAyKSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4vLyBzZWFyY2ggYmFyXG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBsZXQgc2VhcmNoVmFsdWUgPSBzZWFyY2hCYXIudGV4dC50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHRoaXMubXlJdGVtcyA9IHRoaXMuaXRlbXMuZmlsdGVyKCBpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBgJHtpdGVtLm5hbWV9ICR7aXRlbS5uYW1lfWAudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaFZhbHVlLnRvTG93ZXJDYXNlKCkpID4gLTE7XG4gICAgICAgIH0pO1xuXG5cbiAgICB9XG5cbiAgICBzZWFyY2hMb2FkZWQoZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50Lm9iamVjdC5hbmRyb2lkKSB7XG4gICAgICAgICAgICBldmVudC5vYmplY3QuYW5kcm9pZC5jbGVhckZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIG9uU2VhcmNoTGF5b3V0TG9hZGVkKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5vYmplY3QuYW5kcm9pZCkge1xuICAgICAgICAgICAgZXZlbnQub2JqZWN0LmFuZHJvaWQuc2V0Rm9jdXNhYmxlSW5Ub3VjaE1vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIgPSB0aGlzLmRyYXdlckNvbXBvbmVudC5zaWRlRHJhd2VyO1xuICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3Rpb25SZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cblxuXG4gICAgb3BlbkRyYXdlcigpIHtcbiAgICAgICAgdGhpcy5kcmF3ZXIuc2hvd0RyYXdlcigpO1xuICAgIH1cblxub25EcmF3ZXJPcGVuZWQoYXJnczogRHJhd2VyU3RhdGVDaGFuZ2VkRXZlbnRBcmdzKSB7XG4gICAgICAgIHRoaXMuX2N1cnJlbnROb3RpZmljYXRpb24gPSBcIkRyYXdlciBvcGVuZWRcIjtcbiAgICB9XG5cblxuICAgIG9uQ2xvc2VEcmF3ZXJUYXAoKSB7XG4gICAgICAgIHRoaXMuZHJhd2VyLmNsb3NlRHJhd2VyKCk7XG4gICAgfVxuXG5cbiAgICBvblJlZ2lzdGVyKCl7XG5cbiAgICB0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoWydyZWdpc3RlciddKTtcblxuICAgIH1cblxuICAgIG9uU2lnbmluKCl7XG5cbiAgICAgICAgdGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFsnc2lnbmluJ10pO1xuXG4gICAgfVxuXG4gICAgb25TaWdub3V0KCl7XG5cbiAgICAgICAgdGhpcy5hdXRoLnNpZ25vdXQoKTtcbiAgICB9XG59XG4iXX0=