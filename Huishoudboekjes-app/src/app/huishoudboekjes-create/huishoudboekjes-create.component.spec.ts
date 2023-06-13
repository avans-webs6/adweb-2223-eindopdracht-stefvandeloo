import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCreateComponent } from './huishoudboekjes-create.component';

describe('HuishoudboekjesCreateComponent', () => {
  let component: HuishoudboekjesCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCreateComponent]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
