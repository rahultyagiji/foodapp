import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { ItemsComponent } from "./item/items.component";
import {CafeComponent} from "./cafe.component";

const routes: Routes = [
    { path: "", redirectTo: "items", pathMatch: "full" },
    { path: "items", component: ItemsComponent },
    { path: "cafe/:cafeid", component:CafeComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }