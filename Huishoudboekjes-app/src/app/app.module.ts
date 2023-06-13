import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HuishoudboekesListComponent } from './huishoudboekes-list/huishoudboekes-list.component';
import { BookService } from './book.service';
import { HuishoudboekjesCreateComponent } from './huishoudboekjes-create/huishoudboekjes-create.component';
import { HuishoudboekjesEditComponent } from './huishoudboekjes-edit/huishoudboekjes-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HuishoudboekesListComponent,
    HuishoudboekjesCreateComponent,
    HuishoudboekjesEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [BookService],
  bootstrap: [AppComponent]
})
export class AppModule { }
