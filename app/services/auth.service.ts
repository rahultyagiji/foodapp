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


        return firebase.createUser({
                email: a,
                password: b
            })

    }

    updateUserInfo(name,key){

        const path='/userInfo/';
        return firebase.setValue(path,{"uid":key,"name":name});
    }


    sendVerificationEmail(){

     return firebase.sendEmailVerification();
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
