import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import {getAuth} from "firebase/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-huishoudboekjes-create',
  templateUrl: './huishoudboekjes-create.component.html',
  styleUrls: ['./huishoudboekjes-create.component.css']
})
export class HuishoudboekjesCreateComponent {

  book: Book;
  createDialog: any;

  createBookForm: FormGroup;

  constructor(public bookService: BookService) {
    const auth = getAuth();
    this.book = new Book(auth.currentUser?.email ?? "");

    this.createBookForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.createDialog = document.getElementById("create-book-dialog") as HTMLDialogElement;
  }

  onCreate() {
    let auth = getAuth()
    if (!auth.currentUser || !auth.currentUser.email) return;

    this.book = new Book(auth.currentUser.email);
    this.createDialog.showModal();
  }

  onSave() {
    if (this.validateTitle()) return;
    this.book.createBook(this.book.id, this.createBookForm.value.title, this.createBookForm.value.description);
    this.bookService.addBook(this.book);
    this.createBookForm.reset();
    this.createDialog.close();
  }

  onCancel() {
    this.createDialog.close();
  }

  validateTitle() {
    const titleFormItem = this.createBookForm.get('title');

    if (!titleFormItem) return;
    if (!titleFormItem.value) return "Please enter a title";
    return;
  }
}
