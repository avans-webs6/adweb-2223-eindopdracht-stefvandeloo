import { Component } from '@angular/core';
import { Book } from '../book.model';
import { BookService } from '../book.service';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-type.enum';

@Component({
  selector: 'app-huishoudboekjes-detail',
  templateUrl: './huishoudboekjes-detail.component.html',
  styleUrls: ['./huishoudboekjes-detail.component.css']
})
export class HuishoudboekjesDetailComponent {

  book: Book = new Book("");
  income: Transaction[] = [];
  expenses: Transaction[] = [];

  date: Date = new Date();

  transactionTypeEnum = TransactionType;

  createIncomeDialog: any;
  createExpensesDialog: any;

  constructor(private bookService: BookService, private transactionService: TransactionService, private route: ActivatedRoute) {
    let bookId = this.route.snapshot.paramMap.get('id');
    if (!bookId) return;

    this.bookService.getBook(bookId).subscribe((book) => {
      this.book = book;
    });

    this.receiveIncomeOfBookByDate(bookId);
    this.receiveExpensesOfBookByDate(bookId);
  }

  ngAfterViewInit() {
    this.createIncomeDialog = document.getElementById("create-" + this.transactionTypeEnum.INCOME + "-dialog") as HTMLDialogElement;
    this.createExpensesDialog = document.getElementById("create-" + this.transactionTypeEnum.EXPENSES + "-dialog") as HTMLDialogElement;
  }

  onCreateDialog(transactionType: TransactionType) {
    switch (transactionType) {
      case this.transactionTypeEnum.INCOME:
        this.createIncomeDialog.showModal();
        break;
      case this.transactionTypeEnum.EXPENSES:
        this.createExpensesDialog.showModal();
    }
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
    return transactions.filter(i =>
      new Date(i.date).getMonth() === new Date(this.date).getMonth() &&
      new Date(i.date).getFullYear() === new Date(this.date).getFullYear()
    );
  }

  sortData(transactions: Transaction[]) {
    return transactions.sort((first, second) => {
      return <any>new Date(first.date) - <any>new Date(second.date);
    });
  }

  calculateBalance() {
    let income = this.income.reduce((a, b) => a + Number(b.price), 0);
    let expenses = this.expenses.reduce((a, b) => a + Number(b.price), 0);
    return (income - expenses).toFixed(2);
  }

  combineIncomeAndExpenses() {
    return this.income.concat(this.expenses);
  }
}
