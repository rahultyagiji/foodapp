import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";
import { AppRoutingModule } from "./app.routing";
import { AppComponent } from "./app.component";
import { ItemService } from "./services/item.service";
import { ItemsComponent } from "./item/items.component";
import {MenuService} from "./services/menu.service";
import {SharedModule} from './modules/shared/shared.module';
import {OrderService} from "./services/order.service";
import {CafeComponent} from "./item/cafe.component";
import {OptionspopComponent} from "./item/optionspop.component";
import {ModalDialogService} from "nativescript-angular/modal-dialog";

import {RegisterComponent} from "./auth/register/register.component";
import {AuthService} from "./services/auth.service";
import {NativeScriptFormsModule} from "nativescript-angular/forms";
import {SigninComponent} from "./auth/signin/signin.component";
import {OrderpopComponent} from "./ordermodal/orderpop.component";
import {TNSCheckBoxModule} from "nativescript-checkbox/angular";
import {OrderConfirmComponent} from "./item/order.component";
import {ManageCardsComponent} from "./manage-cards/manage-cards.component";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    entryComponents:[OptionspopComponent],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        NativeScriptHttpClientModule,
        //NativeScriptUISideDrawerModule,
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
        OrderpopComponent,
        OrderConfirmComponent,
        ManageCardsComponent
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