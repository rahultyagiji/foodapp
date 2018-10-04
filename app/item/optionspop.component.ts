import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/directives/dialogs";
import {Switch} from "ui/switch";
import {ListPicker} from "ui/list-picker";
import {Menu} from "../datatypes/menu";
import {TextField} from "tns-core-modules/ui/text-field";
import {TextView} from "tns-core-modules/ui/text-view";
import {FlexboxLayout} from "tns-core-modules/ui/layouts/flexbox-layout";
import {topmost} from "ui/frame";
import {RadioOption} from "./radio-option";
import {firebase} from "nativescript-plugin-firebase/firebase-common";
import {RouterExtensions} from "nativescript-angular";
//import {EventData} from "data/observable";
//import {Page} from "ui/page";
//import {ScrollView} from "ui/scroll-view";
//import {View} from "ui/core/view";
//import { isAndroid, isIOS } from "tns-core-modules/platform";
//import { CheckBox } from 'nativescript-checkbox';
//import {RouterExtensions} from "../../platforms/android/app/src/main/assets/app/tns_modules/nativescript-angular/router/router-extensions";

//let options = ["Small", "Medium", "Large"];
@Component({
    selector: "ns-popup",
    moduleId: module.id,
    templateUrl: "./optionspop.component.html",
    styleUrls:["./optionspop.component.css"]
})


export class OptionspopComponent implements OnInit {

    @ViewChild("CB1") FirstCheckBox: ElementRef;
    //@ViewChild("scrollView") scrollView: ElementRef;


    radioOptions?: Array<RadioOption>=[];
    checkOptions?: Array<RadioOption>=[];


    selectedMenu:Menu[];
    selectedMenuItem:Menu;
    choices:boolean=false;
    extra:boolean=false;
    specialInstruction:string="";
    optionText:string;
    optionPrice:number;
    inStock:boolean=false;
    hasImage:boolean=false;
    customerID:string = "";
    userLoggedIn:boolean=false;

    public options: Array<string>=[];
    public optionsPrice:Array<number>=[];

    public extras: Array<{"name":string,"extrasPrice":number,"selected":boolean}>=[];
    public extras1:{"name":string,"extrasPrice":number,"selected":boolean}={name:"",extrasPrice:0,selected:false};
    public extrasAdded: Array<{"text":string,"price":number}>=[];

    //this is for the actual values sent back as response
    public picked: string="";
    public pickedPrice:number=0;

    constructor(
        private params: ModalDialogParams,
        private routerextensions:RouterExtensions
    ) {

    }


    ngOnInit(): void {

        firebase.getCurrentUser()
            .then((token)=> {
                firebase.getValue("/userInfo/"+token.uid)
                    .then((res)=>{

                        this.userLoggedIn = true;

                        if (!res.value.cID.isEmpty) {
                            this.customerID = res.value.cID;
                            console.log("customer id is " + res.value.cID);
                        }
                    });
            });

        this.selectedMenu=[];
        this.selectedMenu.push(this.params.context);

        this.selectedMenuItem = this.selectedMenu[0];

        if(this.selectedMenuItem.imgSrc)this.hasImage=true;

        if(this.selectedMenuItem.available) {
            this.inStock = true;
        }
        else {
            this.inStock = false;
        }


        if(this.selectedMenuItem.option){
            this.selectedMenuItem.option.forEach((x)=>{
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
                this.extras.push(this.extras1);
                var a = new RadioOption(x.name,x.extraPrice);
                this.checkOptions.push(a)
            });
            this.extra=true;
        }


        // console.log("the item name is " + this.selectedMenuItem.name);

    }

/*    ngAfterViewInit() {
        let scrollvie = this.scrollView.nativeElement;
        setTimeout(() => {
            if(isAndroid){
                scrollvie.android.setVerticalScrollBarEnabled(true);
            }
            else if (isIOS) {
                scrollvie.ios.showsVerticalScrollIndicator = true;
                scrollvie.ios.setScrollBarFadingEnabled = false;
            }
        },2);
    }*/


    selectedIndexChanged(args) {
        let picker = <ListPicker>args.object;
        this.picked = this.options[picker.selectedIndex];
        this.pickedPrice=this.optionsPrice[picker.selectedIndex];
    }

    onSpecialInstructionBlur(args) {
        let textField = <TextView>args.object;
        console.log("textView");

        setTimeout(() => {
            textField.dismissSoftInput();
        }, 100);
    }

    close(response:string){

        if(response=="signIn") {
            this.routerextensions.navigate(["/signin"], {clearHistory: true});
        }

        var response1:{'response':string,'specialInstruction':string,'option':
            {'text':string,'price':number},
            'extras':{'text':string,'price':number}[]}={'response':"",'specialInstruction':'','option':
        {'text':"",'price':0},extras:[]};

        response1.response=response;
        if(this.optionText){response1.option.text=this.optionText;}
        if(this.optionPrice){response1.option.price=this.optionPrice;}
        response1.specialInstruction=this.specialInstruction;
        response1.extras=this.extrasAdded;
        console.log(response1);
        this.params.closeCallback(response1);
    }

    public toggleCheck() {
        this.FirstCheckBox.nativeElement.toggle();
    }
    public getCheckProp() {
    }

    onTextChange(args){

        let textfield=<TextField>args.object;
        this.specialInstruction=textfield.text;

    }

    public checkedChange(modelRef) {
    }

    changeCheckedRadio(radioOption: RadioOption): void {

        console.log("in radioOption");

        this.optionText=radioOption.text;
        this.optionPrice=radioOption.price;


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

    checkedExtra(checkOption: RadioOption){

        console.log("in checkOption");

        checkOption.selected = !checkOption.selected;
        if (checkOption.selected) {
            this.extrasAdded.push({"text": checkOption.text, "price": checkOption.price});
            this.extrasAdded = this.extrasAdded.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        }
        else{
            //    remove from this.extrasAdded

            this.extrasAdded = this.extrasAdded.filter((e)=>{
                return e.text !=checkOption.text;
            })
        }


    }

}


