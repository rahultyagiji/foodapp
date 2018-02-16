"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var ItemService = /** @class */ (function () {
    function ItemService() {
        this.businessName = "";
        this.items = new Array();
    }
    ItemService.prototype.getItems = function () {
        var _this = this;
        firebase.query(function () {
        }, '/businessName', {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.KEY
            }
        }).then(function (res) {
            for (var uid in res.value) {
                console.log(uid);
                _this.items.push(res.value[uid]);
            }
        });
        return this.items;
    };
    ItemService.prototype.getSingleItem = function (cafeId) {
        return this.items.filter(function (item) { return item.cafeId == cafeId; })[0];
    };
    ItemService = __decorate([
        core_1.Injectable()
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLHVEQUEwRDtBQUkxRDtJQURBO1FBSVksaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsVUFBSyxHQUFHLElBQUksS0FBSyxFQUFRLENBQUM7SUErQnRDLENBQUM7SUE3QkcsOEJBQVEsR0FBUjtRQUFBLGlCQXNCQztRQXBCRyxRQUFRLENBQUMsS0FBSyxDQUNWO1FBQ0EsQ0FBQyxFQUNELGVBQWUsRUFDZjtZQUNJLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7YUFDdEM7U0FDSixDQUNKLENBQUMsSUFBSSxDQUNGLFVBQUMsR0FBRztZQUNBLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDbkMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO1FBRU4sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFdEIsQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBYyxNQUFNO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxFQUFyQixDQUFxQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQWpDUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7T0FDQSxXQUFXLENBb0N2QjtJQUFELGtCQUFDO0NBQUEsQUFwQ0QsSUFvQ0M7QUFwQ1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vZGF0YXR5cGVzL2l0ZW1cIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJdGVtU2VydmljZSB7XG5cblxuICAgIHByaXZhdGUgYnVzaW5lc3NOYW1lID0gXCJcIjtcblxuICAgIHByaXZhdGUgaXRlbXMgPSBuZXcgQXJyYXk8SXRlbT4oKTtcblxuICAgIGdldEl0ZW1zKCk6IEl0ZW1bXSB7XG5cbiAgICAgICAgZmlyZWJhc2UucXVlcnkoXG4gICAgICAgICAgICAoKT0+IHtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnL2J1c2luZXNzTmFtZScsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2luZ2xlRXZlbnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBmaXJlYmFzZS5RdWVyeU9yZGVyQnlUeXBlLktFWVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKS50aGVuKFxuICAgICAgICAgICAgKHJlcyk9PiB7XG4gICAgICAgICAgICAgICAgZm9yKGxldCB1aWQgaW4gcmVzLnZhbHVlKXtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codWlkKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKHJlcy52YWx1ZVt1aWRdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXM7XG5cbiAgICB9XG5cbiAgICBnZXRTaW5nbGVJdGVtKGNhZmVJZCl7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uY2FmZUlkID09IGNhZmVJZClbMF07XG4gICAgfVxuXG5cbn1cbiJdfQ==