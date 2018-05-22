import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
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

    onRegister(email,password){
        this.auth.register(email.text,password.text);
    }


}