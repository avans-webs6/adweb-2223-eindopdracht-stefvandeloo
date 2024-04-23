import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesEditComponent } from './huishoudboekjes-categories-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {Category} from "../category.model";
import {CategoryService} from "../category.service";

describe('HuishoudboekjesCategoriesEditComponent', () => {
  let component: HuishoudboekjesCategoriesEditComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesEditComponent>;
  let mockCategoryService = jasmine.createSpyObj(CategoryService, ['editCategory']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesEditComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CategoryService, useValue: mockCategoryService }]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesEditComponent);
    component = fixture.componentInstance;
    component.category = new Category("1", "Category 1", 100, "");
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit category with date', async () => {
    component.editCategoryForm.setValue({name: 'New Category', budget: 200, date: '2100-01-01'});
    fixture.detectChanges();
    await component.onSave();

    expect(component.category).toBeTruthy();
    expect(component.category?.name).toEqual('New Category');
    expect(component.category?.budget).toEqual(200);
    expect(component.category?.endDate).toEqual("2100-01-01");
    expect(mockCategoryService.editCategory).toHaveBeenCalledWith(component.category);
  });

  it('should edit category without date', async () => {
    component.editCategoryForm.setValue({name: 'New Category', budget: 200, date: ''});
    fixture.detectChanges();
    await component.onSave();

    expect(component.category).toBeTruthy();
    expect(component.category?.name).toEqual('New Category');
    expect(component.category?.budget).toEqual(200);
    expect(component.category?.endDate).toBeFalsy();
    expect(mockCategoryService.editCategory).toHaveBeenCalledWith(component.category);
  });

  it('should not edit category with empty name', () => {
    component.category = new Category("2", "", 0, "");
    component.editCategoryForm.setValue({name: '', budget: 200, date: ''});
    component.onSave();

    expect(component.category).toBeTruthy();
    expect(component.category?.name).toBeFalsy();
    expect(component.category?.budget).toBeFalsy();
    expect(mockCategoryService.editCategory).not.toHaveBeenCalledWith(component.category);
  });
});
