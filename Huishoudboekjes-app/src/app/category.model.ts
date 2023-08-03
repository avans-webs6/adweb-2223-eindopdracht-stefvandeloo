export class Category {
    id: string;
    name: string;
    budget: number;
    endDate: string;

    constructor() {
        this.id = "";
        this.name = "";
        this.budget = 0;
        this.endDate = "";
    }

    createCategory(id: string, name: string, budget: number) {
        this.id = id;
        this.name = name;
        this.budget = budget;
    }
    
    setEndDate(endDate: string) {
        this.endDate = endDate;
    }
}
