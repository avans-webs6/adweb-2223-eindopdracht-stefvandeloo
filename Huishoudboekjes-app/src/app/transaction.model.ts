import { Timestamp } from "firebase/firestore";

export class Transaction {
    id: string;
    description: string;
    price: Number;
    date: Timestamp;
    categoryId: string;

    constructor() {
        this.id = "";
        this.description = "";
        this.price = 0;
        this.date = new Timestamp(0, 0);
        this.categoryId = "";
    }

    createTransaction(id: string, description: string, price: Number, date: Timestamp, categoryId: string) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.date = date;
        this.categoryId = categoryId;
    }
}
