import { TransactionType } from "./transaction-type.enum";

export class Transaction {
    id: string;
    description: string;
    price: number;
    date: string;
    type: string;
    bookId: string;
    categoryId: string;

    constructor() {
        this.id = "";
        this.description = "";
        this.price = 0.00;
        this.date = "";
        this.type = TransactionType.INCOME;
        this.bookId = "";
        this.categoryId = "";
    }

    createTransaction(id: string, description: string, price: number, date: string, type: string, bookId: string, categoryId: string) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.date = date;
        this.type = type;
        this.bookId = bookId;
        this.categoryId = categoryId;
    }
}
