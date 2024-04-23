export class Category {
    id: string;
    name: string;
    budget: number;
    endDate: string;

    constructor(id: string, name: string, budget: number, endDate: string) {
        this.id = id;
        this.name = name;
        this.budget = budget;
        this.endDate = endDate;
    }
}
