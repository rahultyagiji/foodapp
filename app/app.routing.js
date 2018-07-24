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
var manage_cards_component_1 = require("./manage-cards/manage-cards.component");
var routes = [
    { path: "", redirectTo: "items", pathMatch: "full" },
    { path: "items", component: items_component_1.ItemsComponent },
    { path: "items/:tabId", component: items_component_1.ItemsComponent },
    { path: "cafe/:cafeId", component: cafe_component_1.CafeComponent },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "signin", component: signin_component_1.SigninComponent },
    { path: "signin", component: orderpop_component_1.OrderpopComponent },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFHdkUsMERBQXdEO0FBQ3hELHdEQUFvRDtBQUNwRCx5RUFBcUU7QUFDckUsbUVBQStEO0FBQy9ELHNFQUFrRTtBQUNsRSwwREFBNkQ7QUFDN0QsZ0ZBQTJFO0FBRTNFLElBQU0sTUFBTSxHQUFXO0lBQ25CLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUU7SUFDcEQsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxnQ0FBYyxFQUFFO0lBQzVDLEVBQUUsSUFBSSxFQUFFLGNBQWMsRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUNuRCxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFDLDhCQUFhLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBQyxzQ0FBaUIsRUFBRTtJQUNqRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLGtDQUFlLEVBQUU7SUFDN0MsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxzQ0FBaUIsRUFBQztJQUM3QyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUUsU0FBUyxFQUFDLHVDQUFxQixFQUFDO0lBQy9DLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUMsNkNBQW9CLEVBQUM7Q0FDakQsQ0FBQztBQU1GO0lBQUE7SUFBZ0MsQ0FBQztJQUFwQixnQkFBZ0I7UUFKNUIsZUFBUSxDQUFDO1lBQ04sT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ25ELE9BQU8sRUFBRSxDQUFDLGlDQUF3QixDQUFDO1NBQ3RDLENBQUM7T0FDVyxnQkFBZ0IsQ0FBSTtJQUFELHVCQUFDO0NBQUEsQUFBakMsSUFBaUM7QUFBcEIsNENBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL3JvdXRlclwiO1xuaW1wb3J0IHsgUm91dGVzIH0gZnJvbSBcIkBhbmd1bGFyL3JvdXRlclwiO1xuXG5pbXBvcnQgeyBJdGVtc0NvbXBvbmVudCB9IGZyb20gXCIuL2l0ZW0vaXRlbXMuY29tcG9uZW50XCI7XG5pbXBvcnQge0NhZmVDb21wb25lbnR9IGZyb20gXCIuL2l0ZW0vY2FmZS5jb21wb25lbnRcIjtcbmltcG9ydCB7UmVnaXN0ZXJDb21wb25lbnR9IGZyb20gXCIuL2F1dGgvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge1NpZ25pbkNvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9zaWduaW4vc2lnbmluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPcmRlcnBvcENvbXBvbmVudH0gZnJvbSBcIi4vb3JkZXJtb2RhbC9vcmRlcnBvcC5jb21wb25lbnRcIjtcbmltcG9ydCB7T3JkZXJDb25maXJtQ29tcG9uZW50fSBmcm9tIFwiLi9pdGVtL29yZGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNYW5hZ2VDYXJkc0NvbXBvbmVudH0gZnJvbSBcIi4vbWFuYWdlLWNhcmRzL21hbmFnZS1jYXJkcy5jb21wb25lbnRcIjtcblxuY29uc3Qgcm91dGVzOiBSb3V0ZXMgPSBbXG4gICAgeyBwYXRoOiBcIlwiLCByZWRpcmVjdFRvOiBcIml0ZW1zXCIsIHBhdGhNYXRjaDogXCJmdWxsXCIgfSxcbiAgICB7IHBhdGg6IFwiaXRlbXNcIiwgY29tcG9uZW50OiBJdGVtc0NvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJpdGVtcy86dGFiSWRcIiwgY29tcG9uZW50OiBJdGVtc0NvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJjYWZlLzpjYWZlSWRcIiwgY29tcG9uZW50OkNhZmVDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwicmVnaXN0ZXJcIiwgY29tcG9uZW50OlJlZ2lzdGVyQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcInNpZ25pblwiLCBjb21wb25lbnQ6U2lnbmluQ29tcG9uZW50IH0sXG4gICAge3BhdGg6IFwic2lnbmluXCIsIGNvbXBvbmVudDpPcmRlcnBvcENvbXBvbmVudH0sXG4gICAge3BhdGg6XCJvcmRlclwiLCBjb21wb25lbnQ6T3JkZXJDb25maXJtQ29tcG9uZW50fSxcbiAgICB7cGF0aDpcImNhcmRzXCIsIGNvbXBvbmVudDpNYW5hZ2VDYXJkc0NvbXBvbmVudH1cbl07XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW05hdGl2ZVNjcmlwdFJvdXRlck1vZHVsZS5mb3JSb290KHJvdXRlcyldLFxuICAgIGV4cG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGVdXG59KVxuZXhwb3J0IGNsYXNzIEFwcFJvdXRpbmdNb2R1bGUgeyB9Il19