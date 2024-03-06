import { CanActivateFn } from '@angular/router';
import {getAuth} from "firebase/auth";
import {inject} from "@angular/core";
import {PermissionService} from "./permission.service";

export const loginGuard: CanActivateFn = async (route, state) => {
  return await inject(PermissionService).canActivate(route, state);
};
