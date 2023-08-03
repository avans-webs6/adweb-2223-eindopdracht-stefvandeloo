import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-type.enum';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

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

  categories: Category[] = [];
  transaction: Transaction = new Transaction();

  editDialog: any;

  constructor (private transactionService: TransactionService, private categoryService: CategoryService) {  }

  ngAfterViewInit(): void {
    this.editDialog = document.getElementById("edit-transaction-dialog-" + this.transactionId) as HTMLDialogElement;
  }

  openEditDialog() {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });

    this.transactionService.getTransaction(this.transactionId).subscribe((transaction) => {
      this.transaction = transaction;
    });
    
    this.editDialog.showModal();
  }

  onSave() {
    if (this.transaction.description && this.transaction.price) {
      this.transactionService.editTransaction(this.transaction);
      this.editDialog.close();
    }
  }

  onCancel() {
    this.editDialog.close();
  }
}
