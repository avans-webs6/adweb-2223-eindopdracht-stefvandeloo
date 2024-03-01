import { Component } from '@angular/core';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authentication-login-user',
  templateUrl: './authentication-login-user.component.html',
  styleUrls: ['./authentication-login-user.component.css']
})
export class AuthenticationLoginUserComponent {
  auth = getAuth();
  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      'email': new FormControl(null,
        [Validators.required,
                      Validators.email,
                      Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
      'password': new FormControl(null, [Validators.required])
    });
  }

  loginUser() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (email && password && !this.validateEmail() && !this.validatePassword()) {
      signInWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user.email)
        })
        .catch((error) => {
          const errorCode = error.code;
          console.log(errorCode)
          console.log(error.message)
          switch (errorCode) {
            case "auth/invalid-email":
              this.loginForm.setErrors({firebaseError: "Invalid email"})
              break;
            default:
              this.loginForm.setErrors({firebaseError: "Something went wrong. Please try again later"})
          }
        });
    }
  }

  validateEmail() {
    const emailFormItem = this.loginForm.get('email');

    if (!emailFormItem) return;
    if (!emailFormItem.value) return "Please enter email";
    if (emailFormItem.errors?.['email'] || emailFormItem.errors?.['pattern']) return "Please enter a valid email";
    return;
  }

  validatePassword() {
    const passwordFormItem = this.loginForm.get('password');

    if (!passwordFormItem) return;
    if (!passwordFormItem.value) return "Please enter password";
    return;
  }
}
