import {Component, OnInit} from "@angular/core";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";
import {NativeScriptUIDataFormModule} from "nativescript-pro-ui/dataform/angular";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';
import {AuthService} from "../../services/auth.service";

@Component({
    selector: "ns-signin",
    moduleId: module.id,
    templateUrl: "./signin.component.html",
})

export class SigninComponent implements OnInit {

    userId:{"username","password"}={"username":"","password":""};


    constructor(private auth:AuthService) {

    }


    ngOnInit() {

    }

    onSignin(){
        this.auth.signin(this.userId.username,this.userId.password);
    }


}