import { Component } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-huishoudboekjes-categories-create',
  templateUrl: './huishoudboekjes-categories-create.component.html',
  styleUrls: ['./huishoudboekjes-categories-create.component.css']
})
export class HuishoudboekjesCategoriesCreateComponent {

  category: Category | undefined;
  createDialog: any;
  createCategoryForm: FormGroup;

  constructor(public categoryService: CategoryService) {
    this.createCategoryForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'budget': new FormControl(null, [Validators.required, Validators.min(0.01)]),
      'date': new FormControl(null)
    });
  }

  ngOnInit(): void {
    this.createDialog = document.getElementById("create-category-dialog") as HTMLDialogElement;
  }

  onCreate() {
    this.createDialog.showModal();
  }

  async onSave() {
    if (this.validateForm()) return;

    const budget = this.createCategoryForm.value.budget.toFixed(2);
    this.category = new Category("",
                                this.createCategoryForm.value.name,
                                budget,
                                this.createCategoryForm.value.date);
    await this.categoryService.addCategory(this.category);
    this.createCategoryForm.reset();
    this.createDialog.close();
  }

  onCancel() {
    this.createCategoryForm.reset();
    this.createDialog.close();
  }

  validateForm() {
      return this.validateName() || this.validateBudget() || this.validateDate();
  }

    validateName() {
        const title = this.createCategoryForm.get('name');

        if (!title) return;
        if (!title.value) return "Please enter a name";
        return;
    }

    validateBudget() {
        const budget = this.createCategoryForm.get('budget');

        if (!budget) return;
        if (!budget.value || budget.errors?.['min']) return "Please enter a budget greater than 0.01";
        return;
    }

    validateDate() {
        const date = this.createCategoryForm.get('date');

        if (!date) return;
        if (date.value && new Date(date.value).getTime() < new Date().getTime()) return "Please enter a date in the future";
        return;
    }
}
