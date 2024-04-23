import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesTransactionsEditComponent } from './huishoudboekjes-transactions-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {Transaction} from "../transaction.model";
import {TransactionType} from "../transaction-type.enum";
import {TransactionService} from "../transaction.service";

describe('HuishoudboekjesTransactionsEditComponent', () => {
  let component: HuishoudboekjesTransactionsEditComponent;
  let fixture: ComponentFixture<HuishoudboekjesTransactionsEditComponent>;
  let mockTransactionService = jasmine.createSpyObj(TransactionService, ['editTransaction']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesTransactionsEditComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: TransactionService, useValue: mockTransactionService }],
    });
    fixture = TestBed.createComponent(HuishoudboekjesTransactionsEditComponent);
    component = fixture.componentInstance;
    component.transaction = { categoryId: '1', price: 50, type: TransactionType.INCOME, bookId: '1', id: '1', date: '', description: 'Description' } as Transaction;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit transaction with categoryId', () => {
    component.editTransactionForm.setValue({price: 20, description: 'New Description', category: '2'});
    component.onSave();

    expect(component.transaction).toBeTruthy();
    expect(component.transaction.price).toEqual(20);
    expect(component.transaction.description).toEqual('New Description');
    expect(component.transaction.categoryId).toEqual('2');
    expect(mockTransactionService.editTransaction).toHaveBeenCalledWith(component.transaction);
  });

  it('should edit transaction without categoryId', () => {
    component.editTransactionForm.setValue({price: 20, description: 'New Description', category: ''});
    component.onSave();

    expect(component.transaction).toBeTruthy();
    expect(component.transaction.price).toEqual(20);
    expect(component.transaction.description).toEqual('New Description');
    expect(component.transaction.categoryId).toEqual('');
    expect(mockTransactionService.editTransaction).toHaveBeenCalledWith(component.transaction);
  });

  it('should not edit transaction with price under 0.01', () => {
    component.editTransactionForm.setValue({price: 0, description: 'New Description', category: '2'});
    component.onSave();

    expect(component.transaction).toBeTruthy();
    expect(component.transaction.price).toEqual(50);
    expect(component.transaction.description).toEqual('Description');
    expect(component.transaction.categoryId).toEqual('1');
    expect(mockTransactionService.editTransaction).not.toHaveBeenCalledWith(component.transaction);
  });
});
