import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesDetailComponent } from './huishoudboekjes-detail.component';

describe('HuishoudboekjesDetailComponent', () => {
  let component: HuishoudboekjesDetailComponent;
  let fixture: ComponentFixture<HuishoudboekjesDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesDetailComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
