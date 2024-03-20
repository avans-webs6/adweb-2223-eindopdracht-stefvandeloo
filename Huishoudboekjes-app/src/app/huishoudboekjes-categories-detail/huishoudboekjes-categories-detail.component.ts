import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";
import {TransactionService} from "../transaction.service";
import {Transaction} from "../transaction.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-huishoudboekjes-categories-detail',
  templateUrl: './huishoudboekjes-categories-detail.component.html',
  styleUrls: ['./huishoudboekjes-categories-detail.component.css']
})
export class HuishoudboekjesCategoriesDetailComponent {
    @Input()
    category: Category = new Category();

    balance: number = 0.00;
    progress: number = 0;
    transactions: Transaction[] = [];

    constructor(private categoryService: CategoryService,
                private transactionsService: TransactionService,
                private route: ActivatedRoute) {
        this.transactionsService.getTransactions().subscribe((transactions) => {
            this.transactions = transactions;
            this.calculateBudget();
            this.calculateProgress();
        });
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
        this.progress = (this.balance / this.category.budget) * 100;
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

    async deleteCategory(categoryId: string) {
        await this.categoryService.deleteCategory(categoryId);
    }

    formatPrice(price: number) {
        console.log(typeof price);
        const fixedPrice = price.toFixed(2);
        if (fixedPrice.endsWith(".00")) return fixedPrice.replace(".00", ",-");
        return fixedPrice;
    }
}
