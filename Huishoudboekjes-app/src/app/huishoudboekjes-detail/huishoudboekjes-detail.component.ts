import {Component} from '@angular/core';
import {Book} from '../book.model';
import {BookService} from '../book.service';
import {ActivatedRoute} from '@angular/router';
import {Transaction} from '../transaction.model';
import {TransactionService} from '../transaction.service';
import {TransactionType} from '../transaction-type.enum';
import {BehaviorSubject} from "rxjs";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-huishoudboekjes-detail',
  templateUrl: './huishoudboekjes-detail.component.html',
  styleUrls: ['./huishoudboekjes-detail.component.css']
})
export class HuishoudboekjesDetailComponent {

  book: Book | undefined;
  income: Transaction[] = [];
  expenses: Transaction[] = [];

  transactions$: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);

  date: string = "";
  transactionTypeEnum = TransactionType;

  createIncomeDialog: any;
  createExpensesDialog: any;

  constructor(private bookService: BookService, private transactionService: TransactionService, private route: ActivatedRoute, private datePipe: DatePipe) {
    let bookId = this.route.snapshot.paramMap.get('id');
    if (!bookId) return;

    this.bookService.getBook(bookId).subscribe((book) => {
      this.book = book;
    });

    this.date = this.setDateString();
    this.getTransactionsByDate(bookId);
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
        break;
    }
  }

  setDateString() {
      const date = this.datePipe.transform(new Date(), 'yyyy-MM');
      return date ? date : "";
  }

  getTransactionsByDate(bookId: string) {
    this.transactionService.getTransactionsOfBookByDate(bookId, new Date(this.date)).subscribe((transactions) => {
        this.income = this.filterTransactionsByType(transactions, TransactionType.INCOME);
        this.expenses = this.filterTransactionsByType(transactions, TransactionType.EXPENSES);
        this.transactions$.next(transactions);
    });
  }

  filterTransactionsByType(transactions: Transaction[], transactionType: TransactionType) {
    return transactions.filter(i => i.type === transactionType);
  }
}
