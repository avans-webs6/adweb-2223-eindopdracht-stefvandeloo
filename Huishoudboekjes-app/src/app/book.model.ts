export class Book {
    id: string;
    title: string;
    description: string;

    constructor() {
        this.id = "";
        this.title = "";
        this.description = "";
    }

    createBook(id: string, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
