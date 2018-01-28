"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var item_service_1 = require("./item.service");
var menu_service_1 = require("./menu.service");
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
        console.log("which menu item clicked", id);
        var toast = Toast.makeText("Samosa Ordered");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUdqRCwrQ0FBNkM7QUFFN0MsK0NBQTJDO0FBRTNDLDBDQUE0QztBQU81QztJQUlJLDZCQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLEtBQXFCO1FBRnJCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQzdCLENBQUM7SUFFTCxzQ0FBUSxHQUFSO1FBQ0ksSUFBTSxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDOUMsQ0FBQztJQUVELHVDQUFTLEdBQVQsVUFBVSxFQUFFO1FBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUMxQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDN0MsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFwQlEsbUJBQW1CO1FBTC9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtTQUM5QyxDQUFDO3lDQU0yQiwwQkFBVztZQUNYLDBCQUFXO1lBQ2pCLHVCQUFjO09BUHhCLG1CQUFtQixDQXNCL0I7SUFBRCwwQkFBQztDQUFBLEFBdEJELElBc0JDO0FBdEJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuaW1wb3J0IHsgSXRlbVNlcnZpY2UgfSBmcm9tIFwiLi9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7TWVudX0gZnJvbSBcIi4vbWVudVwiO1xuaW1wb3J0IHtNZW51U2VydmljZX0gZnJvbSBcIi4vbWVudS5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWRldGFpbHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbS1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIixcbn0pXG5leHBvcnQgY2xhc3MgSXRlbURldGFpbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gICAgaXRlbTogSXRlbTtcbiAgICBtZW51Ok1lbnVbXTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBwcml2YXRlIGl0ZW1TZXJ2aWNlOiBJdGVtU2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSBtZW51c2VydmljZTogTWVudVNlcnZpY2UsXG4gICAgICAgIHByaXZhdGUgcm91dGU6IEFjdGl2YXRlZFJvdXRlXG4gICAgKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICBjb25zdCBpZCA9ICt0aGlzLnJvdXRlLnNuYXBzaG90LnBhcmFtc1tcImlkXCJdO1xuICAgICAgICB0aGlzLml0ZW0gPSB0aGlzLml0ZW1TZXJ2aWNlLmdldEl0ZW0oaWQpO1xuICAgICAgICB0aGlzLm1lbnU9dGhpcy5tZW51c2VydmljZS5nZXRNZW51SXRlbXMoKTtcbiAgICB9XG5cbiAgICBvbnRhcE1lbnUoaWQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcIndoaWNoIG1lbnUgaXRlbSBjbGlja2VkXCIsIGlkKVxuICAgICAgICB2YXIgdG9hc3QgPSBUb2FzdC5tYWtlVGV4dChcIlNhbW9zYSBPcmRlcmVkXCIpO1xuICAgICAgICB0b2FzdC5zaG93KCk7XG4gICAgfVxuXG59XG4iXX0=