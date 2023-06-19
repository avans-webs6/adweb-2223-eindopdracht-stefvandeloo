export class Book {
    id: string;
    title: string;
    description: string;
    incomeId: string;
    expensesId: string

    constructor() {
        this.id = "";
        this.title = "";
        this.description = "";
        this.incomeId = "";
        this.expensesId = "";
    }

    createBook(id: string, title: string, description: string, incomeId: string, expensesId: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.incomeId = incomeId;
        this.expensesId = expensesId;
    }
}
