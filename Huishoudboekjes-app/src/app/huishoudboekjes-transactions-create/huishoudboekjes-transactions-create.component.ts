import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionService } from '../transaction.service';
import { TransactionType } from '../transaction-type.enum';
import { DatePipe } from '@angular/common';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-huishoudboekjes-transactions-create',
  templateUrl: './huishoudboekjes-transactions-create.component.html',
  styleUrls: ['./huishoudboekjes-transactions-create.component.css']
})
export class HuishoudboekjesTransactionsCreateComponent {

  @Input()
  bookId?: string = "";

  @Input()
  transactionType: string = TransactionType.INCOME;

  categories: Category[] = [];
  transaction: Transaction = new Transaction();

  createDialog: any;
  createTransactionForm: FormGroup;

  constructor(public transactionService: TransactionService, private categoryService: CategoryService, public datepipe: DatePipe) {
    this.createTransactionForm = new FormGroup({
      'price': new FormControl(null, [Validators.required, Validators.min(0.01)]),
      'description': new FormControl(null),
      'category': new FormControl(null)
    });
  }

  ngAfterViewInit(): void {
    this.createDialog = document.getElementById("create-" + this.transactionType + "-dialog") as HTMLDialogElement;

    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  async onSave() {
    if (!this.bookId || this.validatePrice()) return;
    const transactionPrice = this.createTransactionForm.value.price.toFixed(2);
    this.transaction.createTransaction(this.transaction.id,
                                      this.createTransactionForm.value.description,
                                      transactionPrice,
                                      this.createDateStringOfToday(),
                                      this.transactionType,
                                      this.bookId,
                                      this.createTransactionForm.value.category);
    await this.transactionService.addTransaction(this.transaction);

    this.transaction = new Transaction();
    this.createTransactionForm.reset();
    this.createDialog.close();
  }

  onCancel() {
    // this.transaction = new Transaction(); TODO: TEST IF THIS LINE IS NEEDED!
    this.createTransactionForm.reset();
    this.createDialog.close();
  }

  createDateStringOfToday() {
    let date = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    return date ? date : new Date().toString();
  }

  validatePrice() {
    const priceFormItem = this.createTransactionForm.get('price');

    if (!priceFormItem) return;
    if (!priceFormItem.value || priceFormItem.errors?.['min']) return "Please enter a price greater than 0.01";
    return;
  }
}
