import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

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

@NgModule({
  declarations: [
    AppComponent,
    HuishoudboekesListComponent,
    HuishoudboekjesCreateComponent,
    HuishoudboekjesEditComponent,
    HuishoudboekjesDetailComponent,
    HuishoudboekjesDetailTransactionsComponent,
    HuishoudboekjesTransactionsCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BookService, TransactionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
