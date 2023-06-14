import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Income } from '../income';

@Component({
  selector: 'app-huishoudboekjes-detail',
  templateUrl: './huishoudboekjes-detail.component.html',
  styleUrls: ['./huishoudboekjes-detail.component.css']
})
export class HuishoudboekjesDetailComponent {

  book: Book = new Book();
  income: Income[] = [];

  constructor(private bookService: BookService, private route: ActivatedRoute) {
    let bookId = this.route.snapshot.paramMap.get('id');

    if (bookId) {
      this.bookService.getBook(bookId).subscribe((book) => {
        this.book = book;
      });

      this.bookService.getIncomeOfBook(bookId).subscribe((income) => {
        this.income = income;
      });
    }
  }
}
