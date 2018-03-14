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
                    // firebase.getDownloadUrl({
                    //     // optional, can also be passed during init() as 'storageBucket' param so we can cache it
                    //     bucket: 'gs://dekyou-cafe.appspot.com',
                    //     // the full path of an existing file in your Firebase storage
                    //     remoteFullPath: 'cafe1/profile.png'
                    // }).then(
                    //     function (url) {
                    //         data[cafeId].imgSrc=url;
                    //         console.log(JSON.stringify(data[cafeId]))
                    //     },
                    //     function (error) {
                    //         console.log("Error::" + error);
                    //     }
                    // );
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyx1REFBMEQ7QUFDMUQsOENBQTJDO0FBSTNDO0lBRUkscUJBQW9CLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBSTFCLFVBQUssR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO0lBRmxDLENBQUM7SUFJRCxtQ0FBYSxHQUFiLFVBQWMsTUFBTTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCwwQkFBSSxHQUFKO1FBQUEsaUJBWUM7UUFYRyxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFDLFVBQUMsUUFBYTtZQUNoQyxJQUFNLElBQUksR0FBRyxjQUFjLENBQUM7WUFFNUIsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFhO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDYixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7WUFDRixRQUFRLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQUksSUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsb0NBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQztRQUNkLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7WUFFTCxHQUFHLENBQUMsQ0FBQyxJQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFOUIsNEJBQTRCO29CQUM1QixnR0FBZ0c7b0JBQ2hHLDhDQUE4QztvQkFDOUMsb0VBQW9FO29CQUNwRSwwQ0FBMEM7b0JBQzFDLFdBQVc7b0JBQ1gsdUJBQXVCO29CQUN2QixtQ0FBbUM7b0JBQ25DLG9EQUFvRDtvQkFDcEQsU0FBUztvQkFDVCx5QkFBeUI7b0JBQ3pCLDBDQUEwQztvQkFDMUMsUUFBUTtvQkFDUixLQUFLO29CQUVMLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksV0FBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTVDLENBQUM7WUFDTCxDQUFDO1FBQ0wsQ0FBQztRQUVMLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFBO0lBRWpCLENBQUM7SUF4RFEsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUdtQixhQUFNO09BRnpCLFdBQVcsQ0F5RHZCO0lBQUQsa0JBQUM7Q0FBQSxBQXpERCxJQXlEQztBQXpEWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgSXRlbSB9IGZyb20gXCIuLi9kYXRhdHlwZXMvaXRlbVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSXRlbVNlcnZpY2Uge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOk5nWm9uZSl7XG5cbiAgICB9XG5cbiAgICBwcml2YXRlIGl0ZW1zID0gbmV3IEFycmF5PEl0ZW0+KCk7XG5cbiAgICBnZXRTaW5nbGVJdGVtKGNhZmVJZCl7XG4gICAgICAgIHJldHVybiB0aGlzLml0ZW1zLmZpbHRlcihpdGVtID0+IGl0ZW0uY2FmZUlkID09IGNhZmVJZClbMF07XG4gICAgfVxuXG4gICAgbG9hZCgpIDogT2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBcImJ1c2luZXNzTmFtZVwiO1xuXG4gICAgICAgICAgICBjb25zdCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy5oYW5kbGVTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlU25hcHNob3QoZGF0YSl7XG4gICAgICAgIHRoaXMuaXRlbXM9W107XG4gICAgICAgIGlmKGRhdGEpe1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGNhZmVJZCBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoY2FmZUlkKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGZpcmViYXNlLmdldERvd25sb2FkVXJsKHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIG9wdGlvbmFsLCBjYW4gYWxzbyBiZSBwYXNzZWQgZHVyaW5nIGluaXQoKSBhcyAnc3RvcmFnZUJ1Y2tldCcgcGFyYW0gc28gd2UgY2FuIGNhY2hlIGl0XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBidWNrZXQ6ICdnczovL2Rla3lvdS1jYWZlLmFwcHNwb3QuY29tJyxcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIC8vIHRoZSBmdWxsIHBhdGggb2YgYW4gZXhpc3RpbmcgZmlsZSBpbiB5b3VyIEZpcmViYXNlIHN0b3JhZ2VcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIHJlbW90ZUZ1bGxQYXRoOiAnY2FmZTEvcHJvZmlsZS5wbmcnXG4gICAgICAgICAgICAgICAgICAgIC8vIH0pLnRoZW4oXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgZGF0YVtjYWZlSWRdLmltZ1NyYz11cmw7XG4gICAgICAgICAgICAgICAgICAgIC8vICAgICAgICAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YVtjYWZlSWRdKSlcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIC8vICAgICBmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgICAgICBjb25zb2xlLmxvZyhcIkVycm9yOjpcIiArIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gKTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2gobmV3IEl0ZW0oZGF0YVtjYWZlSWRdKSk7XG5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIHJldHVybiB0aGlzLml0ZW1zXG5cbiAgICB9XG59XG4iXX0=