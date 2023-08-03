import { Component, Input } from '@angular/core';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-huishoudboekjes-detail-categories-edit',
  templateUrl: './huishoudboekjes-detail-categories-edit.component.html',
  styleUrls: ['./huishoudboekjes-detail-categories-edit.component.css']
})
export class HuishoudboekjesDetailCategoriesEditComponent {

  @Input()
  category: Category = new Category();

  editDialog: any;

  constructor (private categoryService: CategoryService) {  }

  ngAfterViewInit(): void {
    this.editDialog = document.getElementById("edit-category-dialog-" + this.category.id) as HTMLDialogElement;
  }

  openEditDialog() {
    this.categoryService.getCategory(this.category.id).subscribe((category) => {
      this.category = category;
    });
    
    this.editDialog.showModal();
  }
  
  onSave() {
    if (this.category.name && this.category.budget) {
      this.categoryService.editCategory(this.category);
      this.editDialog.close();
    }
  }

  onCancel() {
    this.editDialog.close();
  }
}
