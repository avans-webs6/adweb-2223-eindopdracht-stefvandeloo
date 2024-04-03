import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationLoginUserComponent } from './authentication-login-user.component';
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";

describe('AuthenticationLoginUserComponent', () => {
  let component: AuthenticationLoginUserComponent;
  let fixture: ComponentFixture<AuthenticationLoginUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationLoginUserComponent],
      imports: [ReactiveFormsModule, RouterTestingModule.withRoutes([])]
    });
    fixture = TestBed.createComponent(AuthenticationLoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
