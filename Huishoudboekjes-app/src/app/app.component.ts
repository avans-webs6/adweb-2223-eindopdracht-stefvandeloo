import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {FirebaseService} from "./firebase.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: any;

  constructor(public router: Router, private firebaseService: FirebaseService) {
    firebaseService.auth.onAuthStateChanged(async (user) => {
      if (user) {
          await router.navigate(['/']);
      }
      this.user = user;
    });
  }

  async logout() {
    await this.firebaseService.signOut();
  }
}
