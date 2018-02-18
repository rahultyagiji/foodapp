import { Component, OnInit } from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/directives/dialogs";
import { Switch } from "ui/switch";
import { ListPicker } from "ui/list-picker";

let options = ["Smalll", "Medium", "Large"];

@Component({
    selector: "ns-popup",
    moduleId: module.id,
    templateUrl: "./optionspop.component.html",
    styleUrls:["./optionspop.component.css"]
})
export class OptionspopComponent implements OnInit {



    public firstSwitchState = "OFF";
    public secondSwitchState = "ON";
    public sliderValue1 = 1;

    public options: Array<string>;
    public picked: string;



    constructor(
        private params: ModalDialogParams
    ) {

        this.options = [];

        for (let i = 0; i < options.length; i++) {
            this.options.push(options[i]);
        }


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

    selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        console.log("picker selection: " + this.options[picker.selectedIndex]);

        this.picked = this.options[picker.selectedIndex];
    }


    close(response:string){

        this.params.closeCallback(response);
    }


}
