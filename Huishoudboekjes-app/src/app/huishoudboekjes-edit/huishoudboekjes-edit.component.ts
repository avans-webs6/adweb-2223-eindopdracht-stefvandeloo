import { Component, Input } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';

@Component({
  selector: 'app-huishoudboekjes-edit',
  templateUrl: './huishoudboekjes-edit.component.html',
  styleUrls: ['./huishoudboekjes-edit.component.css']
})
export class HuishoudboekjesEditComponent {
  @Input()
  bookId: string = "";

  book: Book = new Book();

  editDialog: any;

  constructor(public bookService: BookService) {  }

  ngAfterViewInit(): void {
    this.editDialog = document.getElementById("edit-book-dialog-" + this.bookId) as HTMLDialogElement;
  }

  onEdit() {
    this.bookService.getBook(this.bookId).subscribe((book) => {
      this.book = book;
    });

    this.editDialog.showModal();
  }

  onSave() {
    if (this.book.title && this.book.description) {
      this.bookService.editBook(this.book);
      this.editDialog.close();
    }
  }

  onCancel() {
    this.editDialog.close();
  }
}
