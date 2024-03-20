import { Component } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-huishoudboekjes-categories-create',
  templateUrl: './huishoudboekjes-categories-create.component.html',
  styleUrls: ['./huishoudboekjes-categories-create.component.css']
})
export class HuishoudboekjesCategoriesCreateComponent {

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

  async onSave() {
    if (this.category.name && this.category.budget) {
      await this.categoryService.addCategory(this.category);
      this.createDialog.close();
    }
  }

  onCancel() {
    this.createDialog.close();
  }
}
