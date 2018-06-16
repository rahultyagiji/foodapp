import {Injectable, NgZone} from "@angular/core";
import {Menu} from "../datatypes/menu";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from "rxjs/Observable";
import * as moment from 'moment';

@Injectable()
export class MenuService {
    private menu = new Array<Menu>();

    constructor(private _ngZone:NgZone){

    }

    loadMenu(cafeId): Observable<any>{
        return new Observable((observer: any) => {
            const path = "/menu/"+cafeId;
            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        })

    }
    handleSnapshot(data) {
        this.menu = [];

        if(data){

            for (const item in data) {
                if (data.hasOwnProperty(item)) {
                    data[item].available=this.checkAvailability(data[item].available.timing.startTime,
                        data[item].available.timing.endTime,data[item].available.inStock);;
                    this.menu.push(new Menu(data[item]));
                }
            }
        }

        return this.menu;
    }

checkAvailability(startTime,endTime,inStock){

    var st=moment(startTime,"HH:mm");
    var et=moment(endTime,"HH:mm");



    if (inStock==false){
        return false
    }
    else{
        if (moment(moment()).isBetween(st, et)){
            return true;}
        else{
            return false;}
    }
    }

}
