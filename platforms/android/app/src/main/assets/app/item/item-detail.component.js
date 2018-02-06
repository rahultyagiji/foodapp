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
    }
    ItemDetailComponent.prototype.ngOnInit = function () {
        var id = this.route.snapshot.params["id"];
        this.item = this.itemService.getItem(id);
        this.menu = this.menuservice.getMenuItems(id);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kZXRhaWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS1kZXRhaWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWtEO0FBQ2xELDBDQUFpRDtBQUdqRCx5REFBdUQ7QUFFdkQseURBQXFEO0FBRXJELDBDQUE0QztBQU81QztJQUlJLDZCQUNZLFdBQXdCLEVBQ3hCLFdBQXdCLEVBQ3hCLEtBQXFCO1FBRnJCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLGdCQUFXLEdBQVgsV0FBVyxDQUFhO1FBQ3hCLFVBQUssR0FBTCxLQUFLLENBQWdCO0lBQzdCLENBQUM7SUFFTCxzQ0FBUSxHQUFSO1FBQ0ksSUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLElBQUksR0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsdUNBQVMsR0FBVCxVQUFVLEVBQUU7UUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDaEMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEdBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUM7SUFwQlEsbUJBQW1CO1FBTC9CLGdCQUFTLENBQUM7WUFDUCxRQUFRLEVBQUUsWUFBWTtZQUN0QixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7WUFDbkIsV0FBVyxFQUFFLDhCQUE4QjtTQUM5QyxDQUFDO3lDQU0yQiwwQkFBVztZQUNYLDBCQUFXO1lBQ2pCLHVCQUFjO09BUHhCLG1CQUFtQixDQXNCL0I7SUFBRCwwQkFBQztDQUFBLEFBdEJELElBc0JDO0FBdEJZLGtEQUFtQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEFjdGl2YXRlZFJvdXRlIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuLi9zZXJ2aWNlcy9pdGVtLnNlcnZpY2VcIjtcbmltcG9ydCB7TWVudX0gZnJvbSBcIi4uL2RhdGF0eXBlcy9tZW51XCI7XG5pbXBvcnQge01lbnVTZXJ2aWNlfSBmcm9tIFwiLi4vc2VydmljZXMvbWVudS5zZXJ2aWNlXCI7XG5cbmltcG9ydCAqIGFzIFRvYXN0IGZyb20gJ25hdGl2ZXNjcmlwdC10b2FzdCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiBcIm5zLWRldGFpbHNcIixcbiAgICBtb2R1bGVJZDogbW9kdWxlLmlkLFxuICAgIHRlbXBsYXRlVXJsOiBcIi4vaXRlbS1kZXRhaWwuY29tcG9uZW50Lmh0bWxcIlxufSlcbmV4cG9ydCBjbGFzcyBJdGVtRGV0YWlsQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBpdGVtOiBJdGVtO1xuICAgIG1lbnU6TWVudVtdO1xuXG4gICAgY29uc3RydWN0b3IoXG4gICAgICAgIHByaXZhdGUgaXRlbVNlcnZpY2U6IEl0ZW1TZXJ2aWNlLFxuICAgICAgICBwcml2YXRlIG1lbnVzZXJ2aWNlOiBNZW51U2VydmljZSxcbiAgICAgICAgcHJpdmF0ZSByb3V0ZTogQWN0aXZhdGVkUm91dGVcbiAgICApIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IGlkID0gdGhpcy5yb3V0ZS5zbmFwc2hvdC5wYXJhbXNbXCJpZFwiXTtcbiAgICAgICAgdGhpcy5pdGVtID0gdGhpcy5pdGVtU2VydmljZS5nZXRJdGVtKGlkKTtcbiAgICAgICAgdGhpcy5tZW51PXRoaXMubWVudXNlcnZpY2UuZ2V0TWVudUl0ZW1zKGlkKTtcbiAgICB9XG5cbiAgICBvbnRhcE1lbnUoaWQpe1xuICAgICAgICBjb25zb2xlLmxvZyhcInNvbWV0aGluZyBvcmRlcmVkXCIpXG4gICAgICAgIHZhciB0b2FzdCA9IFRvYXN0Lm1ha2VUZXh0KGlkK1wiIG9yZGVyZWRcIik7XG4gICAgICAgIHRvYXN0LnNob3coKTtcbiAgICB9XG5cbn1cbiJdfQ==