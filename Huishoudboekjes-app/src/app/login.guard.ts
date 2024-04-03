import { CanActivateFn } from '@angular/router';
import {getAuth} from "firebase/auth";

export const loginGuard: CanActivateFn = async (route, state) => {
  return !!getAuth().currentUser;
};
