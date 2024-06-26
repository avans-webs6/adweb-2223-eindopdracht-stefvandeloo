import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HuishoudboekesListComponent } from './huishoudboekes-list/huishoudboekes-list.component';
import { HuishoudboekjesDetailComponent } from './huishoudboekjes-detail/huishoudboekjes-detail.component';
import { HuishoudboekjesCategoriesComponent } from './huishoudboekjes-categories/huishoudboekjes-categories.component';
import {AuthenticationLoginUserComponent} from "./authentication-login-user/authentication-login-user.component";
import {
  AuthenticationRegisterUserComponent
} from "./authentication-register-user/authentication-register-user.component";
import {loginGuard} from "./login.guard";
import {
  HuishoudboekjesDetailStatisticsComponent
} from "./huishoudboekjes-detail-statistics/huishoudboekjes-detail-statistics.component";

const routes: Routes = [
    { path: '', redirectTo: 'books', pathMatch: 'full' },
    { path: 'login', component: AuthenticationLoginUserComponent },
    { path: 'register', component: AuthenticationRegisterUserComponent},
    { path: 'books', component: HuishoudboekesListComponent, data: { isArchived: false }, canActivate: [loginGuard] },
    { path: 'books/archived', component: HuishoudboekesListComponent, data: { isArchived: true }, canActivate: [loginGuard] },
    { path: 'book/:id', component: HuishoudboekjesDetailComponent, canActivate: [loginGuard] },
    { path: 'book/:id/statistics', component: HuishoudboekjesDetailStatisticsComponent, canActivate: [loginGuard] },
    { path: 'categories', component: HuishoudboekjesCategoriesComponent, canActivate: [loginGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
