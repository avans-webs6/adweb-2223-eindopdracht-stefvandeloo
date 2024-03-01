import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import {getAuth} from "firebase/auth";

@Component({
  selector: 'app-huishoudboekjes-create',
  templateUrl: './huishoudboekjes-create.component.html',
  styleUrls: ['./huishoudboekjes-create.component.css']
})
export class HuishoudboekjesCreateComponent {

  book: Book;
  createDialog: any;

  constructor(public bookService: BookService) {
    const auth = getAuth();
    this.book = new Book(auth.currentUser?.email ?? "");
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
    if (!this.book.title || !this.book.description) return;

    this.bookService.addBook(this.book);
    this.createDialog.close();
  }

  onCancel() {
    this.createDialog.close();
  }
}
