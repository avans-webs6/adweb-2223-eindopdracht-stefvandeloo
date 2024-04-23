import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HuishoudboekjesDetailStatisticsComponent } from './huishoudboekjes-detail-statistics.component';
import { Transaction } from '../transaction.model';
import {BehaviorSubject} from 'rxjs';
import { TransactionType } from '../transaction-type.enum';

describe('HuishoudboekjesDetailStatisticsComponent', () => {
  let component: HuishoudboekjesDetailStatisticsComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailStatisticsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailStatisticsComponent]
    });

    fixture = TestBed.createComponent(HuishoudboekjesDetailStatisticsComponent);
    component = fixture.componentInstance;
    component.transactionsBehaviour = new BehaviorSubject([
      { categoryId: '1', price: 50, type: TransactionType.INCOME, bookId: '1', id: '1', date: '', description: '' } as Transaction,
      { categoryId: '1', price: 20, type: TransactionType.INCOME, bookId: '1', id: '1', date: '', description: '' } as Transaction,
      { categoryId: '1', price: 10, type: TransactionType.EXPENSES, bookId: '1', id: '1', date: '', description: '' } as Transaction,
      { categoryId: '2', price: 30, type: TransactionType.INCOME, bookId: '1', id: '1', date: '', description: '' } as Transaction,
      { categoryId: '2', price: 15.01, type: TransactionType.EXPENSES, bookId: '1', id: '1', date: '', description: '' } as Transaction,
    ]);
    fixture.detectChanges();
  });

  it('should calculate balance correctly', () => {
    component.calculateBalance();
    expect(component.balance).toBeCloseTo(74.99, 0.0001);
  });

  it('should calculate total correctly', () => {
    component.calculateIncomeAndExpenses();
    expect(component.totalIncome).toEqual(100);
    expect(component.totalExpenses).toBeCloseTo(25.01, 0.0001);
  });

  it('should format number correctly', () => {
    const number = component.formatNumber(10.2658)
    expect(number).toEqual('10.27');
  });
});
