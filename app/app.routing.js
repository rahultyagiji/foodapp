"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var items_component_1 = require("./item/items.component");
var cafe_component_1 = require("./item/cafe.component");
var register_component_1 = require("./auth/register/register.component");
var signin_component_1 = require("./auth/signin/signin.component");
var orderpop_component_1 = require("./ordermodal/orderpop.component");
var order_component_1 = require("./item/order.component");
var routes = [
    { path: "", redirectTo: "items", pathMatch: "full" },
    { path: "items", component: items_component_1.ItemsComponent },
    { path: "cafe/:cafeId", component: cafe_component_1.CafeComponent },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "signin", component: signin_component_1.SigninComponent },
    { path: "signin", component: orderpop_component_1.OrderpopComponent },
    { path: "order", component: order_component_1.OrderConfirmComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFHdkUsMERBQXdEO0FBQ3hELHdEQUFvRDtBQUNwRCx5RUFBcUU7QUFDckUsbUVBQStEO0FBQy9ELHNFQUFrRTtBQUNsRSwwREFBNkQ7QUFFN0QsSUFBTSxNQUFNLEdBQVc7SUFDbkIsRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRTtJQUNwRCxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLGdDQUFjLEVBQUU7SUFDNUMsRUFBRSxJQUFJLEVBQUUsY0FBYyxFQUFFLFNBQVMsRUFBQyw4QkFBYSxFQUFFO0lBQ2pELEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxTQUFTLEVBQUMsc0NBQWlCLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxrQ0FBZSxFQUFFO0lBQzdDLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUMsc0NBQWlCLEVBQUM7SUFDN0MsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBQyx1Q0FBcUIsRUFBQztDQUNsRCxDQUFDO0FBTUY7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEl0ZW1zQ29tcG9uZW50IH0gZnJvbSBcIi4vaXRlbS9pdGVtcy5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2FmZUNvbXBvbmVudH0gZnJvbSBcIi4vaXRlbS9jYWZlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSZWdpc3RlckNvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7U2lnbmluQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL3NpZ25pbi9zaWduaW4uY29tcG9uZW50XCI7XG5pbXBvcnQge09yZGVycG9wQ29tcG9uZW50fSBmcm9tIFwiLi9vcmRlcm1vZGFsL29yZGVycG9wLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPcmRlckNvbmZpcm1Db21wb25lbnR9IGZyb20gXCIuL2l0ZW0vb3JkZXIuY29tcG9uZW50XCI7XG5cbmNvbnN0IHJvdXRlczogUm91dGVzID0gW1xuICAgIHsgcGF0aDogXCJcIiwgcmVkaXJlY3RUbzogXCJpdGVtc1wiLCBwYXRoTWF0Y2g6IFwiZnVsbFwiIH0sXG4gICAgeyBwYXRoOiBcIml0ZW1zXCIsIGNvbXBvbmVudDogSXRlbXNDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwiY2FmZS86Y2FmZUlkXCIsIGNvbXBvbmVudDpDYWZlQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInJlZ2lzdGVyXCIsIGNvbXBvbmVudDpSZWdpc3RlckNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJzaWduaW5cIiwgY29tcG9uZW50OlNpZ25pbkNvbXBvbmVudCB9LFxuICAgIHtwYXRoOiBcInNpZ25pblwiLCBjb21wb25lbnQ6T3JkZXJwb3BDb21wb25lbnR9LFxuICAgIHtwYXRoOlwib3JkZXJcIiwgY29tcG9uZW50Ok9yZGVyQ29uZmlybUNvbXBvbmVudH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUgeyB9Il19