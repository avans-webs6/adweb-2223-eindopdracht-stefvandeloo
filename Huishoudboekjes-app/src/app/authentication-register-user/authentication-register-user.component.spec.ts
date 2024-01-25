import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationRegisterUserComponent } from './authentication-register-user.component';

describe('AuthenticationRegisterUserComponent', () => {
  let component: AuthenticationRegisterUserComponent;
  let fixture: ComponentFixture<AuthenticationRegisterUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationRegisterUserComponent]
    });
    fixture = TestBed.createComponent(AuthenticationRegisterUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
