import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {getAuth} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(public router: Router) { }

  canActivate(): boolean {
    const auth = getAuth();

    if (auth.currentUser) {
      return true
    } else {
      this.router.navigate(['/login']);
      return false
    }
  }
}
