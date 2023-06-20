import { Timestamp } from "firebase/firestore";

export class Category {
    id: string;
    name: string;
    budget: number;
    endDate: Date;

    constructor() {
        this.id = "";
        this.name = "";
        this.budget = 0;
        this.endDate = new Date('01-01-1970');
    }

    createCategory(id: string, name: string, budget: number, endDate: Date) {
        this.id = id;
        this.name = name;
        this.budget = budget;
        this.endDate = endDate;
    }
}
