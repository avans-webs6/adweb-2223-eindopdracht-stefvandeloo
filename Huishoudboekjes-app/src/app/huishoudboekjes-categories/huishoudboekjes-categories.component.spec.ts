import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesComponent } from './huishoudboekjes-categories.component';
import {
    HuishoudboekjesCategoriesCreateComponent
} from "../huishoudboekjes-categories-create/huishoudboekjes-categories-create.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('HuishoudboekjesCategoriesComponent', () => {
  let component: HuishoudboekjesCategoriesComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesComponent, HuishoudboekjesCategoriesCreateComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have date of current day', () => {
    const today = new Date();
    expect(component.getCurrentDate()).toEqual(today);
  });
});
