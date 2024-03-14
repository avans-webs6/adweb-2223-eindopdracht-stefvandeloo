import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Category} from "../category.model";
import {CategoryService} from "../category.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-huishoudboekjes-categories-list',
  templateUrl: './huishoudboekjes-categories-list.component.html',
  styleUrls: ['./huishoudboekjes-categories-list.component.css']
})
export class HuishoudboekjesCategoriesListComponent {
  @Input()
  categories: Category[] = [];

  @Output()
  categoryEventEmitter= new EventEmitter<Category>();

  constructor(private categoryService: CategoryService, private route: ActivatedRoute) {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  selectCategory(category: Category) {
    this.categoryEventEmitter.emit(category);
  }
}
