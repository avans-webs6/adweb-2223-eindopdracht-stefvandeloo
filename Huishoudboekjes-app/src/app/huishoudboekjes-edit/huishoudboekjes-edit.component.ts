import {AfterViewInit, Component, Input} from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import {getAuth} from "firebase/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-huishoudboekjes-edit',
  templateUrl: './huishoudboekjes-edit.component.html',
  styleUrls: ['./huishoudboekjes-edit.component.css']
})
export class HuishoudboekjesEditComponent implements AfterViewInit {
  @Input()
  bookId: string = "";

  book: Book;
  editDialog: any;
  editBookForm: FormGroup;

  constructor(public bookService: BookService) {
    const auth = getAuth();
    this.book = new Book(auth.currentUser?.email ?? "");

    this.editBookForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null)
    });
  }

  ngAfterViewInit(): void {
    this.editDialog = document.getElementById("edit-book-dialog-" + this.bookId) as HTMLDialogElement;
  }

  onEdit() {
    this.bookService.getBook(this.bookId).subscribe((book) => {
      this.book = book;
      this.editBookForm.setValue({title: this.book.title, description: this.book.description});
    });
    this.editDialog.showModal();
  }

  async onSave() {
    if (this.validateTitle()) return;
    this.book.createBook(this.book.id, this.editBookForm.value.title, this.editBookForm.value.description);
    await this.bookService.editBook(this.book);
    this.editBookForm.reset();
    this.editDialog.close();
  }

  onCancel() {
    this.editBookForm.reset();
    this.editDialog.close();
  }

  validateTitle() {
    const titleFormItem = this.editBookForm.get('title');

    if (!titleFormItem) return;
    if (!titleFormItem.value) return "Please enter a title";
    return;
  }
}
