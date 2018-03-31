import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";

import { ItemService } from "./services/item.service";
import { ItemsComponent } from "./item/items.component";
import {MenuService} from "./services/menu.service";
import { SharedModule } from './modules/shared/shared.module';


import { registerElement } from "nativescript-angular/element-registry";
import {OrderService} from "./services/order.service";
import {CafeComponent} from "./item/cafe.component";
import {OptionspopComponent} from "./item/optionspop.component";
import {ModalDialogService} from "nativescript-angular/modal-dialog";
//import { NativeScriptUISideDrawerModule } from "nativescript-pro-ui/sidedrawer/angular";
//import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/sidedrawer/angular";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthService} from "./services/auth.service";
import {NativeScriptUIDataFormModule} from "nativescript-pro-ui/dataform/angular";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {SigninComponent} from "./auth/signin/signin.component";
import {OrderpopComponent} from "./ordermodal/orderpop.component";
import {TNSCheckBoxModule} from "nativescript-checkbox/angular";
// registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);
// registerElement("FAB", () => require("nativescript-floatingactionbutton").Fab);

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
        AppRoutingModule,
        //NativeScriptUISideDrawerModule,
        NativeScriptUIDataFormModule,
        NativeScriptFormsModule,
        TNSCheckBoxModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
        ItemsComponent,
        CafeComponent,
        OptionspopComponent,
        RegisterComponent,
        SigninComponent,
        OrderpopComponent
     ],
    providers: [
        ItemService,
        MenuService,
        OrderService,
        ModalDialogService,
        AuthService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }
