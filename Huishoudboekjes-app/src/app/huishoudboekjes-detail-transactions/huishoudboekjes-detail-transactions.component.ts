import { Component, Input } from '@angular/core';
import { Transaction } from '../transaction.model';
import { TransactionType } from '../transaction-type.enum';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import { TransactionService } from '../transaction.service';

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

  categories: Category[] = [];

  @Input()
  transactionType = TransactionType.INCOME;

  constructor(private transactionService: TransactionService, private categoryService: CategoryService) {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  getCategoryName(categoryId: string) {
    let category = this.categories.filter(c => c.id === categoryId)[0];
    if (!category) return "";
    return category.name;
  }

  deleteTransaction(transactionId: string) {
    this.transactionService.deleteTransaction(transactionId);
  }

  formatPrice(price: string) {
    if (price.endsWith(".00")) return price.replace(".00", ",-");
    return price;
  }
}
