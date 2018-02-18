"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var menu_1 = require("../datatypes/menu");
var firebase = require("nativescript-plugin-firebase");
var Observable_1 = require("rxjs/Observable");
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
                    this.menu.push(new menu_1.Menu(data[item]));
                }
            }
        }
        return this.menu;
    };
    MenuService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBRWpELDBDQUF1QztBQUN2Qyx1REFBMEQ7QUFDMUQsOENBQTJDO0FBRzNDO0lBR0kscUJBQW9CLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBRjFCLFNBQUksR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO0lBSWpDLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsTUFBYTtRQUF0QixpQkFZQztRQVhHLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQUMsVUFBQyxRQUFhO1lBQ2hDLElBQU0sSUFBSSxHQUFHLFFBQVEsR0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFhO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDYixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7WUFDRixRQUFRLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQUksSUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBQ0Qsb0NBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVmLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7WUFFTCxHQUFHLENBQUMsQ0FBQyxJQUFNLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQWpDUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBSW1CLGFBQU07T0FIekIsV0FBVyxDQW1DdkI7SUFBRCxrQkFBQztDQUFBLEFBbkNELElBbUNDO0FBbkNZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQge01lbnV9IGZyb20gXCIuLi9kYXRhdHlwZXMvbWVudVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lbnVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIG1lbnUgPSBuZXcgQXJyYXk8TWVudT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTpOZ1pvbmUpe1xuXG4gICAgfVxuXG4gICAgbG9hZE1lbnUoY2FmZUlkOnN0cmluZyk6IE9ic2VydmFibGU8YW55PntcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gXCIvbWVudS9cIitjYWZlSWQ7XG4gICAgICAgICAgICBjb25zdCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy5oYW5kbGVTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgaGFuZGxlU25hcHNob3QoZGF0YSkge1xuICAgICAgICB0aGlzLm1lbnUgPSBbXTtcblxuICAgICAgICBpZihkYXRhKXtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUucHVzaChuZXcgTWVudShkYXRhW2l0ZW1dKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVudTtcbiAgICB9XG5cbn1cbiJdfQ==