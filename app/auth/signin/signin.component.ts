import {Component, OnInit} from "@angular/core";
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

    onSignin(email,password){
        // this.auth.signin(this.userId.username,this.userId.password);
        console.log(email.text);
            this.auth.signin(email.text,password.text);
    }


}