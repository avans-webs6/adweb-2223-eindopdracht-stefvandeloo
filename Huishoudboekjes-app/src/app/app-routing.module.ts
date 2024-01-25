import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HuishoudboekesListComponent } from './huishoudboekes-list/huishoudboekes-list.component';
import { HuishoudboekjesDetailComponent } from './huishoudboekjes-detail/huishoudboekjes-detail.component';
import { HuishoudboekjesDetailCategoriesComponent } from './huishoudboekjes-detail-categories/huishoudboekjes-detail-categories.component';
import {AuthenticationLoginUserComponent} from "./authentication-login-user/authentication-login-user.component";
import {
  AuthenticationRegisterUserComponent
} from "./authentication-register-user/authentication-register-user.component";
import {loginGuard} from "./login.guard";

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'login', component: AuthenticationLoginUserComponent },
  { path: 'register', component: AuthenticationRegisterUserComponent },
  { path: 'overview', component: HuishoudboekesListComponent, canActivate: [loginGuard] },
  { path: 'book/:id', component: HuishoudboekjesDetailComponent, canActivate: [loginGuard] },
  { path: 'categories', component: HuishoudboekjesDetailCategoriesComponent, canActivate: [loginGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
