import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesDetailComponent } from './huishoudboekjes-categories-detail.component';

describe('HuishoudboekjesCategoriesDetailComponent', () => {
  let component: HuishoudboekjesCategoriesDetailComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesDetailComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
