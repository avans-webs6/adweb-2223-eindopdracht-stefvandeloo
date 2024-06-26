import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
import { HuishoudboekjesCategoriesComponent } from './huishoudboekjes-categories/huishoudboekjes-categories.component';
import { CategoryService } from './category.service';
import { HuishoudboekjesCategoriesCreateComponent } from './huishoudboekjes-categories-create/huishoudboekjes-categories-create.component';
import { HuishoudboekjesCategoriesEditComponent } from './huishoudboekjes-categories-edit/huishoudboekjes-categories-edit.component';
import { DatePipe, NgOptimizedImage } from '@angular/common';
import { AuthenticationRegisterUserComponent } from './authentication-register-user/authentication-register-user.component';
import { AuthenticationLoginUserComponent } from './authentication-login-user/authentication-login-user.component';
import { HuishoudboekjesDetailStatisticsComponent } from './huishoudboekjes-detail-statistics/huishoudboekjes-detail-statistics.component';
import { HuishoudboekjesCategoriesDetailComponent } from './huishoudboekjes-categories-detail/huishoudboekjes-categories-detail.component';
import { FirebaseService } from "./firebase.service";

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
        HuishoudboekjesCategoriesComponent,
        HuishoudboekjesCategoriesCreateComponent,
        HuishoudboekjesCategoriesEditComponent,
        AuthenticationRegisterUserComponent,
        AuthenticationLoginUserComponent,
        HuishoudboekjesDetailStatisticsComponent,
        HuishoudboekjesCategoriesDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgOptimizedImage
    ],
  providers: [
    FirebaseService,
    BookService,
    TransactionService,
    CategoryService,
    DatePipe,
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
