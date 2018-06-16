import { Injectable } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import {Router} from "@angular/router";


@Injectable()
export class AuthService {

    constructor(private route:Router){

    }


    register(a,b) {
        firebase.createUser({
            email: a,
            password: b
        }).then((res) => {
            this.route.navigate([""])
            firebase.sendEmailVerification().then(
                function (res) {
                    console.log("Email verification sent",res);
                },
                function (error) {
                    console.log("Error sending email verification: " + error);
                }
            );
        })

    }

    signin(a,b){
        firebase.login(
            {type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: a,
                password: b
            }       }
        ).then((res)=>{
            console.log("done");
            this.route.navigate([""])})
    }

    signout(){

        firebase.logout();
    }

    authUid(){
        return firebase.getCurrentUser();
    }

}
