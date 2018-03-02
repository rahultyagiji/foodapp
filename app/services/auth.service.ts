import { Injectable } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");


@Injectable()
export class AuthService {


    register(a,b) {
        firebase.createUser({
            email: a,
            password: b
        }).then((res) => {
        })

    }

    signin(a,b){
        firebase.login(
            {type: firebase.LoginType.PASSWORD,
            passwordOptions: {
                email: a,
                password: b
            }       }
        ).then((res)=>{console.log(res.uid)})
    }

    signout(){

        firebase.logout();
    }


}
