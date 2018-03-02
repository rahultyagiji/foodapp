"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var item_service_1 = require("./services/item.service");
var items_component_1 = require("./item/items.component");
var menu_service_1 = require("./services/menu.service");
var element_registry_1 = require("nativescript-angular/element-registry");
var order_service_1 = require("./services/order.service");
var cafe_component_1 = require("./item/cafe.component");
var optionspop_component_1 = require("./item/optionspop.component");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var angular_1 = require("nativescript-pro-ui/sidedrawer/angular");
var register_component_1 = require("./auth/register/register.component");
var auth_service_1 = require("./services/auth.service");
var angular_2 = require("nativescript-pro-ui/dataform/angular");
var forms_1 = require("nativescript-angular/forms");
var signin_component_1 = require("./auth/signin/signin.component");
element_registry_1.registerElement("Mapbox", function () { return require("nativescript-mapbox").MapboxView; });
element_registry_1.registerElement("FAB", function () { return require("nativescript-floatingactionbutton").Fab; });
//import {CartComponent} from "./cart/cart/cart.component";
// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";
// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";
var AppModule = /** @class */ (function () {
    /*
    Pass your application module to the bootstrapModule function located in main.ts to start your app
    */
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            bootstrap: [
                app_component_1.AppComponent
            ],
            entryComponents: [optionspop_component_1.OptionspopComponent],
            imports: [
                nativescript_module_1.NativeScriptModule,
                app_routing_1.AppRoutingModule,
                angular_1.NativeScriptUISideDrawerModule,
                angular_2.NativeScriptUIDataFormModule,
                forms_1.NativeScriptFormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                items_component_1.ItemsComponent,
                cafe_component_1.CafeComponent,
                optionspop_component_1.OptionspopComponent,
                register_component_1.RegisterComponent,
                signin_component_1.SigninComponent,
            ],
            providers: [
                item_service_1.ItemService,
                menu_service_1.MenuService,
                order_service_1.OrderService,
                modal_dialog_1.ModalDialogService,
                auth_service_1.AuthService
            ],
            schemas: [
                core_1.NO_ERRORS_SCHEMA
            ]
        })
        /*
        Pass your application module to the bootstrapModule function located in main.ts to start your app
        */
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFFL0Msd0RBQXNEO0FBQ3RELDBEQUF3RDtBQUN4RCx3REFBb0Q7QUFHcEQsMEVBQXdFO0FBQ3hFLDBEQUFzRDtBQUN0RCx3REFBb0Q7QUFDcEQsb0VBQWdFO0FBQ2hFLGtFQUFxRTtBQUNyRSxrRUFBd0Y7QUFDeEYseUVBQXFFO0FBQ3JFLHdEQUFvRDtBQUNwRCxnRUFBa0Y7QUFDbEYsb0RBQW1FO0FBQ25FLG1FQUErRDtBQUMvRCxrQ0FBZSxDQUFDLFFBQVEsRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsVUFBVSxFQUF6QyxDQUF5QyxDQUFDLENBQUM7QUFDM0Usa0NBQWUsQ0FBQyxLQUFLLEVBQUUsY0FBTSxPQUFBLE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDLEdBQUcsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDO0FBRy9FLDJEQUEyRDtBQUUzRCwyRUFBMkU7QUFDM0Usd0VBQXdFO0FBRXhFLDZFQUE2RTtBQUM3RSxzRUFBc0U7QUFvQ3RFO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQWxDckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxlQUFlLEVBQUMsQ0FBQywwQ0FBbUIsQ0FBQztZQUNyQyxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiw4QkFBZ0I7Z0JBQ2hCLHdDQUE4QjtnQkFDOUIsc0NBQTRCO2dCQUM1QiwrQkFBdUI7YUFDMUI7WUFDRCxZQUFZLEVBQUU7Z0JBQ1YsNEJBQVk7Z0JBQ1osZ0NBQWM7Z0JBQ2QsOEJBQWE7Z0JBQ2IsMENBQW1CO2dCQUNuQixzQ0FBaUI7Z0JBQ2pCLGtDQUFlO2FBQ2pCO1lBQ0YsU0FBUyxFQUFFO2dCQUNQLDBCQUFXO2dCQUNYLDBCQUFXO2dCQUNYLDRCQUFZO2dCQUNaLGlDQUFrQjtnQkFDbEIsMEJBQVc7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBJdGVtc0NvbXBvbmVudCB9IGZyb20gXCIuL2l0ZW0vaXRlbXMuY29tcG9uZW50XCI7XG5pbXBvcnQge01lbnVTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9tZW51LnNlcnZpY2VcIjtcblxuXG5pbXBvcnQgeyByZWdpc3RlckVsZW1lbnQgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvZWxlbWVudC1yZWdpc3RyeVwiO1xuaW1wb3J0IHtPcmRlclNlcnZpY2V9IGZyb20gXCIuL3NlcnZpY2VzL29yZGVyLnNlcnZpY2VcIjtcbmltcG9ydCB7Q2FmZUNvbXBvbmVudH0gZnJvbSBcIi4vaXRlbS9jYWZlLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPcHRpb25zcG9wQ29tcG9uZW50fSBmcm9tIFwiLi9pdGVtL29wdGlvbnNwb3AuY29tcG9uZW50XCI7XG5pbXBvcnQge01vZGFsRGlhbG9nU2VydmljZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL21vZGFsLWRpYWxvZ1wiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG5pbXBvcnQge1JlZ2lzdGVyQ29tcG9uZW50fSBmcm9tIFwiLi9hdXRoL3JlZ2lzdGVyL3JlZ2lzdGVyLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtBdXRoU2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvYXV0aC5zZXJ2aWNlXCI7XG5pbXBvcnQge05hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtcHJvLXVpL2RhdGFmb3JtL2FuZ3VsYXJcIjtcbmltcG9ydCB7TmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9mb3Jtc1wiO1xuaW1wb3J0IHtTaWduaW5Db21wb25lbnR9IGZyb20gXCIuL2F1dGgvc2lnbmluL3NpZ25pbi5jb21wb25lbnRcIjtcbnJlZ2lzdGVyRWxlbWVudChcIk1hcGJveFwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LW1hcGJveFwiKS5NYXBib3hWaWV3KTtcbnJlZ2lzdGVyRWxlbWVudChcIkZBQlwiLCAoKSA9PiByZXF1aXJlKFwibmF0aXZlc2NyaXB0LWZsb2F0aW5nYWN0aW9uYnV0dG9uXCIpLkZhYik7XG5cblxuLy9pbXBvcnQge0NhcnRDb21wb25lbnR9IGZyb20gXCIuL2NhcnQvY2FydC9jYXJ0LmNvbXBvbmVudFwiO1xuXG4vLyBVbmNvbW1lbnQgYW5kIGFkZCB0byBOZ01vZHVsZSBpbXBvcnRzIGlmIHlvdSBuZWVkIHRvIHVzZSB0d28td2F5IGJpbmRpbmdcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgIGlmIHlvdSBuZWVkIHRvIHVzZSB0aGUgSFRUUCB3cmFwcGVyXG4vLyBpbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6W09wdGlvbnNwb3BDb21wb25lbnRdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRVSVNpZGVEcmF3ZXJNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdFVJRGF0YUZvcm1Nb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50LFxuICAgICAgICBJdGVtc0NvbXBvbmVudCxcbiAgICAgICAgQ2FmZUNvbXBvbmVudCxcbiAgICAgICAgT3B0aW9uc3BvcENvbXBvbmVudCxcbiAgICAgICAgUmVnaXN0ZXJDb21wb25lbnQsXG4gICAgICAgIFNpZ25pbkNvbXBvbmVudCxcbiAgICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSXRlbVNlcnZpY2UsXG4gICAgICAgIE1lbnVTZXJ2aWNlLFxuICAgICAgICBPcmRlclNlcnZpY2UsXG4gICAgICAgIE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgQXV0aFNlcnZpY2VcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9XG4iXX0=