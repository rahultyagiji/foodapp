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
                    this.items.push(new item_1.Item(data[cafeId]));
                }
            }
        }
        return this.items;
    };
    ItemService.prototype.getCafeInfo = function (cafeId) {
        var _this = this;
        this.items.filter(function (x) {
            return (x.cafeId === cafeId);
        }).forEach(function (y) {
            _this.item = y;
        });
        return this.item;
    };
    ItemService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyx1REFBMEQ7QUFDMUQsOENBQTJDO0FBSTNDO0lBRUkscUJBQW9CLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBSTFCLFVBQUssR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO0lBRmxDLENBQUM7SUFLRCxtQ0FBYSxHQUFiLFVBQWMsTUFBTTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCwwQkFBSSxHQUFKO1FBQUEsaUJBWUM7UUFYRyxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFDLFVBQUMsUUFBYTtZQUNoQyxJQUFNLElBQUksR0FBRyxjQUFjLENBQUM7WUFFNUIsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFhO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDYixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7WUFDRixRQUFRLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQUksSUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsb0NBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQztRQUNkLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7WUFFTCxHQUFHLENBQUMsQ0FBQyxJQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUwsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7SUFFakIsQ0FBQztJQUVELGlDQUFXLEdBQVgsVUFBWSxNQUFNO1FBQWxCLGlCQVFDO1FBTkcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEtBQUssTUFBTSxDQUFDLENBQUM7UUFDakMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBQztZQUNULEtBQUksQ0FBQyxJQUFJLEdBQUMsQ0FBQyxDQUFDO1FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQWxEUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBR21CLGFBQU07T0FGekIsV0FBVyxDQW9EdkI7SUFBRCxrQkFBQztDQUFBLEFBcERELElBb0RDO0FBcERZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBJdGVtU2VydmljZSB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uZ1pvbmU6Tmdab25lKXtcblxuICAgIH1cblxuICAgIHByaXZhdGUgaXRlbXMgPSBuZXcgQXJyYXk8SXRlbT4oKTtcbiAgICBwcml2YXRlIGl0ZW06SXRlbTtcblxuICAgIGdldFNpbmdsZUl0ZW0oY2FmZUlkKXtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbXMuZmlsdGVyKGl0ZW0gPT4gaXRlbS5jYWZlSWQgPT0gY2FmZUlkKVswXTtcbiAgICB9XG5cbiAgICBsb2FkKCkgOiBPYnNlcnZhYmxlPGFueT57XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFwiYnVzaW5lc3NOYW1lXCI7XG5cbiAgICAgICAgICAgIGNvbnN0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLmhhbmRsZVNuYXBzaG90KHNuYXBzaG90LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIob25WYWx1ZUV2ZW50LCBgLyR7cGF0aH1gKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBoYW5kbGVTbmFwc2hvdChkYXRhKXtcbiAgICAgICAgdGhpcy5pdGVtcz1bXTtcbiAgICAgICAgaWYoZGF0YSl7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgY2FmZUlkIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShjYWZlSWQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChuZXcgSXRlbShkYXRhW2NhZmVJZF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgIHJldHVybiB0aGlzLml0ZW1zXG5cbiAgICB9XG5cbiAgICBnZXRDYWZlSW5mbyhjYWZlSWQpe1xuXG4gICAgICAgIHRoaXMuaXRlbXMuZmlsdGVyKCh4KT0+e1xuICAgICAgICAgICAgcmV0dXJuICh4LmNhZmVJZCA9PT0gY2FmZUlkKTtcbiAgICAgICAgfSkuZm9yRWFjaCgoeSk9PntcbiAgICAgICAgICAgIHRoaXMuaXRlbT15O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXRlbVxuICAgIH1cblxufVxuIl19