import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-type.enum';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-huishoudboekjes-transactions-create',
  templateUrl: './huishoudboekjes-transactions-create.component.html',
  styleUrls: ['./huishoudboekjes-transactions-create.component.css']
})
export class HuishoudboekjesTransactionsCreateComponent {

  @Input()
  bookId: string = "";

  @Input()
  transactionType: string = TransactionType.INCOME;

  transaction: Transaction = new Transaction();
  createDialog: any;

  constructor(public transactionService: TransactionService, public datepipe: DatePipe) {  }

  ngAfterViewInit(): void {
    this.createDialog = document.getElementById("create-" + this.transactionType + "-dialog") as HTMLDialogElement;
  }

  onSave() {
    if (this.transaction.description && this.transaction.price) {
      this.transaction.bookId = this.bookId;
      this.transaction.type = this.transactionType;
      this.transaction.date = this.createDateStringOfToday();
      this.transactionService.addTransaction(this.transaction);

      this.transaction = new Transaction();
      this.createDialog.close();
    }
  }

  onCancel() {
    this.transaction = new Transaction();
    this.createDialog.close();
  }

  createDateStringOfToday() {
    let date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    return date ? date : new Date().toString();
  }
}
