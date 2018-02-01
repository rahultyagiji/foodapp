"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var ItemService = /** @class */ (function () {
    function ItemService() {
        this.items = new Array({ id: 1, name: "Masala Curry Cafe", category: "Indian Cafe" }, { id: 2, name: "Mast Japani Cafe", category: "Japani Cafe" }, { id: 3, name: "Nyala", category: "Ethiopian Cafe" });
    }
    ItemService.prototype.getItems = function () {
        var a = firebase.query(function () { }, "/businessName/cafe", {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY
            }
        }).then((function (res) {
            console.log("something should come here", res);
        })).catch((function (res) {
            console.log("yahan kuch panga hai...", res);
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLHVEQUEwRDtBQUkxRDtJQURBO1FBRVksVUFBSyxHQUFHLElBQUksS0FBSyxDQUNyQixFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLG1CQUFtQixFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFDN0QsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxrQkFBa0IsRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQzVELEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxnQkFBZ0IsRUFBRSxDQUN2RCxDQUFDO0lBNEJOLENBQUM7SUExQkcsOEJBQVEsR0FBUjtRQUVJLElBQUksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQ2xCLGNBQUssQ0FBQyxFQUNOLG9CQUFvQixFQUNwQjtZQUNJLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE9BQU8sRUFBQztnQkFDSixJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7YUFDdEM7U0FDSixDQUVKLENBQUMsSUFBSSxDQUNGLENBQUMsVUFBQSxHQUFHO1lBRUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBQyxHQUFHLENBQUMsQ0FBQTtRQUNqRCxDQUFDLENBQUMsQ0FDTCxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQUEsR0FBRztZQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUMsR0FBRyxDQUFDLENBQUE7UUFBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBRWpELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFRCw2QkFBTyxHQUFQLFVBQVEsRUFBVTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFkLENBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFoQ1EsV0FBVztRQUR2QixpQkFBVSxFQUFFO09BQ0EsV0FBVyxDQWlDdkI7SUFBRCxrQkFBQztDQUFBLEFBakNELElBaUNDO0FBakNZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSXRlbVNlcnZpY2Uge1xuICAgIHByaXZhdGUgaXRlbXMgPSBuZXcgQXJyYXk8SXRlbT4oXG4gICAgICAgIHsgaWQ6IDEsIG5hbWU6IFwiTWFzYWxhIEN1cnJ5IENhZmVcIiwgY2F0ZWdvcnk6IFwiSW5kaWFuIENhZmVcIiB9LFxuICAgICAgICB7IGlkOiAyLCBuYW1lOiBcIk1hc3QgSmFwYW5pIENhZmVcIiwgY2F0ZWdvcnk6IFwiSmFwYW5pIENhZmVcIiB9LFxuICAgICAgICB7IGlkOiAzLCBuYW1lOiBcIk55YWxhXCIsIGNhdGVnb3J5OiBcIkV0aGlvcGlhbiBDYWZlXCIgfSxcbiAgICApO1xuXG4gICAgZ2V0SXRlbXMoKTogSXRlbVtdIHtcblxuICAgICAgICB2YXIgYSA9IGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgKCk9Pnt9LFxuICAgICAgICAgICAgXCIvYnVzaW5lc3NOYW1lL2NhZmVcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OntcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgKHJlcz0+e1xuXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJzb21ldGhpbmcgc2hvdWxkIGNvbWUgaGVyZVwiLHJlcylcbiAgICAgICAgICAgIH0pXG4gICAgICAgICkuY2F0Y2goKHJlcz0+e1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5YWhhbiBrdWNoIHBhbmdhIGhhaS4uLlwiLHJlcyl9KSlcblxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcbiAgICB9XG5cbiAgICBnZXRJdGVtKGlkOiBudW1iZXIpOiBJdGVtIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5pZCA9PT0gaWQpWzBdO1xuICAgIH1cbn1cbiJdfQ==