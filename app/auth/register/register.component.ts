import {Component, OnInit} from "@angular/core";
import {AuthService} from "../../services/auth.service";
import * as Toast from "nativescript-toast";
import * as EmailValidator from 'email-validator';
import * as PasswordValidator from 'password-validator';

@Component({
    selector: "ns-register",
    moduleId: module.id,
    templateUrl: "./register.component.html",
    styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit {

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


    constructor(private auth:AuthService) {
    }


    ngOnInit() {

    }

    onRegister(name,email,password){
        var status;

        if(EmailValidator.validate(email.text)){
        this.emailValid=true;
        this.checkAllInput();
        if((this.passwordField==this.passwordField2)&&this.passwordValid) {
            var a;
            if(this.registerButtonActive){
                a= this.auth.register(name,email.text, password.text);
                this.registrationAttempt = a.message;
                status = a.status;
                Toast.makeText(this.registrationAttempt, '1500').show();
                if (status) {

                }
                else {
                    this.processingRegistration=false;
                    this.passwordValid = false;
                    this.checkAllInput();
                }
            }

        }
        else{
            this.checkAllInput();
            Toast.makeText("There are issues with the password", '1500').show()
        }

    }else{
        this.emailValid=false;
        this.checkAllInput();
        Toast.makeText("Oops, something is wrong with the email",'1500').show()
        }
    }

    onEmailTextChange(email){
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