import { Injectable } from '@angular/core';
import {Firestore, getFirestore} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {environment} from "../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public firestore: Firestore;

  constructor() {
      const app = initializeApp(environment.firebaseConfig);
      this.firestore = getFirestore(app);
  }
}
