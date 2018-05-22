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
    ItemService.prototype.fetchCafeInfo = function (cafeId) {
        var onQueryEvent = function (result) {
            if (!result.error) {
            }
        };
        return firebase.query(onQueryEvent, "/businessName", {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'cafeId' // mandatory when type is 'child'
            },
            ranges: [
                {
                    type: firebase.QueryRangeType.EQUAL_TO,
                    value: cafeId
                }
            ]
        });
    };
    ItemService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], ItemService);
    return ItemService;
}());
exports.ItemService = ItemService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF5QztBQUN6Qyx1REFBMEQ7QUFDMUQsOENBQTJDO0FBSTNDO0lBRUkscUJBQW9CLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBSTFCLFVBQUssR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO0lBRmxDLENBQUM7SUFJRCxtQ0FBYSxHQUFiLFVBQWMsTUFBTTtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7SUFFRCwwQkFBSSxHQUFKO1FBQUEsaUJBWUM7UUFYRyxNQUFNLENBQUMsSUFBSSx1QkFBVSxDQUFDLFVBQUMsUUFBYTtZQUNoQyxJQUFNLElBQUksR0FBRyxjQUFjLENBQUM7WUFFNUIsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFhO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDYixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7WUFDRixRQUFRLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQUksSUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsb0NBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFDLEVBQUUsQ0FBQztRQUNkLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7WUFFTCxHQUFHLENBQUMsQ0FBQyxJQUFNLE1BQU0sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDNUMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUwsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUE7SUFFakIsQ0FBQztJQUVELG1DQUFhLEdBQWIsVUFBYyxNQUFNO1FBRXBCLElBQUksWUFBWSxHQUFHLFVBQVMsTUFBTTtZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FDaEIsWUFBWSxFQUNoQixlQUFlLEVBQ25CO1lBQ0ksV0FBVyxFQUFFLElBQUk7WUFDakIsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxRQUFRLENBQUMsZ0JBQWdCLENBQUMsS0FBSztnQkFDckMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxpQ0FBaUM7YUFDNUM7WUFDVCxNQUFNLEVBQUU7Z0JBQ0o7b0JBQ0ksSUFBSSxFQUFFLFFBQVEsQ0FBQyxjQUFjLENBQUMsUUFBUTtvQkFDdEMsS0FBSyxFQUFFLE1BQU07aUJBQ2hCO2FBQUM7U0FDRCxDQUFDLENBQUE7SUFDVixDQUFDO0lBL0RZLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FHbUIsYUFBTTtPQUZ6QixXQUFXLENBaUV2QjtJQUFELGtCQUFDO0NBQUEsQUFqRUQsSUFpRUM7QUFqRVksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIE5nWm9uZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vZGF0YXR5cGVzL2l0ZW1cIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEl0ZW1TZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTpOZ1pvbmUpe1xuXG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpdGVtcyA9IG5ldyBBcnJheTxJdGVtPigpO1xuXG4gICAgZ2V0U2luZ2xlSXRlbShjYWZlSWQpe1xuICAgICAgICByZXR1cm4gdGhpcy5pdGVtcy5maWx0ZXIoaXRlbSA9PiBpdGVtLmNhZmVJZCA9PSBjYWZlSWQpWzBdO1xuICAgIH1cblxuICAgIGxvYWQoKSA6IE9ic2VydmFibGU8YW55PntcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gXCJidXNpbmVzc05hbWVcIjtcblxuICAgICAgICAgICAgY29uc3Qgb25WYWx1ZUV2ZW50ID0gKHNuYXBzaG90OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IHRoaXMuaGFuZGxlU25hcHNob3Qoc25hcHNob3QudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIGAvJHtwYXRofWApO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZVNuYXBzaG90KGRhdGEpe1xuICAgICAgICB0aGlzLml0ZW1zPVtdO1xuICAgICAgICBpZihkYXRhKXtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBjYWZlSWQgaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGNhZmVJZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKG5ldyBJdGVtKGRhdGFbY2FmZUlkXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuaXRlbXNcblxuICAgIH1cblxuICAgIGZldGNoQ2FmZUluZm8oY2FmZUlkKXtcblxuICAgIHZhciBvblF1ZXJ5RXZlbnQgPSBmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKCFyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgIHJldHVybiBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgb25RdWVyeUV2ZW50LFxuICAgIFwiL2J1c2luZXNzTmFtZVwiLFxue1xuICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgIG9yZGVyQnk6IHtcbiAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcbiAgICAgICAgdmFsdWU6ICdjYWZlSWQnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgfSxcbiAgICByYW5nZXM6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlSYW5nZVR5cGUuRVFVQUxfVE8sXG4gICAgICAgICAgICB2YWx1ZTogY2FmZUlkXG4gICAgICAgIH1dXG4gICAgICAgIH0pXG59XG5cbn1cbiJdfQ==