import {Injectable, NgZone} from "@angular/core";
import { Item } from "../datatypes/item";
import {Menu} from "../datatypes/menu";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from "rxjs/Observable";

@Injectable()
export class MenuService {
    private menu = new Array<Menu>();

    constructor(private _ngZone:NgZone){

    }

    loadMenu(cafeId:string): Observable<any>{
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
                    this.menu.push(new Menu(data[item]));
                }
            }
        }

        return this.menu;
    }


    fetchCafeInfo(cafeId){

        var onQueryEvent = function(result) {
            if (!result.error) {
            }
        };

        return firebase.query(
            onQueryEvent,
            "/businessName",
            {
                singleEvent: true,
                orderBy: {
                    type: firebase.QueryOrderByType.CHILD,
                    value: 'cafeId' // mandatory when type is 'child'
                },
                ranges: [
                    {
                        type: firebase.QueryRangeType.EQUAL_TO,
                        value: cafeId
                    }]
            })
    }

}
