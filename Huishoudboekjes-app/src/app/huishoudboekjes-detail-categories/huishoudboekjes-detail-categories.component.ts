import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import { Category } from '../category.model';

@Component({
  selector: 'app-huishoudboekjes-detail-categories',
  templateUrl: './huishoudboekjes-detail-categories.component.html',
  styleUrls: ['./huishoudboekjes-detail-categories.component.css']
})
export class HuishoudboekjesDetailCategoriesComponent {
  categories: Category[] = [];
  selectedCategory: Category | undefined;

  setCategory(category: Category) {
    this.selectedCategory = category;
  }
}
