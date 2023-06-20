import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-huishoudboekjes-create',
  templateUrl: './huishoudboekjes-create.component.html',
  styleUrls: ['./huishoudboekjes-create.component.css']
})
export class HuishoudboekjesCreateComponent {

  book: Book = new Book();
  createDialog: any;

  constructor(public bookService: BookService) {  }

  ngOnInit(): void {
    this.createDialog = document.getElementById("create-book-dialog") as HTMLDialogElement;
  }

  onCreate() {
    this.book = new Book();
    this.createDialog.showModal();
  }

  onSave() {
    if (this.book.title && this.book.description) {
      this.bookService.addBook(this.book);
      this.createDialog.close();
    }
  }

  onCancel() {
    this.createDialog.close();
  }
}
