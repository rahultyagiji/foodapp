"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var item_1 = require("../datatypes/item");
var firebase = require("nativescript-plugin-firebase");
var Observable_1 = require("rxjs/Observable");
var ItemService = /** @class */ (function () {
    function ItemService(_ngZone) {
        this._ngZone = _ngZone;
        this.items = new Array();
    }
    // getItems(): Item[] {
    //
    //     firebase.query(
    //         ()=> {
    //         },
    //         '/businessName',
    //         {
    //             singleEvent: true,
    //             orderBy: {
    //                 type: firebase.QueryOrderByType.KEY
    //             }
    //         }
    //     ).then(
    //         (res)=> {
    //             for(let uid in res.value){
    //                 this.items.push(res.value[uid])
    //             }
    //         })
    //
    //     return this.items;
    //
    // }
    ItemService.prototype.getSingleItem = function (cafeId) {
        return this.items.filter(function (item) { return item.cafeId == cafeId; })[0];
    };
    ItemService.prototype.load = function () {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var path = "businessName";
            var onValueEvent = function (snapshot) {
                _this._ngZone.run(function () {
                    var results = _this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        });
    };
    ItemService.prototype.handleSnapshot = function (data) {
        this.items = [];
        if (data) {
            for (var cafeId in data) {
                if (data.hasOwnProperty(cafeId)) {
                    this.items.push(new item_1.Item(data[cafeId]));
                }
            }
        }
        return this.items;
    };
    ItemService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyx1REFBMEQ7QUFDMUQsOENBQTJDO0FBSTNDO0lBRUkscUJBQW9CLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBSTFCLFVBQUssR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO0lBRmxDLENBQUM7SUFJRCx1QkFBdUI7SUFDdkIsRUFBRTtJQUNGLHNCQUFzQjtJQUN0QixpQkFBaUI7SUFDakIsYUFBYTtJQUNiLDJCQUEyQjtJQUMzQixZQUFZO0lBQ1osaUNBQWlDO0lBQ2pDLHlCQUF5QjtJQUN6QixzREFBc0Q7SUFDdEQsZ0JBQWdCO0lBQ2hCLFlBQVk7SUFDWixjQUFjO0lBQ2Qsb0JBQW9CO0lBQ3BCLHlDQUF5QztJQUN6QyxrREFBa0Q7SUFDbEQsZ0JBQWdCO0lBQ2hCLGFBQWE7SUFDYixFQUFFO0lBQ0YseUJBQXlCO0lBQ3pCLEVBQUU7SUFFRixJQUFJO0lBRUosbUNBQWEsR0FBYixVQUFjLE1BQU07UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxDQUFDO0lBRUQsMEJBQUksR0FBSjtRQUFBLGlCQVlDO1FBWEcsTUFBTSxDQUFDLElBQUksdUJBQVUsQ0FBQyxVQUFDLFFBQWE7WUFDaEMsSUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDO1lBRTVCLElBQU0sWUFBWSxHQUFHLFVBQUMsUUFBYTtnQkFDL0IsS0FBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7b0JBQ2IsSUFBTSxPQUFPLEdBQUcsS0FBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3BELFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxDQUFDO1lBQ1AsQ0FBQyxDQUFDO1lBQ0YsUUFBUSxDQUFDLHFCQUFxQixDQUFDLFlBQVksRUFBRSxNQUFJLElBQU0sQ0FBQyxDQUFDO1FBQzdELENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELG9DQUFjLEdBQWQsVUFBZSxJQUFJO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBQyxFQUFFLENBQUM7UUFDZCxFQUFFLENBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBQSxDQUFDO1lBRUwsR0FBRyxDQUFDLENBQUMsSUFBTSxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzVDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVMLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBRWpCLENBQUM7SUEvRFEsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUdtQixhQUFNO09BRnpCLFdBQVcsQ0FnRXZCO0lBQUQsa0JBQUM7Q0FBQSxBQWhFRCxJQWdFQztBQWhFWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi9kYXRhdHlwZXMvaXRlbVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOk5nWm9uZSl7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGl0ZW1zID0gbmV3IEFycmF5PEl0ZW0+KCk7XG5cbiAgICAvLyBnZXRJdGVtcygpOiBJdGVtW10ge1xuICAgIC8vXG4gICAgLy8gICAgIGZpcmViYXNlLnF1ZXJ5KFxuICAgIC8vICAgICAgICAgKCk9PiB7XG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vICAgICAgICAgJy9idXNpbmVzc05hbWUnLFxuICAgIC8vICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgIC8vICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVlcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgICkudGhlbihcbiAgICAvLyAgICAgICAgIChyZXMpPT4ge1xuICAgIC8vICAgICAgICAgICAgIGZvcihsZXQgdWlkIGluIHJlcy52YWx1ZSl7XG4gICAgLy8gICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChyZXMudmFsdWVbdWlkXSlcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9KVxuICAgIC8vXG4gICAgLy8gICAgIHJldHVybiB0aGlzLml0ZW1zO1xuICAgIC8vXG5cbiAgICAvLyB9XG5cbiAgICBnZXRTaW5nbGVJdGVtKGNhZmVJZCl7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uY2FmZUlkID09IGNhZmVJZClbMF07XG4gICAgfVxuXG4gICAgbG9hZCgpIDogT2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBcImJ1c2luZXNzTmFtZVwiO1xuXG4gICAgICAgICAgICBjb25zdCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy5oYW5kbGVTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlU25hcHNob3QoZGF0YSl7XG4gICAgICAgIHRoaXMuaXRlbXM9W107XG4gICAgICAgIGlmKGRhdGEpe1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhZmVJZCBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoY2FmZUlkKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IEl0ZW0oZGF0YVtjYWZlSWRdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5pdGVtc1xuXG4gICAgfVxufVxuIl19