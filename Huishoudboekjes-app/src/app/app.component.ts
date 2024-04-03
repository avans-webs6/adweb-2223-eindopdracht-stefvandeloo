import { Component } from '@angular/core';
import { getAuth, signOut } from "firebase/auth";
import {initializeApp} from "firebase/app";
import {environment} from "../environments/environment.development";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  app = initializeApp(environment.firebaseConfig);
  user: any;

  constructor(public router: Router, private route: ActivatedRoute) {
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
