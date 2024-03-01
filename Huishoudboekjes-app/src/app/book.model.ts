export class Book {
    id: string;
    title: string;
    description: string;
    userEmail: string

    constructor(userEmail: string) {
        this.id = "";
        this.title = "";
        this.description = "";
        this.userEmail = userEmail;
    }

    createBook(id: string, title: string, description: string) {
        this.id = id;
        this.title = title;
        this.description = description;
    }
}
