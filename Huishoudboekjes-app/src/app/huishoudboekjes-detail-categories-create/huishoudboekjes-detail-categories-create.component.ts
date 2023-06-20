import { Component } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-huishoudboekjes-detail-categories-create',
  templateUrl: './huishoudboekjes-detail-categories-create.component.html',
  styleUrls: ['./huishoudboekjes-detail-categories-create.component.css']
})
export class HuishoudboekjesDetailCategoriesCreateComponent {

  category: Category = new Category();
  createDialog: any;

  constructor(public categoryService: CategoryService) {  }

  ngOnInit(): void {
    this.createDialog = document.getElementById("create-category-dialog") as HTMLDialogElement;
  }

  onCreate() {
    this.category = new Category();
    this.createDialog.showModal();
  }

  onSave() {
    if (this.category.name && this.category.budget) {
      this.categoryService.addCategory(this.category);
      this.createDialog.close();
    }
  }

  onCancel() {
    this.createDialog.close();
  }
}
