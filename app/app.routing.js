"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var items_component_1 = require("./item/items.component");
var cafe_component_1 = require("./item/cafe.component");
var register_component_1 = require("./auth/register/register.component");
var signin_component_1 = require("./auth/signin/signin.component");
var orderpop_component_1 = require("./ordermodal/orderpop.component");
var routes = [
    { path: "", redirectTo: "items", pathMatch: "full" },
    { path: "items", component: items_component_1.ItemsComponent },
    { path: "cafe/:cafeId", component: cafe_component_1.CafeComponent },
    { path: "register", component: register_component_1.RegisterComponent },
    { path: "signin", component: signin_component_1.SigninComponent },
    { path: "signin", component: orderpop_component_1.OrderpopComponent }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLnJvdXRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhcHAucm91dGluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUF5QztBQUN6QyxzREFBdUU7QUFHdkUsMERBQXdEO0FBQ3hELHdEQUFvRDtBQUNwRCx5RUFBcUU7QUFDckUsbUVBQStEO0FBQy9ELHNFQUFrRTtBQUVsRSxJQUFNLE1BQU0sR0FBVztJQUNuQixFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsVUFBVSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFO0lBQ3BELEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsZ0NBQWMsRUFBRTtJQUM1QyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsU0FBUyxFQUFDLDhCQUFhLEVBQUU7SUFDakQsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBQyxzQ0FBaUIsRUFBRTtJQUNqRCxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLGtDQUFlLEVBQUU7SUFDN0MsRUFBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBQyxzQ0FBaUIsRUFBQztDQUVoRCxDQUFDO0FBTUY7SUFBQTtJQUFnQyxDQUFDO0lBQXBCLGdCQUFnQjtRQUo1QixlQUFRLENBQUM7WUFDTixPQUFPLEVBQUUsQ0FBQyxpQ0FBd0IsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkQsT0FBTyxFQUFFLENBQUMsaUNBQXdCLENBQUM7U0FDdEMsQ0FBQztPQUNXLGdCQUFnQixDQUFJO0lBQUQsdUJBQUM7Q0FBQSxBQUFqQyxJQUFpQztBQUFwQiw0Q0FBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvcm91dGVyXCI7XG5pbXBvcnQgeyBSb3V0ZXMgfSBmcm9tIFwiQGFuZ3VsYXIvcm91dGVyXCI7XG5cbmltcG9ydCB7IEl0ZW1zQ29tcG9uZW50IH0gZnJvbSBcIi4vaXRlbS9pdGVtcy5jb21wb25lbnRcIjtcbmltcG9ydCB7Q2FmZUNvbXBvbmVudH0gZnJvbSBcIi4vaXRlbS9jYWZlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSZWdpc3RlckNvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7U2lnbmluQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL3NpZ25pbi9zaWduaW4uY29tcG9uZW50XCI7XG5pbXBvcnQge09yZGVycG9wQ29tcG9uZW50fSBmcm9tIFwiLi9vcmRlcm1vZGFsL29yZGVycG9wLmNvbXBvbmVudFwiO1xuXG5jb25zdCByb3V0ZXM6IFJvdXRlcyA9IFtcbiAgICB7IHBhdGg6IFwiXCIsIHJlZGlyZWN0VG86IFwiaXRlbXNcIiwgcGF0aE1hdGNoOiBcImZ1bGxcIiB9LFxuICAgIHsgcGF0aDogXCJpdGVtc1wiLCBjb21wb25lbnQ6IEl0ZW1zQ29tcG9uZW50IH0sXG4gICAgeyBwYXRoOiBcImNhZmUvOmNhZmVJZFwiLCBjb21wb25lbnQ6Q2FmZUNvbXBvbmVudCB9LFxuICAgIHsgcGF0aDogXCJyZWdpc3RlclwiLCBjb21wb25lbnQ6UmVnaXN0ZXJDb21wb25lbnQgfSxcbiAgICB7IHBhdGg6IFwic2lnbmluXCIsIGNvbXBvbmVudDpTaWduaW5Db21wb25lbnQgfSxcbiAgICB7cGF0aDogXCJzaWduaW5cIiwgY29tcG9uZW50Ok9yZGVycG9wQ29tcG9uZW50fVxuXG5dO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtOYXRpdmVTY3JpcHRSb3V0ZXJNb2R1bGUuZm9yUm9vdChyb3V0ZXMpXSxcbiAgICBleHBvcnRzOiBbTmF0aXZlU2NyaXB0Um91dGVyTW9kdWxlXVxufSlcbmV4cG9ydCBjbGFzcyBBcHBSb3V0aW5nTW9kdWxlIHsgfSJdfQ==