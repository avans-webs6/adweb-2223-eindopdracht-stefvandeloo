import { Component } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import {initializeApp} from "firebase/app";
import {environment} from "../environments/environment";
import firebase from "firebase/compat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Huishoudboekjes-app';
  app = initializeApp(environment.firebaseConfig);
  user: any;

  constructor(public router: Router) {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.navigate(['/overview']);
      }
      this.user = user;
    });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      this.router.navigate(['/login']);
    }).catch((error) => {
      console.log("Error signing out", error);
    });
  }
}
