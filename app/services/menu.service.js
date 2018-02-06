"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var firebase = require("nativescript-plugin-firebase");
var MenuService = /** @class */ (function () {
    function MenuService() {
        this.menu = new Array();
    }
    MenuService.prototype.getMenuItems = function (id) {
        var _this = this;
        var counter = 0;
        var base = "/businessName/cafe";
        base = base.concat(id.toString());
        base = base.concat("/menu/menuItem");
        console.log("in menu service " + base);
        this.menu.splice(this.menu.length);
        for (counter = 0; counter < 2; counter++) {
            var count = (counter + 1).toString();
            var cafeName = base.concat(count);
            console.log("menu is " + cafeName);
            var a = firebase.query(function () {
            }, cafeName, {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.KEY
                }
            }).then((function (res) {
                console.log("something should come here", JSON.stringify(res.value));
                var b = res.value;
                //console.log(JSON.stringify(b.menu));
                //console.log(JSON.stringify(b.menu.menuItem1.name));
                //var c = JSON.stringify(b.menu);
                //var d = b.menu;
                //console.log("length is " + res.value.menu.getChildrenCount());
                _this.menu.push(res.value);
                console.log("length is " + _this.menu.length);
            })).catch((function (res) {
                console.log("yahan kuch panga hai...", res);
            }));
            cafeName = "";
        }
        return this.menu;
    };
    MenuService = __decorate([
        core_1.Injectable()
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBSTNDLHVEQUEwRDtBQUcxRDtJQURBO1FBRVksU0FBSSxHQUFHLElBQUksS0FBSyxFQU12QixDQUFDO0lBK0NOLENBQUM7SUE3Q0csa0NBQVksR0FBWixVQUFhLEVBQUU7UUFBZixpQkEwQ0M7UUF6Q0csSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1FBQ2hCLElBQUksSUFBSSxHQUFHLG9CQUFvQixDQUFDO1FBQ2hDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUN2QyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRW5DLEdBQUcsQ0FBQyxDQUFDLE9BQU8sR0FBRyxDQUFDLEVBQUUsT0FBTyxHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLElBQUksS0FBSyxHQUFHLENBQUMsT0FBTyxHQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25DLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLENBQUM7WUFFbkMsSUFBSSxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FDbEI7WUFDQSxDQUFDLEVBQ0QsUUFBUSxFQUNSO2dCQUNJLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixPQUFPLEVBQUU7b0JBQ0wsSUFBSSxFQUFFLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHO2lCQUN0QzthQUNKLENBQ0osQ0FBQyxJQUFJLENBQ0YsQ0FBQyxVQUFBLEdBQUc7Z0JBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNyRSxJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO2dCQUNsQixzQ0FBc0M7Z0JBQ3RDLHFEQUFxRDtnQkFDckQsaUNBQWlDO2dCQUNqQyxpQkFBaUI7Z0JBQ2pCLGdFQUFnRTtnQkFDaEUsS0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksR0FBRyxLQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELENBQUMsQ0FBQyxDQUNMLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBQSxHQUFHO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXlCLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDL0MsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNILFFBQVEsR0FBRyxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFuRFEsV0FBVztRQUR2QixpQkFBVSxFQUFFO09BQ0EsV0FBVyxDQXNEdkI7SUFBRCxrQkFBQztDQUFBLEFBdERELElBc0RDO0FBdERZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi4vZGF0YXR5cGVzL2l0ZW1cIjtcbmltcG9ydCB7TWVudX0gZnJvbSBcIi4uL2RhdGF0eXBlcy9tZW51XCI7XG5pbXBvcnQgZmlyZWJhc2UgPSByZXF1aXJlKFwibmF0aXZlc2NyaXB0LXBsdWdpbi1maXJlYmFzZVwiKTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lbnVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIG1lbnUgPSBuZXcgQXJyYXk8TWVudT4oXG4gICAgICAgIC8veyBjYWZlOjEsaXRlbToxLCBuYW1lOiBcIlNhbW9zYVwiLCBwcmljZTogXCIkMTBcIn0sXG4gICAgICAgIC8veyBjYWZlOjEsaXRlbTogMiwgbmFtZTogXCJTaGFzaGkgUGFuZWVyXCIsIHByaWNlOiBcIiQyMFwifSxcbiAgICAgICAgLy97IGNhZmU6MSxpdGVtOiAzLCBuYW1lOiBcIkNoaWNrZW4ga2Ega3VjaFwiLCBwcmljZTogXCIkMTVcIn0sXG4gICAgICAgIC8veyBjYWZlOjEsaXRlbTogNCwgbmFtZTogXCJEb25rZXkgYmFsbHNcIiwgcHJpY2U6IFwiJDFcIn1cblxuICAgICk7XG5cbiAgICBnZXRNZW51SXRlbXMoaWQpOiBNZW51W10ge1xuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIHZhciBiYXNlID0gXCIvYnVzaW5lc3NOYW1lL2NhZmVcIjtcbiAgICAgICAgYmFzZSA9IGJhc2UuY29uY2F0KGlkLnRvU3RyaW5nKCkpO1xuICAgICAgICBiYXNlID0gYmFzZS5jb25jYXQoXCIvbWVudS9tZW51SXRlbVwiKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJpbiBtZW51IHNlcnZpY2UgXCIgKyBiYXNlKTtcbiAgICAgICAgdGhpcy5tZW51LnNwbGljZSh0aGlzLm1lbnUubGVuZ3RoKTtcblxuICAgICAgICBmb3IgKGNvdW50ZXIgPSAwOyBjb3VudGVyIDwgMjsgY291bnRlcisrKSB7XG4gICAgICAgICAgICB2YXIgY291bnQgPSAoY291bnRlcisxKS50b1N0cmluZygpO1xuICAgICAgICAgICAgdmFyIGNhZmVOYW1lID0gYmFzZS5jb25jYXQoY291bnQpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJtZW51IGlzIFwiICsgY2FmZU5hbWUpO1xuXG4gICAgICAgICAgICB2YXIgYSA9IGZpcmViYXNlLnF1ZXJ5KFxuICAgICAgICAgICAgICAgICgpPT4ge1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgY2FmZU5hbWUsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBzaW5nbGVFdmVudDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgb3JkZXJCeToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogZmlyZWJhc2UuUXVlcnlPcmRlckJ5VHlwZS5LRVlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICkudGhlbihcbiAgICAgICAgICAgICAgICAocmVzPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcInNvbWV0aGluZyBzaG91bGQgY29tZSBoZXJlXCIsIEpTT04uc3RyaW5naWZ5KHJlcy52YWx1ZSkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYiA9IHJlcy52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShiLm1lbnUpKTtcbiAgICAgICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShiLm1lbnUubWVudUl0ZW0xLm5hbWUpKTtcbiAgICAgICAgICAgICAgICAgICAgLy92YXIgYyA9IEpTT04uc3RyaW5naWZ5KGIubWVudSk7XG4gICAgICAgICAgICAgICAgICAgIC8vdmFyIGQgPSBiLm1lbnU7XG4gICAgICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coXCJsZW5ndGggaXMgXCIgKyByZXMudmFsdWUubWVudS5nZXRDaGlsZHJlbkNvdW50KCkpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lbnUucHVzaChyZXMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImxlbmd0aCBpcyBcIiArIHRoaXMubWVudS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApLmNhdGNoKChyZXM9PiB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ5YWhhbiBrdWNoIHBhbmdhIGhhaS4uLlwiLCByZXMpXG4gICAgICAgICAgICB9KSlcbiAgICAgICAgICAgIGNhZmVOYW1lID0gXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMubWVudTtcbiAgICB9XG5cblxufVxuIl19