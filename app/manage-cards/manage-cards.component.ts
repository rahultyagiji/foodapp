import { Component, OnInit, ViewChild, ElementRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from 'nativescript-angular/router';
import { Stripe, Card, CreditCardView} from 'nativescript-stripe';
//import { Page } from 'ui/page';

const stripe = new Stripe('pk_test_c8UTm5ruajI8YOPQo75bTPKx');

@Component({
    moduleId: module.id,
    selector: 'ns-manage-cards',
    templateUrl: './manage-cards.component.html',
    styleUrls: ['./manage-cards.component.css']
})
export class ManageCardsComponent implements OnInit {

    @ViewChild('cardView') cardRef: ElementRef;
    //ccView:CreditCardView;
    //cc: Card;

    //cc:Card = this.ccView.card;

    private isLoading = true;

    constructor(
        private route: ActivatedRoute,
        private vcRef: ViewContainerRef,
        private routerextensions: RouterExtensions
    ) { }

    ngOnInit() {

        console.log ("in ngOn init for manage cards");
        //console.log ("card ref " + this.cardRef.nativeElement.card.number);

    }
    
    onCardRegister (args){
        
        console.log("in card register");

        //this.ccView = this.cardRef.nativeElement;
        let ccView:CreditCardView = this.cardRef.nativeElement;
        let cc:Card = ccView.card;

        //this.cc = ccView.card;

        //let page = args.object;
        //const ccView:CreditCardView = page.getViewById("card");
        cc.name = "test customer";

        console.log("theCard " + cc.name);

        /*stripe.createToken(cc.card,(error,token)=>{
            if(!error){
                //Do something with your token;
                console.log("the token is " + token.tokenId);

            }else{
                //alert("Order Confirmed");
                //Toast.makeText("Please login to confirm order").show();
                console.log(error);
            }
        });*/
    }

    onCancelNav(){
        console.log("in cancel nav");
        //this.routerextensions.back();
    }
    
}
