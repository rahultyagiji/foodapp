import { Injectable } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import {Router} from "@angular/router";
import {messageType} from "tns-core-modules/trace";
import error = messageType.error;


@Injectable()
export class AuthService {

    registrationReturnVal: string = "";

    constructor(private route: Router) {

    }


    register(a, b) {
        var state;
        console.log("password length is", b.toString().length);

        if (b.toString().length > 6) {

            firebase.createUser({
                email: a,
                password: b
            }).then((res) => {
                this.route.navigate([""]);
                state = true;
                firebase.sendEmailVerification().then(
                    function (res) {
                        console.log("Email verification sent", res);
                    },
                    function (error) {
                        console.log("Error sending email verification: " + error);
                    }
                );
                this.registrationReturnVal = "Welcome to DQ, an email has been sent for verification";
            }).catch((err) => {
                this.registrationReturnVal = "Please provide a valid email";
            })
        }
        else {
            this.registrationReturnVal = "Please choose a stronger password";
            state = false;
        }

        return {"status": state, "message": this.registrationReturnVal};

    }

    signin(a, b) {
        var message="";
        var status=false;
        firebase.login(
            {
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: a,
                    password: b
                }
            }
        )
            .then((res) => {
            console.log("done");
            this.route.navigate([""])
                status=true;
            message="Login successful"
        })
            .catch((err)=>{
                status=false;
                message=err;
            })
        return {"status":status,"message":message};
    }

    signout() {

        firebase.logout();
    }

    authUid() {
        return firebase.getCurrentUser();
    }


    resetPassword(email){
        var status=false;
        var message="";
    firebase.resetPassword({
                      email: email
                  }).
    then(
    function () {
        status=true;
        message="An email has been sent the account!"
        this.route.navigate([""])
    }
    ,
    function (errorMessage) {
        status=false;
        message=errorMessage;
    }
);
return {"status":status,"message":message}
    }
}
