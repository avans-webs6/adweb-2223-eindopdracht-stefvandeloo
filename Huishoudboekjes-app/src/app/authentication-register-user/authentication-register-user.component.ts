import { Component } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-authentication-register-user',
  templateUrl: './authentication-register-user.component.html',
  styleUrls: ['./authentication-register-user.component.css']
})
export class AuthenticationRegisterUserComponent {

    auth = getAuth();
    email = "";
    password = "";

    constructor() {

    }

    createUser() {
      if (this.email && this.password) {
        createUserWithEmailAndPassword(this.auth, this.email, this.password)
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
