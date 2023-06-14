export class Book {
    id: string;
    title: string;
    description: string;
    incomeId: string;

    constructor() {
        this.id = "";
        this.title = "";
        this.description = "";
        this.incomeId = "";
    }

    createBook(id: string, title: string, description: string, incomeId: string) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.incomeId = incomeId;
    }

    // addIncome(incomeItem: Income) {
    //     this.income.push(incomeItem);
    // }
}
