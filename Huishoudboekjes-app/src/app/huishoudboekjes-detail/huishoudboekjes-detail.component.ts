import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';

@Component({
  selector: 'app-huishoudboekjes-detail',
  templateUrl: './huishoudboekjes-detail.component.html',
  styleUrls: ['./huishoudboekjes-detail.component.css']
})
export class HuishoudboekjesDetailComponent {

  book: Book = new Book();
  income: Transaction[] = [];
  expenses: Transaction[] = [];

  date: Date = new Date();

  constructor(private bookService: BookService, private transactionService: TransactionService, private route: ActivatedRoute) {
    let bookId = this.route.snapshot.paramMap.get('id');
    if (!bookId) return;

    this.bookService.getBook(bookId).subscribe((book) => {
      this.book = book;
    });

    this.receiveIncomeOfBookByDate(bookId);
    this.receiveExpensesOfBookByDate(bookId);
  }

  updateIncome(bookId: string) {
    this.receiveIncomeOfBookByDate(bookId);
    this.receiveExpensesOfBookByDate(bookId);
  }

  receiveIncomeOfBookByDate(bookId: string) {
    this.transactionService.getIncomeOfBook(bookId).subscribe((income) => {
      this.income = this.filterTransactionsByDate(income);
      this.sortData(this.income);
    });
  }

  receiveExpensesOfBookByDate(bookId: string) {
    this.transactionService.getExpensesOfBook(bookId).subscribe((expenses) => {
      this.expenses = this.filterTransactionsByDate(expenses);
      this.sortData(this.expenses);
    });
  }

  filterTransactionsByDate(transactions: Transaction[]) {
    return transactions.filter(i => i.date.toDate().getMonth() === new Date(this.date).getMonth() && i.date.toDate().getFullYear() === new Date(this.date).getFullYear());
  }

  sortData(transactions: Transaction[]) {
    return transactions.sort((first, second) => {
      return <any>new Date(first.date.toDate()) - <any>new Date(second.date.toDate());
    });
  }
}
