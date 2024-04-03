import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesCreateComponent } from './huishoudboekjes-categories-create.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('HuishoudboekjesCategoriesCreateComponent', () => {
  let component: HuishoudboekjesCategoriesCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesCreateComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
