import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-authentication-register-user',
  templateUrl: './authentication-register-user.component.html',
  styleUrls: ['./authentication-register-user.component.css']
})
export class AuthenticationRegisterUserComponent {

    auth = getAuth();
    registerForm : FormGroup;

    constructor() {
      this.registerForm = new FormGroup({
        'email': new FormControl(null,
          [Validators.required,
                        Validators.email,
                        Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)]),
        'password': new FormControl(null,
          [Validators.required,
                        Validators.minLength(6)])
      });
    }

    createUser() {
      const email = this.registerForm.get('email')?.value;
      const password = this.registerForm.get('password')?.value;

      if (email && password && !this.validateEmail() && !this.validatePassword()) {
        createUserWithEmailAndPassword(this.auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user.email)
          })
          .catch((error) => {
            const errorCode = error.code;
            switch (errorCode) {
              case "auth/invalid-email":
              case "auth/wrong-password":
              case "auth/user-not-found":
                this.registerForm.setErrors({firebaseError: "Invalid email or password"})
                break;
              default:
                this.registerForm.setErrors({firebaseError: "Something went wrong. Please try again later"})
            }
          });
      }
    }

  validateEmail() {
    const emailFormItem = this.registerForm.get('email');

    if (!emailFormItem) return;
    if (!emailFormItem.value) return "Please enter email";
    if (emailFormItem.errors?.['email'] || emailFormItem.errors?.['pattern']) return "Please enter a valid email";
    return;
  }

  validatePassword() {
    const passwordFormItem = this.registerForm.get('password');

    if (!passwordFormItem) return;
    if (!passwordFormItem.value) return "Please enter password";
    if (passwordFormItem.errors?.['minlength']) return "Password must be at least 6 characters long";
    return;
  }
}
