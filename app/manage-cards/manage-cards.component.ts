import { Component, OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked,
    ViewChild, ElementRef, ViewContainerRef, OnDestroy, ChangeDetectorRef, EventEmitter, Input, Output } from '@angular/core';
import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import { Stripe, Card, CreditCardView} from 'nativescript-stripe';
import firebase = require("nativescript-plugin-firebase");
import {AuthService} from "../services/auth.service";
//import { Page } from 'ui/page';

//const stripe = new Stripe('pk_test_c8UTm5ruajI8YOPQo75bTPKx');
const stripe = new Stripe('sk_test_MyvDHIg7s2YVcundVR8qjMcE');
//const FIREBASE_FUNCTION = 'https://[YOUR_FIREBASE_PROJECT].cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
const FIREBASE_FUNCTION = 'https://us-central1-dekyou-cafe.cloudfunctions.net/customer/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
const FIREBASE_FUNCTION_TEST = 'https://us-central1-dekyou-cafe.cloudfunctions.net/testfunction/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
const httpModule = require("http");


@Component({
    moduleId: module.id,
    selector: 'ns-manage-cards',
    templateUrl: './manage-cards.component.html',
    styleUrls: ['./manage-cards.component.css']
})
@Injectable()
export class ManageCardsComponent implements OnInit, OnChanges, DoCheck, AfterViewInit, AfterViewChecked {

    @ViewChild('cardView') cardRef: ElementRef;
    @Output() cardExist: EventEmitter<boolean> = new EventEmitter();
    //card: CardDetails;
    //cardToken:string = "";
    //ccView:CreditCardView;
    //cc: Card;

    //cc:Card = this.ccView.card;

    private isLoading = true;
    private customerToken:string = "";
    private cardExists:boolean = false;

    constructor(
        private route: ActivatedRoute,
        private vcRef: ViewContainerRef,
        private routerextensions: RouterExtensions,
        private auth: AuthService,
        private cdr: ChangeDetectorRef,
        private http: HttpClient
    ) {
            this.checkCard();
    }
    
    checkCard() {
        firebase.getCurrentUser()
            .then((token)=> {
                console.log(token);
                //this.uid = token.uid;
                //if(token.emailVerified){this.isVerified=true;}

                firebase.getValue("/userInfo/"+token.uid)
                    .then((res)=>{
                        if (!res.value.cID.isEmpty) {
                            this.cardExists=true;
                            console.log("customer id is " + res.value.cID);
                        }
                    });

                //.then((res)=>{this.name=res.value.name})
            }).catch(error => console.log("Trouble in paradise: " + error));
    }

    ngOnInit() {
        
        this.checkCard();
        //console.log ("card ref " + this.cardRef.nativeElement.card.number);
    }
    
    ngOnChanges() {
        this.checkCard();
    }

    ngDoCheck(){
        
    }
    
    ngAfterViewInit(){
        this.checkCard();
    }

    ngAfterViewChecked(){
    }

    onCardRegister (args){

        console.log("In Card Register");

        //this.ccView = this.cardRef.nativeElement;
        let ccView:CreditCardView = this.cardRef.nativeElement;
        let cc:Card = ccView.card;
        //var cardToken:string;

        //this.cc = ccView.card;

        //let page = args.object;
        //const ccView:CreditCardView = page.getViewById("card");
        //cc.name = "Kushagra Mehra";

        //console.log("theCard " + cc.name);

        var obj;

        stripe.createToken(cc.card,(error,token)=>{
            if(!error){
                //Do something with your token;
                //console.log("the token is " + token.tokenId);
                //this.cardToken = token.tokenId;
                //console.log("the token of the card is 1111 " + token.tokenId);
                //console.log ("the token json stringify is " + JSON.stringify(token));
                //console.log ("the token json stringify and parsed is " + JSON.parse(JSON.stringify(token)));


                /*console.log(JSON.stringify({
                    token: token.tokenId,
                    charge : {
                        amount: 100,
                        currency: "AUD",
                    }
                }));*/

                /*var textString = JSON.stringify({
                    token: token.tokenId,
                    charge : {
                        amount: "100",
                        currency: "AUD",
                    }
                });*?

                //console.log("the text string is " + textString);


                /*this.http.request({
                    method: "POST",
                    url: FIREBASE_FUNCTION,
                    body: JSON.stringify({
                        token: token.tokenId,
                        charge : {
                            amount: "100",
                            currency: "AUD",
                        }
                    }),headers: { "Content-Type": "application/json" }
                }).then((response) => {
                    //const result = response.body
                    //console.log ("the result is " + result);
                    console.log ("the result is " + JSON.stringify(response));
                    console.log ("the result message is " + response.body);
                }, (e) => {
                    console.log ("error is " + e);
                });*/

                var textString = "";

                    /*this.http.request("POST",
                        FIREBASE_FUNCTION,
                        {
                            body: {"token": "tok_visa", "charge": {"amount": "100", "currency": "AUD"}},
                            headers: {"Content-Type": "application/json"}
                        }).subscribe(res => console.log(res.));*/
                    //{
                    //});
                    //console.log("Text string is " + textString);


                    this.http.request("POST",
                        FIREBASE_FUNCTION,
                        {
                            body: {"function": "customer", "token": "tok_visa", "charge": {"amount": "100", "currency": "AUD"}},
                            headers: {"Content-Type": "application/json"}
                        }).subscribe(res => {

                        obj = res;
                        console.log(obj.body.customer.id);
                        this.customerToken = obj.body.customer.id;
                        console.log("the customer token is " + this.customerToken);


                        firebase.getCurrentUser()
                            .then((token)=> {
                                console.log(token);
                                //this.uid = token.uid;
                                //if(token.emailVerified){this.isVerified=true;}

                                firebase.update("/userInfo/" + token.uid, {cID: this.customerToken});

                                this.cardExists = true;
                                this.cdr.detectChanges();
                                this.cardExist.emit(true);
                                alert("Details Updated");

                                    //.then((res)=>{this.name=res.value.name})
                            }).catch(error => console.log("Trouble in paradise: " + error));

                        /*firebase.getCurrentUser()
                            .then(user => console.log("User uid: " + user.uid))
                            .catch(error => console.log("Trouble in paradise: " + error));*/

                        //textString = JSON.stringify(res);
                        //console.log("res is " + textString);
                        //textString = (<any>res).json;
                    });

                //var response = JSON.parse(textString);

                /*httpModule.request({
                    url: FIREBASE_FUNCTION,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        "token": "tok_visa",
                        "charge" : {
                            "amount": "100",
                            "currency": "AUD"
                        }
                    })
                }).then((response) => {
                    //const result = response.body
                    //console.log ("the result is " + result);
                    console.log ("the result is " + JSON.stringify(response));
                    console.log ("the result message is " + response.body);
                }, (e) => {
                    console.log ("error is " + e);
                });*/

            }else{
                //alert("Order Confirmed");
                //Toast.makeText("Please login to confirm order").show();
                console.log(error);
            }
        });

        console.log("Text string is " + this.customerToken);
    }

    onCancelNav(){
        console.log("in cancel navigation");
        //this.routerextensions.back();
    }

}
