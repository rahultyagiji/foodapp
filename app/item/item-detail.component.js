"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var item_service_1 = require("../Services/item.service");
var menu_service_1 = require("../Services/menu.service");
var Toast = require("nativescript-toast");
var ItemDetailComponent = /** @class */ (function () {
    function ItemDetailComponent(itemService, menuservice, route) {
        this.itemService = itemService;
        this.menuservice = menuservice;
        this.route = route;
    }
    ItemDetailComponent.prototype.ngOnInit = function () {
        var id = +this.route.snapshot.params["id"];
        this.item = this.itemService.getItem(id);
        this.menu = this.menuservice.getMenuItems();
    };
    ItemDetailComponent.prototype.ontapMenu = function (id) {
        console.log("something ordered");
        var toast = Toast.makeText(id + " ordered");
        toast.show();
    };
    ItemDetailComponent = __decorate([
        core_1.Component({
            selector: "ns-details",
            moduleId: module.id,
            templateUrl: "./item-detail.component.html",
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService,
            menu_service_1.MenuService,
            router_1.ActivatedRoute])
    ], ItemDetailComponent);
    return ItemDetailComponent;
}());
exports.ItemDetailComponent = ItemDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUdqRCx5REFBdUQ7QUFFdkQseURBQXFEO0FBRXJELDBDQUE0QztBQU81QztJQUlJLDZCQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLEtBQXFCO1FBRnJCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQzdCLENBQUM7SUFFTCxzQ0FBUSxHQUFSO1FBQ0ksSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELHVDQUFTLEdBQVQsVUFBVSxFQUFFO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO1FBQ2hDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxHQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQzFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDO0lBcEJRLG1CQUFtQjtRQUwvQixnQkFBUyxDQUFDO1lBQ1AsUUFBUSxFQUFFLFlBQVk7WUFDdEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxFQUFFO1lBQ25CLFdBQVcsRUFBRSw4QkFBOEI7U0FDOUMsQ0FBQzt5Q0FNMkIsMEJBQVc7WUFDWCwwQkFBVztZQUNqQix1QkFBYztPQVB4QixtQkFBbUIsQ0FzQi9CO0lBQUQsMEJBQUM7Q0FBQSxBQXRCRCxJQXNCQztBQXRCWSxrREFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBBY3RpdmF0ZWRSb3V0ZSB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi9kYXRhdHlwZXMvaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi4vU2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQge01lbnV9IGZyb20gXCIuLi9kYXRhdHlwZXMvbWVudVwiO1xuaW1wb3J0IHtNZW51U2VydmljZX0gZnJvbSBcIi4uL1NlcnZpY2VzL21lbnUuc2VydmljZVwiO1xuXG5pbXBvcnQgKiBhcyBUb2FzdCBmcm9tICduYXRpdmVzY3JpcHQtdG9hc3QnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJucy1kZXRhaWxzXCIsXG4gICAgbW9kdWxlSWQ6IG1vZHVsZS5pZCxcbiAgICB0ZW1wbGF0ZVVybDogXCIuL2l0ZW0tZGV0YWlsLmNvbXBvbmVudC5odG1sXCIsXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGl0ZW06IEl0ZW07XG4gICAgbWVudTpNZW51W107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbWVudXNlcnZpY2U6IE1lbnVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICAgICkgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgaWQgPSArdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcbiAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtKGlkKTtcbiAgICAgICAgdGhpcy5tZW51PXRoaXMubWVudXNlcnZpY2UuZ2V0TWVudUl0ZW1zKCk7XG4gICAgfVxuXG4gICAgb250YXBNZW51KGlkKXtcbiAgICAgICAgY29uc29sZS5sb2coXCJzb21ldGhpbmcgb3JkZXJlZFwiKVxuICAgICAgICB2YXIgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChpZCtcIiBvcmRlcmVkXCIpO1xuICAgICAgICB0b2FzdC5zaG93KCk7XG4gICAgfVxuXG59XG4iXX0=