import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesDetailCategoriesEditComponent } from './huishoudboekjes-detail-categories-edit.component';

describe('HuishoudboekjesDetailCategoriesEditComponent', () => {
  let component: HuishoudboekjesDetailCategoriesEditComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailCategoriesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailCategoriesEditComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesDetailCategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
