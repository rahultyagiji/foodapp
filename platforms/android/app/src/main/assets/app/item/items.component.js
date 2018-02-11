"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../services/item.service");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var ItemsComponent = /** @class */ (function () {
    ///
    function ItemsComponent(itemService, router, routerextension) {
        this.itemService = itemService;
        this.router = router;
        this.routerextension = routerextension;
        //map parameters
        this.access_token = "pk.eyJ1IjoicmFodWx0eWFnaWppIiwiYSI6ImNqZGd1ZTdoZjBwczkycXJsc3M3NGthaXAifQ.8YuDqg7iO8HrAQXF9w1j_w";
        this.map_style = "streets";
        this.latitude = "-37.8136";
        this.longitude = "144.9631";
        this.zoomlevel = "14";
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
                    console.log("Cafe 1 was tapped");
                    _this.jumptoMenu("cafe1");
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
                    _this.jumptoMenu("cafe2");
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
                    _this.jumptoMenu("cafe3");
                }
            }
        ]);
    };
    ItemsComponent.prototype.jumptoMenu = function (cafeId) {
        var _this = this;
        console.log("test..", cafeId);
        setTimeout(function () {
            _this.routerextension.navigate(["item/", cafeId], { clearHistory: true })
                .then(console.log)
                .catch(function (err) { console.log("error navigating", err); });
        }, 100);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBRXBFLHlEQUF1RDtBQUN2RCwwQ0FBd0M7QUFFeEMsNkRBQXNEO0FBT3REO0lBV0ksR0FBRztJQUVILHdCQUFvQixXQUF3QixFQUN4QixNQUFhLEVBQ2IsZUFBZ0M7UUFGaEMsZ0JBQVcsR0FBWCxXQUFXLENBQWE7UUFDeEIsV0FBTSxHQUFOLE1BQU0sQ0FBTztRQUNiLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQVZwRCxnQkFBZ0I7UUFDaEIsaUJBQVksR0FBUSxrR0FBa0csQ0FBQTtRQUN0SCxjQUFTLEdBQVEsU0FBUyxDQUFDO1FBQzNCLGFBQVEsR0FBUSxVQUFVLENBQUM7UUFDM0IsY0FBUyxHQUFRLFVBQVUsQ0FBQztRQUM1QixjQUFTLEdBQVEsSUFBSSxDQUFDO0lBTXRCLENBQUM7SUFFRCxpQ0FBUSxHQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxtQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUFmLGlCQXNDUztRQXJDTCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDaEI7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsR0FBRyxFQUFFLENBQUMsT0FBTztnQkFDYixHQUFHLEVBQUUsUUFBUTtnQkFDYixLQUFLLEVBQUUsT0FBTztnQkFDZCwrQkFBK0I7Z0JBQy9CLFlBQVksRUFBRTtvQkFDVixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUM7b0JBQ2pDLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzVCLENBQUM7YUFDSjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEdBQUcsRUFBRSxDQUFDLFNBQVM7Z0JBQ2YsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsK0JBQStCO2dCQUMvQixZQUFZLEVBQUU7b0JBQ1YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO29CQUNqQyxLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUM1QixDQUFDO2FBQ0o7WUFDRDtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxHQUFHLEVBQUUsQ0FBQyxTQUFTO2dCQUNmLEdBQUcsRUFBRSxVQUFVO2dCQUNmLEtBQUssRUFBRSxPQUFPO2dCQUNkLCtCQUErQjtnQkFDL0IsWUFBWSxFQUFFO29CQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQztvQkFDakMsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDNUIsQ0FBQzthQUNKO1NBQ0ksQ0FDUixDQUFBO0lBQ0csQ0FBQztJQUVELG1DQUFVLEdBQVYsVUFBVyxNQUFNO1FBQWpCLGlCQVdDO1FBVkcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUMsTUFBTSxDQUFDLENBQUE7UUFFNUIsVUFBVSxDQUFDO1lBQ1AsS0FBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLEVBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUM7aUJBQ2xFLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO2lCQUNqQixLQUFLLENBQUMsVUFBQyxHQUFHLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBQyxHQUFHLENBQUMsQ0FBQSxDQUFBLENBQUMsQ0FBQyxDQUFBO1FBRTVELENBQUMsRUFBQyxHQUFHLENBQUMsQ0FBQTtJQUdWLENBQUM7SUF6RUEsY0FBYztRQUwxQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFVBQVU7WUFDcEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSx3QkFBd0I7U0FDeEMsQ0FBQzt5Q0FjbUMsMEJBQVc7WUFDakIsZUFBTTtZQUNHLHVDQUFnQjtPQWYzQyxjQUFjLENBMEUxQjtJQUFELHFCQUFDO0NBQUEsQUExRUQsSUEwRUM7QUExRVksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTWFwYm94Vmlld0FwaSwgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtaXRlbXNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbXMuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBJdGVtc0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdHtcbiAgICBidXNpbmVzc05hbWU6IFN0cmluZ1tdO1xuICAgIGl0ZW1zOiBJdGVtW107XG5cbiAgICBwcml2YXRlIG1hcDogTWFwYm94Vmlld0FwaTtcbiAgICAvL21hcCBwYXJhbWV0ZXJzXG4gICAgYWNjZXNzX3Rva2VuOnN0cmluZz1cInBrLmV5SjFJam9pY21Gb2RXeDBlV0ZuYVdwcElpd2lZU0k2SW1OcVpHZDFaVGRvWmpCd2N6a3ljWEpzYzNNM05HdGhhWEFpZlEuOFl1RHFnN2lPOEhyQVFYRjl3MWpfd1wiXG4gICAgbWFwX3N0eWxlOnN0cmluZz1cInN0cmVldHNcIjtcbiAgICBsYXRpdHVkZTpzdHJpbmc9XCItMzcuODEzNlwiO1xuICAgIGxvbmdpdHVkZTpzdHJpbmc9XCIxNDQuOTYzMVwiO1xuICAgIHpvb21sZXZlbDpzdHJpbmc9XCIxNFwiO1xuICAgIC8vL1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXI6Um91dGVyLFxuICAgICAgICAgICAgICAgIHByaXZhdGUgcm91dGVyZXh0ZW5zaW9uOlJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtcyA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbXMoKTtcbiAgICB9XG5cbiAgICBvbk1hcFJlYWR5KGFyZ3MpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5tYXAgPSBhcmdzLm1hcDtcbiAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VycyhbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgICAgbGF0OiAtMzcuODEzNixcbiAgICAgICAgICAgICAgICBsbmc6IDE0NC45NjMxLFxuICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTEnLFxuICAgICAgICAgICAgICAgIC8vIHN1YnRpdGxlOiAnQ2hlY2sgb3V0IENhZmUxJyxcbiAgICAgICAgICAgICAgICBvbkNhbGxvdXRUYXA6ICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJDYWZlIDEgd2FzIHRhcHBlZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KFwiY2FmZTFcIilcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgIGxhdDogLTM3LjgxMTk4OSxcbiAgICAgICAgICAgICAgICBsbmc6IDE0NC45NjU4NDUsXG4gICAgICAgICAgICAgICAgdGl0bGU6ICdDYWZlMicsXG4gICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTEnLFxuICAgICAgICAgICAgICAgIG9uQ2FsbG91dFRhcDogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNhZmUgMiB3YXMgdGFwcGVkXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmp1bXB0b01lbnUoXCJjYWZlMlwiKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICAgICAgbGF0OiAtMzcuODExMDQwLFxuICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2NTgwMixcbiAgICAgICAgICAgICAgICB0aXRsZTogJ0NhZmUzJyxcbiAgICAgICAgICAgICAgICAvLyBzdWJ0aXRsZTogJ0NoZWNrIG91dCBDYWZlMycsXG4gICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQ2FmZSAzIHdhcyB0YXBwZWRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHRvTWVudShcImNhZmUzXCIpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBqdW1wdG9NZW51KGNhZmVJZCl7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0Li5cIixjYWZlSWQpXG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpPT57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm91dGVyZXh0ZW5zaW9uLm5hdmlnYXRlKFtcIml0ZW0vXCIsY2FmZUlkXSwgeyBjbGVhckhpc3Rvcnk6IHRydWUgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGNvbnNvbGUubG9nKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpPT57Y29uc29sZS5sb2coXCJlcnJvciBuYXZpZ2F0aW5nXCIsZXJyKX0pXG5cbiAgICAgICAgICAgICAgICB9LDEwMClcblxuXG4gICAgICAgICAgICB9XG59Il19