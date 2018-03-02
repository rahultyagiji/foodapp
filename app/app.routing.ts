import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import {CafeComponent} from "./item/cafe.component";
import {RegisterComponent} from "./auth/register/register.component";
import {SigninComponent} from "./auth/signin/signin.component";

const routes: Routes = [
    { path: "", redirectTo: "items", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "cafe/:cafeid", component:CafeComponent },
    { path: "register", component:RegisterComponent },
    { path: "signin", component:SigninComponent },

];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }