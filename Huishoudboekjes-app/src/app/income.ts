export class Income {
    id: string;
    description: string;
    price: Number;
    date: Date;

    constructor() {
        this.id = "";
        this.description = "";
        this.price = 0;
        this.date = new Date();
    }

    createIncome(id: string, description: string, price: Number, date: Date) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.date = date;
    }
}
