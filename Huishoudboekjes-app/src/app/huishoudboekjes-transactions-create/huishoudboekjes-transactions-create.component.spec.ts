import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesTransactionsCreateComponent } from './huishoudboekjes-transactions-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";

describe('HuishoudboekjesTransactionsCreateComponent', () => {
  let component: HuishoudboekjesTransactionsCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesTransactionsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesTransactionsCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [DatePipe]
    });
    fixture = TestBed.createComponent(HuishoudboekjesTransactionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
