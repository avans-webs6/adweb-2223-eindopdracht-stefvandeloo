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
  balance = "";
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
          this.calculateBalance();
      });
  }

  formatNumber(number: string) {
    if (number.endsWith(".00")) return number.replace(".00", ",-");
    return number;
  }

    calculateBalance() {
        const income = this.income.reduce((a, b) => a + Number(b.price), 0);
        const expenses = this.expenses.reduce((a, b) => a + Number(b.price), 0);
        this.balance = (income - expenses).toFixed(2);
    }
}
