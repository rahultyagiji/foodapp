import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import {CafeComponent} from "./item/cafe.component";
import {RegisterComponent} from "./auth/register/register.component";
import {SigninComponent} from "./auth/signin/signin.component";
import {OrderpopComponent} from "./ordermodal/orderpop.component";
import {OrderConfirmComponent} from "./item/order.component";
import {ManageCardsComponent} from "./manage-cards/manage-cards.component";

const routes: Routes = [
    { path: "", redirectTo: "items", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "cafe/:cafeId", component:CafeComponent },
    { path: "register", component:RegisterComponent },
    { path: "signin", component:SigninComponent },
    {path: "signin", component:OrderpopComponent},
    {path:"order", component:OrderConfirmComponent},
    {path:"cards", component:ManageCardsComponent}
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }