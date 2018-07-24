import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { Injectable } from "@angular/core";
import { Observable as RxObservable } from "rxjs";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import { Stripe, Card, CreditCardView} from 'nativescript-stripe';
//import { Page } from 'ui/page';

//const stripe = new Stripe('pk_test_c8UTm5ruajI8YOPQo75bTPKx');
const stripe = new Stripe('pk_test_c8UTm5ruajl8YOPQo75bTPKx');
//const FIREBASE_FUNCTION = 'https://[YOUR_FIREBASE_PROJECT].cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
const FIREBASE_FUNCTION = 'https://us-central1-dekyou-cafe.cloudfunctions.net/customer/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE
const httpModule = require("http");


@Component({
    moduleId: module.id,
    selector: 'ns-manage-cards',
    templateUrl: './manage-cards.component.html',
    styleUrls: ['./manage-cards.component.css']
})
@Injectable()
export class ManageCardsComponent implements OnInit {

    @ViewChild('cardView') cardRef: ElementRef;
    //card: CardDetails;
    //cardToken:string = "";
    //ccView:CreditCardView;
    //cc: Card;

    //cc:Card = this.ccView.card;

    private isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private vcRef: ViewContainerRef,
        private routerextensions: RouterExtensions,
        private http: HttpClient
    ) { }

    ngOnInit() {

        console.log ("in ngOn init for manage cards");
        //console.log ("card ref " + this.cardRef.nativeElement.card.number);

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

                var textString = JSON.stringify({
                    token: token.tokenId,
                    charge : {
                        amount: "100",
                        currency: "AUD",
                    }
                });

                console.log("the text string is " + textString);


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

                    this.http.request("POST",
                        FIREBASE_FUNCTION,
                        {
                            body: {"token": "tok_visa", "charge": {"amount": "100", "currency": "AUD"}},
                            headers: {"Content-Type": "application/json"}
                        }).subscribe(res => {
                        textString = (<any>res).json.body.token;});

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
    }

    onCancelNav(){
        console.log("in cancel navigation");
        //this.routerextensions.back();
    }

}
