import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-type.enum';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-huishoudboekjes-transactions-create',
  templateUrl: './huishoudboekjes-transactions-create.component.html',
  styleUrls: ['./huishoudboekjes-transactions-create.component.css']
})
export class HuishoudboekjesTransactionsCreateComponent {

  @Input()
  bookId: string = "";

  TransactionTypeEnum = TransactionType;
  transactionType: string = TransactionType.INCOME;

  transaction: Transaction = new Transaction();
  createDialog: any;

  constructor(public transactionService: TransactionService) {  }

  ngOnInit(): void {
    this.createDialog = document.getElementById("create-transaction-Dialog") as HTMLDialogElement;
  }

  onCreate(transactionType: string) {
    this.transactionType = transactionType;
    console.log(this.transactionType)
    this.transaction = new Transaction();
    this.createDialog.showModal();
  }

  onSave() {
    if (this.transaction.description && this.transaction.price) {
      this.transaction.date = this.generateTimestampOfToday();

      this.transactionService.addTransactionToBook(this.bookId, this.transaction, this.transactionType);
      this.createDialog.close();
    }
  }

  onCancel() {
    this.createDialog.close();
  }

  generateTimestampOfToday() {
    return new Timestamp(new Date().getTime() / 1000, 0);
  }
}
