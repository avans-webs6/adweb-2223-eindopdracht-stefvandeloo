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

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  deleteCategory(categoryId: string) {
    this.categoryService.deleteCategory(categoryId);
  }
}
