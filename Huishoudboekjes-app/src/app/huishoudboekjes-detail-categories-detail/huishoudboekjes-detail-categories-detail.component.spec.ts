import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesDetailCategoriesDetailComponent } from './huishoudboekjes-detail-categories-detail.component';

describe('HuishoudboekjesDetailCategoriesDetailComponent', () => {
  let component: HuishoudboekjesDetailCategoriesDetailComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailCategoriesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailCategoriesDetailComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesDetailCategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
