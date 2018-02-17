import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./services/item.service";
import { ItemsComponent } from "./item/items.component";
import {MenuService} from "./services/menu.service";


import { registerElement } from "nativescript-angular/element-registry";
import {OrderService} from "./services/order.service";
import {CafeComponent} from "./item/cafe.component";
import {OptionspopComponent} from "./item/optionspop.component";
import {ModalDialogService} from "nativescript-angular/modal-dialog";
registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
registerElement("FAB", () => require("nativescript-floatingactionbutton").Fab);


//import {CartComponent} from "./cart/cart/cart.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpModule } from "nativescript-angular/http";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    entryComponents:[OptionspopComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        CafeComponent,
        OptionspopComponent
     ],
    providers: [
        ItemService,
        MenuService,
        OrderService,
        ModalDialogService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
