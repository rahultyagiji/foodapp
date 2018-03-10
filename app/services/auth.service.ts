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
        })

    }

    signin(a,b){
        firebase.login(
            {type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: a,
                password: b
            }       }
        ).then((res)=>{this.route.navigate([""])})
    }

    signout(){

        firebase.logout();
    }

    authUid(){
        return firebase.getCurrentUser();
    }

}
