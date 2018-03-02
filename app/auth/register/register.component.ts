import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import { RadDataFormComponent } from "nativescript-pro-ui/dataform/angular";
import {NativeScriptUIDataFormModule} from "nativescript-pro-ui/dataform/angular";
import { NativeScriptFormsModule } from 'nativescript-angular/forms';

@Component({
    selector: "ns-register",
    moduleId: module.id,
    templateUrl: "./register.component.html",
})

export class RegisterComponent implements OnInit {

    userId:{"username","password"}={"username":"","password":""};


    constructor(private auth:AuthService) {

    }


    ngOnInit() {

    }

    onRegister(){
        console.log(this.userId.username)
        this.auth.register(this.userId.username,this.userId.password);

    }


}