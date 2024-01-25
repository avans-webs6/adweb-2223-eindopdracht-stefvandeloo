import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticationLoginUserComponent } from './authentication-login-user.component';

describe('AuthenticationLoginUserComponent', () => {
  let component: AuthenticationLoginUserComponent;
  let fixture: ComponentFixture<AuthenticationLoginUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticationLoginUserComponent]
    });
    fixture = TestBed.createComponent(AuthenticationLoginUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
