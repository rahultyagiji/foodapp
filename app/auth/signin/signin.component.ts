import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import * as Toast from "nativescript-toast";
import * as EmailValidator from 'email-validator';
import {Router} from "@angular/router";
import {Color} from "tns-core-modules/color";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {RouterExtensions} from "nativescript-angular";


@Component({
    selector: "ns-signin",
    moduleId: module.id,
    templateUrl: "./signin.component.html",
})

export class SigninComponent implements OnInit {

    @ViewChild('activityIndicator') activityIndicator: ElementRef;
    userId:{"username","password"}={"username":"","password":""};
    emailText:string="";
    resetClicked:boolean=false;
    public isBusy:boolean = false;


    constructor(private auth:AuthService,
                private route: Router,
                private routerextensions:RouterExtensions) {

    }


    ngOnInit() {

    }

    onSigninAndroid(email,password,args){

        /*let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("signin");
        view.backgroundColor = new Color("#f0f0f0");
        view.animate({ backgroundColor: new Color("white"), duration: 100 });
        view.animate({ backgroundColor: new Color("#0A4C58"), duration: 100 });*/

        let activityIndicator = this.activityIndicator.nativeElement;
        activityIndicator.busy = true;

        this.auth.signin(email.text,password.text)
            .then((res)=>{
                activityIndicator.busy = false;
                this.routerextensions.navigate([""],{clearHistory: true});

            })
            .catch((error)=>{
                activityIndicator.busy = false;
                console.log("Login error " + error);
                Toast.makeText(error,'10000').show();
            });
    }

    onSigninIos(email,password,args){

        /*let page = <Button>args.object;
        let view = <Button>page.getViewById("signin");
        view.backgroundColor = new Color("#1a626f");
        view.animate({ backgroundColor: new Color("white"), duration: 600 });*/

        let activityIndicator = this.activityIndicator.nativeElement;
        activityIndicator.busy = true;

        this.auth.signin(email.text,password.text)
            .then((res)=>{
                activityIndicator.busy = false;
                this.routerextensions.navigate([""],{clearHistory: true});

            })
            .catch((error)=>{
                activityIndicator.busy = false;
                console.log("Login error " + error);
                Toast.makeText(error,'10000').show();
            });
    }

    onNavigateToRegister() {
        this.routerextensions.navigate(["register"], {clearHistory: true});
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