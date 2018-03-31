"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var app_routing_1 = require("./app.routing");
var app_component_1 = require("./app.component");
var item_service_1 = require("./services/item.service");
var items_component_1 = require("./item/items.component");
var menu_service_1 = require("./services/menu.service");
var shared_module_1 = require("./modules/shared/shared.module");
var order_service_1 = require("./services/order.service");
var cafe_component_1 = require("./item/cafe.component");
var optionspop_component_1 = require("./item/optionspop.component");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
//import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
//import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/sidedrawer/angular";
var register_component_1 = require("./auth/register/register.component");
var auth_service_1 = require("./services/auth.service");
var angular_1 = require("nativescript-pro-ui/dataform/angular");
var forms_1 = require("nativescript-angular/forms");
var signin_component_1 = require("./auth/signin/signin.component");
var orderpop_component_1 = require("./ordermodal/orderpop.component");
var angular_2 = require("nativescript-checkbox/angular");
// registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
// registerElement("FAB", () => require("nativescript-floatingactionbutton").Fab);
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
                //NativeScriptUISideDrawerModule,
                angular_1.NativeScriptUIDataFormModule,
                forms_1.NativeScriptFormsModule,
                angular_2.TNSCheckBoxModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                app_component_1.AppComponent,
                items_component_1.ItemsComponent,
                cafe_component_1.CafeComponent,
                optionspop_component_1.OptionspopComponent,
                register_component_1.RegisterComponent,
                signin_component_1.SigninComponent,
                orderpop_component_1.OrderpopComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLDZDQUFpRDtBQUNqRCxpREFBK0M7QUFFL0Msd0RBQXNEO0FBQ3RELDBEQUF3RDtBQUN4RCx3REFBb0Q7QUFDcEQsZ0VBQThEO0FBSTlELDBEQUFzRDtBQUN0RCx3REFBb0Q7QUFDcEQsb0VBQWdFO0FBQ2hFLGtFQUFxRTtBQUNyRSwwRkFBMEY7QUFDMUYsaUdBQWlHO0FBQ2pHLHlFQUFxRTtBQUNyRSx3REFBb0Q7QUFDcEQsZ0VBQWtGO0FBQ2xGLG9EQUFtRTtBQUNuRSxtRUFBK0Q7QUFDL0Qsc0VBQWtFO0FBQ2xFLHlEQUFnRTtBQUNoRSw4RUFBOEU7QUFDOUUsa0ZBQWtGO0FBRWxGLDJEQUEyRDtBQUUzRCwyRUFBMkU7QUFDM0Usd0VBQXdFO0FBRXhFLDZFQUE2RTtBQUM3RSxzRUFBc0U7QUF1Q3RFO0lBSEE7O01BRUU7SUFDRjtJQUF5QixDQUFDO0lBQWIsU0FBUztRQXJDckIsZUFBUSxDQUFDO1lBQ04sU0FBUyxFQUFFO2dCQUNQLDRCQUFZO2FBQ2Y7WUFDRCxlQUFlLEVBQUMsQ0FBQywwQ0FBbUIsQ0FBQztZQUNyQyxPQUFPLEVBQUU7Z0JBQ0wsd0NBQWtCO2dCQUNsQiw4QkFBZ0I7Z0JBQ2hCLGlDQUFpQztnQkFDakMsc0NBQTRCO2dCQUM1QiwrQkFBdUI7Z0JBQ3ZCLDJCQUFpQjtnQkFDakIsNEJBQVk7YUFDZjtZQUNELFlBQVksRUFBRTtnQkFDViw0QkFBWTtnQkFDWixnQ0FBYztnQkFDZCw4QkFBYTtnQkFDYiwwQ0FBbUI7Z0JBQ25CLHNDQUFpQjtnQkFDakIsa0NBQWU7Z0JBQ2Ysc0NBQWlCO2FBQ25CO1lBQ0YsU0FBUyxFQUFFO2dCQUNQLDBCQUFXO2dCQUNYLDBCQUFXO2dCQUNYLDRCQUFZO2dCQUNaLGlDQUFrQjtnQkFDbEIsMEJBQVc7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5cbmltcG9ydCB7IEl0ZW1TZXJ2aWNlIH0gZnJvbSBcIi4vc2VydmljZXMvaXRlbS5zZXJ2aWNlXCI7XG5pbXBvcnQgeyBJdGVtc0NvbXBvbmVudCB9IGZyb20gXCIuL2l0ZW0vaXRlbXMuY29tcG9uZW50XCI7XG5pbXBvcnQge01lbnVTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9tZW51LnNlcnZpY2VcIjtcbmltcG9ydCB7IFNoYXJlZE1vZHVsZSB9IGZyb20gJy4vbW9kdWxlcy9zaGFyZWQvc2hhcmVkLm1vZHVsZSc7XG5cblxuaW1wb3J0IHsgcmVnaXN0ZXJFbGVtZW50IH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2VsZW1lbnQtcmVnaXN0cnlcIjtcbmltcG9ydCB7T3JkZXJTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9vcmRlci5zZXJ2aWNlXCI7XG5pbXBvcnQge0NhZmVDb21wb25lbnR9IGZyb20gXCIuL2l0ZW0vY2FmZS5jb21wb25lbnRcIjtcbmltcG9ydCB7T3B0aW9uc3BvcENvbXBvbmVudH0gZnJvbSBcIi4vaXRlbS9vcHRpb25zcG9wLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNb2RhbERpYWxvZ1NlcnZpY2V9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcbi8vaW1wb3J0IHsgTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvc2lkZWRyYXdlci9hbmd1bGFyXCI7XG4vL2ltcG9ydCB7IE5hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtdWktc2lkZWRyYXdlci9zaWRlZHJhd2VyL2FuZ3VsYXJcIjtcbmltcG9ydCB7UmVnaXN0ZXJDb21wb25lbnR9IGZyb20gXCIuL2F1dGgvcmVnaXN0ZXIvcmVnaXN0ZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge0F1dGhTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9hdXRoLnNlcnZpY2VcIjtcbmltcG9ydCB7TmF0aXZlU2NyaXB0VUlEYXRhRm9ybU1vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvZGF0YWZvcm0vYW5ndWxhclwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1NpZ25pbkNvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9zaWduaW4vc2lnbmluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPcmRlcnBvcENvbXBvbmVudH0gZnJvbSBcIi4vb3JkZXJtb2RhbC9vcmRlcnBvcC5jb21wb25lbnRcIjtcbmltcG9ydCB7VE5TQ2hlY2tCb3hNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhclwiO1xuLy8gcmVnaXN0ZXJFbGVtZW50KFwiTWFwYm94XCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtbWFwYm94XCIpLk1hcGJveFZpZXcpO1xuLy8gcmVnaXN0ZXJFbGVtZW50KFwiRkFCXCIsICgpID0+IHJlcXVpcmUoXCJuYXRpdmVzY3JpcHQtZmxvYXRpbmdhY3Rpb25idXR0b25cIikuRmFiKTtcblxuLy9pbXBvcnQge0NhcnRDb21wb25lbnR9IGZyb20gXCIuL2NhcnQvY2FydC9jYXJ0LmNvbXBvbmVudFwiO1xuXG4vLyBVbmNvbW1lbnQgYW5kIGFkZCB0byBOZ01vZHVsZSBpbXBvcnRzIGlmIHlvdSBuZWVkIHRvIHVzZSB0d28td2F5IGJpbmRpbmdcbi8vIGltcG9ydCB7IE5hdGl2ZVNjcmlwdEZvcm1zTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5cbi8vIFVuY29tbWVudCBhbmQgYWRkIHRvIE5nTW9kdWxlIGltcG9ydHMgIGlmIHlvdSBuZWVkIHRvIHVzZSB0aGUgSFRUUCB3cmFwcGVyXG4vLyBpbXBvcnQgeyBOYXRpdmVTY3JpcHRIdHRwTW9kdWxlIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2h0dHBcIjtcblxuQE5nTW9kdWxlKHtcbiAgICBib290c3RyYXA6IFtcbiAgICAgICAgQXBwQ29tcG9uZW50XG4gICAgXSxcbiAgICBlbnRyeUNvbXBvbmVudHM6W09wdGlvbnNwb3BDb21wb25lbnRdLFxuICAgIGltcG9ydHM6IFtcbiAgICAgICAgTmF0aXZlU2NyaXB0TW9kdWxlLFxuICAgICAgICBBcHBSb3V0aW5nTW9kdWxlLFxuICAgICAgICAvL05hdGl2ZVNjcmlwdFVJU2lkZURyYXdlck1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0VUlEYXRhRm9ybU1vZHVsZSxcbiAgICAgICAgTmF0aXZlU2NyaXB0Rm9ybXNNb2R1bGUsXG4gICAgICAgIFROU0NoZWNrQm94TW9kdWxlLFxuICAgICAgICBTaGFyZWRNb2R1bGVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBBcHBDb21wb25lbnQsXG4gICAgICAgIEl0ZW1zQ29tcG9uZW50LFxuICAgICAgICBDYWZlQ29tcG9uZW50LFxuICAgICAgICBPcHRpb25zcG9wQ29tcG9uZW50LFxuICAgICAgICBSZWdpc3RlckNvbXBvbmVudCxcbiAgICAgICAgU2lnbmluQ29tcG9uZW50LFxuICAgICAgICBPcmRlcnBvcENvbXBvbmVudFxuICAgICBdLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBJdGVtU2VydmljZSxcbiAgICAgICAgTWVudVNlcnZpY2UsXG4gICAgICAgIE9yZGVyU2VydmljZSxcbiAgICAgICAgTW9kYWxEaWFsb2dTZXJ2aWNlLFxuICAgICAgICBBdXRoU2VydmljZVxuICAgIF0sXG4gICAgc2NoZW1hczogW1xuICAgICAgICBOT19FUlJPUlNfU0NIRU1BXG4gICAgXVxufSlcbi8qXG5QYXNzIHlvdXIgYXBwbGljYXRpb24gbW9kdWxlIHRvIHRoZSBib290c3RyYXBNb2R1bGUgZnVuY3Rpb24gbG9jYXRlZCBpbiBtYWluLnRzIHRvIHN0YXJ0IHlvdXIgYXBwXG4qL1xuZXhwb3J0IGNsYXNzIEFwcE1vZHVsZSB7IH1cbiJdfQ==