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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBRWpELDBDQUF1QztBQUN2Qyx1REFBMEQ7QUFDMUQsOENBQTJDO0FBRzNDO0lBR0kscUJBQW9CLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBRjFCLFNBQUksR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO0lBSWpDLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsTUFBTTtRQUFmLGlCQVlDO1FBWEcsTUFBTSxDQUFDLElBQUksdUJBQVUsQ0FBQyxVQUFDLFFBQWE7WUFDaEMsSUFBTSxJQUFJLEdBQUcsUUFBUSxHQUFDLE1BQU0sQ0FBQztZQUM3QixJQUFNLFlBQVksR0FBRyxVQUFDLFFBQWE7Z0JBQy9CLEtBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO29CQUNiLElBQU0sT0FBTyxHQUFHLEtBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNwRCxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQztZQUNQLENBQUMsQ0FBQztZQUNGLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUUsTUFBSSxJQUFNLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsQ0FBQTtJQUVOLENBQUM7SUFDRCxvQ0FBYyxHQUFkLFVBQWUsSUFBSTtRQUNmLElBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO1FBRWYsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLENBQUEsQ0FBQztZQUVMLEdBQUcsQ0FBQyxDQUFDLElBQU0sSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM1QixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLFdBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztJQUNyQixDQUFDO0lBakNRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTt5Q0FJbUIsYUFBTTtPQUh6QixXQUFXLENBa0N2QjtJQUFELGtCQUFDO0NBQUEsQUFsQ0QsSUFrQ0M7QUFsQ1ksa0NBQVciLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdGFibGUsIE5nWm9uZX0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vZGF0YXR5cGVzL2l0ZW1cIjtcbmltcG9ydCB7TWVudX0gZnJvbSBcIi4uL2RhdGF0eXBlcy9tZW51XCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTWVudVNlcnZpY2Uge1xuICAgIHByaXZhdGUgbWVudSA9IG5ldyBBcnJheTxNZW51PigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbmdab25lOk5nWm9uZSl7XG5cbiAgICB9XG5cbiAgICBsb2FkTWVudShjYWZlSWQpOiBPYnNlcnZhYmxlPGFueT57XG4gICAgICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IGFueSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcGF0aCA9IFwiL21lbnUvXCIrY2FmZUlkO1xuICAgICAgICAgICAgY29uc3Qgb25WYWx1ZUV2ZW50ID0gKHNuYXBzaG90OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLl9uZ1pvbmUucnVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IHRoaXMuaGFuZGxlU25hcHNob3Qoc25hcHNob3QudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBvYnNlcnZlci5uZXh0KHJlc3VsdHMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZpcmViYXNlLmFkZFZhbHVlRXZlbnRMaXN0ZW5lcihvblZhbHVlRXZlbnQsIGAvJHtwYXRofWApO1xuICAgICAgICB9KVxuXG4gICAgfVxuICAgIGhhbmRsZVNuYXBzaG90KGRhdGEpIHtcbiAgICAgICAgdGhpcy5tZW51ID0gW107XG5cbiAgICAgICAgaWYoZGF0YSl7XG5cbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBpbiBkYXRhKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaXRlbSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZW51LnB1c2gobmV3IE1lbnUoZGF0YVtpdGVtXSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLm1lbnU7XG4gICAgfVxufVxuIl19