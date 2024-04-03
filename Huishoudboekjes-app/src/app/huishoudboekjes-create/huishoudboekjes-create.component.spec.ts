import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekjesCreateComponent } from './huishoudboekjes-create.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('HuishoudboekjesCreateComponent', () => {
  let component: HuishoudboekjesCreateComponent;
  let fixture: ComponentFixture<HuishoudboekjesCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekjesCreateComponent],
      imports: [ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(HuishoudboekjesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
