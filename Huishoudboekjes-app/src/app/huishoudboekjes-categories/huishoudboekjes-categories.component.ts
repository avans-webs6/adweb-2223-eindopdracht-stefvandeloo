import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from '../category.model';
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-huishoudboekjes-categories',
    templateUrl: './huishoudboekjes-categories.component.html',
    styleUrls: ['./huishoudboekjes-categories.component.css']
})
export class HuishoudboekjesCategoriesComponent {
    categories: Category[] = [];

    constructor(private categoryService: CategoryService) {
        this.categoryService.getCategories().subscribe((categories) => {
            this.categories = categories;
        });
    }

    getCurrentDate() {
        return new Date();
    }
}
