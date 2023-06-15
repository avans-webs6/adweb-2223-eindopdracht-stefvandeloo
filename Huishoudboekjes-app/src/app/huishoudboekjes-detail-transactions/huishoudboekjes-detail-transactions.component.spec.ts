import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesDetailTransactionsComponent } from './huishoudboekjes-detail-transactions.component';

describe('HuishoudboekjesIncomeExpensesComponent', () => {
  let component: HuishoudboekjesDetailTransactionsComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailTransactionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailTransactionsComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesDetailTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
