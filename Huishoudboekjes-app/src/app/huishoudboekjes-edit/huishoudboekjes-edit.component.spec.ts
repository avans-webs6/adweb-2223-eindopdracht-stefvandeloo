import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesEditComponent } from './huishoudboekjes-edit.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('HuishoudboekjesEditComponent', () => {
  let component: HuishoudboekjesEditComponent;
  let fixture: ComponentFixture<HuishoudboekjesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesEditComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(HuishoudboekjesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
