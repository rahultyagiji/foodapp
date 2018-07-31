// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from "nativescript-angular/platform";

import { AppModule } from "./app.module";

import { registerElement } from "nativescript-angular/element-registry";

import * as app from "application";
import * as platform from "platform";

declare const STPPaymentConfiguration;

registerElement("CreditCardView", () => require("nativescript-stripe").CreditCardView);

app.on(app.launchEvent, (args) => {
    if (platform.isIOS) {
        STPPaymentConfiguration.sharedConfiguration().publishableKey = "pk_test_l6tuKlddwfIkKUWlYj1HnxiB"; //"pk_live_vQDnFzdF5EDZmRqSf7z5b0yG";
        console.log("stripe key is " + STPPaymentConfiguration.sharedConfiguration().publishableKey);
    }
});

// A traditional NativeScript application starts by initializing global objects, setting up global CSS rules, creating, and navigating to the main page. 
// Angular applications need to take care of their own initialization: modules, components, directives, routes, DI providers. 
// A NativeScript Angular app needs to make both paradigms work together, so we provide a wrapper platform object, platformNativeScriptDynamic, 
// that sets up a NativeScript application and can bootstrap the Angular framework.
platformNativeScriptDynamic().bootstrapModule(AppModule);
