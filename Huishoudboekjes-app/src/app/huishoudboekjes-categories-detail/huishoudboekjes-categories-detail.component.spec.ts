import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HuishoudboekjesCategoriesDetailComponent } from './huishoudboekjes-categories-detail.component';
import { CategoryService } from '../category.service';
import { TransactionService } from '../transaction.service';
import { of } from 'rxjs';
import { Category } from '../category.model';
import { Transaction } from '../transaction.model';
import {TransactionType} from "../transaction-type.enum";

describe('HuishoudboekjesCategoriesDetailComponent', () => {
  let component: HuishoudboekjesCategoriesDetailComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesDetailComponent>;
  const mockCategoryService = jasmine.createSpyObj(CategoryService, ['deleteCategory']);
  const mockTransactionService = jasmine.createSpyObj(TransactionService, ['getTransactions']);

  beforeEach(() => {

    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesDetailComponent],
      providers: [
        { provide: CategoryService, useValue: mockCategoryService },
        { provide: TransactionService, useValue: mockTransactionService }
      ]
    });

    mockTransactionService.getTransactions.and.returnValue(of([
      { categoryId: '1', price: 50, type: TransactionType.INCOME, bookId: '1', id: '1', date: '', description: '' } as Transaction,
      { categoryId: '1', price: 20, type: TransactionType.INCOME, bookId: '1', id: '1', date: '', description: '' } as Transaction,
      { categoryId: '1', price: 10, type: TransactionType.EXPENSES, bookId: '1', id: '1', date: '', description: '' } as Transaction,
      { categoryId: '2', price: 30, type: TransactionType.INCOME, bookId: '1', id: '1', date: '', description: '' } as Transaction,
    ]));

    fixture = TestBed.createComponent(HuishoudboekjesCategoriesDetailComponent);
    component = fixture.componentInstance;
  });

  it('should calculate budget correctly', () => {
    component.category = new Category('1', 'Cat',100, new Date().toString());
    component.calculateBudget();
    expect(component.balance).toEqual(60);
  });

  it('should calculate progress correctly', () => {
    component.category = new Category('1', 'Cat',120, new Date().toString());
    component.calculateBudget();
    component.calculateProgress();
    expect(component.progress).toEqual(50);
  });

  it('should determine over budget correctly', () => {
    component.category = new Category('1', 'Cat',1, new Date().toString());
    component.calculateBudget();
    expect(component.isOverBudget()).toBeTrue();

    component.category = new Category('2', 'Cat2',100, new Date().toString());
    component.calculateBudget();
    expect(component.isOverBudget()).toBeFalse();
  });

  it('should determine overdue correctly', () => {
    component.category = new Category('1', 'Cat',100, new Date(1970, 1, 1).toString());
    mockTransactionService.getTransactions.and.returnValue(of([]));
    expect(component.isOverDue()).toBeTrue();
  });
});
