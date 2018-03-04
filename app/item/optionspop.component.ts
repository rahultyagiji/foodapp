import { Component, OnInit } from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/directives/dialogs";
import { Switch } from "ui/switch";
import { ListPicker } from "ui/list-picker";
import {Menu} from "../datatypes/menu";

let options = ["Small", "Medium", "Large"];

@Component({
    selector: "ns-popup",
    moduleId: module.id,
    templateUrl: "./optionspop.component.html",
    styleUrls:["./optionspop.component.css"]
})
export class OptionspopComponent implements OnInit {


    selectedMenu:Menu[];
    selectedMenuItem:Menu;

    public firstSwitchState = "OFF";
    public secondSwitchState = "ON";
    public sliderValue1 = 1;

    public options: Array<string>;
    public picked: string;




    constructor(
        private params: ModalDialogParams
    ) {

        console.log ("in the constructor..............");

        this.selectedMenu=[];
        this.selectedMenu.push(params.context);

        this.selectedMenuItem = this.selectedMenu[0];

        console.log("params are " + this.selectedMenu);

        console.log("Selected Menu Item is " + this.selectedMenuItem);

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
