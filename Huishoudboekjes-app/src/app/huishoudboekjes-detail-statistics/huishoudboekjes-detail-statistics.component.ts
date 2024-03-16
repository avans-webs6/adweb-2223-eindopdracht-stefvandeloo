import {Component, Input, OnInit} from '@angular/core';
import {Transaction} from "../transaction.model";
import {TransactionService} from "../transaction.service";
import {TransactionType} from "../transaction-type.enum";
import {ActivatedRoute} from "@angular/router";
import {Book} from "../book.model";

@Component({
  selector: 'app-huishoudboekjes-detail-statistics',
  templateUrl: './huishoudboekjes-detail-statistics.component.html',
  styleUrls: ['./huishoudboekjes-detail-statistics.component.css']
})
export class HuishoudboekjesDetailStatisticsComponent {
  balance = "";
  monthAverageBalance = "";
  transactions: Transaction[] = [];

    /**TODO: Get transaction from parent component, such that the income and expenses are not fetched twice
     * and the balance is calculated correctly (because of the date)
     */
  constructor(private transactionService: TransactionService, private route: ActivatedRoute) {
      let bookId = this.route.snapshot.paramMap.get('id');
      this.transactionService.getTransactionsOfBook(bookId ?? "").subscribe((transactions) => {
          this.transactions = transactions;
          this.calculateBalance();
          this.calculateAverageBalance();
      });
  }

  formatNumber(number: string) {
    if (number.endsWith(".00")) return number.replace(".00", ",-");
    return number;
  }

  calculateAverageBalance() {
    let totalSum = 0;

    this.transactions.forEach((transaction) => {
      totalSum += Number(transaction.price);
    });

    this.monthAverageBalance = this.transactions.length > 0 ? (totalSum / this.transactions.length).toFixed(2) : "0";
  }

    calculateBalance() {
        const income = this.transactions
            .filter(t => t.type === TransactionType.INCOME)
            .reduce((a, b) => a + Number(b.price), 0);
        const expenses = this.transactions
            .filter(t => t.type === TransactionType.EXPENSES)
            .reduce((a, b) => a + Number(b.price), 0);
        this.balance = (income - expenses).toFixed(2);
    }
}
