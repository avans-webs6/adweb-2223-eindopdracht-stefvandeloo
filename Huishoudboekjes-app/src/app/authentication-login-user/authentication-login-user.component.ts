import { Component } from '@angular/core';
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";

@Component({
  selector: 'app-authentication-login-user',
  templateUrl: './authentication-login-user.component.html',
  styleUrls: ['./authentication-login-user.component.css']
})
export class AuthenticationLoginUserComponent {
  auth = getAuth();
  email = "";
  password = "";

  constructor() {

  }

  loginUser() {
    if (this.email && this.password) {
      signInWithEmailAndPassword(this.auth, this.email, this.password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user.email)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  }
}
