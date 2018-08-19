"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var items_component_1 = require("./item/items.component");
var cafe_component_1 = require("./item/cafe.component");
var register_component_1 = require("./auth/register/register.component");
var signin_component_1 = require("./auth/signin/signin.component");
var order_component_1 = require("./item/order.component");
var manage_cards_component_1 = require("./manage-cards/manage-cards.component");
var routes = [
    { path: "", redirectTo: "items", pathMatch: "full" },
    { path: "items", component: items_component_1.ItemsComponent },
    { path: "items/:tabId", component: items_component_1.ItemsComponent },
    { path: "cafe/:cafeId", component: cafe_component_1.CafeComponent },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "signin", component: signin_component_1.SigninComponent },
    // {path: "signin", component:OrderpopComponent},
    { path: "order", component: order_component_1.OrderConfirmComponent },
    { path: "cards", component: manage_cards_component_1.ManageCardsComponent }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.NativeScriptRouterModule.forRoot(routes)],
            exports: [router_1.NativeScriptRouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFHdkUsMERBQXdEO0FBQ3hELHdEQUFvRDtBQUNwRCx5RUFBcUU7QUFDckUsbUVBQStEO0FBRS9ELDBEQUE2RDtBQUM3RCxnRkFBMkU7QUFFM0UsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQ25ELEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUMsOEJBQWEsRUFBRTtJQUNqRCxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFDLHNDQUFpQixFQUFFO0lBQ2pELEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsa0NBQWUsRUFBRTtJQUM3QyxpREFBaUQ7SUFDakQsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBQyx1Q0FBcUIsRUFBQztJQUMvQyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLDZDQUFvQixFQUFDO0NBQ2pELENBQUM7QUFNRjtJQUFBO0lBQWdDLENBQUM7SUFBcEIsZ0JBQWdCO1FBSjVCLGVBQVEsQ0FBQztZQUNOLE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuRCxPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQztTQUN0QyxDQUFDO09BQ1csZ0JBQWdCLENBQUk7SUFBRCx1QkFBQztDQUFBLEFBQWpDLElBQWlDO0FBQXBCLDRDQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSBcIkBhbmd1bGFyL2NvcmVcIjtcbmltcG9ydCB7IE5hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9yb3V0ZXJcIjtcbmltcG9ydCB7IFJvdXRlcyB9IGZyb20gXCJAYW5ndWxhci9yb3V0ZXJcIjtcblxuaW1wb3J0IHsgSXRlbXNDb21wb25lbnQgfSBmcm9tIFwiLi9pdGVtL2l0ZW1zLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtDYWZlQ29tcG9uZW50fSBmcm9tIFwiLi9pdGVtL2NhZmUuY29tcG9uZW50XCI7XG5pbXBvcnQge1JlZ2lzdGVyQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtTaWduaW5Db21wb25lbnR9IGZyb20gXCIuL2F1dGgvc2lnbmluL3NpZ25pbi5jb21wb25lbnRcIjtcbmltcG9ydCB7T3JkZXJwb3BDb21wb25lbnR9IGZyb20gXCIuL29yZGVybW9kYWwvb3JkZXJwb3AuY29tcG9uZW50XCI7XG5pbXBvcnQge09yZGVyQ29uZmlybUNvbXBvbmVudH0gZnJvbSBcIi4vaXRlbS9vcmRlci5jb21wb25lbnRcIjtcbmltcG9ydCB7TWFuYWdlQ2FyZHNDb21wb25lbnR9IGZyb20gXCIuL21hbmFnZS1jYXJkcy9tYW5hZ2UtY2FyZHMuY29tcG9uZW50XCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCJpdGVtc1wiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXG4gICAgeyBwYXRoOiBcIml0ZW1zXCIsIGNvbXBvbmVudDogSXRlbXNDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwiaXRlbXMvOnRhYklkXCIsIGNvbXBvbmVudDogSXRlbXNDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwiY2FmZS86Y2FmZUlkXCIsIGNvbXBvbmVudDpDYWZlQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInJlZ2lzdGVyXCIsIGNvbXBvbmVudDpSZWdpc3RlckNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJzaWduaW5cIiwgY29tcG9uZW50OlNpZ25pbkNvbXBvbmVudCB9LFxuICAgIC8vIHtwYXRoOiBcInNpZ25pblwiLCBjb21wb25lbnQ6T3JkZXJwb3BDb21wb25lbnR9LFxuICAgIHtwYXRoOlwib3JkZXJcIiwgY29tcG9uZW50Ok9yZGVyQ29uZmlybUNvbXBvbmVudH0sXG4gICAge3BhdGg6XCJjYXJkc1wiLCBjb21wb25lbnQ6TWFuYWdlQ2FyZHNDb21wb25lbnR9XG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==