import {Component, Input} from '@angular/core';
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";
import {TransactionService} from "../transaction.service";
import {Transaction} from "../transaction.model";
import {TransactionType} from "../transaction-type.enum";

@Component({
  selector: 'app-huishoudboekjes-categories-detail',
  templateUrl: './huishoudboekjes-categories-detail.component.html',
  styleUrls: ['./huishoudboekjes-categories-detail.component.css']
})
export class HuishoudboekjesCategoriesDetailComponent {
    @Input()
    category: Category | undefined;

    balance: number = 0.00;
    progress: number = 0;
    transactions: Transaction[] = [];

    constructor(private categoryService: CategoryService, private transactionsService: TransactionService) {
        this.transactionsService.getTransactions().subscribe((transactions) => {
            this.transactions = transactions;
            this.calculateBudget();
            this.calculateProgress();
        });
    }

    calculateBudget() {
        this.balance = 0.00;
        this.transactions.forEach((transaction) => {
            if (!transaction.categoryId || !this.category) return;
            if (transaction.categoryId !== this.category.id) return;

            this.balance += Number(transaction.price);
        });
    }

    calculateProgress() {
        if (!this.category) return;
        this.progress = (this.balance / this.category.budget);
        if (this.progress > 1) this.progress = 1;
    }

    isOverBudget() {
        return this.category && this.balance > this.category.budget;
    }

    isOverDue() {
        return this.category && new Date(this.category.endDate).getTime() < new Date().getTime();
    }

    getProgressBarColor() {
        if (this.progress >= .7 && this.progress < .95) {
            return 'orange';
        } else if (this.progress >= .95) {
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
