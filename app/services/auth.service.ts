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


    register(name,a, b) {
        var state;

        if (b.toString().length > 6) {

            firebase.createUser({
                email: a,
                password: b
            }).then((res) => {
                console.log(res);
                this.route.navigate(["signin"]);
                state = true;
                const path='/userInfo/';
                firebase.push(path,{'uid':res.key,'name':name})
                    .then(()=>{

                    });

                firebase.sendEmailVerification().then(
                    function (res) {
                    },
                    function (error) {
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

       return firebase.login(
            {
                type: firebase.LoginType.PASSWORD,
                passwordOptions: {
                    email: a,
                    password: b
                }
            }
        )
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

    return firebase.resetPassword({
                      email: email
                  });
    }
}
