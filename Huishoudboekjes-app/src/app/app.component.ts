import { Component } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import {initializeApp} from "firebase/app";
import {environment} from "../environments/environment.development";
import {ActivatedRoute, Router} from "@angular/router";
import firebase from "firebase/compat";
import app = firebase.app;
import {FirebaseService} from "./firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;

  constructor(public router: Router, private firebaseService: FirebaseService) {
    const auth = getAuth();
    auth.onAuthStateChanged(async (user) => {
      if (user) {
          await router.navigate(['/']);
      }
      this.user = user;
    });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(async () => {
      await this.router.navigate(['/login']);
    }).catch((error) => {
      console.log("Error signing out", error);
    });
  }
}
