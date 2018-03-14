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

                    // firebase.getDownloadUrl({
                    //     // optional, can also be passed during init() as 'storageBucket' param so we can cache it
                    //     bucket: 'gs://dekyou-cafe.appspot.com',
                    //     // the full path of an existing file in your Firebase storage
                    //     remoteFullPath: 'cafe1/profile.png'
                    // }).then(
                    //     function (url) {
                    //         data[cafeId].imgSrc=url;
                    //         console.log(JSON.stringify(data[cafeId]))
                    //     },
                    //     function (error) {
                    //         console.log("Error::" + error);
                    //     }
                    // );

                    this.items.push(new Item(data[cafeId]));

                }
            }
        }

    return this.items

    }
}
