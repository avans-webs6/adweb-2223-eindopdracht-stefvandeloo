import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesTransactionsCreateComponent } from './huishoudboekjes-transactions-create.component';

describe('HuishoudboekjesTransactionsCreateComponent', () => {
  let component: HuishoudboekjesTransactionsCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesTransactionsCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesTransactionsCreateComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesTransactionsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
