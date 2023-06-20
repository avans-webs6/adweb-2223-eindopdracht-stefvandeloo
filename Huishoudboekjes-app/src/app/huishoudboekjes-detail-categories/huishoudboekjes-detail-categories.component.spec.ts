import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesDetailCategoriesComponent } from './huishoudboekjes-detail-categories.component';

describe('HuishoudboekjesDetailCategoriesComponent', () => {
  let component: HuishoudboekjesDetailCategoriesComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailCategoriesComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesDetailCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
