import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { BookService } from '../book.service';
import { Book } from '../book.model';

@Component({
  selector: 'app-huishoudboekes-list',
  templateUrl: './huishoudboekes-list.component.html',
  styleUrls: ['./huishoudboekes-list.component.css']
})
export class HuishoudboekesListComponent {
  books: Observable<Book[]>;
  archivedBooks: Observable<Book[]>;

  constructor(public bookService: BookService) {
    this.books = bookService.getBooks();
    this.archivedBooks = bookService.getArchivedBooks();
  }

  archiveBook(book: Book) {
    this.bookService.archiveBook(book);
  }

  dearchiveBook(book: Book) {
    this.bookService.dearchiveBook(book);
  }
}
