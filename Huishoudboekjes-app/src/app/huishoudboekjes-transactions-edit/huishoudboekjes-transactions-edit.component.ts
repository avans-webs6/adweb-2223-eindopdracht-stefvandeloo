import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-type.enum';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-huishoudboekjes-transactions-edit',
  templateUrl: './huishoudboekjes-transactions-edit.component.html',
  styleUrls: ['./huishoudboekjes-transactions-edit.component.css']
})
export class HuishoudboekjesTransactionsEditComponent {

  @Input()
  transactionId: string = "";

  @Input()
  transactionType = TransactionType.INCOME;

  bookId: string = "";
  transaction: Transaction = new Transaction();

  editDialog: any;

  constructor (private transactionService: TransactionService, private route: ActivatedRoute) { 
    this.bookId = this.route.snapshot.paramMap.get('id') ?? "";
  }

  ngAfterViewInit(): void {
    this.editDialog = document.getElementById("edit-transaction-dialog" + this.transactionId) as HTMLDialogElement;
  }

  openEditDialog() {
    this.transactionService.getTransaction(this.bookId, this.transactionId, this.transactionType).subscribe((transaction) => {
      this.transaction = transaction;
    });
    
    this.editDialog.showModal();
  }

  onSave() {
    if (this.transaction.description && this.transaction.price) {
      this.transactionService.editTransaction(this.bookId, this.transaction, this.transactionType);
      this.editDialog.close();
    }
  }

  onCancel() {
    this.editDialog.close();
  }
}
