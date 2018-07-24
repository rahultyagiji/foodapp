import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import * as Toast from "nativescript-toast";
import * as EmailValidator from 'email-validator';


@Component({
    selector: "ns-signin",
    moduleId: module.id,
    templateUrl: "./signin.component.html",
})

export class SigninComponent implements OnInit {

    userId:{"username","password"}={"username":"","password":""};
    emailText:string="";
    resetClicked:boolean=false;


    constructor(private auth:AuthService) {

    }


    ngOnInit() {

    }

    onSignin(email,password){
        var status=false;
        var message="";
        var a = this.auth.signin(email.text,password.text);

        status = a.status;
        message = a.message;

        if(!status){
            Toast.makeText(message,'1500').show();
        }
    }

    onResetActivated(){
        console.log("not working....")
        this.resetClicked=true;
    }

    onForgotPassword(email){

    if(EmailValidator.validate(email.text)){

        var a = this.auth.resetPassword(this.emailText);
        if(a.status){
        Toast.makeText("An email has been sent to this account",'1500').show();}
        else{
            Toast.makeText(a.message,'1500').show();
        }
    }else{
        Toast.makeText("Please provide a valid email",'1500').show();
    }

    }

}