import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesDetailComponent } from './huishoudboekjes-categories-detail.component';
import {RouterTestingModule} from "@angular/router/testing";
import {
    HuishoudboekjesCategoriesEditComponent
} from "../huishoudboekjes-categories-edit/huishoudboekjes-categories-edit.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('HuishoudboekjesCategoriesDetailComponent', () => {
  let component: HuishoudboekjesCategoriesDetailComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesDetailComponent, HuishoudboekjesCategoriesEditComponent],
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
