import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesDetailCategoriesCreateComponent } from './huishoudboekjes-detail-categories-create.component';

describe('HuishoudboekjesDetailCategoriesCreateComponent', () => {
  let component: HuishoudboekjesDetailCategoriesCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailCategoriesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailCategoriesCreateComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesDetailCategoriesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
