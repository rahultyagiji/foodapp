import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/directives/dialogs";
import { Switch } from "ui/switch";
import { ListPicker } from "ui/list-picker";
import { Menu } from "../datatypes/menu";
import {TextField} from "tns-core-modules/ui/text-field";
import { FlexboxLayout } from "tns-core-modules/ui/layouts/flexbox-layout";
//import { CheckBox } from 'nativescript-checkbox';
import { topmost } from 'ui/frame';
import { RadioOption } from "./radio-option";

//let options = ["Small", "Medium", "Large"];

@Component({
    selector: "ns-popup",
    moduleId: module.id,
    templateUrl: "./optionspop.component.html",
    styleUrls:["./optionspop.component.css"]
})


export class OptionspopComponent implements OnInit {

    @ViewChild("CB1") FirstCheckBox: ElementRef;

    selectedMenu:Menu[];
    selectedMenuItem:Menu;
    choices:boolean=false;
    extras:boolean=false;
    specialInstruction:string="";
    // public firstSwitchState = "OFF";
    // public secondSwitchState = "ON";
    // public sliderValue1 = 1;

    options: Array<string>=[];
    public optionsPrice:Array<number>=[];
    public picked: string="";
    public pickedPrice:number=0;

    radioOptions?: Array<RadioOption>;
    checkOptions?: Array<RadioOption>;


    constructor(
        private params: ModalDialogParams
    ) {
        this.selectedMenu=[];
        this.selectedMenu.push(params.context);

        this.selectedMenuItem = this.selectedMenu[0];

        if(this.selectedMenuItem.option){
            this.selectedMenuItem.option.forEach((x)=>{
                this.options.push(x.name);
                this.optionsPrice.push(x.extraPrice);

            });

            this.choices=true;
        }

        // for (let i = 0; i < options.length; i++) {
        //     this.options.push(options[i]);
        // }

    }

    ngOnInit(): void {
        
        console.log("the item name is " + this.selectedMenuItem.name);
        this.radioOptions = [
            new RadioOption("Radio option 1", "$1"),
            new RadioOption("Radio option 2", "$2"),
            new RadioOption("Radio option 3", "$3")
        ];

        this.checkOptions = [
            new RadioOption("Check option 1", "1"),
            new RadioOption("Check option 2", "2"),
            new RadioOption("Check option 3", "3")
        ];
    }

    // onFirstChecked(args) {
    //     let firstSwitch = <Switch>args.object;
    //     if (firstSwitch.checked) {
    //         this.firstSwitchState = "ON";
    //     } else {
    //         this.firstSwitchState = "OFF";
    //     }
    // }
    //
    selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        this.picked = this.options[picker.selectedIndex];
        this.pickedPrice=this.optionsPrice[picker.selectedIndex];
    }


    close(response:string){
        var response1:{'response':string,'specialInstruction':string}={'response':"",'specialInstruction':''};

        response1.response=response;
        response1.specialInstruction=this.specialInstruction;

        this.params.closeCallback(response1);
    }

    public toggleCheck() {
        this.FirstCheckBox.nativeElement.toggle();
    }
    public getCheckProp() {
        console.log('checked prop value =  ' + this.FirstCheckBox.nativeElement.checked);
    }

    onTextChange(args){

        let textfield=<TextField>args.object;
        this.specialInstruction=textfield.text;

    }

    public checkedChange(modelRef) {
        console.log("checkedChange:", modelRef.checked);
    }

    changeCheckedRadio(radioOption: RadioOption): void {
        radioOption.selected = !radioOption.selected;

        if (!radioOption.selected) {
            return;
        }

        // uncheck all other options
        this.radioOptions.forEach(option => {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
    }


}