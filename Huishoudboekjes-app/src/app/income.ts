import { Timestamp } from "firebase/firestore";

export class Income {
    id: string;
    description: string;
    price: Number;
    date: Timestamp;

    constructor() {
        this.id = "";
        this.description = "";
        this.price = 0;
        this.date = new Timestamp(0, 0);
    }

    createIncome(id: string, description: string, price: Number, date: Timestamp) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.date = date;
    }
}
