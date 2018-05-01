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


    radioOptions?: Array<RadioOption>=[];
    checkOptions?: Array<RadioOption>=[];


    selectedMenu:Menu[];
    selectedMenuItem:Menu;
    choices:boolean=false;
    extra:boolean=false;
    specialInstruction:string="";

    public options: Array<string>=[];
    public optionsPrice:Array<number>=[];

    public extras: Array<{"name":string,"extrasPrice":number,"selected":boolean}>=[];
    public extras1:{"name":string,"extrasPrice":number,"selected":boolean}={name:"",extrasPrice:0,selected:false};


    public picked: string="";
    public pickedPrice:number=0;


    constructor(
        private params: ModalDialogParams
    ) {

    }


    ngOnInit(): void {

        this.selectedMenu=[];
        this.selectedMenu.push(this.params.context);

        this.selectedMenuItem = this.selectedMenu[0];

        if(this.selectedMenuItem.option){
            this.selectedMenuItem.option.forEach((x)=>{
                console.log(JSON.stringify(x))
                this.options.push(x.name);
                this.optionsPrice.push(x.extraPrice);
                var a = new RadioOption(x.name,x.extraPrice);
                this.radioOptions.push(a);
            });
            this.choices=true;
        }

        if(this.selectedMenuItem.extra){
            this.selectedMenuItem.extra.forEach((x)=>{
                this.extras1.name=x.name;
                this.extras1.extrasPrice=x.extraPrice;
                this.extras1.selected=false;
                console.log(JSON.stringify(x));
                this.extras.push(this.extras1);
                var a = new RadioOption(x.name,x.extraPrice);
                this.checkOptions.push(a)
            });
            console.log(JSON.stringify(this.extras));
            this.extra=true;
        }


        console.log("the item name is " + this.selectedMenuItem.name);
        // this.radioOptions = [
        //     new RadioOption("Radio option 1","$1"),
        //     new RadioOption("Radio option 2","$2"),
        //     new RadioOption("Radio option 3","$3")
        // ];
        //
        // this.checkOptions = [
        //     new RadioOption("Radio option 1","$1"),
        //     new RadioOption("Radio option 2","$2"),
        //     new RadioOption("Radio option 3","$3")
        // ];
    }


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

        console.log(JSON.stringify(radioOption));
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


