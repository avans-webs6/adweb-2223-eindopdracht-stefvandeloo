import { Injectable } from '@angular/core';
import {Firestore, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {environment} from "../environments/environment";
import {getAuth, signOut} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public firestore: Firestore;
  public auth;

  constructor() {
      const app = initializeApp(environment.firebaseConfig);
      this.firestore = getFirestore(app);
      this.auth = getAuth(app);
  }

  async signOut() {
    await signOut(this.auth);
  }
}
