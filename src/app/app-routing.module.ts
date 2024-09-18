import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './views/clients/list/list.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { FormComponent } from './views/clients/form/form.component';
import { DetailsComponent } from './views/clients/details/details.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'clients', component: ListComponent },
  { path: 'clients/create', component: FormComponent },
  { path: 'clients/details/:id', component: DetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
