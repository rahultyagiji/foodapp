import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import * as Toast from "nativescript-toast";
import * as EmailValidator from 'email-validator';
import {Router} from "@angular/router";


@Component({
    selector: "ns-signin",
    moduleId: module.id,
    templateUrl: "./signin.component.html",
})

export class SigninComponent implements OnInit {

    userId:{"username","password"}={"username":"","password":""};
    emailText:string="";
    resetClicked:boolean=false;
    signinProcessing:boolean=false;


    constructor(private auth:AuthService,
                private route: Router) {

    }


    ngOnInit() {

    }

    onSignin(email,password){


        this.auth.signin(email.text,password.text)
            .then((res)=>{
                this.route.navigate([""])
                this.signinProcessing=true;
            })
            .catch((error)=>{
                console.log(error)
                Toast.makeText(error,'1500').show();
                this.signinProcessing=false;
            });
    }

    onResetActivated(){
        this.resetClicked=true;
    }

    onForgotPassword(email){


    if(EmailValidator.validate(email.text)) {

        this.auth.resetPassword(email.text)
            .then((res)=>{
                Toast.makeText("An email has been sent to this account", '1500').show();
                setTimeout(()=>{this.route.navigate([""])},1500)
            })
            .catch((error)=>{
                Toast.makeText(error, '1500').show();
                setTimeout(()=>{this.route.navigate(["signin"])},1500)
            });
        }
    else{
        Toast.makeText("Please provide a valid email",'1500').show();
    }

    }

}