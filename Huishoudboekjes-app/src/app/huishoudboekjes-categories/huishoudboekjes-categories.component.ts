import { Component } from '@angular/core';
import { Category } from '../category.model';

@Component({
  selector: 'app-huishoudboekjes-categories',
  templateUrl: './huishoudboekjes-categories.component.html',
  styleUrls: ['./huishoudboekjes-categories.component.css']
})
export class HuishoudboekjesCategoriesComponent {
  categories: Category[] = [];
  selectedCategory: Category | undefined;

  setCategory(category: Category) {
    this.selectedCategory = category;
  }
}
