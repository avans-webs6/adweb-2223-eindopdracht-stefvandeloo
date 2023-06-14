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
  book: Book = new Book();
  editDialog: any;

  constructor(public bookService: BookService) {  }

  ngOnInit(): void {
    this.editDialog = document.getElementById("edit-book-Dialog") as HTMLDialogElement;
  }

  onEdit() {
    this.editDialog.showModal();
  }

  onSave() {
    if (this.book.title && this.book.description) {
      this.bookService.editBook(this.book);
      this.editDialog.close();
    }
  }

  //TODO: When pressing OnCancel, the value of the input fields are not stored in Firebase (like it shouldn't),
  //      but the input looks changed because when opening the dialog again the edited value is displayed (unless the page is reloaded).
  onCancel() {
    this.editDialog.close();
  }
}
