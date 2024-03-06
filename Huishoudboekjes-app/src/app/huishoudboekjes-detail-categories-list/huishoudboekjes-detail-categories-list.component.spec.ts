import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesDetailCategoriesListComponent } from './huishoudboekjes-detail-categories-list.component';

describe('HuishoudboekjesDetailCategoriesListComponent', () => {
  let component: HuishoudboekjesDetailCategoriesListComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailCategoriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailCategoriesListComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesDetailCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
