import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";
import {TransactionService} from "../transaction.service";
import {Transaction} from "../transaction.model";

@Component({
  selector: 'app-huishoudboekjes-detail-categories-detail',
  templateUrl: './huishoudboekjes-detail-categories-detail.component.html',
  styleUrls: ['./huishoudboekjes-detail-categories-detail.component.css']
})
export class HuishoudboekjesDetailCategoriesDetailComponent implements OnChanges {
  @Input()
  category: Category = new Category();

  @Input()
  categoryProgress: number = 0.00;

  transactions: Transaction[] = [];

  constructor(private categoryService: CategoryService,
              private transactionsService: TransactionService,
              private route: ActivatedRoute) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      //TODO: Make sure only transactions of the current category are loaded
      this.transactionsService.getTransactions().subscribe((transactions) => {
        this.transactions = transactions;
        this.categoryProgress = 0.00;
        this.calculateBudgetProgress();
      });
    }
  }

  calculateBudgetProgress() {
    this.transactions.forEach((transaction) => {
      if (transaction.categoryId) {
        if (transaction.categoryId === this.category.id) {
          this.categoryProgress += Number(transaction.price);
          console.log(transaction)
          console.log(this.categoryProgress)
        }
      }
    });
  }

  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
  }
}
