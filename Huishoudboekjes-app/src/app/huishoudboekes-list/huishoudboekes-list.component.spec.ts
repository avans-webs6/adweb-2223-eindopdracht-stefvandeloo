import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HuishoudboekesListComponent } from './huishoudboekes-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HuishoudboekjesCreateComponent} from "../huishoudboekjes-create/huishoudboekjes-create.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('HuishoudboekesListComponent', () => {
  let component: HuishoudboekesListComponent;
  let fixture: ComponentFixture<HuishoudboekesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HuishoudboekesListComponent, HuishoudboekjesCreateComponent],
      imports: [RouterTestingModule.withRoutes([]), ReactiveFormsModule]
    });
    fixture = TestBed.createComponent(HuishoudboekesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
