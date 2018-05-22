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
    MenuService.prototype.fetchCafeInfo = function (cafeId) {
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
    MenuService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [core_1.NgZone])
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQWlEO0FBRWpELDBDQUF1QztBQUN2Qyx1REFBMEQ7QUFDMUQsOENBQTJDO0FBRzNDO0lBR0kscUJBQW9CLE9BQWM7UUFBZCxZQUFPLEdBQVAsT0FBTyxDQUFPO1FBRjFCLFNBQUksR0FBRyxJQUFJLEtBQUssRUFBUSxDQUFDO0lBSWpDLENBQUM7SUFFRCw4QkFBUSxHQUFSLFVBQVMsTUFBYTtRQUF0QixpQkFZQztRQVhHLE1BQU0sQ0FBQyxJQUFJLHVCQUFVLENBQUMsVUFBQyxRQUFhO1lBQ2hDLElBQU0sSUFBSSxHQUFHLFFBQVEsR0FBQyxNQUFNLENBQUM7WUFDN0IsSUFBTSxZQUFZLEdBQUcsVUFBQyxRQUFhO2dCQUMvQixLQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFDYixJQUFNLE9BQU8sR0FBRyxLQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDcEQsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDLENBQUM7WUFDRixRQUFRLENBQUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLE1BQUksSUFBTSxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUE7SUFFTixDQUFDO0lBQ0Qsb0NBQWMsR0FBZCxVQUFlLElBQUk7UUFDZixJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztRQUVmLEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxDQUFBLENBQUM7WUFFTCxHQUFHLENBQUMsQ0FBQyxJQUFNLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxXQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDekMsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQUdELG1DQUFhLEdBQWIsVUFBYyxNQUFNO1FBRWhCLElBQUksWUFBWSxHQUFHLFVBQVMsTUFBTTtZQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FDakIsWUFBWSxFQUNaLGVBQWUsRUFDZjtZQUNJLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEtBQUs7Z0JBQ3JDLEtBQUssRUFBRSxRQUFRLENBQUMsaUNBQWlDO2FBQ3BEO1lBQ0QsTUFBTSxFQUFFO2dCQUNKO29CQUNJLElBQUksRUFBRSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVE7b0JBQ3RDLEtBQUssRUFBRSxNQUFNO2lCQUNoQjthQUFDO1NBQ1QsQ0FBQyxDQUFBO0lBQ1YsQ0FBQztJQTFEUSxXQUFXO1FBRHZCLGlCQUFVLEVBQUU7eUNBSW1CLGFBQU07T0FIekIsV0FBVyxDQTREdkI7SUFBRCxrQkFBQztDQUFBLEFBNURELElBNERDO0FBNURZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3RhYmxlLCBOZ1pvbmV9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBJdGVtIH0gZnJvbSBcIi4uL2RhdGF0eXBlcy9pdGVtXCI7XG5pbXBvcnQge01lbnV9IGZyb20gXCIuLi9kYXRhdHlwZXMvbWVudVwiO1xuaW1wb3J0IGZpcmViYXNlID0gcmVxdWlyZShcIm5hdGl2ZXNjcmlwdC1wbHVnaW4tZmlyZWJhc2VcIik7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lbnVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIG1lbnUgPSBuZXcgQXJyYXk8TWVudT4oKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25nWm9uZTpOZ1pvbmUpe1xuXG4gICAgfVxuXG4gICAgbG9hZE1lbnUoY2FmZUlkOnN0cmluZyk6IE9ic2VydmFibGU8YW55PntcbiAgICAgICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogYW55KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwYXRoID0gXCIvbWVudS9cIitjYWZlSWQ7XG4gICAgICAgICAgICBjb25zdCBvblZhbHVlRXZlbnQgPSAoc25hcHNob3Q6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuX25nWm9uZS5ydW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByZXN1bHRzID0gdGhpcy5oYW5kbGVTbmFwc2hvdChzbmFwc2hvdC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmVyLm5leHQocmVzdWx0cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZmlyZWJhc2UuYWRkVmFsdWVFdmVudExpc3RlbmVyKG9uVmFsdWVFdmVudCwgYC8ke3BhdGh9YCk7XG4gICAgICAgIH0pXG5cbiAgICB9XG4gICAgaGFuZGxlU25hcHNob3QoZGF0YSkge1xuICAgICAgICB0aGlzLm1lbnUgPSBbXTtcblxuICAgICAgICBpZihkYXRhKXtcblxuICAgICAgICAgICAgZm9yIChjb25zdCBpdGVtIGluIGRhdGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5oYXNPd25Qcm9wZXJ0eShpdGVtKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUucHVzaChuZXcgTWVudShkYXRhW2l0ZW1dKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMubWVudTtcbiAgICB9XG5cblxuICAgIGZldGNoQ2FmZUluZm8oY2FmZUlkKXtcblxuICAgICAgICB2YXIgb25RdWVyeUV2ZW50ID0gZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoIXJlc3VsdC5lcnJvcikge1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBmaXJlYmFzZS5xdWVyeShcbiAgICAgICAgICAgIG9uUXVlcnlFdmVudCxcbiAgICAgICAgICAgIFwiL2J1c2luZXNzTmFtZVwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNpbmdsZUV2ZW50OiB0cnVlLFxuICAgICAgICAgICAgICAgIG9yZGVyQnk6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5DSElMRCxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6ICdjYWZlSWQnIC8vIG1hbmRhdG9yeSB3aGVuIHR5cGUgaXMgJ2NoaWxkJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmFuZ2VzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGZpcmViYXNlLlF1ZXJ5UmFuZ2VUeXBlLkVRVUFMX1RPLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGNhZmVJZFxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSlcbiAgICB9XG5cbn1cbiJdfQ==