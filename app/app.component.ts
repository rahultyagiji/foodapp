import {Component, OnInit} from "@angular/core";
// import * as pushPlugin from "nativescript-push-notifications";
const firebase = require("nativescript-plugin-firebase");

/*const iosSettings = {
    badge: true,
    sound: true,
    alert: true,
    clearBadge: false,
    interactiveSettings: {
        actions: [{
            identifier: 'READ_IDENTIFIER',
            title: 'Read',
            activationMode: "foreground",
            destructive: false,
            authenticationRequired: false
        }, {
            identifier: 'CANCEL_IDENTIFIER',
            title: 'Cancel',
            activationMode: "foreground",
            destructive: true,
            authenticationRequired: false
        }],
        categories: [{
            identifier: 'READ_CATEGORY',
            actionsForDefaultContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER'],
            actionsForMinimalContext: ['READ_IDENTIFIER', 'CANCEL_IDENTIFIER']
        }]
    },
    notificationCallbackIOS: (message: any) => {
        alert("Message received!\n" + JSON.stringify(message));
    }
};*/

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

        /*pushPlugin.register(iosSettings, (token: String) => {
            alert("Device registered. Access token: " + token);

            // Register the interactive settings
            if(iosSettings.interactiveSettings) {
                pushPlugin.registerUserNotificationSettings(() => {
                    alert('Successfully registered for interactive push.');
                }, (err) => {
                    alert('Error registering for interactive push: ' + JSON.stringify(err));
                });
            }
        }, (errorMessage: any) => {
            alert("Device NOT registered! " + JSON.stringify(errorMessage));
        });*/
    }
}