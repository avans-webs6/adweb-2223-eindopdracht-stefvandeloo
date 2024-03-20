import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-type.enum';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

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
  editTransactionForm: FormGroup;

  constructor (private transactionService: TransactionService, private categoryService: CategoryService) {
    this.editTransactionForm = new FormGroup({
      'price': new FormControl(null, [Validators.required, Validators.min(0.01)]),
      'description': new FormControl(null),
      'category': new FormControl(null)
    });
  }

  ngAfterViewInit(): void {
    this.editDialog = document.getElementById("edit-transaction-dialog-" + this.transactionId) as HTMLDialogElement;

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  openEditDialog() {
    this.transactionService.getTransaction(this.transactionId).subscribe((transaction) => {
      this.transaction = transaction;
      this.editTransactionForm.setValue({price: transaction.price, description: transaction.description, category: transaction.categoryId});
    });

    this.editDialog.showModal();
  }

  async onSave() {
    if (this.validatePrice()) return;
    this.transaction.price = this.editTransactionForm.value.price.toFixed(2);
    this.transaction.description = this.editTransactionForm.value.description;
    this.transaction.categoryId = this.editTransactionForm.value.category;
    await this.transactionService.editTransaction(this.transaction);
    this.editDialog.close();
  }

  onCancel() {
    this.editDialog.close();
  }

  validatePrice() {
    const priceFormItem = this.editTransactionForm.get('price');

    if (!priceFormItem) return;
    if (!priceFormItem.value || priceFormItem.errors?.['min']) return "Please enter a price greater than 0.01";
    return;
  }
}
