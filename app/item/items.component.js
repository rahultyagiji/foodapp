"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../services/item.service");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var ItemsComponent = /** @class */ (function () {
    ///
    function ItemsComponent(itemService, router, routerextensions) {
        this.itemService = itemService;
        this.router = router;
        this.routerextensions = routerextensions;
        //map parameters
        this.access_token = "pk.eyJ1IjoicmFodWx0eWFnaWppIiwiYSI6ImNqZGd1ZTdoZjBwczkycXJsc3M3NGthaXAifQ.8YuDqg7iO8HrAQXF9w1j_w";
        this.map_style = "streets";
        this.latitude = "-37.8136";
        this.longitude = "144.9631";
        this.zoomlevel = "15";
    }
    ItemsComponent.prototype.ngOnInit = function () {
        this.items = this.itemService.getItems();
    };
    ItemsComponent.prototype.onMapReady = function (args) {
        var _this = this;
        this.map = args.map;
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
                    console.log("Cafe 2 was tapped");
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
                    console.log("Cafe 3 was tapped");
                    _this.jumptoMenu('cafe3');
                }
            }
        ]);
    };
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
    ItemsComponent = __decorate([
        core_1.Component({
            selector: "ns-items",
            moduleId: module.id,
            templateUrl: "./items.component.html"
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService,
            router_1.Router,
            nativescript_angular_1.RouterExtensions])
    ], ItemsComponent);
    return ItemsComponent;
}());
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBRXBFLHlEQUF1RDtBQUN2RCwwQ0FBd0M7QUFFeEMsNkRBQXNEO0FBT3REO0lBV0ksR0FBRztJQUVILHdCQUFvQixXQUF3QixFQUN4QixNQUFhLEVBQ2IsZ0JBQWlDO1FBRmpDLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFdBQU0sR0FBTixNQUFNLENBQU87UUFDYixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWlCO1FBVnJELGdCQUFnQjtRQUNoQixpQkFBWSxHQUFRLGtHQUFrRyxDQUFBO1FBQ3RILGNBQVMsR0FBUSxTQUFTLENBQUM7UUFDM0IsYUFBUSxHQUFRLFVBQVUsQ0FBQztRQUMzQixjQUFTLEdBQVEsVUFBVSxDQUFDO1FBQzVCLGNBQVMsR0FBUSxJQUFJLENBQUM7SUFNdEIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFFSSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFFN0MsQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxJQUFJO1FBQWYsaUJBeUNTO1FBeENMLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztRQUdoQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQztZQUNaO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEdBQUcsRUFBRSxDQUFDLE9BQU87Z0JBQ2IsR0FBRyxFQUFFLFFBQVE7Z0JBQ2IsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsK0JBQStCO2dCQUMvQixZQUFZLEVBQUU7b0JBQ1YsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDNUIsQ0FBQzthQUNKO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsR0FBRyxFQUFFLENBQUMsU0FBUztnQkFDZixHQUFHLEVBQUUsVUFBVTtnQkFDZixLQUFLLEVBQUUsT0FBTztnQkFDZCwrQkFBK0I7Z0JBQy9CLFlBQVksRUFBRTtvQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ2pDLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzVCLENBQUM7YUFDSjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEdBQUcsRUFBRSxDQUFDLFNBQVM7Z0JBQ2YsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsK0JBQStCO2dCQUMvQixZQUFZLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNqQyxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUM1QixDQUFDO2FBQ0o7U0FDSixDQUNKLENBQUE7SUFHRCxDQUFDO0lBRUQsbUNBQVUsR0FBVixVQUFXLE1BQU07UUFBakIsaUJBV0M7UUFURSxVQUFVLENBQUM7WUFBTSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUM1RDtnQkFDSSxRQUFRLEVBQUUsSUFBSTtnQkFDZCxVQUFVLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsUUFBUSxFQUFFLEdBQUc7b0JBQ2IsS0FBSyxFQUFFLE1BQU07aUJBQ2hCO2FBQ0osQ0FBQyxFQUFDLEdBQUcsQ0FBQTtRQUFBLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUE5RUEsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FjbUMsMEJBQVc7WUFDakIsZUFBTTtZQUNJLHVDQUFnQjtPQWY1QyxjQUFjLENBK0UxQjtJQUFELHFCQUFDO0NBQUEsQUEvRUQsSUErRUM7QUEvRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTWFwYm94Vmlld0FwaSwgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBidXNpbmVzc05hbWU6IFN0cmluZ1tdO1xuICAgIGl0ZW1zOiBJdGVtW107XG5cbiAgICBwcml2YXRlIG1hcDogTWFwYm94Vmlld0FwaTtcbiAgICAvL21hcCBwYXJhbWV0ZXJzXG4gICAgYWNjZXNzX3Rva2VuOnN0cmluZz1cInBrLmV5SjFJam9pY21Gb2RXeDBlV0ZuYVdwcElpd2lZU0k2SW1OcVpHZDFaVGRvWmpCd2N6a3ljWEpzYzNNM05HdGhhWEFpZlEuOFl1RHFnN2lPOEhyQVFYRjl3MWpfd1wiXG4gICAgbWFwX3N0eWxlOnN0cmluZz1cInN0cmVldHNcIjtcbiAgICBsYXRpdHVkZTpzdHJpbmc9XCItMzcuODEzNlwiO1xuICAgIGxvbmdpdHVkZTpzdHJpbmc9XCIxNDQuOTYzMVwiO1xuICAgIHpvb21sZXZlbDpzdHJpbmc9XCIxNVwiO1xuICAgIC8vL1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6Um91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyZXh0ZW5zaW9uczpSb3V0ZXJFeHRlbnNpb25zKSB7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcblxuICAgIH1cblxuICAgIG9uTWFwUmVhZHkoYXJncyk6IHZvaWQge1xuICAgICAgICB0aGlzLm1hcCA9IGFyZ3MubWFwO1xuXG5cbiAgICAgICAgICAgIHRoaXMubWFwLmFkZE1hcmtlcnMoW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogLTM3LjgxMzYsXG4gICAgICAgICAgICAgICAgICAgICAgICBsbmc6IDE0NC45NjMxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDYWZlMScsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0aXRsZTogJ0NoZWNrIG91dCBDYWZlMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbGxvdXRUYXA6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHRvTWVudSgnY2FmZTEnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogLTM3LjgxMTk4OSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2NTg0NSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTInLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKT0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhZmUgMiB3YXMgdGFwcGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHRvTWVudSgnY2FmZTInKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogLTM3LjgxMTA0MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2NTgwMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYWZlIDMgd2FzIHRhcHBlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmp1bXB0b01lbnUoJ2NhZmUzJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIClcblxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGp1bXB0b01lbnUoY2FmZUlkKSB7XG5cbiAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT57dGhpcy5yb3V0ZXJleHRlbnNpb25zLm5hdmlnYXRlKFtcIi9jYWZlXCIsIGNhZmVJZF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuaW1hdGVkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwic2xpZGVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkdXJhdGlvbjogMjAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnZlOiBcImVhc2VcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KSwxMDB9KTtcbiAgICAgICAgICAgIH1cbn1cbiJdfQ==