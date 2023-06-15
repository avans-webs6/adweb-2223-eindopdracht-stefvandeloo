import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';

@Component({
  selector: 'app-huishoudboekjes-detail-transactions',
  templateUrl: './huishoudboekjes-detail-transactions.component.html',
  styleUrls: ['./huishoudboekjes-detail-transactions.component.css']
})
export class HuishoudboekjesDetailTransactionsComponent {
  @Input()
  title: string = "";
  @Input()
  transactions: Transaction[] = [];
}
