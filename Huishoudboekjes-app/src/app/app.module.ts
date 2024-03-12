import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HuishoudboekesListComponent } from './huishoudboekes-list/huishoudboekes-list.component';
import { BookService } from './book.service';
import { TransactionService } from './transaction.service';
import { HuishoudboekjesCreateComponent } from './huishoudboekjes-create/huishoudboekjes-create.component';
import { HuishoudboekjesEditComponent } from './huishoudboekjes-edit/huishoudboekjes-edit.component';
import { HuishoudboekjesDetailComponent } from './huishoudboekjes-detail/huishoudboekjes-detail.component';
import { HuishoudboekjesDetailTransactionsComponent } from './huishoudboekjes-detail-transactions/huishoudboekjes-detail-transactions.component';
import { HuishoudboekjesTransactionsCreateComponent } from './huishoudboekjes-transactions-create/huishoudboekjes-transactions-create.component';
import { HuishoudboekjesTransactionsEditComponent } from './huishoudboekjes-transactions-edit/huishoudboekjes-transactions-edit.component';
import { HuishoudboekjesDetailCategoriesComponent } from './huishoudboekjes-detail-categories/huishoudboekjes-detail-categories.component';
import { CategoryService } from './category.service';
import { HuishoudboekjesDetailCategoriesCreateComponent } from './huishoudboekjes-detail-categories-create/huishoudboekjes-detail-categories-create.component';
import { HuishoudboekjesDetailCategoriesEditComponent } from './huishoudboekjes-detail-categories-edit/huishoudboekjes-detail-categories-edit.component';
import {DatePipe, NgOptimizedImage} from '@angular/common';
import {environment} from "../environments/environment";
import { AuthenticationRegisterUserComponent } from './authentication-register-user/authentication-register-user.component';
import { AuthenticationLoginUserComponent } from './authentication-login-user/authentication-login-user.component';
import {PermissionService} from "./permission.service";
import { HuishoudboekjesDetailStatisticsComponent } from './huishoudboekjes-detail-statistics/huishoudboekjes-detail-statistics.component';
import { HuishoudboekjesDetailCategoriesListComponent } from './huishoudboekjes-detail-categories-list/huishoudboekjes-detail-categories-list.component';
import { HuishoudboekjesDetailCategoriesDetailComponent } from './huishoudboekjes-detail-categories-detail/huishoudboekjes-detail-categories-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HuishoudboekesListComponent,
    HuishoudboekjesCreateComponent,
    HuishoudboekjesEditComponent,
    HuishoudboekjesDetailComponent,
    HuishoudboekjesDetailTransactionsComponent,
    HuishoudboekjesTransactionsCreateComponent,
    HuishoudboekjesTransactionsEditComponent,
    HuishoudboekjesDetailCategoriesComponent,
    HuishoudboekjesDetailCategoriesCreateComponent,
    HuishoudboekjesDetailCategoriesEditComponent,
    AuthenticationRegisterUserComponent,
    AuthenticationLoginUserComponent,
    HuishoudboekjesDetailStatisticsComponent,
    HuishoudboekjesDetailCategoriesListComponent,
    HuishoudboekjesDetailCategoriesDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ],
  providers: [BookService, TransactionService, CategoryService, PermissionService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
