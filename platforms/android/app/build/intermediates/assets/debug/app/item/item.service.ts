import { Injectable } from "@angular/core";

import { Item } from "./item";

@Injectable()
export class ItemService {
    private items = new Array<Item>(
        { id: 1, name: "Cafe 1", category: "Indian Cafe" },
        { id: 2, name: "Cafe 2", category: "Japani Cafe" },
        { id: 3, name: "Cafe 3", category: "Ethiopian Cafe" },
    );

    getItems(): Item[] {
        return this.items;
    }

    getItem(id: number): Item {
        return this.items.filter(item => item.id === id)[0];
    }
}
