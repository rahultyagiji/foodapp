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
    ItemService.prototype.getItem = function (cafeId) {
        return this.items.filter(function (item) { return item.cafeId == cafeId; })[0];
    };
    ItemService = __decorate([
        core_1.Injectable()
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBRTNDLHVEQUEwRDtBQUkxRDtJQURBO1FBSVksaUJBQVksR0FBRyxFQUFFLENBQUM7UUFFbEIsVUFBSyxHQUFHLElBQUksS0FBSyxFQUFRLENBQUM7SUErQnRDLENBQUM7SUE3QkcsOEJBQVEsR0FBUjtRQUFBLGlCQXNCQztRQXBCRyxRQUFRLENBQUMsS0FBSyxDQUNWO1FBQ0EsQ0FBQyxFQUNELGVBQWUsRUFDZjtZQUNJLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEdBQUc7YUFDdEM7U0FDSixDQUNKLENBQUMsSUFBSSxDQUNGLFVBQUMsR0FBRztZQUNBLEdBQUcsQ0FBQSxDQUFDLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQSxDQUFDO2dCQUN0QixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNqQixLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7WUFDbkMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO1FBRU4sTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7SUFFdEIsQ0FBQztJQUVELDZCQUFPLEdBQVAsVUFBUSxNQUFNO1FBRVYsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvRCxDQUFDO0lBbkNRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTtPQUNBLFdBQVcsQ0FvQ3ZCO0lBQUQsa0JBQUM7Q0FBQSxBQXBDRCxJQW9DQztBQXBDWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi9kYXRhdHlwZXMvaXRlbVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEl0ZW1TZXJ2aWNlIHtcblxuXG4gICAgcHJpdmF0ZSBidXNpbmVzc05hbWUgPSBcIlwiO1xuXG4gICAgcHJpdmF0ZSBpdGVtcyA9IG5ldyBBcnJheTxJdGVtPigpO1xuXG4gICAgZ2V0SXRlbXMoKTogSXRlbVtdIHtcblxuICAgICAgICBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgICgpPT4ge1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICcvYnVzaW5lc3NOYW1lJyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBvcmRlckJ5OiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5T3JkZXJCeVR5cGUuS0VZXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApLnRoZW4oXG4gICAgICAgICAgICAocmVzKT0+IHtcbiAgICAgICAgICAgICAgICBmb3IobGV0IHVpZCBpbiByZXMudmFsdWUpe1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh1aWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gocmVzLnZhbHVlW3VpZF0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcztcblxuICAgIH1cblxuICAgIGdldEl0ZW0oY2FmZUlkKTogSXRlbSB7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5jYWZlSWQgPT0gY2FmZUlkKVswXTtcblxuICAgIH1cbn1cbiJdfQ==