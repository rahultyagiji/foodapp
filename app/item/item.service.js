"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemService = /** @class */ (function () {
    function ItemService() {
        this.items = new Array({ id: 1, name: "Masala Curry Cafe", category: "Indian Cafe" }, { id: 2, name: "Mast Japani Cafe", category: "Japani Cafe" }, { id: 3, name: "Nyala", category: "Ethiopian Cafe" });
    }
    ItemService.prototype.getItems = function () {
        return this.items;
    };
    ItemService.prototype.getItem = function (id) {
        return this.items.filter(function (item) { return item.id === id; })[0];
    };
    ItemService = __decorate([
        core_1.Injectable()
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBSzNDO0lBREE7UUFFWSxVQUFLLEdBQUcsSUFBSSxLQUFLLENBQ3JCLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsbUJBQW1CLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUM3RCxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFDNUQsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFFLENBQ3ZELENBQUM7SUFTTixDQUFDO0lBUEcsOEJBQVEsR0FBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsRUFBVTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFiUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7T0FDQSxXQUFXLENBY3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQWRELElBY0M7QUFkWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4vaXRlbVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSXRlbVNlcnZpY2Uge1xuICAgIHByaXZhdGUgaXRlbXMgPSBuZXcgQXJyYXk8SXRlbT4oXG4gICAgICAgIHsgaWQ6IDEsIG5hbWU6IFwiTWFzYWxhIEN1cnJ5IENhZmVcIiwgY2F0ZWdvcnk6IFwiSW5kaWFuIENhZmVcIiB9LFxuICAgICAgICB7IGlkOiAyLCBuYW1lOiBcIk1hc3QgSmFwYW5pIENhZmVcIiwgY2F0ZWdvcnk6IFwiSmFwYW5pIENhZmVcIiB9LFxuICAgICAgICB7IGlkOiAzLCBuYW1lOiBcIk55YWxhXCIsIGNhdGVnb3J5OiBcIkV0aGlvcGlhbiBDYWZlXCIgfSxcbiAgICApO1xuXG4gICAgZ2V0SXRlbXMoKTogSXRlbVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XG4gICAgfVxuXG4gICAgZ2V0SXRlbShpZDogbnVtYmVyKTogSXRlbSB7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uaWQgPT09IGlkKVswXTtcbiAgICB9XG59XG4iXX0=