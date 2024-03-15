import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";
import {TransactionService} from "../transaction.service";
import {Transaction} from "../transaction.model";

@Component({
  selector: 'app-huishoudboekjes-categories-detail',
  templateUrl: './huishoudboekjes-categories-detail.component.html',
  styleUrls: ['./huishoudboekjes-categories-detail.component.css']
})
export class HuishoudboekjesCategoriesDetailComponent implements OnChanges {
    @Input()
    category: Category = new Category();

    balance: number = 0.00;
    progress: number = 0;
    transactions: Transaction[] = [];

    constructor(private categoryService: CategoryService,
                private transactionsService: TransactionService,
                private route: ActivatedRoute) {
    }

    //TODO: Instead of ngOnChanges use observers
    ngOnChanges(changes: SimpleChanges) {
        if (changes['category']) {
            this.transactionsService.getTransactions().subscribe((transactions) => {
                this.transactions = transactions;
                this.calculateBudget();
                this.progress = this.calculateProgress();
                console.log(this.progress)
            });
        }
    }

    calculateBudget() {
        this.balance = 0.00;
        this.transactions.forEach((transaction) => {
            if (transaction.categoryId) {
                if (transaction.categoryId === this.category.id) {
                    this.balance += Number(transaction.price);
                }
            }
        });
    }

    calculateProgress() {
        return (this.balance / this.category.budget) * 100;
    }

    isOverBudget() {
        return this.balance >= this.category.budget;
    }

    isOverDue() {
        return new Date(this.category.endDate).getDate() < new Date().getDate();
    }

    getProgressBarColor() {
        if (this.progress >= 70 && this.progress < 95) {
            return 'orange';
        } else if (this.progress >= 95) {
            return 'red';
        }
        return 'green';
    }

    deleteCategory(categoryId: string) {
        this.categoryService.deleteCategory(categoryId);
    }
}
