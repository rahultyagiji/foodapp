import {Component, OnInit} from "@angular/core";
const firebase = require("nativescript-plugin-firebase");


@Component({
    selector: "ns-app",
    templateUrl: "app.component.html",
})

export class AppComponent implements OnInit {


    constructor() {


    }


    ngOnInit() {

        firebase.init({
            // storageBucket: 'gs://dekyou-cafe.appspot.com',
            persist: false
        }).then();


    }


}