import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HuishoudboekesListComponent } from './huishoudboekes-list/huishoudboekes-list.component';
import { HuishoudboekjesDetailComponent } from './huishoudboekjes-detail/huishoudboekjes-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'overview', pathMatch: 'full' },
  { path: 'overview', component: HuishoudboekesListComponent },
  { path: 'book/:id', component: HuishoudboekjesDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
