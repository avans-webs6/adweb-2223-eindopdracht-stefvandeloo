import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesTransactionsCreateComponent } from './huishoudboekjes-transactions-create.component';
import {ReactiveFormsModule} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {TransactionService} from "../transaction.service";
import {TransactionType} from "../transaction-type.enum";
import {Transaction} from "../transaction.model";

describe('HuishoudboekjesTransactionsCreateComponent', () => {
  let component: HuishoudboekjesTransactionsCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesTransactionsCreateComponent>;
  let mockTransactionService = jasmine.createSpyObj(TransactionService, ['addTransaction']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesTransactionsCreateComponent],
      imports: [ReactiveFormsModule],
      providers: [DatePipe, { provide: TransactionService, useValue: mockTransactionService }]
    });
    fixture = TestBed.createComponent(HuishoudboekjesTransactionsCreateComponent);
    component = fixture.componentInstance;
    component.transaction = new Transaction();
    component.transaction.createTransaction('1', 'Description', 50, '', TransactionType.INCOME, '1', '1');
    component.bookId = '1';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create transaction with categoryId', () => {
    component.createTransactionForm.setValue({price: 20, description: 'New Description', category: '2'});
    component.onSave();

    expect(component.transaction).toBeTruthy();
    expect(Number(component.transaction.price)).toEqual(20);
    expect(component.transaction.description).toEqual('New Description');
    expect(component.transaction.categoryId).toEqual('2');
    expect(mockTransactionService.addTransaction).toHaveBeenCalledWith(component.transaction);
  });

  it('should create transaction without categoryId', () => {
    component.createTransactionForm.setValue({price: 20, description: 'New Description', category: ''});
    component.onSave();

    expect(component.transaction).toBeTruthy();
    expect(Number(component.transaction.price)).toEqual(20);
    expect(component.transaction.description).toEqual('New Description');
    expect(component.transaction.categoryId).toEqual('');
    expect(mockTransactionService.addTransaction).toHaveBeenCalledWith(component.transaction);
  });

  it('should not create transaction with price under 0.01', () => {
    component.createTransactionForm.setValue({price: 0, description: 'New Description', category: '2'});
    component.onSave();

    expect(component.transaction).toBeTruthy();
    expect(component.transaction.price).toEqual(50);
    expect(component.transaction.description).toEqual('Description');
    expect(component.transaction.categoryId).toEqual('1');
    expect(mockTransactionService.addTransaction).not.toHaveBeenCalledWith(component.transaction);
  });
});
