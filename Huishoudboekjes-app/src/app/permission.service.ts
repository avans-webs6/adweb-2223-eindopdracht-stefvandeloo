import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {getAuth} from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(public router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const auth = getAuth();

    if (auth.currentUser) {
      return true;
    } else {
      await this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
    }
  }
}
