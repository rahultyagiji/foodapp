"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var MenuService = /** @class */ (function () {
    function MenuService() {
        this.menu = new Array({ cafe: 1, item: 1, name: "Samosa", price: "$10" }, { cafe: 1, item: 2, name: "Shashi Paneer", price: "$20" });
    }
    MenuService.prototype.getMenuItems = function () {
        return this.menu;
    };
    MenuService = __decorate([
        core_1.Injectable()
    ], MenuService);
    return MenuService;
}());
exports.MenuService = MenuService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWVudS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTJDO0FBTTNDO0lBREE7UUFFWSxTQUFJLEdBQUcsSUFBSSxLQUFLLENBQ3BCLEVBQUUsSUFBSSxFQUFDLENBQUMsRUFBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUMvQyxFQUFFLElBQUksRUFBQyxDQUFDLEVBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJLEVBQUUsZUFBZSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FFMUQsQ0FBQztJQU9OLENBQUM7SUFMRyxrQ0FBWSxHQUFaO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDckIsQ0FBQztJQVRRLFdBQVc7UUFEdkIsaUJBQVUsRUFBRTtPQUNBLFdBQVcsQ0FZdkI7SUFBRCxrQkFBQztDQUFBLEFBWkQsSUFZQztBQVpZLGtDQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5cbmltcG9ydCB7IEl0ZW0gfSBmcm9tIFwiLi9pdGVtXCI7XG5pbXBvcnQge01lbnV9IGZyb20gXCIuL21lbnVcIjtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1lbnVTZXJ2aWNlIHtcbiAgICBwcml2YXRlIG1lbnUgPSBuZXcgQXJyYXk8TWVudT4oXG4gICAgICAgIHsgY2FmZToxLGl0ZW06MSwgbmFtZTogXCJTYW1vc2FcIiwgcHJpY2U6IFwiJDEwXCIgfSxcbiAgICAgICAgeyBjYWZlOjEsaXRlbTogMiwgbmFtZTogXCJTaGFzaGkgUGFuZWVyXCIsIHByaWNlOiBcIiQyMFwiIH0sXG5cbiAgICApO1xuXG4gICAgZ2V0TWVudUl0ZW1zKCk6IE1lbnVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lbnU7XG4gICAgfVxuXG5cbn1cbiJdfQ==