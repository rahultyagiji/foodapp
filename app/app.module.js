"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var nativescript_module_1 = require("nativescript-angular/nativescript.module");
var http_client_1 = require("nativescript-angular/http-client");
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
var register_component_1 = require("./auth/register/register.component");
var auth_service_1 = require("./services/auth.service");
var forms_1 = require("nativescript-angular/forms");
var signin_component_1 = require("./auth/signin/signin.component");
var orderpop_component_1 = require("./ordermodal/orderpop.component");
var angular_1 = require("nativescript-checkbox/angular");
var order_component_1 = require("./item/order.component");
var manage_cards_component_1 = require("./manage-cards/manage-cards.component");
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
                http_client_1.NativeScriptHttpClientModule,
                //NativeScriptUISideDrawerModule,
                forms_1.NativeScriptFormsModule,
                angular_1.TNSCheckBoxModule,
                shared_module_1.SharedModule
            ],
            declarations: [
                app_component_1.AppComponent,
                items_component_1.ItemsComponent,
                cafe_component_1.CafeComponent,
                optionspop_component_1.OptionspopComponent,
                register_component_1.RegisterComponent,
                signin_component_1.SigninComponent,
                orderpop_component_1.OrderpopComponent,
                order_component_1.OrderConfirmComponent,
                manage_cards_component_1.ManageCardsComponent
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFwcC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBMkQ7QUFDM0QsZ0ZBQThFO0FBQzlFLGdFQUFnRjtBQUNoRiw2Q0FBaUQ7QUFDakQsaURBQStDO0FBQy9DLHdEQUFzRDtBQUN0RCwwREFBd0Q7QUFDeEQsd0RBQW9EO0FBQ3BELGdFQUE0RDtBQUM1RCwwREFBc0Q7QUFDdEQsd0RBQW9EO0FBQ3BELG9FQUFnRTtBQUNoRSxrRUFBcUU7QUFFckUseUVBQXFFO0FBQ3JFLHdEQUFvRDtBQUNwRCxvREFBbUU7QUFDbkUsbUVBQStEO0FBQy9ELHNFQUFrRTtBQUNsRSx5REFBZ0U7QUFDaEUsMERBQTZEO0FBQzdELGdGQUEyRTtBQXlDM0U7SUFIQTs7TUFFRTtJQUNGO0lBQXlCLENBQUM7SUFBYixTQUFTO1FBdkNyQixlQUFRLENBQUM7WUFDTixTQUFTLEVBQUU7Z0JBQ1AsNEJBQVk7YUFDZjtZQUNELGVBQWUsRUFBQyxDQUFDLDBDQUFtQixDQUFDO1lBQ3JDLE9BQU8sRUFBRTtnQkFDTCx3Q0FBa0I7Z0JBQ2xCLDhCQUFnQjtnQkFDaEIsMENBQTRCO2dCQUM1QixpQ0FBaUM7Z0JBQ2pDLCtCQUF1QjtnQkFDdkIsMkJBQWlCO2dCQUNqQiw0QkFBWTthQUNmO1lBQ0QsWUFBWSxFQUFFO2dCQUNWLDRCQUFZO2dCQUNaLGdDQUFjO2dCQUNkLDhCQUFhO2dCQUNiLDBDQUFtQjtnQkFDbkIsc0NBQWlCO2dCQUNqQixrQ0FBZTtnQkFDZixzQ0FBaUI7Z0JBQ2pCLHVDQUFxQjtnQkFDckIsNkNBQW9CO2FBQ3ZCO1lBQ0QsU0FBUyxFQUFFO2dCQUNQLDBCQUFXO2dCQUNYLDBCQUFXO2dCQUNYLDRCQUFZO2dCQUNaLGlDQUFrQjtnQkFDbEIsMEJBQVc7YUFDZDtZQUNELE9BQU8sRUFBRTtnQkFDTCx1QkFBZ0I7YUFDbkI7U0FDSixDQUFDO1FBQ0Y7O1VBRUU7T0FDVyxTQUFTLENBQUk7SUFBRCxnQkFBQztDQUFBLEFBQTFCLElBQTBCO0FBQWIsOEJBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTk9fRVJST1JTX1NDSEVNQSB9IGZyb20gXCJAYW5ndWxhci9jb3JlXCI7XG5pbXBvcnQgeyBOYXRpdmVTY3JpcHRNb2R1bGUgfSBmcm9tIFwibmF0aXZlc2NyaXB0LWFuZ3VsYXIvbmF0aXZlc2NyaXB0Lm1vZHVsZVwiO1xuaW1wb3J0IHsgTmF0aXZlU2NyaXB0SHR0cENsaWVudE1vZHVsZSB9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9odHRwLWNsaWVudFwiO1xuaW1wb3J0IHsgQXBwUm91dGluZ01vZHVsZSB9IGZyb20gXCIuL2FwcC5yb3V0aW5nXCI7XG5pbXBvcnQgeyBBcHBDb21wb25lbnQgfSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBJdGVtU2VydmljZSB9IGZyb20gXCIuL3NlcnZpY2VzL2l0ZW0uc2VydmljZVwiO1xuaW1wb3J0IHsgSXRlbXNDb21wb25lbnQgfSBmcm9tIFwiLi9pdGVtL2l0ZW1zLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNZW51U2VydmljZX0gZnJvbSBcIi4vc2VydmljZXMvbWVudS5zZXJ2aWNlXCI7XG5pbXBvcnQge1NoYXJlZE1vZHVsZX0gZnJvbSAnLi9tb2R1bGVzL3NoYXJlZC9zaGFyZWQubW9kdWxlJztcbmltcG9ydCB7T3JkZXJTZXJ2aWNlfSBmcm9tIFwiLi9zZXJ2aWNlcy9vcmRlci5zZXJ2aWNlXCI7XG5pbXBvcnQge0NhZmVDb21wb25lbnR9IGZyb20gXCIuL2l0ZW0vY2FmZS5jb21wb25lbnRcIjtcbmltcG9ydCB7T3B0aW9uc3BvcENvbXBvbmVudH0gZnJvbSBcIi4vaXRlbS9vcHRpb25zcG9wLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtNb2RhbERpYWxvZ1NlcnZpY2V9IGZyb20gXCJuYXRpdmVzY3JpcHQtYW5ndWxhci9tb2RhbC1kaWFsb2dcIjtcblxuaW1wb3J0IHtSZWdpc3RlckNvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9yZWdpc3Rlci9yZWdpc3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7QXV0aFNlcnZpY2V9IGZyb20gXCIuL3NlcnZpY2VzL2F1dGguc2VydmljZVwiO1xuaW1wb3J0IHtOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZX0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1hbmd1bGFyL2Zvcm1zXCI7XG5pbXBvcnQge1NpZ25pbkNvbXBvbmVudH0gZnJvbSBcIi4vYXV0aC9zaWduaW4vc2lnbmluLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtPcmRlcnBvcENvbXBvbmVudH0gZnJvbSBcIi4vb3JkZXJtb2RhbC9vcmRlcnBvcC5jb21wb25lbnRcIjtcbmltcG9ydCB7VE5TQ2hlY2tCb3hNb2R1bGV9IGZyb20gXCJuYXRpdmVzY3JpcHQtY2hlY2tib3gvYW5ndWxhclwiO1xuaW1wb3J0IHtPcmRlckNvbmZpcm1Db21wb25lbnR9IGZyb20gXCIuL2l0ZW0vb3JkZXIuY29tcG9uZW50XCI7XG5pbXBvcnQge01hbmFnZUNhcmRzQ29tcG9uZW50fSBmcm9tIFwiLi9tYW5hZ2UtY2FyZHMvbWFuYWdlLWNhcmRzLmNvbXBvbmVudFwiO1xuXG5ATmdNb2R1bGUoe1xuICAgIGJvb3RzdHJhcDogW1xuICAgICAgICBBcHBDb21wb25lbnRcbiAgICBdLFxuICAgIGVudHJ5Q29tcG9uZW50czpbT3B0aW9uc3BvcENvbXBvbmVudF0sXG4gICAgaW1wb3J0czogW1xuICAgICAgICBOYXRpdmVTY3JpcHRNb2R1bGUsXG4gICAgICAgIEFwcFJvdXRpbmdNb2R1bGUsXG4gICAgICAgIE5hdGl2ZVNjcmlwdEh0dHBDbGllbnRNb2R1bGUsXG4gICAgICAgIC8vTmF0aXZlU2NyaXB0VUlTaWRlRHJhd2VyTW9kdWxlLFxuICAgICAgICBOYXRpdmVTY3JpcHRGb3Jtc01vZHVsZSxcbiAgICAgICAgVE5TQ2hlY2tCb3hNb2R1bGUsXG4gICAgICAgIFNoYXJlZE1vZHVsZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIEFwcENvbXBvbmVudCxcbiAgICAgICAgSXRlbXNDb21wb25lbnQsXG4gICAgICAgIENhZmVDb21wb25lbnQsXG4gICAgICAgIE9wdGlvbnNwb3BDb21wb25lbnQsXG4gICAgICAgIFJlZ2lzdGVyQ29tcG9uZW50LFxuICAgICAgICBTaWduaW5Db21wb25lbnQsXG4gICAgICAgIE9yZGVycG9wQ29tcG9uZW50LFxuICAgICAgICBPcmRlckNvbmZpcm1Db21wb25lbnQsXG4gICAgICAgIE1hbmFnZUNhcmRzQ29tcG9uZW50XG4gICAgXSxcbiAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgSXRlbVNlcnZpY2UsXG4gICAgICAgIE1lbnVTZXJ2aWNlLFxuICAgICAgICBPcmRlclNlcnZpY2UsXG4gICAgICAgIE1vZGFsRGlhbG9nU2VydmljZSxcbiAgICAgICAgQXV0aFNlcnZpY2VcbiAgICBdLFxuICAgIHNjaGVtYXM6IFtcbiAgICAgICAgTk9fRVJST1JTX1NDSEVNQVxuICAgIF1cbn0pXG4vKlxuUGFzcyB5b3VyIGFwcGxpY2F0aW9uIG1vZHVsZSB0byB0aGUgYm9vdHN0cmFwTW9kdWxlIGZ1bmN0aW9uIGxvY2F0ZWQgaW4gbWFpbi50cyB0byBzdGFydCB5b3VyIGFwcFxuKi9cbmV4cG9ydCBjbGFzcyBBcHBNb2R1bGUgeyB9Il19