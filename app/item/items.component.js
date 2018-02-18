"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_service_1 = require("../services/item.service");
var router_1 = require("@angular/router");
var nativescript_angular_1 = require("nativescript-angular");
var observable_array_1 = require("data/observable-array");
var ItemsComponent = /** @class */ (function () {
    ///
    function ItemsComponent(itemService, router, routerextensions) {
        this.itemService = itemService;
        this.router = router;
        this.routerextensions = routerextensions;
        this.items = [];
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
        });
    };
    //MapView
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
    //TabView controls
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
    ItemsComponent.prototype.onSubmit = function (args) {
        var searchBar = args.object;
        alert("You are searching for " + searchBar.text);
    };
    ItemsComponent.prototype.onTextChanged = function (args) {
        var searchBar = args.object;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9FO0FBRXBFLHlEQUF1RDtBQUN2RCwwQ0FBd0M7QUFFeEMsNkRBQXNEO0FBQ3RELDBEQUFzRDtBQVN0RDtJQWVJLEdBQUc7SUFFSCx3QkFBb0IsV0FBd0IsRUFDeEIsTUFBYSxFQUNiLGdCQUFpQztRQUZqQyxnQkFBVyxHQUFYLFdBQVcsQ0FBYTtRQUN4QixXQUFNLEdBQU4sTUFBTSxDQUFPO1FBQ2IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQWpCckQsVUFBSyxHQUFTLEVBQUUsQ0FBQztRQUNqQixXQUFNLEdBQXlCLElBQUksa0NBQWUsQ0FBTyxFQUFFLENBQUMsQ0FBQztRQU03RCxnQkFBZ0I7UUFDaEIsaUJBQVksR0FBUSxrR0FBa0csQ0FBQTtRQUN0SCxjQUFTLEdBQVEsU0FBUyxDQUFDO1FBQzNCLGFBQVEsR0FBUyxVQUFVLENBQUM7UUFDNUIsY0FBUyxHQUFRLFVBQVUsQ0FBQztRQUM1QixjQUFTLEdBQVEsSUFBSSxDQUFDO1FBTWxCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDOUIsQ0FBQztJQUVELGlDQUFRLEdBQVI7UUFBQSxpQkFTQztRQVJHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2FBQ2xCLFNBQVMsQ0FBQyxVQUFDLEtBQWtCO1lBQzFCLEtBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ3pDLEtBQUksQ0FBQyxLQUFLLEdBQUMsRUFBRSxDQUFDO1lBQ2QsS0FBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFDO2dCQUNsQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNOLENBQUMsQ0FBQyxDQUFDO0lBQ1gsQ0FBQztJQUVMLFNBQVM7SUFDTCxtQ0FBVSxHQUFWLFVBQVcsSUFBSTtRQUFmLGlCQXVDUztRQXRDTCxJQUFJLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFHaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUM7WUFDWjtnQkFDSSxFQUFFLEVBQUUsQ0FBQztnQkFDTCxHQUFHLEVBQUUsQ0FBQyxPQUFPO2dCQUNiLEdBQUcsRUFBRSxRQUFRO2dCQUNiLEtBQUssRUFBRSxPQUFPO2dCQUNkLCtCQUErQjtnQkFDL0IsWUFBWSxFQUFFO29CQUNWLEtBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7Z0JBQzVCLENBQUM7YUFDSjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxDQUFDO2dCQUNMLEdBQUcsRUFBRSxDQUFDLFNBQVM7Z0JBQ2YsR0FBRyxFQUFFLFVBQVU7Z0JBQ2YsS0FBSyxFQUFFLE9BQU87Z0JBQ2QsK0JBQStCO2dCQUMvQixZQUFZLEVBQUU7b0JBQ1YsS0FBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDNUIsQ0FBQzthQUNKO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLENBQUM7Z0JBQ0wsR0FBRyxFQUFFLENBQUMsU0FBUztnQkFDZixHQUFHLEVBQUUsVUFBVTtnQkFDZixLQUFLLEVBQUUsT0FBTztnQkFDZCwrQkFBK0I7Z0JBQy9CLFlBQVksRUFBRTtvQkFDVixLQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO2dCQUM1QixDQUFDO2FBQ0o7U0FDSixDQUNKLENBQUE7SUFHRCxDQUFDO0lBRWIseUJBQXlCO0lBQ2IsbUNBQVUsR0FBVixVQUFXLE1BQU07UUFBakIsaUJBVUM7UUFURSxVQUFVLENBQUM7WUFBTSxLQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUM1RDtnQkFDSSxRQUFRLEVBQUUsSUFBSTtnQkFDZCxVQUFVLEVBQUU7b0JBQ1IsSUFBSSxFQUFFLE9BQU87b0JBQ2IsUUFBUSxFQUFFLEdBQUc7b0JBQ2IsS0FBSyxFQUFFLE1BQU07aUJBQ2hCO2FBQ0osQ0FBQyxFQUFDLEdBQUcsQ0FBQTtRQUFBLENBQUMsQ0FBQyxDQUFDO0lBQ2pCLENBQUM7SUFFYixrQkFBa0I7SUFDZCxrQ0FBUyxHQUFUO1FBQ0ksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO1FBQzlCLENBQUM7SUFDTCxDQUFDO0lBRUwsYUFBYTtJQUNGLGlDQUFRLEdBQWYsVUFBZ0IsSUFBSTtRQUNoQixJQUFJLFNBQVMsR0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ3ZDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDckQsQ0FBQztJQUVNLHNDQUFhLEdBQXBCLFVBQXFCLElBQUk7UUFDckIsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUMzQyxDQUFDO0lBNUdRLGNBQWM7UUFMMUIsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsd0JBQXdCO1NBQ3hDLENBQUM7eUNBa0JtQywwQkFBVztZQUNqQixlQUFNO1lBQ0ksdUNBQWdCO09BbkI1QyxjQUFjLENBNkcxQjtJQUFELHFCQUFDO0NBQUEsQUE3R0QsSUE2R0M7QUE3R1ksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7IFJvdXRlcn0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgTWFwYm94Vmlld0FwaSwgVmlld3BvcnQgYXMgTWFwYm94Vmlld3BvcnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1hcGJveFwiO1xuaW1wb3J0IHtSb3V0ZXJFeHRlbnNpb25zfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXJcIjtcbmltcG9ydCB7T2JzZXJ2YWJsZUFycmF5fSBmcm9tIFwiZGF0YS9vYnNlcnZhYmxlLWFycmF5XCI7XG5pbXBvcnQgeyBTZWFyY2hCYXIgfSBmcm9tIFwidWkvc2VhcmNoLWJhclwiO1xuXG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWl0ZW1zXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW1zLmNvbXBvbmVudC5odG1sXCJcbn0pXG5leHBvcnQgY2xhc3MgSXRlbXNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXR7XG4gICAgYnVzaW5lc3NOYW1lOiBTdHJpbmdbXTtcbiAgICBpdGVtczogSXRlbVtdPVtdO1xuICAgIF9pdGVtczpPYnNlcnZhYmxlQXJyYXk8SXRlbT4gPSBuZXcgT2JzZXJ2YWJsZUFycmF5PEl0ZW0+KFtdKTtcbiAgICBwdWJsaWMgdGFiU2VsZWN0ZWRJbmRleDogbnVtYmVyO1xuICAgIHB1YmxpYyBzZWFyY2hQaHJhc2U6IHN0cmluZztcblxuXG4gICAgcHJpdmF0ZSBtYXA6IE1hcGJveFZpZXdBcGk7XG4gICAgLy9tYXAgcGFyYW1ldGVyc1xuICAgIGFjY2Vzc190b2tlbjpzdHJpbmc9XCJway5leUoxSWpvaWNtRm9kV3gwZVdGbmFXcHBJaXdpWVNJNkltTnFaR2QxWlRkb1pqQndjemt5Y1hKc2MzTTNOR3RoYVhBaWZRLjhZdURxZzdpTzhIckFRWEY5dzFqX3dcIlxuICAgIG1hcF9zdHlsZTpzdHJpbmc9XCJzdHJlZXRzXCI7XG4gICAgbGF0aXR1ZGU6c3RyaW5nID1cIi0zNy44MTM2XCI7XG4gICAgbG9uZ2l0dWRlOnN0cmluZz1cIjE0NC45NjMxXCI7XG4gICAgem9vbWxldmVsOnN0cmluZz1cIjE1XCI7XG4gICAgLy8vXG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSxcbiAgICAgICAgICAgICAgICBwcml2YXRlIHJvdXRlcjpSb3V0ZXIsXG4gICAgICAgICAgICAgICAgcHJpdmF0ZSByb3V0ZXJleHRlbnNpb25zOlJvdXRlckV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5pdGVtU2VydmljZS5sb2FkKClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKGl0ZW1zOiBBcnJheTxJdGVtPikgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX2l0ZW1zID0gbmV3IE9ic2VydmFibGVBcnJheShpdGVtcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcz1bXTtcbiAgICAgICAgICAgICAgICB0aGlzLl9pdGVtcy5mb3JFYWNoKCh4KT0+e1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goeCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuLy9NYXBWaWV3XG4gICAgb25NYXBSZWFkeShhcmdzKTogdm9pZCB7XG4gICAgICAgIHRoaXMubWFwID0gYXJncy5tYXA7XG5cblxuICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFya2VycyhbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODEzNixcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2MzEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ0NhZmUxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHN1YnRpdGxlOiAnQ2hlY2sgb3V0IENhZmUxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2FsbG91dFRhcDogKCk9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGF0OiAtMzcuODExOTg5LFxuICAgICAgICAgICAgICAgICAgICAgICAgbG5nOiAxNDQuOTY1ODQ1LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICdDYWZlMicsXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdWJ0aXRsZTogJ0NoZWNrIG91dCBDYWZlMScsXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNhbGxvdXRUYXA6ICgpPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuanVtcHRvTWVudSgnY2FmZTInKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogMyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogLTM3LjgxMTA0MCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuZzogMTQ0Ljk2NTgwMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlOiAnQ2FmZTMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3VidGl0bGU6ICdDaGVjayBvdXQgQ2FmZTMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgb25DYWxsb3V0VGFwOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5qdW1wdG9NZW51KCdjYWZlMycpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICApXG5cblxuICAgICAgICAgICAgfVxuXG4vL05hdml0YWdlIHRvIG5leHQgc2NyZWVuXG4gICAgICAgICAgICBqdW1wdG9NZW51KGNhZmVJZCkge1xuICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9Pnt0aGlzLnJvdXRlcmV4dGVuc2lvbnMubmF2aWdhdGUoW1wiL2NhZmVcIiwgY2FmZUlkXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5pbWF0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJzbGlkZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAyMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VydmU6IFwiZWFzZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pLDEwMH0pO1xuICAgICAgICAgICAgfVxuXG4vL1RhYlZpZXcgY29udHJvbHNcbiAgICBjaGFuZ2VUYWIoKSB7XG4gICAgICAgIGlmICh0aGlzLnRhYlNlbGVjdGVkSW5kZXggPT09IDApIHtcbiAgICAgICAgICAgIHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9IDE7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy50YWJTZWxlY3RlZEluZGV4ID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLnRhYlNlbGVjdGVkSW5kZXggPSAyO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMudGFiU2VsZWN0ZWRJbmRleCA9PT0gMikge1xuICAgICAgICAgICAgdGhpcy50YWJTZWxlY3RlZEluZGV4ID0gMDtcbiAgICAgICAgfVxuICAgIH1cblxuLy8gc2VhcmNoIGJhclxuICAgIHB1YmxpYyBvblN1Ym1pdChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgICAgICBhbGVydChcIllvdSBhcmUgc2VhcmNoaW5nIGZvciBcIiArIHNlYXJjaEJhci50ZXh0KTtcbiAgICB9XG5cbiAgICBwdWJsaWMgb25UZXh0Q2hhbmdlZChhcmdzKSB7XG4gICAgICAgIGxldCBzZWFyY2hCYXIgPSA8U2VhcmNoQmFyPmFyZ3Mub2JqZWN0O1xuICAgIH1cbn1cbiJdfQ==