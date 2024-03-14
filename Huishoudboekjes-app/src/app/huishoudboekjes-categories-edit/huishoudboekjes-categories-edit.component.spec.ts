import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCategoriesEditComponent } from './huishoudboekjes-categories-edit.component';

describe('HuishoudboekjesCategoriesEditComponent', () => {
  let component: HuishoudboekjesCategoriesEditComponent;
  let fixture: ComponentFixture<HuishoudboekjesCategoriesEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCategoriesEditComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCategoriesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
