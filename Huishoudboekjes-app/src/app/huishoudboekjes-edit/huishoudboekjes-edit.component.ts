import {AfterViewInit, Component, Input} from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-huishoudboekjes-edit',
  templateUrl: './huishoudboekjes-edit.component.html',
  styleUrls: ['./huishoudboekjes-edit.component.css']
})
export class HuishoudboekjesEditComponent implements AfterViewInit {
  @Input()
  bookId: string = "";

  book: Book | undefined;
  editDialog: any;
  editBookForm: FormGroup;

  constructor(public bookService: BookService) {
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
    if (!this.book || this.validateTitle()) return;
    this.editDialog.close();

    this.book = new Book(this.book.id,
                          this.editBookForm.value.title,
                          this.editBookForm.value.description,
                          this.book.userEmail);

    await this.bookService.editBook(this.book);
    this.editBookForm.reset();
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
