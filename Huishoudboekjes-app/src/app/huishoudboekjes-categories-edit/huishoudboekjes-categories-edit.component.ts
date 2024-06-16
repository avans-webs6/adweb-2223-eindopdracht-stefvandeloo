import { Component, Input } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-huishoudboekjes-categories-edit',
  templateUrl: './huishoudboekjes-categories-edit.component.html',
  styleUrls: ['./huishoudboekjes-categories-edit.component.css']
})
export class HuishoudboekjesCategoriesEditComponent {

  @Input()
  category: Category | undefined;

  editDialog: any;
  editCategoryForm: FormGroup;

  constructor (private categoryService: CategoryService) {
      this.editCategoryForm = new FormGroup({
          'name': new FormControl(null, [Validators.required]),
          'budget': new FormControl(null, [Validators.required, Validators.min(0.01)]),
          'date': new FormControl(null)
      });
  }

  ngAfterViewInit(): void {
    if (!this.category) return;
    this.editDialog = document.getElementById("edit-category-dialog-" + this.category.id) as HTMLDialogElement;
  }

  openEditDialog() {
    if (!this.category) return;
    this.categoryService.getCategory(this.category.id).subscribe((category) => {
      this.category = category;
      this.editCategoryForm.setValue({name: category.name, budget: category.budget, date: category.endDate});
    });

    this.editDialog.showModal();
  }

  async onSave() {
      if (!this.category || this.validateForm()) return;
      this.editDialog.close();

      this.category = new Category(this.category.id,
                                    this.editCategoryForm.value.name,
                                    this.editCategoryForm.value.budget,
                                    this.editCategoryForm.value.date ?? "");
      await this.categoryService.editCategory(this.category);
      this.editCategoryForm.reset();
  }

  onCancel() {
    this.editCategoryForm.reset();
    this.editDialog.close();
  }

    validateForm() {
        return this.validateName() || this.validateBudget() || this.validateDate();
    }

    validateName() {
        const name = this.editCategoryForm.get('name');

        if (!name) return;
        if (!name.value) return "Please enter a name";
        return;
    }

    validateBudget() {
        const budget = this.editCategoryForm.get('budget');

        if (!budget) return;
        if (!budget.value || budget.errors?.['min']) return "Please enter a budget greater than 0.01";
        return;
    }

    validateDate() {
        const date = this.editCategoryForm.get('date');

        if (date && date.value && new Date(date.value).getTime() < new Date().getTime()) return "Please enter a date in the future";
        return;
    }
}
