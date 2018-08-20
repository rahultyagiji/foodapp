import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import * as Toast from "nativescript-toast";
import * as EmailValidator from 'email-validator';
import {Router} from "@angular/router";
import {Color} from "tns-core-modules/color";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";


@Component({
    selector: "ns-signin",
    moduleId: module.id,
    templateUrl: "./signin.component.html",
})

export class SigninComponent implements OnInit {

    userId:{"username","password"}={"username":"","password":""};
    emailText:string="";
    resetClicked:boolean=false;


    constructor(private auth:AuthService,
                private route: Router) {

    }


    ngOnInit() {

    }

    onSignin(email,password,args){

        let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("signin");
        view.backgroundColor = new Color("#f0f0f0");
        view.animate({ backgroundColor: new Color("white"), duration: 100 });
        view.animate({ backgroundColor: new Color("#0A4C58"), duration: 100 });


        this.auth.signin(email.text,password.text)
            .then((res)=>{
                this.route.navigate([""])

            })
            .catch((error)=>{
                console.log(error)
                Toast.makeText(error,'1500').show();
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