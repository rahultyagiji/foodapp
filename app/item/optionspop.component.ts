import { Component, OnInit } from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/directives/dialogs";
import { Switch } from "ui/switch";

@Component({
    selector: "ns-popup",
    moduleId: module.id,
    templateUrl: "./optionspop.component.html",
    styleUrls:["./optionspop.component.css"]
})
export class OptionspopComponent implements OnInit {

    public firstSwitchState = "OFF";
    public secondSwitchState = "ON";

    constructor(
        private params: ModalDialogParams
    ) {

    }

    ngOnInit(): void {

    }

     onFirstChecked(args) {
        let firstSwitch = <Switch>args.object;
        if (firstSwitch.checked) {
            this.firstSwitchState = "ON";
        } else {
            this.firstSwitchState = "OFF";
        }
    }

     onSecondChecked(args) {
        let secondSwitch = <Switch>args.object;
        console.log(secondSwitch)
        if (secondSwitch.checked) {
            this.secondSwitchState = "ON";
        } else {
            this.secondSwitchState = "OFF";
        }
    }

    close(response:string){

        this.params.closeCallback(response);
    }


}
