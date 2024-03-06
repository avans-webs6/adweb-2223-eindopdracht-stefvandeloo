import {Component, Input, SimpleChanges} from '@angular/core';
import {Transaction} from "../transaction.model";

@Component({
  selector: 'app-huishoudboekjes-detail-statistics',
  templateUrl: './huishoudboekjes-detail-statistics.component.html',
  styleUrls: ['./huishoudboekjes-detail-statistics.component.css']
})
export class HuishoudboekjesDetailStatisticsComponent {
  @Input()
  balance: string = "";
  @Input()
  transactions: Transaction[] = [];

  monthAverage: string = "";

  constructor() {  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['transactions']) {
      this.calculateAverage();
    }
  }

  formatNumber(number: string) {
    if (number.endsWith(".00")) return number.replace(".00", ",-");
    return number;
  }

  calculateAverage() {
    let totalSum = 0;

    this.transactions.forEach((transaction) => {
      totalSum += Number(transaction.price);
    });

    this.monthAverage = this.transactions.length > 0 ? (totalSum / this.transactions.length).toFixed(2) : "0";
  }
}
