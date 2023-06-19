import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-type.enum';
import { Timestamp } from 'firebase/firestore';
import { Book } from '../book.model';

@Component({
  selector: 'app-huishoudboekjes-transactions-create',
  templateUrl: './huishoudboekjes-transactions-create.component.html',
  styleUrls: ['./huishoudboekjes-transactions-create.component.css']
})
export class HuishoudboekjesTransactionsCreateComponent {

  @Input()
  book: Book = new Book();

  @Input()
  transactionType: string = TransactionType.INCOME;

  transaction: Transaction = new Transaction();
  createDialog: any;

  constructor(public transactionService: TransactionService) {  }

  ngAfterViewInit(): void {
    this.createDialog = document.getElementById("create-" + this.transactionType + "-dialog") as HTMLDialogElement;
  }

  onSave() {
    if (this.transaction.description && this.transaction.price) {
      this.transaction.date = this.generateTimestampOfToday();
      this.transactionService.addTransactionToBook(this.book, this.transaction, this.transactionType);
      this.transaction = new Transaction();
      this.createDialog.close();
    }
  }

  onCancel() {
    this.transaction = new Transaction();
    this.createDialog.close();
  }

  generateTimestampOfToday() {
    return new Timestamp(new Date().getTime() / 1000, 0);
  }
}
