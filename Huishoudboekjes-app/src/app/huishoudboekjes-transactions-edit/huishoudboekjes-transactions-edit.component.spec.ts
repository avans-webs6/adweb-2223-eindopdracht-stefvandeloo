import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesTransactionsEditComponent } from './huishoudboekjes-transactions-edit.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('HuishoudboekjesTransactionsEditComponent', () => {
  let component: HuishoudboekjesTransactionsEditComponent;
  let fixture: ComponentFixture<HuishoudboekjesTransactionsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesTransactionsEditComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(HuishoudboekjesTransactionsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
