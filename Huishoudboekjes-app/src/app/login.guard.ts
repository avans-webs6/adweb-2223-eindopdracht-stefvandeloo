import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {FirebaseService} from "./firebase.service";

export const loginGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const firebaseService = inject(FirebaseService);

  if (!firebaseService.auth.currentUser) {
    await router.navigate(['/login']);
    return false;
  }
  return true;
};
