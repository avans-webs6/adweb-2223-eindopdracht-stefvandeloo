import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Income } from '../income';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-huishoudboekjes-detail',
  templateUrl: './huishoudboekjes-detail.component.html',
  styleUrls: ['./huishoudboekjes-detail.component.css']
})
export class HuishoudboekjesDetailComponent {

  book: Book = new Book();
  income: Income[] = [];

  date: Date = new Date();

  constructor(private bookService: BookService, private route: ActivatedRoute) {
    let bookId = this.route.snapshot.paramMap.get('id');
    if (!bookId) return;

    this.bookService.getBook(bookId).subscribe((book) => {
      this.book = book;
    });

    this.receiveIncomeOfBookByDate(bookId);
  }

  updateIncome(bookId: string) {
    this.receiveIncomeOfBookByDate(bookId);
  }

  receiveIncomeOfBookByDate(bookId: string) {
    this.bookService.getIncomeOfBook(bookId).subscribe((income) => {
      this.income = income.filter(i => i.date.toDate().getMonth() === new Date(this.date).getMonth() && i.date.toDate().getFullYear() === new Date(this.date).getFullYear());;
      this.sortData();
    });
  }

  sortData() {
    return this.income.sort((first, second) => {
      return <any>new Date(first.date.toDate()) - <any>new Date(second.date.toDate());
    });
  }
}
