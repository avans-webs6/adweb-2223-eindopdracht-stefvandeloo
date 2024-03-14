import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesComponent } from './huishoudboekjes-categories.component';

describe('HuishoudboekjesCategoriesComponent', () => {
  let component: HuishoudboekjesCategoriesComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
