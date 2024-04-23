import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesCreateComponent } from './huishoudboekjes-categories-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CategoryService} from "../category.service";
import {Category} from "../category.model";

describe('HuishoudboekjesCategoriesCreateComponent', () => {
  let component: HuishoudboekjesCategoriesCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesCreateComponent>;
  let mockCategoryService = jasmine.createSpyObj(CategoryService, ['addCategory']);


  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: CategoryService, useValue: mockCategoryService}],
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create category', async () => {
    component.category = new Category("", "", 0, "2024-08-05");
    component.createCategoryForm.setValue({name: 'New Cat', budget: 1, date: '2100-01-01'});
    await component.onSave();

    expect(component.category).toBeTruthy();
    expect(component.category.name).toContain('New Cat');
    expect(component.category.budget).toContain(1);
    expect(component.category.endDate).toContain('2100-01-01');
    expect(mockCategoryService.addCategory).toHaveBeenCalledWith(component.category);
  });

  it('should not create category with empty title', async () => {
    component.category = new Category("", "", 0, "");
    component.createCategoryForm.setValue({name: '', budget: 1, date: '2021-01-01'});
    await component.onSave();

    expect(component.category).toBeTruthy();
    expect(component.category.name).toBeFalsy();
    expect(component.category.budget).toBeFalsy();
    expect(component.category.endDate).toBeFalsy();
    expect(mockCategoryService.addCategory).not.toHaveBeenCalledWith(component.category);
  });
});
