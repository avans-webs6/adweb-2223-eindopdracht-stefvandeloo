import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../firebase.service";

@Component({
  selector: 'app-huishoudboekjes-create',
  templateUrl: './huishoudboekjes-create.component.html',
  styleUrls: ['./huishoudboekjes-create.component.css']
})
export class HuishoudboekjesCreateComponent {

  book: Book | undefined;
  createDialog: any;
  createBookForm: FormGroup;

  constructor(public bookService: BookService, private firebaseService: FirebaseService) {
    this.createBookForm = new FormGroup({
      'title': new FormControl(null, [Validators.required]),
      'description': new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.createDialog = document.getElementById("create-book-dialog") as HTMLDialogElement;
  }

  onCreate() {
    const auth = this.firebaseService.auth;
    if (!auth.currentUser || !auth.currentUser.email) return;

    this.book = new Book("",
                          this.createBookForm.value.title,
                          this.createBookForm.value.description,
                          auth.currentUser.email);

    this.createDialog.showModal();
  }

  async onSave() {
    if (!this.book || this.validateTitle()) return;
    this.createDialog.close();

    this.book.title = this.createBookForm.value.title;
    this.book.description = this.createBookForm.value.description;

    await this.bookService.addBook(this.book);
    this.createBookForm.reset();
  }

  onCancel() {
    this.createBookForm.reset();
    this.createDialog.close();
  }

  validateTitle() {
    const titleFormItem = this.createBookForm.get('title');

    if (!titleFormItem) return;
    if (!titleFormItem.value) return "Please enter a title";
    return;
  }
}
