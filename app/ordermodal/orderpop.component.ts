import { Component, OnInit } from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/directives/dialogs";
import { Switch } from "ui/switch";
import { ListPicker } from "ui/list-picker";
import {Menu} from "../datatypes/menu";
import {TextField} from "tns-core-modules/ui/text-field";

let options = ["Cash", "Card"];

@Component({
    selector: "ns-order",
    moduleId: module.id,
    templateUrl: "./orderpop.component.html",
    styleUrls:["./orderpop.component.css"]
})

export class OrderpopComponent implements OnInit {


    selectedMenu:Menu[];
    selectedMenuItem:Menu;

    public firstSwitchState = "OFF";
    public secondSwitchState = "ON";
    public sliderValue1 = 1;

    public options: Array<string>;
    public picked: string;
    location:string=""




    constructor(private params: ModalDialogParams) {


        this.selectedMenu=[];
        this.selectedMenu.push(params.context);
        this.selectedMenuItem = this.selectedMenu[0];

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

        this.picked = this.options[picker.selectedIndex];
    }


    ontextChange(args) {
        let textField = <TextField>args.object;
        this.location=textField.text;
    }


    close(){
        this.params.closeCallback({"payment":this.picked,"location":this.location});
    }




}