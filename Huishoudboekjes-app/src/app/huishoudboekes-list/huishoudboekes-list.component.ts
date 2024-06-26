import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../book.model';
import {ActivatedRoute} from "@angular/router";
import {FirebaseService} from "../firebase.service";

@Component({
  selector: 'app-huishoudboekes-list',
  templateUrl: './huishoudboekes-list.component.html',
  styleUrls: ['./huishoudboekes-list.component.css']
})
export class HuishoudboekesListComponent implements OnInit {
  books: Book[] | undefined;
  isArchived: boolean = false;

  constructor(private bookService: BookService, private route: ActivatedRoute, private firebaseService: FirebaseService) {  }

  ngOnInit() {
    this.route.data.subscribe(data => this.isArchived = data["isArchived"]);

    if (this.isArchived) this.bookService.getArchivedBooks().subscribe(books => this.books = books);
    else this.bookService.getBooks().subscribe(books => this.books = books);
  }

  async archiveBook(book: Book) {
    await this.bookService.archiveBook(book);
  }

  async dearchiveBook(book: Book) {
    await this.bookService.dearchiveBook(book);
  }

  userIsAuthor(bookUserEmail: string) {
    const auth = this.firebaseService.auth;
    if (!auth.currentUser || !auth.currentUser.email) return false;
    return auth.currentUser.email === bookUserEmail;
  }
}
