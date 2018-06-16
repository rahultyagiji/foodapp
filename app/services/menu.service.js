"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var menu_1 = require("../datatypes/menu");
var firebase = require("nativescript-plugin-firebase");
var Observable_1 = require("rxjs/Observable");
var moment = require("moment");
var MenuService = /** @class */ (function () {
    function MenuService(_ngZone) {
        this._ngZone = _ngZone;
        this.menu = new Array();
    }
    MenuService.prototype.loadMenu = function (cafeId) {
        var _this = this;
        return new Observable_1.Observable(function (observer) {
            var path = "/menu/" + cafeId;
            var onValueEvent = function (snapshot) {
                _this._ngZone.run(function () {
                    var results = _this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, "/" + path);
        });
    };
    MenuService.prototype.handleSnapshot = function (data) {
        this.menu = [];
        if (data) {
            for (var item in data) {
                if (data.hasOwnProperty(item)) {
                    data[item].available = this.checkAvailability(data[item].available.timing.startTime, data[item].available.timing.endTime, data[item].available.inStock);
                    ;
                    this.menu.push(new menu_1.Menu(data[item]));
                }
            }
        }
        return this.menu;
    };
    MenuService.prototype.checkAvailability = function (startTime, endTime, inStock) {
        var st = moment(startTime, "HH:mm");
        var et = moment(endTime, "HH:mm");
        if (inStock == false) {
            return false;
        }
        else {
            if (moment(moment()).isBetween(st, et)) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    MenuService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBQ2pELDBDQUF1QztBQUN2Qyx1REFBMEQ7QUFDMUQsOENBQTJDO0FBQzNDLCtCQUFpQztBQUdqQztJQUdJLHFCQUFvQixPQUFjO1FBQWQsWUFBTyxHQUFQLE9BQU8sQ0FBTztRQUYxQixTQUFJLEdBQUcsSUFBSSxLQUFLLEVBQVEsQ0FBQztJQUlqQyxDQUFDO0lBRUQsOEJBQVEsR0FBUixVQUFTLE1BQU07UUFBZixpQkFZQztRQVhHLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQUMsVUFBQyxRQUFhO1lBQ2hDLElBQU0sSUFBSSxHQUFHLFFBQVEsR0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFhO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDYixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7WUFDRixRQUFRLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQUksSUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBQ0Qsb0NBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVmLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7WUFFTCxHQUFHLENBQUMsQ0FBQyxJQUFNLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsU0FBUyxFQUM3RSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFBQSxDQUFDO29CQUN2RSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBRUwsdUNBQWlCLEdBQWpCLFVBQWtCLFNBQVMsRUFBQyxPQUFPLEVBQUMsT0FBTztRQUV2QyxJQUFJLEVBQUUsR0FBQyxNQUFNLENBQUMsU0FBUyxFQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pDLElBQUksRUFBRSxHQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUMsT0FBTyxDQUFDLENBQUM7UUFJL0IsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFFLEtBQUssQ0FBQyxDQUFBLENBQUM7WUFDaEIsTUFBTSxDQUFDLEtBQUssQ0FBQTtRQUNoQixDQUFDO1FBQ0QsSUFBSSxDQUFBLENBQUM7WUFDRCxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUEsQ0FBQztnQkFDcEMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUFBLENBQUM7WUFDakIsSUFBSSxDQUFBLENBQUM7Z0JBQ0QsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUFBLENBQUM7UUFDdEIsQ0FBQztJQUNELENBQUM7SUFyRFEsV0FBVztRQUR2QixpQkFBVSxFQUFFO3lDQUltQixhQUFNO09BSHpCLFdBQVcsQ0F1RHZCO0lBQUQsa0JBQUM7Q0FBQSxBQXZERCxJQXVEQztBQXZEWSxrQ0FBVyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0YWJsZSwgTmdab25lfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHtNZW51fSBmcm9tIFwiLi4vZGF0YXR5cGVzL21lbnVcIjtcbmltcG9ydCBmaXJlYmFzZSA9IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtcGx1Z2luLWZpcmViYXNlXCIpO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tIFwicnhqcy9PYnNlcnZhYmxlXCI7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lbnVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIG1lbnUgPSBuZXcgQXJyYXk8TWVudT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTpOZ1pvbmUpe1xuXG4gICAgfVxuXG4gICAgbG9hZE1lbnUoY2FmZUlkKTogT2JzZXJ2YWJsZTxhbnk+e1xuICAgICAgICByZXR1cm4gbmV3IE9ic2VydmFibGUoKG9ic2VydmVyOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHBhdGggPSBcIi9tZW51L1wiK2NhZmVJZDtcbiAgICAgICAgICAgIGNvbnN0IG9uVmFsdWVFdmVudCA9IChzbmFwc2hvdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbmdab25lLnJ1bigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSB0aGlzLmhhbmRsZVNuYXBzaG90KHNuYXBzaG90LnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChyZXN1bHRzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmaXJlYmFzZS5hZGRWYWx1ZUV2ZW50TGlzdGVuZXIob25WYWx1ZUV2ZW50LCBgLyR7cGF0aH1gKTtcbiAgICAgICAgfSlcblxuICAgIH1cbiAgICBoYW5kbGVTbmFwc2hvdChkYXRhKSB7XG4gICAgICAgIHRoaXMubWVudSA9IFtdO1xuXG4gICAgICAgIGlmKGRhdGEpe1xuXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gaW4gZGF0YSkge1xuICAgICAgICAgICAgICAgIGlmIChkYXRhLmhhc093blByb3BlcnR5KGl0ZW0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaXRlbV0uYXZhaWxhYmxlPXRoaXMuY2hlY2tBdmFpbGFiaWxpdHkoZGF0YVtpdGVtXS5hdmFpbGFibGUudGltaW5nLnN0YXJ0VGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFbaXRlbV0uYXZhaWxhYmxlLnRpbWluZy5lbmRUaW1lLGRhdGFbaXRlbV0uYXZhaWxhYmxlLmluU3RvY2spOztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LnB1c2gobmV3IE1lbnUoZGF0YVtpdGVtXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lbnU7XG4gICAgfVxuXG5jaGVja0F2YWlsYWJpbGl0eShzdGFydFRpbWUsZW5kVGltZSxpblN0b2NrKXtcblxuICAgIHZhciBzdD1tb21lbnQoc3RhcnRUaW1lLFwiSEg6bW1cIik7XG4gICAgdmFyIGV0PW1vbWVudChlbmRUaW1lLFwiSEg6bW1cIik7XG5cblxuXG4gICAgaWYgKGluU3RvY2s9PWZhbHNlKXtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGVsc2V7XG4gICAgICAgIGlmIChtb21lbnQobW9tZW50KCkpLmlzQmV0d2VlbihzdCwgZXQpKXtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO31cbiAgICAgICAgZWxzZXtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTt9XG4gICAgfVxuICAgIH1cblxufVxuIl19