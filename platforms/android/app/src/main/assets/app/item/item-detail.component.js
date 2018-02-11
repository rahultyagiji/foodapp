"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var item_service_1 = require("../services/item.service");
var menu_service_1 = require("../services/menu.service");
var Toast = require("nativescript-toast");
var ItemDetailComponent = /** @class */ (function () {
    function ItemDetailComponent(itemService, menuservice, route) {
        this.itemService = itemService;
        this.menuservice = menuservice;
        this.route = route;
        this.menu = [];
    }
    ItemDetailComponent.prototype.ngOnInit = function () {
        var cafeId = this.route.snapshot.params["cafeId"];
        this.item = this.itemService.getItem(cafeId);
        this.menu = this.menuservice.getMenuItems(cafeId);
        console.log(JSON.stringify(this.menu));
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
            templateUrl: "./item-detail.component.html"
        }),
        __metadata("design:paramtypes", [item_service_1.ItemService,
            menu_service_1.MenuService,
            router_1.ActivatedRoute])
    ], ItemDetailComponent);
    return ItemDetailComponent;
}());
exports.ItemDetailComponent = ItemDetailComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUdqRCx5REFBdUQ7QUFFdkQseURBQXFEO0FBRXJELDBDQUE0QztBQU81QztJQUlJLDZCQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLEtBQXFCO1FBRnJCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWdCO1FBTGpDLFNBQUksR0FBUSxFQUFFLENBQUM7SUFPZixDQUFDO0lBRUQsc0NBQVEsR0FBUjtRQUVJLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJLEdBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFFRCx1Q0FBUyxHQUFULFVBQVUsRUFBRTtRQUVSLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtRQUNoQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUsR0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDakIsQ0FBQztJQTFCUSxtQkFBbUI7UUFML0IsZ0JBQVMsQ0FBQztZQUNQLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFFBQVEsRUFBRSxNQUFNLENBQUMsRUFBRTtZQUNuQixXQUFXLEVBQUUsOEJBQThCO1NBQzlDLENBQUM7eUNBTTJCLDBCQUFXO1lBQ1gsMEJBQVc7WUFDakIsdUJBQWM7T0FQeEIsbUJBQW1CLENBNEIvQjtJQUFELDBCQUFDO0NBQUEsQUE1QkQsSUE0QkM7QUE1Qlksa0RBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgQWN0aXZhdGVkUm91dGUgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vZGF0YXR5cGVzL2l0ZW1cIjtcbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4uL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHtNZW51fSBmcm9tIFwiLi4vZGF0YXR5cGVzL21lbnVcIjtcbmltcG9ydCB7TWVudVNlcnZpY2V9IGZyb20gXCIuLi9zZXJ2aWNlcy9tZW51LnNlcnZpY2VcIjtcblxuaW1wb3J0ICogYXMgVG9hc3QgZnJvbSAnbmF0aXZlc2NyaXB0LXRvYXN0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6IFwibnMtZGV0YWlsc1wiLFxuICAgIG1vZHVsZUlkOiBtb2R1bGUuaWQsXG4gICAgdGVtcGxhdGVVcmw6IFwiLi9pdGVtLWRldGFpbC5jb21wb25lbnQuaHRtbFwiXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1EZXRhaWxDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICAgIGl0ZW06IEl0ZW07XG4gICAgbWVudTpNZW51W109W107XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgcHJpdmF0ZSBpdGVtU2VydmljZTogSXRlbVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgbWVudXNlcnZpY2U6IE1lbnVTZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIHJvdXRlOiBBY3RpdmF0ZWRSb3V0ZVxuICAgICkge1xuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgICAgIGNvbnN0IGNhZmVJZCA9IHRoaXMucm91dGUuc25hcHNob3QucGFyYW1zW1wiY2FmZUlkXCJdO1xuXG4gICAgICAgIHRoaXMuaXRlbSA9IHRoaXMuaXRlbVNlcnZpY2UuZ2V0SXRlbShjYWZlSWQpO1xuICAgICAgICB0aGlzLm1lbnU9dGhpcy5tZW51c2VydmljZS5nZXRNZW51SXRlbXMoY2FmZUlkKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeSh0aGlzLm1lbnUpKVxuICAgIH1cblxuICAgIG9udGFwTWVudShpZCl7XG5cbiAgICAgICAgY29uc29sZS5sb2coXCJzb21ldGhpbmcgb3JkZXJlZFwiKVxuICAgICAgICB2YXIgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChpZCtcIiBvcmRlcmVkXCIpO1xuICAgICAgICB0b2FzdC5zaG93KCk7XG4gICAgfVxuXG59XG4iXX0=