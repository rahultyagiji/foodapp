import {Injectable, NgZone} from "@angular/core";
import { Item } from "../datatypes/item";
import firebase = require("nativescript-plugin-firebase");
import {Observable} from "rxjs/Observable";


@Injectable()
export class ItemService {

    constructor(private _ngZone:NgZone){

    }

    private items = new Array<Item>();

    getSingleItem(cafeId){
        return this.items.filter(item => item.cafeId == cafeId)[0];
    }

    load() : Observable<any>{
        return new Observable((observer: any) => {
            const path = "businessName";

            const onValueEvent = (snapshot: any) => {
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(snapshot.value);
                    observer.next(results);
                });
            };
            firebase.addValueEventListener(onValueEvent, `/${path}`);
        })
    }

    handleSnapshot(data){
        this.items=[];
        if(data){

            for (const cafeId in data) {
                if (data.hasOwnProperty(cafeId)) {
                    this.items.push(new Item(data[cafeId]));
                }
            }
        }

    return this.items

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
