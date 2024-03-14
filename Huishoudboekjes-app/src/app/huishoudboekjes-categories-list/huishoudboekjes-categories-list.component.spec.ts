import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesListComponent } from './huishoudboekjes-categories-list.component';

describe('HuishoudboekjesCategoriesListComponent', () => {
  let component: HuishoudboekjesCategoriesListComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesListComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
