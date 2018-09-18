import {Component, OnInit, ViewChild, ElementRef} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import * as Toast from "nativescript-toast";
import * as EmailValidator from 'email-validator';
import * as PasswordValidator from 'password-validator';
import {Router} from "@angular/router";
import {Color} from "tns-core-modules/color";
import {StackLayout} from "tns-core-modules/ui/layouts/stack-layout";
import {RouterExtensions} from "nativescript-angular";

@Component({
    selector: "ns-register",
    moduleId: module.id,
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit {

    @ViewChild('activityIndicator') activityIndicator: ElementRef;
    registrationAttempt:string="";
    userId:{"username","password"}={"username":"","password":""};
    emailField:string="";
    passwordField:string="";
    passwordField2:string="";
    processingRegistration:boolean=false;

    emailValid:boolean=true;
    passwordValid:boolean=true;
    password2Valid:boolean=true;

    registerButtonActive:boolean=false;


    constructor(private auth:AuthService,
                private route: Router,
                private routerextensions:RouterExtensions) {
    }


    ngOnInit() {

    }

    onRegister(name,email,password,args){

        /*console.log("values are: " + name.text + " " + email.text + " " + password.text);

        let page = <StackLayout>args.object;
        let view = <StackLayout>page.getViewById("register");
        view.backgroundColor = new Color("#f0f0f0");
        view.animate({ backgroundColor: new Color("white"), duration: 200 });
        view.animate({ backgroundColor: new Color("#0A4C58"), duration: 200 });*/
        let activityIndicator = this.activityIndicator.nativeElement;
        activityIndicator.busy = true;

        if(EmailValidator.validate(email.text)){
            this.emailValid=true;
            this.checkAllInput();
            if((this.passwordField==this.passwordField2)&&this.passwordValid) {
                if(this.registerButtonActive){
//
                    this.auth.register(email.text, password.text)
                        .then((res)=>{
                            //console.log ("registered key is " + res);
                            this.auth.sendVerificationEmail()
                                .then(()=>{
                                    console.log ("registered key is " + res.key);
                                    this.auth.insertUserInfo(res.key, name.text);
                                    //this.auth.updateUserInfo(res.key, name.text);
                                    this.routerextensions.navigate(["signin"],{clearHistory: true});
                                    activityIndicator.busy = false;
                                    Toast.makeText("An email has been sent for verification", '3500').show();
                                });

                            this.processingRegistration=true;
                            this.passwordValid = true;
                        })
                        .catch((err)=>{
                            activityIndicator.busy = false;
                            this.routerextensions.navigate(["register"],{clearHistory: true});
                            Toast.makeText("Oops there was some problem with registration", '1500').show();
                            this.processingRegistration=false;
                            this.passwordValid = false;
                            this.checkAllInput();
                        });
                }
            }
            else{
                activityIndicator.busy = false;
                this.checkAllInput();
                Toast.makeText("There are issues with the password", '1500').show()
            }

        }else{
            this.emailValid=false;
            activityIndicator.busy = false;
            this.checkAllInput();
            Toast.makeText("Oops, something is wrong with the email",'1500').show()
        }
    }

    onEmailTextChange(email){

        console.log("value of email is: " + email);

        this.emailField=email;
        if(!this.emailField){
            this.emailValid=true;
        }
        else{
            if(EmailValidator.validate(this.emailField)){
                this.emailValid=true;
                this.checkAllInput();
            }else{
                this.emailValid=false;
                this.checkAllInput();
                this.registerButtonActive=false;

            }
        }
    }

    onPasswordTextChange(password){
        this.passwordField=password;

        var schema = new PasswordValidator();
        schema
            .is().min(12)
            .is().max(100)
            .has().not().spaces();

        if(schema.validate(password)){
            this.passwordValid=true;
            this.checkAllInput();
        }
        else{
            this.passwordValid=false;
            this.registerButtonActive=false;
            this.checkAllInput();
        }
    }

    onPassword2TextChange(password){
        this.passwordField2=password;
        if(this.passwordField!=password){
            this.password2Valid=false;
            this.registerButtonActive=false;
            this.checkAllInput();
        }
        else {
            this.password2Valid=true;
            this.checkAllInput();

        }

    }

    checkAllInput() {
        if (this.emailValid &&
            (this.passwordValid&&this.passwordField) &&
            this.password2Valid&&this.passwordField2) {
            this.registerButtonActive=true;
        }
        else{
            this.registerButtonActive=false;
        }
    }

}