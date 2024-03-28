import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../transaction.model";
import {TransactionService} from "../transaction.service";
import {TransactionType} from "../transaction-type.enum";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../book.model";
import {HuishoudboekjesDetailComponent} from "../huishoudboekjes-detail/huishoudboekjes-detail.component";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-huishoudboekjes-detail-statistics',
  templateUrl: './huishoudboekjes-detail-statistics.component.html',
  styleUrls: ['./huishoudboekjes-detail-statistics.component.css']
})
export class HuishoudboekjesDetailStatisticsComponent implements OnInit {
  balance = 0;
  totalIncome = 0;
  totalExpenses = 0;

  income: Transaction[] = [];
  expenses: Transaction[] = [];

  @Input()
  transactionsBehaviour: BehaviorSubject<Transaction[]> | undefined;

  constructor() {  }

  ngOnInit() {
      if (!this.transactionsBehaviour) return;

      this.transactionsBehaviour.subscribe((transactions) => {
          this.income = transactions.filter((transaction) => transaction.type === TransactionType.INCOME);
          this.expenses = transactions.filter((transaction) => transaction.type === TransactionType.EXPENSES);
          this.calculateIncomeAndExpenses();
          this.calculateBalance();
      });
  }

  formatNumber(number: number) {
    const formattedNumber = number.toFixed(2);
    if (formattedNumber.endsWith(".00")) return formattedNumber.replace(".00", ",-");
    return formattedNumber;
  }

    calculateBalance() {
      this.balance = (this.totalIncome - this.totalExpenses);
    }

    calculateIncomeAndExpenses() {
        this.totalIncome = this.calculateTotal(this.income);
        this.totalExpenses = this.calculateTotal(this.expenses);
    }

    calculateTotal(transactions: Transaction[]) {
        return transactions.reduce((a, b) => a + Number(b.price), 0);
    }
}
